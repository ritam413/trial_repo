"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface SkiperImage {
  src: string;
  alt: string;
  code: string;
}

const HoverExpand_002 = ({
  images,
  className,
}: {
  images: SkiperImage[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full flex-col items-center justify-center gap-1.5 sm:gap-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative w-full max-w-2xl cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10"
              initial={{ height: "2.5rem" }}
              animate={{
                height: activeImage === index ? "22rem" : "3rem",
              }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-end justify-end px-4 pb-4"
                  >
                    <p className="text-left text-xs font-mono font-bold text-white/70">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_002 };

export const Skiper53 = () => {
  const sampleImages: SkiperImage[] = [
    { src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80", alt: "Theatre", code: "# 01" },
    { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80", alt: "Concert", code: "# 02" },
    { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80", alt: "Risograph", code: "# 03" },
    { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80", alt: "Symphony", code: "# 04" },
    { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80", alt: "Dance", code: "# 05" },
    { src: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80", alt: "Dramatics", code: "# 06" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black/50 p-4">
      <HoverExpand_002 images={sampleImages} />
    </div>
  );
};

