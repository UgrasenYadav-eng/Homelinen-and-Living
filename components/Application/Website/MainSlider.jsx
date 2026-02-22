
'use client';

import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";


// ---------- ARROWS ----------

const ArrowNext = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="w-14 h-14 flex justify-center items-center rounded-full absolute z-20 top-1/2 -translate-y-1/2 right-10 bg-white/80 backdrop-blur-md shadow-xl hover:bg-white transition"
  >
    <LuChevronRight size={24} className="text-neutral-700" />
  </button>
);

const ArrowPrev = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="w-14 h-14 flex justify-center items-center rounded-full absolute z-20 top-1/2 -translate-y-1/2 left-10 bg-white/80 backdrop-blur-md shadow-xl hover:bg-white transition"
  >
    <LuChevronLeft size={24} className="text-neutral-700" />
  </button>
);


// ---------- MAIN SLIDER ----------

const MainSlider = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await fetch('/api/slider/get');
        const data = await res.json();

        if (data?.success && Array.isArray(data?.data?.data)) {
          setImages(data.data.data);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error(error);
        setImages([]);
      }
    };

    fetchSliders();
  }, []);


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
  };

  return (
    <section className="w-full overflow-hidden mb-64">
      <Slider {...settings}>

        {(Array.isArray(images) ? images : []).map((item, index) => {

          // ✅ Optimize Cloudinary URL (prevents timeout)
          const optimizedUrl = item?.secure_url?.replace(
            "/upload/",
            "/upload/f_auto,q_auto,w_1600/"
          );

          return (
            <div
              key={index}
              className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh]"
            >
              <Image
              src={item.secure_url.replace(
                "/upload/",
                "/upload/f_auto,q_auto,w_1600/"
              )}
              alt={`slider-${index}`}
             fill
             priority={index === 0}
             sizes="100vw"
             className="object-cover object-center"
             unoptimized   // ✅ THIS STOPS THE TIMEOUT
            />
              {/* <Image
                src={optimizedUrl || item?.secure_url}
                alt={`slider-${index}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
                unoptimized   // ✅ Prevent 504 timeout completely
              /> */}
              <div className="absolute inset-0 bg-black/5" />
            </div>
          );
        })}

      </Slider>
    </section>
  );
};

export default MainSlider;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import Image from 'next/image';
// import { LuChevronRight, LuChevronLeft } from "react-icons/lu";


// // ---------- ARROWS ----------

// const ArrowNext = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     type="button"
//     className="w-14 h-14 flex justify-center items-center rounded-full absolute z-20 top-1/2 -translate-y-1/2 right-10 bg-white/80 backdrop-blur-md shadow-xl hover:bg-white transition"
//   >
//     <LuChevronRight size={24} className="text-neutral-700" />
//   </button>
// );

// const ArrowPrev = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     type="button"
//     className="w-14 h-14 flex justify-center items-center rounded-full absolute z-20 top-1/2 -translate-y-1/2 left-10 bg-white/80 backdrop-blur-md shadow-xl hover:bg-white transition"
//   >
//     <LuChevronLeft size={24} className="text-neutral-700" />
//   </button>
// );


// // ---------- MAIN SLIDER ----------

// const MainSlider = () => {

//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchSliders = async () => {
//       try {
//         const res = await fetch('/api/slider/get');
//         const data = await res.json();

//         if (data.success) {
//         setImages(data.data.data || []);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchSliders();
//   }, []);


//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 700,
//     autoplay: true,
//     autoplaySpeed: 5200,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <ArrowNext />,
//     prevArrow: <ArrowPrev />,
//     pauseOnHover: false,
//   };

//   return (
//     <section className="w-full overflow-hidden mb-64">
//       <Slider {...settings}>

//         {images.map((item, index) => (
//           <div
//             key={index}
//             className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh]"
//           >
//             <Image
//               src={item.secure_url}
//               alt={`slider-${index}`}
//               fill
//               priority={index === 0}
//               className="object-cover object-center"
//             />
//             <div className="absolute inset-0 bg-black/5" />
//           </div>
//         ))}

//       </Slider>
//     </section>
//   );
// };

// export default MainSlider;


