import { motion } from "framer-motion";

export const BackgroundSymbols = () => (
  <>
    <motion.div
      className="absolute top-24 left-1/5 w-24 h-24 text-indigo-500/5 dark:text-indigo-200/5"
      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
      transition={{
        rotate: { duration: 50, repeat: Infinity, ease: "linear" },
        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <svg fill="currentColor" viewBox="0 0 512 512">
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L256 448l-120-117.3c-25.1-34.4-40-76.8-40-122.7 0-66.2 53.8-120 120-120s120 53.8 120 120z"
          opacity="0.4"
        />
        <path d="M256 336c25.1 0 47.3-6.9 65.7-18.3-18.4 11.4-40.6 18.3-65.7 18.3s-47.3-6.9-65.7-18.3c18.4 11.4 40.6 18.3 65.7 18.3z" />
      </svg>
    </motion.div>

    <motion.div
      className="absolute bottom-32 right-1/4 w-20 h-20 text-indigo-500/5 dark:text-indigo-200/5"
      animate={{ y: [0, -30, 0] }}
      transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
    >
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 11V3h8v8H4zm2-6v4h4V5H6zM4 21v-8h8v8H4zm2-6v4h4v-4H6zm10 6v-8h8v8h-8zm2-6v4h4v-4h-4zm3-13h-8v8h8V3zm-2 6h-4V5h4v4z" />
      </svg>
    </motion.div>
  </>
);
