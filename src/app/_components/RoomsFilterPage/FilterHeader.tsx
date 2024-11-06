import { useState, useRef, useEffect } from "react";

export function FilterHeader({
  onFilterChange,
  currentView,
  totalResults,
}: {
  onFilterChange: (filter: string) => void;
  currentView: number;
  totalResults: number;
}) {
  const [selectedFilter, setSelectedFilter] = useState("featuredFirst");
  const [isOpen, setIsOpen] = useState(false);
  const listboxRef = useRef<HTMLDivElement>(null);
  const filters = [
    { value: "featuredFirst", label: "Featured First" },
    { value: "newestListings", label: "Newest Listings" },
    { value: "rentLowToHigh", label: "Rent (Low to High)" },
    { value: "rentHighToLow", label: "Rent (High to Low)" },
    { value: "earliestAvailable", label: "Earliest Available" },
    { value: "recentlyActive", label: "Recently Active" },
  ];

  const handleFilterSelect = (filterValue: string) => {
    setSelectedFilter(filterValue);
    onFilterChange(filterValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      listboxRef.current &&
      !listboxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-8 flex items-center justify-between border-b border-t border-gray-300 py-3">
      <button
        type="button"
        className="rounded-lg border border-gray-800 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
      >
        <span className="far fa-map"></span>Map
      </button>
      <div
        className="flex-grow text-center text-sm font-light"
        style={{ color: "#2f3a4a" }}
      >
        Viewing {currentView} of {totalResults} results
      </div>
      <div className="flex items-center space-x-4">
        {/* Custom Listbox for Filtering */}
        <div className="relative" ref={listboxRef}>
          <button
            type="button"
            className={`flex items-center ${isOpen ? "rounded-t-lg border-2" : "rounded-lg border"} border-gray-800 bg-white px-10 py-3 text-gray-700 focus:outline-none`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {filters.find((f) => f.value === selectedFilter)?.label ||
              "Select Filter"}
            <svg
              className="ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className="text-md absolute z-10 w-full rounded-b-lg bg-white shadow-lg"
              role="listbox"
              aria-labelledby="generic-select-sort-desktop-label"
            >
              <ul
                className="max-h-60 overflow-auto rounded-b-lg border-x-2 border-b-2 border-gray-800 bg-white text-gray-700"
                id="generic-select-sort-desktop-menu"
                role="listbox"
              >
                {filters.map((filter, index) => (
                  <li
                    key={filter.value}
                    data-always-inside="true"
                    aria-disabled="false"
                    aria-selected={selectedFilter === filter.value}
                    id={`generic-select-sort-desktop-item-${index}`}
                    role="option"
                    className={`cursor-pointer py-3 pl-4 hover:bg-gray-100 ${
                      selectedFilter === filter.value ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleFilterSelect(filter.value)}
                  >
                    <div>{filter.label}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Map Button */}

        {/* Save Search Button */}
        <button
          type="button"
          className="flex items-center rounded-lg border border-gray-800 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          <span className="far fa-star mr-2"></span>Save Search
        </button>
      </div>
    </div>
  );
}
