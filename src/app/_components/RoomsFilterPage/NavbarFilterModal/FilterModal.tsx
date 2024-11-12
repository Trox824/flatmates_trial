"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import TagsDisplay from "./TagsDisplay";
import SuggestionsList from "./SuggestionsList";
import CityLinks from "./CityLinks";
import AdvancedFilterModal from "./advancedFilterModal";
import { debounce } from "~/app/utils/debounce";
import { useSearchParams, usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
export default function FilterModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filterCount, setFilterCount] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("Rooms");
  const [searchInput, setSearchInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const tagsParam = searchParams.get("tags");
    return tagsParam ? tagsParam.split(",") : [];
  });
  const [isRooms, setIsRooms] = useState(false);

  useEffect(() => {
    setIsRooms(pathname.includes("/rooms/"));
  }, [pathname]);

  // Wrapper function for debounce compatibility
  const fetchSuggestions = debounce(async (...args: unknown[]) => {
    const query = args[0] as string;
    if (!query) return setSuggestions([]);
    const response = await fetch(
      `/api/autocomplete?query=${encodeURIComponent(query)}`,
    );
    const data: string[] = await response.json();
    setSuggestions(data);
  }, 300);

  useEffect(() => {
    fetchSuggestions(searchInput);
  }, [searchInput]);

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

  return (
    <div className="sticky top-0 z-50 border-gray-300 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <SearchBar onClick={() => setIsOpen(true)} />

          {isOpen && (
            <div
              ref={modalRef}
              className="absolute left-0 right-0 top-0 z-[60] max-h-[90vh] overflow-auto rounded-lg border border-gray-200 bg-white pt-7 shadow-lg"
            >
              <div className="mx-auto max-w-[90%]">
                {/* Tabs */}
                <div className="mx-auto flex max-w-[70%] rounded-md">
                  {["Rooms", "Flatmates", "Teamups"].map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 p-3 text-center ${
                        activeTab === tab
                          ? "bg-[#2f3a4a] text-white"
                          : `border border-[#2f3a4a] bg-white text-[#2f3a4a] ${
                              index === 0 ? "border-r-0" : ""
                            } ${index === 2 ? "border-l-0" : ""}`
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative mt-3">
                  <div
                    className={`flex items-center px-3 py-3 ${
                      suggestions.length > 0 && searchInput.length > 0
                        ? "rounded-t border-x border-t border-gray-800"
                        : "rounded border"
                    }`}
                  >
                    {/* Tags Display */}
                    <TagsDisplay
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                      setSearchInput={setSearchInput}
                      setSuggestions={setSuggestions}
                      setIsOpen={setIsOpen}
                    />
                    {/* Search Input */}
                    <input
                      type="text"
                      placeholder={
                        selectedTags.length > 0
                          ? ""
                          : "Start typing suburb, city, station or uni"
                      }
                      className="flex-grow bg-transparent p-0 text-gray-600 outline-none"
                      autoFocus
                      value={searchInput}
                      onChange={(e) =>
                        !selectedTags.length && setSearchInput(e.target.value)
                      }
                    />
                  </div>
                  {searchInput.length > 0 && (
                    <SuggestionsList
                      searchInput={searchInput}
                      suggestions={suggestions}
                      onSelect={(suggestion) => {
                        setSelectedTags((prevTags) => [
                          ...prevTags,
                          suggestion,
                        ]);
                        setSearchInput("");
                        setSuggestions([]);
                      }}
                    />
                  )}
                </div>

                {/* Search Button */}
                {isRooms ? (
                  <AdvancedFilterModal onClose={() => setIsOpen(false)} />
                ) : (
                  <Link
                    href={
                      selectedTags.length > 0
                        ? `/rooms/${selectedTags.join(",")}?tags=${selectedTags.join(",")}`
                        : ""
                    }
                    className="mt-3 flex w-full items-center justify-center rounded-lg bg-[rgb(0,105,119)] py-3 text-white"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <span>Search</span>
                  </Link>
                )}

                {/* City Links */}
                <CityLinks />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
