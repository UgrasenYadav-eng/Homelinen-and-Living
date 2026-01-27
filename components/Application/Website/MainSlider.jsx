'use client';

import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';

import slider1 from '@/public/assets/images/slider-1.png';
import slider2 from '@/public/assets/images/slider-2.png';
import slider3 from '@/public/assets/images/slider-3.png';
import slider4 from '@/public/assets/images/slider-4.png';

import { LuChevronRight, LuChevronLeft } from "react-icons/lu";


// ---------- ARROWS ----------

const ArrowNext = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="
      w-14 h-14
      flex justify-center items-center
      rounded-full
      absolute z-20
      top-1/2 -translate-y-1/2
      right-10
      bg-white/80
      backdrop-blur-md
      shadow-xl
      hover:bg-white
      transition
    "
  >
    <LuChevronRight size={24} className="text-neutral-700" />
  </button>
);

const ArrowPrev = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="
      w-14 h-14
      flex justify-center items-center
      rounded-full
      absolute z-20
      top-1/2 -translate-y-1/2
      left-10
      bg-white/80
      backdrop-blur-md
      shadow-xl
      hover:bg-white
      transition
    "
  >
    <LuChevronLeft size={24} className="text-neutral-700" />
  </button>
);


// ---------- MAIN SLIDER ----------

const MainSlider = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 5200,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    pauseOnHover: false,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        }
      }
    ]
  };

  return (
    <section className="w-full overflow-hidden mb-64">

      <Slider {...settings}>

        {[slider1, slider2, slider3, slider4].map((img, index) => (

          <div
            key={index}
            className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh]"
          >
            <Image
              src={img}
              alt={`slider-${index}`}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />

            {/* subtle luxury overlay */}
            <div className="absolute inset-0 bg-black/5" />

          </div>

        ))}

      </Slider>

    </section>
  );
};

export default MainSlider;


// 'use client'
// import React from 'react'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

// import slider1 from '@/public/assets/images/slider-1.png'
// import slider2 from '@/public/assets/images/slider-2.png'
// import slider3 from '@/public/assets/images/slider-3.png'
// import slider4 from '@/public/assets/images/slider-4.png'
// import Image from 'next/image';
// import { LuChevronRight } from "react-icons/lu";
// import { LuChevronLeft } from "react-icons/lu";


// const ArrowNext = (props) => {
//     const { onClick } = props
//     return (
//         <button onClick={onClick} type='button' className='w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white right-10' >
//             <LuChevronRight size={25} className='text-gray-600' />
//         </button>
//     )
// }
// const ArrowPrev = (props) => {
//     const { onClick } = props
//     return (
//         <button onClick={onClick} type='button' className='w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white left-10' >
//             <LuChevronLeft size={25} className='text-gray-600' />
//         </button>
//     )
// }

// const MainSlider = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         autoplay: true,
//         nextArrow: <ArrowNext />,
//         prevArrow: <ArrowPrev />,

//         responsive: [
//             {
//                 breakpoint: 480,
//                 settings: {
//                     dots: false,
//                     arrow: false,
//                     nextArrow: '',
//                     prevArrow: ''
//                 }
//             }
//         ]
//     }
//     return (
//         <div>
//             <Slider {...settings}>
//                 <div>
//                     <Image src={slider1.src} width={slider1.width} height={slider1.height} alt='slider 1' />
//                 </div>
//                 <div>
//                     <Image src={slider2.src} width={slider2.width} height={slider2.height} alt='slider 2' />
//                 </div>
//                 <div>
//                     <Image src={slider3.src} width={slider3.width} height={slider3.height} alt='slider 3' />
//                 </div>
//                 <div>
//                     <Image src={slider4.src} width={slider4.width} height={slider4.height} alt='slider 4' />
//                 </div>
//             </Slider>
//         </div>
//     )
// }

// export default MainSlider