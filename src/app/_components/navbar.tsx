"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiSearch, FiMenu, FiX, FiUser } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      {/* Announcement Bar */}
      <div className="bg-gray-700 text-white text-center py-3 text-sm">
        Australia&apos;s biggest share accommodation website{" "}
        <Link href="/about" className="underline">
          Learn more
        </Link>
      </div>

      {/* Sticky Navbar */}
      <div className="sticky top-0 bg-white z-50 px-4 py-6 border-b border-gray-300">
        <div className="max-w-7xl px-4 mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Flatmates Logo"
              width={230}
              height={70}
              priority
              className="object-contain mr-7"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow mx-8 hidden md:flex items-center border border-gray-400 rounded-lg px-3 py-3">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search rooms and housemates"
              className="bg-transparent outline-none w-full text-sm text-gray-600"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/shortlist"
              className="font-semibold text-gray-800 text-sm"
            >
              Shortlist
            </Link>
            <Link
              href="/messages"
              className="font-semibold text-gray-800 text-sm"
            >
              Messages
            </Link>
            <Link
              href="/guides"
              className="font-semibold text-gray-800 text-sm"
            >
              Guides
            </Link>
            {session ? (
              <button
                onClick={async () => {
                  await signOut();
                }}
                className="font-semibold text-gray-800 text-sm"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center font-semibold text-gray-800 text-sm"
              >
                <FiUser className="mr-2" /> Sign in
              </button>
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
              className="block px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shortlist
            </Link>
            <Link
              href="/messages"
              className="block px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Messages
            </Link>
            <Link
              href="/guides"
              className="block px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Guides
            </Link>
            {session ? (
              <button
                onClick={async () => {
                  await signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-md"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-md"
              >
                Sign in
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
