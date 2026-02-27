"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import banner3 from "@/public/assets/images/banner3.png";

const PetiteFleurSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

        {/* IMAGE */}
        <div className="border rounded-xl overflow-hidden">
          <Link href="">
            <Image
              src={banner3}
              alt="Petite Fleur"
              className="transition-all hover:scale-110"
            />
          </Link>
        </div>

        {/* TEXT */}
        <div className="bg-[#faf8f5] rounded-2xl p-5 sm:p-6 lg:p-10">

          <h3 className="text-[24px] lg:text-[30px] font-light tracking-wide text-[#3a2e1f] mb-2">
            PETITE FLEUR
          </h3>

          <h4 className="italic text-[15px] lg:text-[17px] text-[#6b5c49] mb-5">
            Beige Embroidered Table Linen Collection
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
                    Delicate, graceful, and quietly refined, Petite Fleur draws inspiration from small florals in gentle bloom. Set against a warm beige canvas, this collection brings a sense of natural elegance to the table—subtle enough for everyday beauty, yet special enough for meaningful occasions.
                </p>

                <p>
                    Each piece in the Petite Fleur collection—runners, placemats, and napkins—is adorned with fine embroidery that reflects the charm of tiny blossoms and handcrafted detail. The soft beige base enhances the embroidery without overpowering it, creating a balanced look that feels light, inviting, and timeless.
                </p>

                <p>
                    Designed to complement both modern and classic interiors, Petite Fleur pairs effortlessly with neutral tableware, natural textures, and soft metallic accents. Its versatile palette makes it ideal for brunches, intimate dinners, boutique hospitality settings, and refined gifting.
                </p>

                <p>
                    Understated yet expressive, Petite Fleur celebrates the beauty of small details—where craftsmanship, comfort, and elegance come together to create a table setting that feels warm, graceful, and enduring.
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

export default PetiteFleurSection;