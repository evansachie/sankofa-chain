export const MudclothPattern = ({ id }: { id: string | number }) => (
  <svg className="w-full h-full text-indigo-500/50 dark:text-indigo-300/40" aria-hidden="true">
    <defs>
      <pattern id={`mudcloth-${id}`} width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M8 0 V32 M24 0 V32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M0 8 H32 M0 24 H32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="0" cy="0" r="2" fill="currentColor" opacity="0.4" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#mudcloth-${id})`} />
  </svg>
);
