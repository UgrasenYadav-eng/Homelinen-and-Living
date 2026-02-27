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


