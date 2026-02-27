"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import banner1 from "@/public/assets/images/banner1.png";

const ButterflySection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

        {/* TEXT */}
        <div className="bg-[#faf8f5] rounded-2xl p-5 sm:p-6 lg:p-10">

          <h3 className="text-[20px] lg:text-[24px] font-light tracking-wide text-[#3a2e1f] mb-2">
            Butterfly Bloom
          </h3>

          <h4 className="italic text-[15px] lg:text-[17px] text-[#6b5c49] mb-5">
            Table Mat &amp; Coaster Set
          </h4>

          <div className="h-[1px] w-12 bg-[#d8cfc2] mb-6" />

          {/* COLLAPSIBLE WRAPPER */}
          <div className="relative">

            <div
              className={`transition-all duration-500 ease-in-out ${
                expanded ? "max-h-[2000px]" : "max-h-[300px] overflow-hidden"
              }`}
            >
              <div className="space-y-5 text-[14px] leading-[1.8] text-[#6b5c49]">

                <p>
                  Delicate, graceful, and quietly luxurious, the Butterfly Bloom
                  table mat and coaster set is designed to transform everyday
                  dining into an artful experience. Hand-embellished with
                  shimmering sequins and intricate beadwork, each butterfly
                  rests gently along a beautifully structured silhouette.
                </p>

                <p>
                  The soft blush and ivory palette brings warmth and elegance,
                  while the subtle sparkle adds refined festive charm—perfect
                  for intimate gatherings and elevated everyday settings.
                </p>

                <p>
                  Crafted with meticulous attention to detail, this set reflects
                  timeless craftsmanship and modern luxury—where every meal
                  feels thoughtfully curated.
                </p>

                <div className="pt-2 space-y-2 text-[13px] leading-[1.9]">
                  <p className="font-medium text-[#3a2e1f]">Ideal for:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Elegant dining tables</li>
                    <li>Festive and special occasions</li>
                    <li>Luxury gifting</li>
                    <li>Boutique and export collections</li>
                  </ul>
                </div>

                <p>
                  Bring home a story of softness, craftsmanship, and understated
                  glamour—where butterflies bloom and tables come alive.
                </p>

              </div>
            </div>

            {/* FADE EFFECT */}
            {!expanded && (
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#faf8f5] to-transparent" />
            )}

          </div>

          {/* SINGLE BUTTON */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="
              inline-block mt-6 group
              text-[11px] uppercase tracking-[0.25em]
              text-[#630e19]
              relative after:absolute after:left-0 after:-bottom-1
              after:h-[1px] after:w-0 after:bg-[#630e19]
              after:transition-all after:duration-300
              hover:after:w-full
            "
          >
            {expanded ? "Read Less" : "Read More"}
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>

        {/* IMAGE */}
        <div className="border rounded-xl overflow-hidden">
          <Link href="">
            <Image
              src={banner1}
              alt="banner 1"
              className="transition-all hover:scale-110"
            />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ButterflySection;