import { Synapse, RPC_URLS } from '@filoz/synapse-sdk'

interface UserProfile {
  name?: string
  email?: string
  bio?: string
  preferences?: Record<string, unknown>
  walletAddress: string
  createdAt: string
  updatedAt: string
  version: number
}

interface RegistryUserEntry {
  cid: string | { '/': string }
  updatedAt: string
  version: number
  name: string
}

interface Registry {
  version: number
  createdAt: string
  users: Record<string, RegistryUserEntry>
  metadata: {
    totalUsers: number
    lastUpdated: string
  }
}

class DecentralizedFilecoinAuth {
  private privateKey: string
  private registryCid: string | null
  private rpcUrl: string
  private synapse: any
  private registryCache: Registry | null
  private cacheTimestamp: number | null
  private readonly CACHE_DURATION: number

  constructor(
    privateKey: string,
    registryCid: string | null = null,
    rpcUrl: string = RPC_URLS.calibration.http
  ) {
    this.privateKey = privateKey
    this.registryCid = registryCid
    this.rpcUrl = rpcUrl
    this.synapse = null
    this.registryCache = null
    this.cacheTimestamp = null
    this.CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
  }

  async initialize(): Promise<void> {
    if (!this.synapse) {
      this.synapse = await Synapse.create({
        privateKey: this.privateKey,
        rpcURL: this.rpcUrl,
      })
      console.log('✅ Synapse SDK initialized')
    }
  }

  async initializeRegistry(): Promise<string> {
    await this.initialize()

    const initialRegistry: Registry = {
      version: 1,
      createdAt: new Date().toISOString(),
      users: {},
      metadata: {
        totalUsers: 0,
        lastUpdated: new Date().toISOString(),
      },
    }

    console.log('🚀 Creating initial registry on Filecoin...')
    const registryCid = await this.uploadRegistry(initialRegistry)

    console.log(`📋 Initial registry created with CID: ${registryCid}`)
    console.log('💡 IMPORTANT: Save this CID as REGISTRY_CID in your environment!')
    process.env.REGISTRY_CID = registryCid
    return registryCid
  }

  async fetchRegistry(): Promise<Registry> {
    await this.initialize()

    if (
      this.registryCache &&
      this.cacheTimestamp &&
      Date.now() - this.cacheTimestamp < this.CACHE_DURATION
    ) {
      return this.registryCache
    }

    if (!this.registryCid) {
      console.log('⚠️ No registry CID provided. Creating new registry...')
      const newCid = await this.initializeRegistry()
      this.registryCid = newCid
      return this.registryCache as Registry
    }

    try {
      console.log(`📥 Downloading registry from CID: ${this.registryCid}`)
      const registryData = await this.synapse.storage.download(this.registryCid)
      const registry: Registry = JSON.parse(new TextDecoder().decode(registryData))

      this.registryCache = registry
      this.cacheTimestamp = Date.now()

      console.log(`✅ Registry loaded (${registry.metadata.totalUsers} users)`)
      return registry
    } catch (error: any) {
      console.error('❌ Error fetching registry from Filecoin:', error.message)

      console.log('🔄 Creating new registry due to error...')
      const newCid = await this.initializeRegistry()
      this.registryCid = newCid
      return this.registryCache as Registry
    }
  }

  async uploadRegistry(registry: Registry): Promise<string> {
    await this.initialize()

    console.log('📤 Uploading registry to Filecoin...')

    const updatedRegistry: Registry = {
      ...registry,
      version: (registry.version || 0) + 1,
      metadata: {
        ...registry.metadata,
        totalUsers: Object.keys(registry.users || {}).length,
        lastUpdated: new Date().toISOString(),
      },
    }

    const registryJson = JSON.stringify(updatedRegistry, null, 2)

    const minSize = 128
    const registryBytes = new TextEncoder().encode(registryJson)
    let finalData = registryBytes

    if (registryBytes.length < minSize) {
      const padding = ' '.repeat(minSize - registryBytes.length)
      finalData = new TextEncoder().encode(registryJson + padding)
    }

    const uploadResult = await this.synapse.storage.upload(finalData)
    const newRegistryCid: string = uploadResult.pieceCid

    console.log(`✅ Registry uploaded! New CID: ${newRegistryCid}`)

    this.registryCid = newRegistryCid
    this.registryCache = updatedRegistry
    this.cacheTimestamp = Date.now()

    return newRegistryCid
  }

  async storeUserProfile(
    walletAddress: string,
    profileData: Partial<UserProfile>
  ): Promise<{ profileCid: string; registryCid: string; profile: UserProfile }> {
    await this.initialize()

    console.log(`📤 Uploading profile for ${walletAddress}...`)

    const enrichedProfile: UserProfile = {
      ...profileData,
      walletAddress: walletAddress.toLowerCase(),
      updatedAt: new Date().toISOString(),
      createdAt: profileData.createdAt || new Date().toISOString(),
      version: (profileData.version || 0) + 1,
    } as UserProfile

    const profileJson = JSON.stringify(enrichedProfile, null, 2)

    const minSize = 128
    const profileBytes = new TextEncoder().encode(profileJson)
    let finalData = profileBytes

    if (profileBytes.length < minSize) {
      const padding = ' '.repeat(minSize - profileBytes.length)
      finalData = new TextEncoder().encode(profileJson + padding)
    }

    const uploadResult = await this.synapse.storage.upload(finalData)
    const profileCid: string = uploadResult.pieceCid

    console.log(`✅ Profile uploaded! CID: ${profileCid}`)

    const registry = await this.fetchRegistry()
    registry.users = registry.users || {}
    registry.users[walletAddress.toLowerCase()] = {
      cid: profileCid,
      updatedAt: enrichedProfile.updatedAt,
      version: enrichedProfile.version,
      name: enrichedProfile.name || 'Unknown',
    }

    const newRegistryCid = await this.uploadRegistry(registry)

    console.log(`📋 Registry updated with new CID: ${newRegistryCid}`)

    return {
      profileCid,
      registryCid: newRegistryCid,
      profile: enrichedProfile,
    }
  }

  async fetchUserProfile(walletAddress: string): Promise<UserProfile | null> {
    await this.initialize()

    const registry = await this.fetchRegistry()
    const userEntry = registry.users && registry.users[walletAddress.toLowerCase()]

    if (!userEntry || !(typeof userEntry.cid === 'string' ? userEntry.cid : userEntry.cid['/'])) {
      console.log(`🆕 No profile found for ${walletAddress} (new user)`)
      return null
    }

    const cid = typeof userEntry.cid === 'string' ? userEntry.cid : userEntry.cid['/']
    console.log(`📥 Fetching profile for ${walletAddress} from CID: ${cid}`)

    try {
      const profileData = await this.synapse.storage.download(cid)
      const profile: UserProfile = JSON.parse(new TextDecoder().decode(profileData))

      console.log(`✅ Retrieved profile for ${profile.name || 'User'}`)
      return profile
    } catch (error: any) {
      console.error(`❌ Error fetching profile: ${error.message}`)
      return null
    }
  }

  async authenticateUser(walletAddress: string) {
    console.log(`🔐 Authenticating user: ${walletAddress}`)

    if (!walletAddress || !walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      throw new Error('Invalid wallet address format')
    }

    const existingProfile = await this.fetchUserProfile(walletAddress)

    if (!existingProfile) {
      return {
        isNewUser: true,
        walletAddress,
        profile: null,
        registryCid: this.registryCid,
        message: 'Welcome! Please create your profile.',
      }
    }

    return {
      isNewUser: false,
      walletAddress,
      profile: existingProfile,
      registryCid: this.registryCid,
      message: `Welcome back, ${existingProfile.name || 'User'}!`,
    }
  }

  async userExists(walletAddress: string): Promise<boolean> {
    const registry = await this.fetchRegistry()
    return registry.users && registry.users.hasOwnProperty(walletAddress.toLowerCase())
  }

  async getRegistryStats() {
    const registry = await this.fetchRegistry()
    process.env.REGISTRY_CID = this.registryCid || ''
    return {
      totalUsers: registry.metadata.totalUsers,
      registryVersion: registry.version,
      createdAt: registry.createdAt,
      lastUpdated: registry.metadata.lastUpdated,
      currentRegistryCid: this.registryCid,
      users: Object.keys(registry.users || {}),
    }
  }
}

export { DecentralizedFilecoinAuth, UserProfile, Registry }