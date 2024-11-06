import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onClick: () => void;
}

export default function SearchBar({ onClick }: SearchBarProps) {
  return (
    <div
      onClick={onClick}
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
  );
}
