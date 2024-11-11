"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import FilterModal from "./RoomsFilterPage/NavbarFilterModal/FilterModal";
import NoticeBar from "~/app/_components/home/NoticeBar";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Debug session data
  useEffect(() => {
    console.log("Session Status:", status);
    console.log("Session Data:", session);
  }, [session, status]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      {/* Announcement Bar */}
      <NoticeBar />
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 border-b border-gray-300 bg-white px-4 py-6">
        <div className="mx-auto flex max-w-[75rem] items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Flatmates Logo"
              width={230}
              height={70}
              priority
              className="mr-7 w-[160px] object-contain md:w-[180px] lg:w-[230px]"
            />
          </Link>

          {/* Search Bar / Filter Modal */}
          <div className="mx-4 flex-grow">
            <FilterModal />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-1 md:flex">
            <Link
              href="/shortlist"
              className="rounded px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
            >
              Shortlist
            </Link>
            <Link
              href="/messages"
              className="rounded px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
            >
              Messages
            </Link>
            <Link
              href="/guides"
              className="rounded px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
            >
              Guides
            </Link>
            {status === "loading" ? (
              <div className="rounded px-4 py-2 text-sm font-semibold text-gray-800">
                Loading...
              </div>
            ) : session ? (
              <div className="flex items-center space-x-2">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <button
                  onClick={async () => {
                    await signOut();
                  }}
                  className="rounded px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center rounded px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              >
                <FiUser className="mr-2" /> Sign in
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle Menu">
              {isMobileMenuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 space-y-2 md:hidden">
            <Link
              href="/shortlist"
              className="block rounded-md px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shortlist
            </Link>
            <Link
              href="/messages"
              className="block rounded-md px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Messages
            </Link>
            <Link
              href="/guides"
              className="block rounded-md px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Guides
            </Link>
            {status === "loading" ? (
              <div className="block rounded-md px-4 py-2 font-semibold text-gray-600">
                Loading...
              </div>
            ) : session ? (
              <button
                onClick={async () => {
                  await signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="block rounded-md px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="block rounded-md px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
