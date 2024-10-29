import Link from "next/link";

import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div className="bg-gray-700 text-white text-center py-3 text-[0.9375rem]">
        Australia's biggest share accommodation website{" "}
        <Link href="/about" className="underline">
          Learn more
        </Link>
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 bg-white shadow-lg z-50 px-4 pt-[1.375rem] pb-[1.3125rem]">
          <div className="grid grid-cols-12 gap-4 items-center h-12 mx-80">
            {/* Logo */}
            <div className="col-span-3">
              <Link href="/" className="block">
                <Image
                  src="/images/logo.png"
                  alt="Flatmates Logo"
                  width={230}
                  height={40}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="rounded-lg col-span-5 flex justify-center w-full h-full">
              <input
                type="text"
                placeholder="Search..."
                className="px-2 py-1 w-full rounded-lg border border-gray-400"
              />
            </div>

            {/* Other Buttons */}
            <div className="col-span-4 flex justify-end space-x-4">
              <Link href="/shortlist" className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                Shortlist
              </Link>
              <Link href="/messages" className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                Messages
              </Link>
              <Link href="/guides" className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                Guides
              </Link>
              <Link href="/signin" className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                Sign in
              </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
