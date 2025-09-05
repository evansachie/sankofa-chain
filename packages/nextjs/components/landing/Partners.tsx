"use client";

import Image from "next/image";

const partnerLogos: { src: string; alt: string }[] = [
  { src: "/partner1.svg", alt: "Partner 1" },
  { src: "/partner2.svg", alt: "Partner 2" },
  { src: "/partner3.svg", alt: "Partner 3" },
  { src: "/partner4.svg", alt: "Partner 4" },
  { src: "/partner5.svg", alt: "Partner 5" },
  { src: "/partner6.svg", alt: "Partner 6" },
];

const Partners = () => {
  return (
    <section className="py-12 bg-base-100 border-t border-base-content/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content section-title-zd">Our Partners</h2>
          <p className="text-base-content/60 mt-2">Trusted by organizations supporting African creators</p>
        </div>

        <div className="grid grid-cols-3 gap-8 items-center">
          {partnerLogos.map((logo, idx) => (
            <div key={idx} className="relative w-full h-20 sm:h-24 md:h-28 flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 200px"
                className="object-contain opacity-80 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
export { Partners };
