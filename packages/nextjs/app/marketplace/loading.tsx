export default function MarketplaceLoading() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300 border-b border-base-content/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="h-12 bg-base-content/10 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-base-content/10 rounded w-128 mx-auto animate-pulse" />
          </div>

          <div className="relative w-full max-w-2xl mx-auto">
            <div className="h-12 bg-base-content/10 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-2xl border border-base-content/10 p-6">
              <div className="h-6 bg-base-content/10 rounded w-20 mb-4 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-base-content/10 rounded w-full animate-pulse" />
                <div className="h-4 bg-base-content/10 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-base-content/10 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div className="h-5 bg-base-content/10 rounded w-48 animate-pulse" />
              <div className="h-10 bg-base-content/10 rounded w-32 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 13 }, (_, i) => (
                <div
                  key={i}
                  className="bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-base-content/10" />
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-base-content/10 rounded-full" />
                      <div className="h-4 bg-base-content/10 rounded w-20" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 bg-base-content/10 rounded w-full" />
                      <div className="h-5 bg-base-content/10 rounded w-3/4" />
                    </div>
                    <div className="h-4 bg-base-content/10 rounded w-1/2" />
                    <div className="flex items-center justify-between">
                      <div className="h-6 bg-base-content/10 rounded w-20" />
                      <div className="h-5 bg-base-content/10 rounded w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
