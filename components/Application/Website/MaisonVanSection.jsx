"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import banner4 from "@/public/assets/images/banner4.png";

const MaisonVanSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

        {/* TEXT FIRST (LEFT) */}
        <div className="bg-[#faf8f5] rounded-2xl p-5 sm:p-6 lg:p-10">

          <h3 className="text-[20px] lg:text-[24px] font-light tracking-wide text-[#3a2e1f] mb-2">
            MAISON VAN
          </h3>

          <h4 className="italic text-[15px] lg:text-[17px] text-[#6b5c49] mb-5">
            Beige &amp; Crème Embroidered Table Linen Collection
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
                  Rooted in timeless elegance and thoughtful craftsmanship, Maison Van reflects the essence of refined living. Crafted in soft beige tones and elevated with delicate crème embroidery, this collection embodies warmth, harmony, and understated luxury—designed for homes that value beauty in every detail.
                </p>

                <p>
                  Each runner, placemat, and napkin in the Maison Van collection is adorned with graceful embroidery that blends seamlessly into the fabric, creating a tone-on-tone effect that feels subtle yet distinctive. The gentle contrast of beige and crème adds depth while preserving a calm, cohesive aesthetic that never overwhelms the table.
                </p>

                <p>
                  Designed to transition effortlessly from everyday dining to special occasions, Maison Van pairs beautifully with natural ceramics, muted metallics, and organic textures. Its neutral palette makes it a versatile choice for modern interiors, boutique hospitality, and elegant entertaining.
                </p>
<p></p>
                <p>
                    Timeless, refined, and deeply inviting, Maison Van is more than a table linen collection—it is a reflection of considered living, where craftsmanship, comfort, and enduring style come together to create tables that feel effortlessly elegant.
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

        {/* IMAGE SECOND (RIGHT) */}
        <div className="border rounded-xl overflow-hidden">
          <Link href="">
            <Image
              src={banner4}
              alt="Maison Van"
              className="transition-all hover:scale-110"
            />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default MaisonVanSection;