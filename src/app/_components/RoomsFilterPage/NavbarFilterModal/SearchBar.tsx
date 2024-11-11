import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onClick: () => void;
  filterCount?: number;
}

export default function SearchBar({
  onClick,
  filterCount = 0,
}: SearchBarProps) {
  return (
    <div
      onClick={onClick}
      className="relative flex cursor-pointer items-center rounded-lg border border-gray-400 px-3 py-3"
    >
      <FiSearch className="mr-2 text-gray-400" />
      <input
        type="text"
        placeholder="Search rooms and housemates"
        className="w-full bg-transparent text-sm text-gray-600 outline-none"
      />
      {filterCount > 0 && (
        <div className="absolute right-3 flex items-center rounded-xl border border-gray-300 px-2 py-1 text-sm">
          <span className="mr-1">Filters:</span>
          <div className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">
            {filterCount}
          </div>
        </div>
      )}
    </div>
  );
}
