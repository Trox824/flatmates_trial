import { CalendarIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import { useState, useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Availability = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedLength, setSelectedLength] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const listboxRef = useRef<HTMLDivElement>(null);

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

  return (
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
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Any date"
              className="w-full rounded-md border border-gray-600 px-10 py-3"
              minDate={new Date()}
              id="date_available"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <CalendarIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stay Length */}
        <div className="w-[40%] pl-[1.5rem]">
          <label
            htmlFor="stay_length"
            className="mb-1 block text-[1rem] font-medium text-[#2f3a4a]"
          >
            Stay length
          </label>
          <div className="relative" ref={listboxRef}>
            <button
              type="button"
              className={`flex items-center justify-between ${
                isOpen ? "rounded-t-lg border-2" : "rounded-lg border"
              } w-full border-gray-800 bg-white px-4 py-3 text-gray-700 focus:outline-none`}
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
                    className={`cursor-pointer py-3 pl-4 hover:bg-gray-100 ${
                      selectedLength === "" ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleLengthSelect("")}
                  >
                    <div>Any</div>
                  </li>
                  {stayLengths.map((length) => (
                    <li
                      key={length.value}
                      role="option"
                      className={`cursor-pointer py-3 pl-4 hover:bg-gray-100 ${
                        selectedLength === length.value ? "bg-gray-100" : ""
                      }`}
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
  );
};

export default Availability;
