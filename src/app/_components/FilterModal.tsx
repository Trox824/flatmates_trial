"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

export default function FilterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Rooms");
  const [searchInput, setSearchInput] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = ["Rooms", "Flatmates", "Teamups"];

  return (
    <div className="sticky top-0 z-50 border-gray-300 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          {/* Search Bar */}
          <div
            onClick={() => setIsOpen(true)}
            className="flex cursor-pointer items-center rounded-lg border border-gray-400 px-3 py-3"
          >
            <FiSearch className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms and housemates"
              className="w-full bg-transparent text-sm text-gray-600 outline-none"
              readOnly
            />
          </div>

          {/* Modal */}
          {isOpen && (
            <div
              ref={modalRef}
              className="absolute left-0 right-0 top-0 z-[60] rounded-lg border border-gray-200 bg-white py-7 shadow-lg"
            >
              <div className="mx-auto max-w-[90%]">
                {/* Tabs */}
                <div className="mx-auto flex max-w-[70%] rounded-md">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 p-3 text-center ${
                        activeTab === tab
                          ? "bg-[#2f3a4a] text-white"
                          : "border border-[#2f3a4a] bg-white text-[#2f3a4a]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Start typing suburb, city, station or uni"
                    className="w-full rounded-lg border p-3 outline-none"
                    autoFocus
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>

                {/* Search Button */}
                <Link
                  href={`/rooms/${searchInput}`}
                  className="mt-3 flex w-full items-center justify-center rounded-lg bg-[rgb(0,105,119)] py-3 text-white"
                >
                  <FiSearch className="mr-2" />
                  <span>Search</span>
                </Link>

                {/* City Links */}
                <div className="mt-4 pb-4">
                  <h3 className="font-semibold text-[#6d7580]">
                    Explore a city
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      "Sydney",
                      "Melbourne",
                      "Brisbane",
                      "Perth",
                      "Gold Coast",
                      "Adelaide",
                    ].map((city) => (
                      <Link
                        key={city}
                        href={`/rooms/${city}`}
                        className="flex items-center text-sm text-[#2f3a4a] hover:underline"
                      >
                        <svg
                          className="map-marker mr-1 h-4 w-4"
                          viewBox="0 0 50 50"
                        >
                          <path
                            className="fill"
                            d="M 25 1 C 16.178 1 9 8.178 9 17 C 9 31.114 23.627 47.94625 24.25 48.65625 C 24.44 48.87325 24.712 49 25 49 C 25.31 48.979 25.56 48.87625 25.75 48.65625 C 26.373 47.93425 41 30.813 41 17 C 41 8.178 33.822 1 25 1 z M 25 12 C 28.313 12 31 14.687 31 18 C 31 21.313 28.313 24 25 24 C 21.687 24 19 21.313 19 18 C 19 14.687 21.687 12 25 12 z"
                          />
                        </svg>
                        {city}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
