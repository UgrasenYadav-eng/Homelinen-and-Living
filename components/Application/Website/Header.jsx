"use client";

import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";

import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import Cart from "./Cart";
import Search from "./Search";

import userIcon from "@/public/assets/images/user.png";
import smallLogo from "@/public/assets/images/hl-logo.png";

const navLinks = [
  { label: "Home", url: WEBSITE_HOME },
  { label: "About", url: "/about-us" },
  { label: "Shop", url: WEBSITE_SHOP },
  {
    label: "Kitchen & Dining",
    url: `${WEBSITE_SHOP}?category=t-shirts`,
  },
  {
    label: "Decor",
    url: `${WEBSITE_SHOP}?category=hoodies`,
  },
  {
    label: "New",
    url: `${WEBSITE_SHOP}?category=overshized`,
  },
];

export default function Header() {
  const auth = useSelector((store) => store.authStore.auth);

  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        bg-white/70 backdrop-blur-xl
        border-b border-neutral-200/50
        shadow-[0_6px_25px_rgba(0,0,0,0.05)]
      "
    >
      {/* CONTAINER */}
      <div className="max-w-[1320px] mx-auto px-5">

        {/* TOP ROW */}
        <div className="relative flex items-center justify-between h-[90px]">

          {/* LOGO */}
          <Link
            href={WEBSITE_HOME}
            className="flex items-start pt-2 pl-2"
          >
            <Image
              src={smallLogo}
              alt="Homelinen and Living"
              width={60}
              height={60}
              className="h-[20px] w-auto object-contain"
              priority
            />
          </Link>

          {/* BRAND */}
          <Link
            href={WEBSITE_HOME}
            className="
              absolute left-1/2 -translate-x-1/2
              text-[84px] font-medium
              tracking-[0.22em]
              text-[#630e19]
              whitespace-nowrap
            "
          >
            Homelinen and Living
          </Link>

          {/* ICONS */}
          <div className="flex items-center gap-5 text-neutral-700">

            <button onClick={() => setShowSearch(!showSearch)}>
              <IoIosSearch size={19} />
            </button>

            <Cart />

            {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount size={19} />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar className="h-7 w-7">
                  <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                </Avatar>
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenu(true)}
              className="lg:hidden"
            >
              <HiMiniBars3 size={19} />
            </button>
          </div>
        </div>

        {/* NAV */}
        <nav
          className="
            hidden lg:flex justify-center
            gap-10 pb-2
            text-[14px]
            uppercase tracking-[0.26em]
            text-[#3a2e1f]
          "
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              className="hover:text-black transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </div>

      {/* MOBILE NAV */}
      <nav
        className={`fixed inset-0 bg-white z-[70] transition-transform duration-300 lg:hidden ${
          isMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[64px] border-b">
          <span className="text-lg tracking-widest font-light">
            Homelinen and Living
          </span>

          <button onClick={() => setIsMobileMenu(false)}>
            <IoMdClose size={22} />
          </button>
        </div>

        <ul className="flex flex-col gap-7 px-8 pt-12 text-lg font-serif">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                onClick={() => setIsMobileMenu(false)}
                href={item.url}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Search isShow={showSearch} />
    </header>
  );
}
