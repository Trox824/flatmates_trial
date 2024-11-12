import { FiSearch } from "react-icons/fi";
import { useSearchParams, usePathname } from "next/navigation";

interface SearchBarProps {
  onClick: () => void;
}

export default function SearchBar({ onClick }: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const entries = Array.from(searchParams.entries());

  // Check if the current path is in /rooms/[city] format
  const isRoomPage = /^\/rooms\/[^/]+$/.test(pathname);
  const filterCount = isRoomPage ? entries.length : 0;

  // Dynamic placeholder based on city parameter
  const city = searchParams.get("city") || "Search rooms and housemates";
  const placeholder =
    isRoomPage && searchParams.get("city")
      ? `${city} rooms for rent`
      : "Search rooms and housemates";

  return (
    <div
      onClick={onClick}
      className="relative flex cursor-pointer items-center rounded-lg border border-gray-400 px-3 py-3"
    >
      <FiSearch className="mr-2 text-gray-400" />

      <div className="flex-1">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-600"
        />

        {/* Display search parameters only on /rooms/[city] path */}
        {isRoomPage && filterCount > 0 && (
          <div className="mt-1 flex flex-wrap text-xs text-gray-500">
            {entries.map(([key, value], index) => (
              <span key={key} className="mr-1">
                {`${key}=${value}`}
                {index < entries.length - 1 && (
                  <span className="ml-1">and</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Show filter count badge only on /rooms/[city] path */}
      {isRoomPage && filterCount > 0 && (
        <div className="text-md absolute right-3 flex items-center rounded-2xl border border-gray-300 px-2 py-1">
          <span className="mr-1">Filters:</span>
          <div className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">
            {filterCount}
          </div>
        </div>
      )}
    </div>
  );
}
