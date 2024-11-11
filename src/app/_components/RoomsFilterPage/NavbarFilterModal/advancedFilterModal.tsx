import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";

const AdvancedFilterModal = ({
  onClose,
  onFilterCountChange,
}: {
  onClose: () => void;
  onFilterCountChange?: (count: number) => void;
}) => {
  // Existing states
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedLength, setSelectedLength] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const listboxRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("Any");

  // New state variables for filter inputs
  const [rentMin, setRentMin] = useState("");
  const [rentMax, setRentMax] = useState("");
  const [billsIncluded, setBillsIncluded] = useState(false);
  const [selectedAccommodationTypes, setSelectedAccommodationTypes] = useState<
    string[]
  >([]);
  const [selectedHouseholdFilters, setSelectedHouseholdFilters] = useState<
    string[]
  >([]);

  const router = useRouter();
  const pathname = usePathname();

  const stayLengths = [...Array(12)].map((_, index) => ({
    value: String(index + 1),
    label: `${index + 1} ${index === 0 ? "month" : "months"}`,
  }));

  const handleLengthSelect = (value: string) => {
    setSelectedLength(value);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      setRentMin(params.get("rentMin") || "");
      setRentMax(params.get("rentMax") || "");
      setBillsIncluded(params.get("billsIncluded") === "true");
      setSelectedLength(params.get("stayLength") || "");
      setSelectedAccommodationTypes(
        params.get("accommodationTypes")?.split(",") || [],
      );
      setSelectedHouseholdFilters(params.get("households")?.split(",") || []);
      // Set startDate if available
      const dateParam = params.get("date");
      if (dateParam) {
        setStartDate(new Date(dateParam));
      }
      // Set activeTab if available
      setActiveTab(params.get("bedroomAvailable") || "Any");

      // Calculate initial filter count
      const initialFilterCount = [
        params.get("rentMin"),
        params.get("rentMax"),
        params.get("billsIncluded") === "true",
        params.get("date"),
        params.get("stayLength"),
        ...(params.get("accommodationTypes")?.split(",") || []),
        ...(params.get("households")?.split(",") || []),
        params.get("bedroomAvailable") !== "Any"
          ? params.get("bedroomAvailable")
          : null,
      ].filter(Boolean).length;

      onFilterCountChange?.(initialFilterCount);
    }
  }, [onFilterCountChange]);

  // Update the filter count calculation and notify parent component
  useEffect(() => {
    const filterCount = [
      rentMin,
      rentMax,
      billsIncluded,
      startDate,
      selectedLength,
      ...selectedAccommodationTypes,
      ...selectedHouseholdFilters,
      activeTab !== "Any" ? activeTab : null,
    ].filter(Boolean).length;

    onFilterCountChange?.(filterCount);
  }, [
    rentMin,
    rentMax,
    billsIncluded,
    startDate,
    selectedLength,
    selectedAccommodationTypes,
    selectedHouseholdFilters,
    activeTab,
    onFilterCountChange,
  ]);

  const handleUpdate = () => {
    const filters: { [key: string]: string } = {};

    if (rentMin) filters.rentMin = rentMin;
    if (rentMax) filters.rentMax = rentMax;
    if (billsIncluded) filters.billsIncluded = billsIncluded.toString();
    if (startDate) filters.date = startDate.toISOString();
    if (selectedLength) filters.stayLength = selectedLength;
    if (selectedAccommodationTypes.length > 0)
      filters.accommodationTypes = selectedAccommodationTypes.join(",");
    if (selectedHouseholdFilters.length > 0)
      filters.households = selectedHouseholdFilters.join(",");
    if (activeTab !== "Any") filters.bedroomAvailable = activeTab;

    // Remove filters that are not needed (e.g., empty strings)
    Object.keys(filters).forEach(
      (key) => filters[key] === "" && delete filters[key],
    );

    // Get the current pathname to extract the city
    const currentPath = pathname;
    const city = currentPath.split("/")[2] || "";

    // Construct the new URL
    let url = `/rooms/${city}`;
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(filters);
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // Navigate to the new URL
    router.push(url);

    // Close the modal
    onClose();
  };

  return (
    <>
      {/* Rent Per Week */}
      <div className="border-b">
        <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
          Rent per week
        </h3>
        <div className="flex items-center gap-4 py-[.75rem] pb-[1.5rem] pt-0">
          {/* Min Rent Input */}
          <div className="relative">
            <label
              htmlFor="min_budget"
              className="mb-1 block text-[1rem] font-medium text-[#2f3a4a]"
            >
              Rent min
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                name="min_budget"
                id="min_budget"
                type="tel"
                placeholder="Any"
                className="w-[120px] rounded-md border border-gray-600 px-10 py-3"
                value={rentMin}
                onChange={(e) => setRentMin(e.target.value)}
              />
            </div>
          </div>
          {/* Max Rent Input */}
          <div className="relative">
            <label
              htmlFor="max_budget"
              className="mb-1 block text-[1rem] font-medium text-[#2f3a4a]"
            >
              Rent max
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                name="max_budget"
                id="max_budget"
                type="tel"
                placeholder="Any"
                className="w-[120px] rounded-md border border-gray-600 px-10 py-3"
                value={rentMax}
                onChange={(e) => setRentMax(e.target.value)}
              />
            </div>
          </div>
          {/* Bills Checkbox */}
          <div className="ml-2 mt-8 flex items-center">
            <input
              name="bills"
              id="bills"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={billsIncluded}
              onChange={(e) => setBillsIncluded(e.target.checked)}
            />
            <label htmlFor="bills" className="ml-2 text-sm text-gray-500">
              Bills included
            </label>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="border-b">
        <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
          Availability
        </h3>
        <div className="flex items-center py-[.75rem] pb-[1.5rem] pt-0">
          {/* Date Available */}
          <div className="w-[60%]">
            <label
              htmlFor="date_available"
              className="mb-1 block text-[1rem] font-medium text-[#2f3a4a]"
            >
              Date available
            </label>
            <div className="relative w-full rounded-md border border-gray-600 py-3 pl-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Any date"
                className=""
                minDate={new Date()}
                id="date_available"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <CalendarIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          {/* Stay Length */}
          <div className="w-[40%] pl-[1.5rem]" ref={listboxRef}>
            <label
              htmlFor="stay_length"
              className="mb-1 block text-[1rem] font-medium text-[#2f3a4a]"
            >
              Stay length
            </label>
            <div className="relative">
              <button
                type="button"
                className={`flex items-center justify-between ${isOpen ? "rounded-t-lg border-2" : "rounded-lg border"} w-full border-gray-800 bg-white px-4 py-3 text-gray-700 focus:outline-none`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="flex-grow text-left">
                  {selectedLength
                    ? `${selectedLength} ${selectedLength === "1" ? "month" : "months"}`
                    : "Any"}
                </span>
                <svg
                  className="h-5 w-5"
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
                >
                  <ul
                    className="max-h-60 overflow-auto rounded-b-lg border-x-2 border-b-2 border-gray-800 bg-white text-gray-700"
                    role="listbox"
                  >
                    <li
                      key="any"
                      role="option"
                      className={`cursor-pointer py-3 pl-4 hover:bg-gray-100 ${selectedLength === "" ? "bg-gray-100" : ""}`}
                      onClick={() => handleLengthSelect("")}
                    >
                      <div>Any</div>
                    </li>
                    {stayLengths.map((length) => (
                      <li
                        key={length.value}
                        role="option"
                        className={`cursor-pointer py-3 pl-4 hover:bg-gray-100 ${selectedLength === length.value ? "bg-gray-100" : ""}`}
                        onClick={() => handleLengthSelect(length.value)}
                      >
                        <div>{length.label}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accommodation Type */}
      <div className="border-b">
        <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
          Accommodation type
        </h3>
        <div className="grid grid-cols-2 gap-y-3 pb-[1.5rem] pt-0">
          {/* Left Column */}
          <div className="space-y-3">
            {[
              { name: "Share house", value: "share_house" },
              { name: "Granny flat", value: "granny_flat" },
              { name: "Studio", value: "studio" },
              { name: "Student accommodation", value: "student_accommodation" },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  name={option.value}
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedAccommodationTypes.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAccommodationTypes([
                        ...selectedAccommodationTypes,
                        option.value,
                      ]);
                    } else {
                      setSelectedAccommodationTypes(
                        selectedAccommodationTypes.filter(
                          (val) => val !== option.value,
                        ),
                      );
                    }
                  }}
                />
                <span className="ml-2 text-sm text-[#2f3a4a]">
                  {option.name}
                </span>
              </label>
            ))}
          </div>
          {/* Right Column */}
          <div className="space-y-3">
            {[
              { name: "Whole property", value: "whole_property" },
              { name: "Homestay", value: "homestay" },
              { name: "1 bed flats", value: "one_bed_flats" },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  name={option.value}
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedAccommodationTypes.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAccommodationTypes([
                        ...selectedAccommodationTypes,
                        option.value,
                      ]);
                    } else {
                      setSelectedAccommodationTypes(
                        selectedAccommodationTypes.filter(
                          (val) => val !== option.value,
                        ),
                      );
                    }
                  }}
                />
                <span className="ml-2 text-sm text-[#2f3a4a]">
                  {option.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Household */}
      <div className="border-b">
        <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
          Household
        </h3>
        <div className="grid grid-cols-2 gap-y-3 pb-[1.5rem] pt-0">
          {/* Left Column */}
          <div className="space-y-3">
            {[
              { name: "Women only household", value: "women_only" },
              // Add more household filters as needed
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  name={option.value}
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedHouseholdFilters.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedHouseholdFilters([
                        ...selectedHouseholdFilters,
                        option.value,
                      ]);
                    } else {
                      setSelectedHouseholdFilters(
                        selectedHouseholdFilters.filter(
                          (val) => val !== option.value,
                        ),
                      );
                    }
                  }}
                />
                <span className="ml-2 text-sm text-[#2f3a4a]">
                  {option.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bedroom Available */}
      <div className="border-b">
        <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
          Bedroom available
        </h3>
        <div className="mx-auto mb-4 max-w-[100%] pb-[1.5rem] pt-0">
          {/* Tabs */}
          <div className="mx-auto flex max-w-[100%] rounded-md">
            {["Any", "1+", "2+", "3+", "4+"].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 p-3 text-center ${activeTab === tab ? "bg-[#2f3a4a] text-white" : `border border-[#2f3a4a] bg-white text-[#2f3a4a] ${index === 1 ? "border-l-0 border-r-0" : ""} ${index === 3 ? "border-l-0 border-r-0" : ""}`}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 flex justify-center border-t bg-white py-[1.5rem]">
        <button
          onClick={handleUpdate}
          className="w-[50%] rounded-md bg-[#006977] px-6 py-3 text-white"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default AdvancedFilterModal;
