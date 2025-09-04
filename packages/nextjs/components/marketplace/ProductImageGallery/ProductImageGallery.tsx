"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
  enableZoom?: boolean;
  showThumbnails?: boolean;
}

export const ProductImageGallery = ({
  images = [],
  productName,
  className = "",
  enableZoom = true,
  showThumbnails = true,
}: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const fallbackImage = "/api/placeholder/400/400";
  const displayImages = images.length > 0 ? images : [fallbackImage];

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const handlePrevious = useCallback(() => {
    setSelectedIndex(prev => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableZoom || !isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isZoomed) return;

      if (e.key === "Escape") {
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    },
    [isZoomed, handlePrevious, handleNext],
  );

  useEffect(() => {
    if (isZoomed) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isZoomed, handleKeyDown]);

  return (
    <>
      <div className={`relative ${className}`}>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-base-200 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full cursor-pointer"
              onMouseMove={handleMouseMove}
              onClick={() => enableZoom && setIsZoomed(true)}
            >
              <Image
                src={displayImages[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                fill
                className={`object-cover transition-transform duration-300 ${
                  enableZoom ? "group-hover:scale-105" : ""
                }`}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-base-200">
                  <PhotoIcon className="w-16 h-16 text-base-content/50" />
                </div>
              )}

              {enableZoom && !isLoading && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/50 text-white p-2 rounded-full">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </>
          )}

          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {displayImages.length}
            </div>
          )}
        </div>

        {showThumbnails && displayImages.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === selectedIndex ? "border-primary shadow-lg" : "border-transparent hover:border-base-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-square max-h-[80vh] overflow-hidden rounded-lg">
                <Image
                  src={displayImages[selectedIndex]}
                  alt={`${productName} - Zoomed Image ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                  sizes="80vh"
                />
              </div>

              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                aria-label="Close zoom"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </>
              )}

              {displayImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                  {selectedIndex + 1} / {displayImages.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
