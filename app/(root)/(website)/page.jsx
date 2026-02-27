import MainSlider from '@/components/Application/Website/MainSlider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import banner1 from '@/public/assets/images/banner1.png'
import banner2 from '@/public/assets/images/banner2.png'
import banner3 from '@/public/assets/images/banner3.png'
import banner4 from '@/public/assets/images/banner4.png'
import picturea from '@/public/assets/images/picturea.png'

import FeaturedProduct from '@/components/Application/Website/FeaturedProduct'
import advertisingBanner from '@/public/assets/images/advertising-banner.png'
import Testimonial from '@/components/Application/Website/Testimonial'

import { GiReturnArrow } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbRosetteDiscountFilled } from "react-icons/tb";
import { Suspense } from "react";
import FeaturedSkeleton from "@/components/Application/Website/FeaturedSkeleton";
import IvorySection from "@/components/Application/Website/IvorySection";
import ButterflySection from '@/components/Application/Website/ButterflySection';
import PetiteFleurSection from '../../../components/Application/Website/PetiteFleurSection';
import MaisonVanSection from '../../../components/Application/Website/MaisonVanSection'

const Home = () => {
  return (
    <>
      <section>
        <MainSlider />
        <IvorySection/>
        <ButterflySection/>
        <PetiteFleurSection/>
        <MaisonVanSection/>

      </section>
      





      <Suspense fallback={<FeaturedSkeleton />}>
  <FeaturedProduct />
</Suspense>

{/* <section className="py-10 sm:py-16 flex justify-center">
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
</section> */}


      <Testimonial />

     <section className="border-t py-8">
  <div className="max-w-6xl mx-auto px-4 lg:px-32">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">

      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center mb-4">
          <FaShippingFast size={30} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Shipping</h3>
        <p className="text-sm text-gray-600">
          Premium shipping.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center mb-4">
          <BiSupport size={30} />
        </div>
        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
        <p className="text-sm text-gray-600">
          24/7 support, always here for you.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center mb-4">
          <TbRosetteDiscountFilled size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Member Discounts</h3>
        <p className="text-sm text-gray-600">
          Special offers for our loyal customers.
        </p>
      </div>

    </div>

  </div>
</section>
    </>
  );
};

export default Home;
