export const CardKentePattern = ({ id }: { id: string | number }) => (
  <svg className="w-full h-full text-indigo-500/50 dark:text-indigo-300/40" aria-hidden="true">
    <defs>
      <pattern id={`kente-${id}`} width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="40" height="40" fill="currentColor" opacity="0.1" />
        <path d="M0 10h40M10 0v40M0 30h40M30 0v40" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <path d="M0 0h20v20H0zM20 20h20v20H20z" fill="currentColor" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#kente-${id})`} />
  </svg>
);
