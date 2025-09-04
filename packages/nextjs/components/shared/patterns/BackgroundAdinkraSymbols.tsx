import { motion } from "framer-motion";

export const BackgroundAdinkraSymbols = () => (
  <>
    <motion.div
      className="absolute top-20 left-10 w-16 h-16 text-indigo-500/5 dark:text-indigo-200/5"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.41-11.59L12 10.83l1.41-1.42L15.54 12l-1.41 1.41L12 11.17l-1.41 1.42L8.46 12l1.41-1.41z" />
      </svg>
    </motion.div>

    <motion.div
      className="absolute bottom-32 right-16 w-12 h-12 text-indigo-500/5 dark:text-indigo-200/5"
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9.5 16.5l7-4.5-7-4.5v9z" />
      </svg>
    </motion.div>
  </>
);
