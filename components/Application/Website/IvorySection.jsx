"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import picturea from "@/public/assets/images/picturea.png";

const IvorySection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

        {/* IMAGE */}
        <div className="border rounded-xl overflow-hidden">
          <Link href="">
            <Image
              src={picturea}
              alt="picturea"
              className="transition-all hover:scale-110"
            />
          </Link>
        </div>

        {/* TEXT */}
        <div className="bg-[#faf8f5] rounded-2xl p-5 sm:p-6 lg:p-10">

          <h3 className="text-[20px] lg:text-[24px] font-light tracking-wide text-[#3a2e1f] mb-2">
            IVORY BLOOM
          </h3>

          <h4 className="italic text-[15px] lg:text-[17px] text-[#6b5c49] mb-5">
            Embroidered Table Linen Collection
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
                 Pure, serene, and effortlessly elegant, Ivory Bloom is inspired by the quiet beauty of flowers in full bloom against a soft, neutral canvas. This collection celebrates refinement in its most timeless form—where ivory tones meet delicate embroidery to create table linens that feel graceful, balanced, and enduring.
                </p>

                <p>
                  Each piece in the Ivory Bloom collection—runners, placemats,
                  and napkins—is adorned with finely embroidered floral motifs,
                  thoughtfully placed to enhance the natural elegance of the fabric.
                </p>

                <p>
                    Each piece in the Ivory Bloom collection—runners, placemats, and napkins—is adorned with finely embroidered floral motifs, thoughtfully placed to enhance the natural elegance of the fabric. The subtle play of texture and thread adds depth without excess, allowing the craftsmanship to speak softly yet confidently.
                </p>

                <p>
                 Designed for those who appreciate understated luxury, Ivory Bloom brings harmony to the table. The versatile ivory palette pairs seamlessly with classic porcelain, warm metallic accents, and natural elements, making it ideal for both formal dining and elevated everyday use.
                 </p>

                 <p>
                 Whether styled for intimate dinners, refined hospitality settings, or thoughtfully curated homes, Ivory Bloom embodies calm sophistication and lasting beauty—crafted to transcend trends and remain eternally graceful.
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

      </div>
    </section>
  );
};

export default IvorySection;