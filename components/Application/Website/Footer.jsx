'use client'

import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="w-full bg-[#f7f3ee] text-[#5a4637] mt-auto">

      {/* MAIN GRID */}
      <div className="max-w-[1650px] mx-auto px-14 py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">

        {/* BRAND LINKS */}
        <div>
          <h4 className="uppercase tracking-[0.25em] text-xs font-semibold mb-18">
            The Brand
          </h4>

          <ul className="space-y-4 text-sm">
            {[
              ['About Us', '/about-us'],
              ['Shipping & Payment', '/shipping'],
              ['Returns & Exchanges', '/returns'],
              ['Terms of Use', '/terms-and-conditions'],
              ['Privacy Policy', '/privacy-policy'],
              ['Contact Us', '/contact-us'],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-black transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ADDRESS */}
        <div className="text-sm leading-relaxed max-w-md">
          <h4 className="uppercase tracking-[0.25em] text-xs font-semibold mb-8">
            Reach Us At
          </h4>

          <p>
            <strong>Registered Address:</strong> Gurugram, Haryana
          </p>

          <p className="mt-5">
            <strong>Corporate Office:</strong> 826, Phase V, Udyog Vihar,
            Sector- 19, Gurugram, Haryana 122016
          </p>

          <p className="mt-5">
            <strong>Working Hours:</strong> 10 AM – 6 PM IST
          </p>

          <p className="mt-6">
            📞 +91 9810436648  
            <br />
            ✉️ hello@homelinenandliving
          </p>
        </div>

        {/* CONNECT */}
        <div>
          <h4 className="uppercase tracking-[0.25em] text-xs font-semibold mb-8">
            Connect
          </h4>
<div className="flex gap-6 text-lg mb-10">

  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <FaFacebookF className="cursor-pointer hover:text-black transition-colors" />
  </a>

  <a
    href="https://www.instagram.com/homelinenandliving?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <FaInstagram className="cursor-pointer hover:text-black transition-colors" />
  </a>

  <a
    href="https://www.linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <FaLinkedinIn className="cursor-pointer hover:text-black transition-colors" />
  </a>

</div>


          <h4 className="uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Stores
          </h4>
          <p className="text-sm">
  Show us your look with{' '}
  <a
    href="https://www.instagram.com/homelinenandliving"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-black"
  >
    #homelinenandliving
  </a>
</p>

{/* 
          <p className="text-sm">
            Show us your look with #homelinenandliving
          </p> */}
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="uppercase tracking-[0.25em] text-xs font-semibold mb-10">
            Join Our Mailing List
          </h4>

          <p className="text-sm mb-8">
            A selection curated with Homeline & Linen’s signature
            flair, delivered to your inbox.
          </p>

          <input
            type="email"
            placeholder="E-mail"
            className="
              w-full
              border border-neutral-300
              px-5 py-3.5
              mb-4
              bg-transparent
              focus:outline-none
              focus:border-neutral-500
            "
          />

          <button className="
            w-full
            bg-[#5a4637]
            hover:bg-black
            text-white
            py-3.5
            tracking-[0.2em]
            text-xs
            transition-colors
          ">
            SUBSCRIBE
          </button>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-neutral-300 py-3 text-center text-[11px] tracking-[0.3em] uppercase">
        © {new Date().getFullYear()} Homelinen and Living
      </div>

    </footer>
  )
}



// 'use client'

// import {
//   USER_DASHBOARD,
//   WEBSITE_HOME,
//   WEBSITE_LOGIN,
//   WEBSITE_SHOP,
// } from '@/routes/WebsiteRoute'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { IoIosSearch } from 'react-icons/io'
// import Cart from './Cart'
// import { VscAccount } from 'react-icons/vsc'
// import { useSelector } from 'react-redux'
// import { Avatar, AvatarImage } from '@/components/ui/avatar'
// import userIcon from '@/public/assets/images/user.png'
// import { IoMdClose } from 'react-icons/io'
// import { HiMiniBars3 } from 'react-icons/hi2'
// import Search from './Search'

// const Header = () => {
//   const auth = useSelector(store => store.authStore.auth)

//   const [isMobileMenu, setIsMobileMenu] = useState(false)
//   const [showSearch, setShowSearch] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 180)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   const isTransparent = !scrolled

//   return (
// <header
//   className={`fixed top-0 left-0 w-full z-[60]
//   transition-all duration-700 ease-out
//   translate-y-0 opacity-100
//   ${
//     scrolled
//       ? `
//         bg-neutral-900/10
//         backdrop-blur-[26px]
//         saturate-200
//         shadow-[0_30px_90px_rgba(0,0,0,0.12)]
//         border-b border-white/15
//       `
//       : `
//         bg-neutral-900/5
//         backdrop-blur-[22px]
//         saturate-150
//         border-b border-white/10
//       `
//   }`}
// >




//       {/* TOP ROW */}
//       <div
//         className={`border-b transition-colors ${
//           scrolled ? 'border-[#e6dfd3]' : 'border-white/20'
//         }`}
//       >
//         <div className="max-w-[1650px] mx-auto px-14">
//           <div className="relative flex items-center justify-center h-[80px]">

//             {/* CENTER TEXT BRAND (instead of logo) */}
//             <Link
//               href={WEBSITE_HOME}
//               className={`text-3xl tracking-[0.3em] font-light transition ${
//                 isTransparent ? 'text-white' : 'text-[#6b5c49]'
//               }`}
//             >
//               Homeline and Lenin
//             </Link>

//             {/* RIGHT ICONS */}
//             <div className="absolute right-0 flex items-center gap-8">
//               <button onClick={() => setShowSearch(!showSearch)}>
//                 <IoIosSearch
//                   size={20}
//                   className={`transition ${
//                     isTransparent
//                       ? 'text-white hover:text-white/80'
//                       : 'text-[#6b5c49] hover:text-black'
//                   }`}
//                 />
//               </button>

//               <Cart />

//               {!auth ? (
//                 <Link href={WEBSITE_LOGIN}>
//                   <VscAccount
//                     size={20}
//                     className={`transition ${
//                       isTransparent
//                         ? 'text-white hover:text-white/80'
//                         : 'text-[#6b5c49] hover:text-black'
//                     }`}
//                   />
//                 </Link>
//               ) : (
//                 <Link href={USER_DASHBOARD}>
//                   <Avatar className="h-7 w-7 border border-white/40">
//                     <AvatarImage
//                       src={auth?.avatar?.url || userIcon.src}
//                     />
//                   </Avatar>
//                 </Link>
//               )}

//               <button
//                 onClick={() => setIsMobileMenu(true)}
//                 className="lg:hidden"
//               >
//                 <HiMiniBars3
//                   size={23}
//                   className={
//                     isTransparent
//                       ? 'text-white'
//                       : 'text-[#6b5c49]'
//                   }
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* NAV */}
//       <nav className="max-w-[1650px] mx-auto px-14">
//         <ul
//           className={`
//             flex justify-center
//             gap-[90px]
//             py-6
//             text-[13px]
//             tracking-[0.25em]
//             uppercase
//             font-serif
//             transition-colors
//             ${
//               isTransparent
//                 ? 'text-white'
//                 : 'text-[#6b5c49]'
//             }
//           `}
//         >
//           <li><Link href={WEBSITE_HOME}>Home</Link></li>
//           <li><Link href="/about-us">About</Link></li>
//           <li><Link href={WEBSITE_SHOP}>Shop</Link></li>
//           <li><Link href={`${WEBSITE_SHOP}?category=t-shirts`}>T-Shirt</Link></li>
//           <li><Link href={`${WEBSITE_SHOP}?category=hoodies`}>Hoodies</Link></li>
//           <li><Link href={`${WEBSITE_SHOP}?category=overshized`}>Oversized</Link></li>
//         </ul>
//       </nav>

//       {/* MOBILE MENU */}
//       <nav
//         className={`fixed inset-0 bg-white z-[70] transition-transform duration-300 lg:hidden ${
//           isMobileMenu ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex items-center justify-between px-6 h-[72px] border-b">
//           <span className="text-xl tracking-widest font-light">
//             Homeline and Linen
//           </span>

//           <button onClick={() => setIsMobileMenu(false)}>
//             <IoMdClose size={24} />
//           </button>
//         </div>

//         <ul className="flex flex-col gap-9 px-8 pt-16 text-lg font-serif">
//           <li><Link onClick={() => setIsMobileMenu(false)} href={WEBSITE_HOME}>Home</Link></li>
//           <li><Link onClick={() => setIsMobileMenu(false)} href="/about-us">About</Link></li>
//           <li><Link onClick={() => setIsMobileMenu(false)} href={WEBSITE_SHOP}>Shop</Link></li>
//           <li><Link onClick={() => setIsMobileMenu(false)} href={`${WEBSITE_SHOP}?category=t-shirts`}>T-Shirt</Link></li>
//           <li><Link onClick={() => setIsMobileMenu(false)} href={`${WEBSITE_SHOP}?category=hoodies`}>Hoodies</Link></li>
//           <li><Link onClick={() => setIsMobileMenu(false)} href={`${WEBSITE_SHOP}?category=overshized`}>Oversized</Link></li>
//         </ul>
//       </nav>

//       <Search isShow={showSearch} />
//     </header>
//   )
// }

// export default Header

