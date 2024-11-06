import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import TagsDisplay from "./TagsDisplay";
import SuggestionsList from "./SuggestionsList";
import CityLinks from "./CityLinks";
import { debounce } from "~/app/utils/debounce";

interface ModalContentProps {
  setIsOpen: (open: boolean) => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

export default function ModalContent({
  setIsOpen,
  modalRef,
}: ModalContentProps) {
  const [activeTab, setActiveTab] = useState<string>("Rooms");
  const [searchInput, setSearchInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fetchSuggestions = debounce(async (query: unknown) => {
    if (!query || typeof query !== "string") return setSuggestions([]);
    const response = await fetch(
      `/api/autocomplete?query=${encodeURIComponent(query)}`,
    );
    const data: string[] = await response.json();
    setSuggestions(data);
  }, 300);

  useEffect(() => {
    fetchSuggestions(searchInput);
  }, [searchInput]);

  return (
    <div
      ref={modalRef}
      className="absolute left-0 right-0 top-0 z-[60] rounded-lg border border-gray-200 bg-white py-7 shadow-lg"
    >
      <div className="mx-auto max-w-[90%]">
        {/* Tabs */}
        <div className="mx-auto flex max-w-[70%] rounded-md">
          {["Rooms", "Flatmates", "Teamups"].map((tab) => (
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
            className={`w-full p-3 outline-none ${
              suggestions.length > 0 && selectedTags.length === 0
                ? "rounded-t-lg border-x border-t border-gray-800"
                : "rounded-lg border"
            }`}
            autoFocus
            value={searchInput}
            onChange={(e) =>
              !selectedTags.length && setSearchInput(e.target.value)
            }
          />
          <TagsDisplay
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <SuggestionsList
            suggestions={suggestions}
            onSelect={(suggestion) => {
              setSelectedTags([...selectedTags, suggestion]);
              setSuggestions([]);
            }}
          />
        </div>

        {/* Search Button */}
        <Link
          href={`/rooms/${searchInput || selectedTags.join(",")}`}
          className="mt-3 flex w-full items-center justify-center rounded-lg bg-[rgb(0,105,119)] py-3 text-white"
        >
          <span>Search</span>
        </Link>

        {/* City Links */}
        <CityLinks />
      </div>
    </div>
  );
}
