import MainSlider from '@/components/Application/Website/MainSlider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import banner1 from '@/public/assets/images/banner1.png'
import banner2 from '@/public/assets/images/banner2.png'
import banner3 from '@/public/assets/images/banner3.png'
import banner4 from '@/public/assets/images/banner4.png'
import FeaturedProduct from '@/components/Application/Website/FeaturedProduct'
import advertisingBanner from '@/public/assets/images/advertising-banner.png'
import Testimonial from '@/components/Application/Website/Testimonial'

import { GiReturnArrow } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbRosetteDiscountFilled } from "react-icons/tb";
import { Suspense } from "react";
import FeaturedSkeleton from "@/components/Application/Website/FeaturedSkeleton";

const Home = () => {
  return (
    <>
      <section>
        <MainSlider />
      </section>

      {/* FIRST GRID SECTION */}
      <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
        <div className="grid grid-cols-2 sm:gap-10 gap-2">

          <div className="border rounded-lg overflow-hidden">
            <Link href="">
              <Image
                src={banner1.src}
                width={banner1.width}
                height={banner1.height}
                alt="banner 1"
                className="transition-all hover:scale-110"
              />
            </Link>
          </div>

          {/* TEXT FIRST (LEFT) */}
<div className="bg-[#faf8f5] rounded-2xl p-8 lg:p-10">

  <h3
    className="
      text-[20px] lg:text-[24px]
      font-light
      tracking-wide
      text-[#3a2e1f]
      mb-2
    "
  >
    Butterfly Bloom
  </h3>

  <h4 className="italic text-[15px] lg:text-[17px] text-[#6b5c49] mb-5">
    Table Mat &amp; Coaster Set
  </h4>

  <div className="h-[1px] w-12 bg-[#d8cfc2] mb-6" />

  <div className="space-y-5 max-h-[320px] overflow-hidden relative">


    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Delicate, graceful, and quietly luxurious, the Butterfly Bloom table mat
      and coaster set is designed to transform everyday dining into an artful
      experience. Hand-embellished with shimmering sequins and intricate
      beadwork, each butterfly rests gently along a beautifully structured
      silhouette, creating a sense of movement and light on the table.
    </p>

    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      The soft blush and ivory palette brings warmth and elegance, while the
      subtle sparkle adds a refined festive charm—perfect for intimate
      gatherings, celebratory tables, or elevated everyday settings.
      Thoughtfully paired with a matching coaster, the set offers a harmonious
      balance of beauty and function, protecting surfaces while enhancing your
      table styling.
    </p>

    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Crafted with meticulous attention to detail, this set reflects timeless
      craftsmanship and modern luxury—where every meal feels thoughtfully
      curated.
    </p>

    <div className="pt-2 space-y-2 text-[13px] leading-[1.9] text-[#6b5c49]">

      <p className="font-medium text-[#3a2e1f]">Ideal for:</p>

      <ul className="list-disc pl-5 space-y-1">
        <li>Elegant dining tables</li>
        <li>Festive and special occasions</li>
        <li>Luxury gifting</li>
        <li>Boutique and export collections</li>
      </ul>

    </div>
        
    {/* READ MORE LINK */}
    {/* READ MORE LINK */}
<Link
  href="/shop"
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
  Read More
  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>    

  </div>
</div>


        </div>
      </section>


      {/* FIRST GRID SECTION */}
<section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
  <div className="grid grid-cols-2 sm:gap-10 gap-2">

    {/* TEXT FIRST (LEFT) */}
    <div className="bg-[#faf8f5] rounded-2xl p-8 lg:p-10">

      <h3
        className="
          text-[20px] lg:text-[24px]
          font-light
          tracking-wide
          text-[#3a2e1f]
          mb-5
        "
      >
        Embroidered Table Linen Collection
      </h3>

      <div className="h-[1px] w-12 bg-[#d8cfc2] mb-6" />

      <div className="space-y-5 max-h-[320px] overflow-hidden relative">


        <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
          Pure, serene, and effortlessly elegant, Ivory Bloom is inspired by the
          quiet beauty of flowers in full bloom against a soft, neutral canvas.
          This collection celebrates refinement in its most timeless form—where
          ivory tones meet delicate embroidery to create table linens that feel
          graceful, balanced, and enduring.
        </p>

        <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
          Each piece in the Ivory Bloom collection—runners, placemats, and
          napkins—is adorned with finely embroidered floral motifs, thoughtfully
          placed to enhance the natural elegance of the fabric. The subtle play
          of texture and thread adds depth without excess, allowing the
          craftsmanship to speak softly yet confidently.
        </p>

        <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
          Designed for those who appreciate understated luxury, Ivory Bloom
          brings harmony to the table. The versatile ivory palette pairs
          seamlessly with classic porcelain, warm metallic accents, and natural
          elements, making it ideal for both formal dining and elevated everyday
          use.
        </p>

        <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
          Whether styled for intimate dinners, refined hospitality settings, or
          thoughtfully curated homes, Ivory Bloom embodies calm sophistication
          and lasting beauty—crafted to transcend trends and remain eternally
          graceful.
        </p>

      </div>
      {/* READ MORE LINK */}
   <Link
  href="/shop"
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
  Read More
  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>


    </div>

    {/* IMAGE SECOND (RIGHT) */}
    <div className="border rounded-lg overflow-hidden">
      <Link href="">
        <Image
          src={banner2.src}
          width={banner2.width}
          height={banner2.height}
          alt="banner 2"
          className="transition-all hover:scale-110"
        />
      </Link>
    </div>

  </div>
</section>

<section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
        <div className="grid grid-cols-2 sm:gap-10 gap-2">

          <div className="border rounded-lg overflow-hidden">
            <Link href="">
              <Image
                src={banner3.src}
                width={banner3.width}
                height={banner3.height}
                alt="banner "
                className="transition-all hover:scale-110"
              />
            </Link>
          </div>

         <div className="bg-[#faf8f5] rounded-2xl p-8 lg:p-10">

  <span className="block text-[10px] tracking-[0.35em] uppercase text-[#9c8b73] mb-3">
    Signature Collection
  </span>

  <h3
    className="
      text-[24px] lg:text-[30px]
      font-light
      tracking-wide
      text-[#3a2e1f]
      mb-2
    "
  >
    PETITE FLEUR
  </h3>

  <h4 className="italic text-[15px] lg:text-[17px] text-[#6b5c49] mb-5">
    Beige Embroidered Table Linen Collection
  </h4>

  <div className="h-[1px] w-12 bg-[#d8cfc2] mb-6" />

  <div className="space-y-5 max-h-[320px] overflow-hidden relative">


    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Delicate, graceful, and quietly refined, Petite Fleur draws inspiration
      from small florals in gentle bloom. Set against a warm beige canvas, this
      collection brings a sense of natural elegance to the table—subtle enough
      for everyday beauty, yet special enough for meaningful occasions.
    </p>

    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Each piece in the Petite Fleur collection—runners, placemats, and
      napkins—is adorned with fine embroidery that reflects the charm of tiny
      blossoms and handcrafted detail. The soft beige base enhances the
      embroidery without overpowering it, creating a balanced look that feels
      light, inviting, and timeless.
    </p>

    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Designed to complement both modern and classic interiors, Petite Fleur
      pairs effortlessly with neutral tableware, natural textures, and soft
      metallic accents. Its versatile palette makes it ideal for brunches,
      intimate dinners, boutique hospitality settings, and refined gifting.
    </p>

    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Understated yet expressive, Petite Fleur celebrates the beauty of small
      details—where craftsmanship, comfort, and elegance come together to
      create a table setting that feels warm, graceful, and enduring.
    </p>

  </div>
  {/* READ MORE LINK */}
    <Link
  href="/shop"
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
  Read More
  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>


</div>


        </div>
      </section>

      {/* FIRST GRID SECTION */}
<section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
  <div className="grid grid-cols-2 sm:gap-10 gap-2">

{/* TEXT FIRST (LEFT) */}
<div className="bg-[#faf8f5] rounded-2xl p-8 lg:p-10">

  <h3
    className="
      text-[20px] lg:text-[24px]
      font-light
      tracking-wide
      text-[#3a2e1f]
      mb-2
    "
  >
    MAISON VAN
  </h3>

  <h4 className="italic text-[15px] lg:text-[17px] text-[#6b5c49] mb-5">
    Beige &amp; Crème Embroidered Table Linen Collection
  </h4>

  <div className="h-[1px] w-12 bg-[#d8cfc2] mb-6" />

  <div className="space-y-5 max-h-[320px] overflow-hidden relative">


    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Rooted in timeless elegance and thoughtful craftsmanship, Maison Van
      reflects the essence of refined living. Crafted in soft beige tones and
      elevated with delicate crème embroidery, this collection embodies
      warmth, harmony, and understated luxury—designed for homes that value
      beauty in every detail.
    </p>

    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Each runner, placemat, and napkin in the Maison Van collection is adorned
      with graceful embroidery that blends seamlessly into the fabric,
      creating a tone-on-tone effect that feels subtle yet distinctive. The
      gentle contrast of beige and crème adds depth while preserving a calm,
      cohesive aesthetic that never overwhelms the table.
    </p>

    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Designed to transition effortlessly from everyday dining to special
      occasions, Maison Van pairs beautifully with natural ceramics, muted
      metallics, and organic textures. Its neutral palette makes it a
      versatile choice for modern interiors, boutique hospitality, and
      elegant entertaining.
    </p>

    <p className="text-[14px] leading-[1.8] text-[#6b5c49] line-clamp-3">
      Timeless, refined, and deeply inviting, Maison Van is more than a table
      linen collection—it is a reflection of considered living, where
      craftsmanship, comfort, and enduring style come together to create
      tables that feel effortlessly elegant.
    </p>

  </div>
  {/* READ MORE LINK */}
    <Link
  href="/shop"
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
  Read More
  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>


</div>


    {/* IMAGE SECOND (RIGHT) */}
    <div className="border rounded-lg overflow-hidden">
      <Link href="">
        <Image
          src={banner4.src}
          width={banner4.width}
          height={banner4.height}
          alt="banner 4"
          className="transition-all hover:scale-110"
        />
      </Link>
    </div>

  </div>
</section>


      <Suspense fallback={<FeaturedSkeleton />}>
  <FeaturedProduct />
</Suspense>

<section className="sm:pt-16 pt-6 pb-10 flex justify-center">
  <div className="max-w-[1100px] w-full px-4">

    <div className="
      rounded-2xl
      overflow-hidden
      shadow-[0_20px_45px_rgba(0,0,0,0.12)]
      hover:scale-[1.01]
      transition-transform duration-500
    ">
      <Image
        src={advertisingBanner.src}
        height={advertisingBanner.height}
        width={advertisingBanner.width}
        alt="Advertisement"
        className="w-full h-auto object-cover"
        priority
      />
    </div>

  </div>
</section>


      <Testimonial />

      <section className="lg:px-32 px-4 border-t py-10">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">

          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <GiReturnArrow size={30} />
            </p>
            <h3 className="text-xl font-semibold">7-Days Returns</h3>
            <p>Risk-free shopping with easy returns.</p>
          </div>

          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <FaShippingFast size={30} />
            </p>
            <h3 className="text-xl font-semibold">Free Shipping</h3>
            <p>No extra costs, just the price you see.</p>
          </div>

          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <BiSupport size={30} />
            </p>
            <h3 className="text-xl font-semibold">24/7 Support</h3>
            <p>24/7 support, alway here just for you.</p>
          </div>

          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <TbRosetteDiscountFilled size={20} />
            </p>
            <h3 className="text-xl font-semibold">Member Discounts</h3>
            <p>Special offers for our loyal customers.</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
