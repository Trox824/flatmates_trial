"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

export default function FilterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Rooms");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = ["Rooms", "Flatmates", "Teamups"];

  return (
    <div className="sticky top-0 bg-white z-50 border-gray-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Search Bar */}
          <div 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer flex items-center border border-gray-400 rounded-lg px-3 py-3"
          >
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search rooms and housemates"
              className="bg-transparent outline-none w-full text-sm text-gray-600"
              readOnly
            />
          </div>

          {/* Modal */}
          {isOpen && (
            <div 
              ref={modalRef} 
              className="absolute top-0 left-0 right-0 bg-white shadow-lg rounded-lg border border-gray-200 py-7 z-[60]"
            >
              <div className="max-w-[90%] mx-auto">
                {/* Tabs */}
                <div className="max-w-[70%] flex rounded-md mx-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 p-3 text-center ${
                        activeTab === tab
                          ? "bg-[#2f3a4a] text-white"
                          : "bg-white text-[#2f3a4a] border border-[#2f3a4a]"
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
                    placeholder="Start typing surburb, city, station or uni"
                    className="w-full p-3 outline-none border rounded-lg"
                    autoFocus
                  />
                </div>

                {/* Search Button */}
                <button className="w-full mt-3 bg-[rgb(0,105,119)] text-white py-3 rounded-lg flex items-center justify-center">
                  <FiSearch className="mr-2" />
                  <span>Search</span>
                </button>

                {/* City Links */}
                <div className="mt-4 pb-4">
                  <h3 className="text-[#6d7580] font-semibold">Explore a city</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Sydney", "Melbourne", "Brisbane", "Perth", "Gold Coast", "Adelaide"].map((city) => (
                      <Link
                        key={city}
                        href="/listNav"
                        className="text-sm text-[#2f3a4a] hover:underline flex items-center"
                      >
                        <svg className="map-marker w-4 h-4 mr-1" viewBox="0 0 50 50">
                          <path className="fill" d="M 25 1 C 16.178 1 9 8.178 9 17 C 9 31.114 23.627 47.94625 24.25 48.65625 C 24.44 48.87325 24.712 49 25 49 C 25.31 48.979 25.56 48.87625 25.75 48.65625 C 26.373 47.93425 41 30.813 41 17 C 41 8.178 33.822 1 25 1 z M 25 12 C 28.313 12 31 14.687 31 18 C 31 21.313 28.313 24 25 24 C 21.687 24 19 21.313 19 18 C 19 14.687 21.687 12 25 12 z" />
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