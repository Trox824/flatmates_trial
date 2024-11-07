interface SuggestionsListProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  searchInput: string;
}

export default function SuggestionsList({
  suggestions,
  onSelect,
  searchInput,
}: SuggestionsListProps) {
  const highlightMatch = (suggestion: string, input: string) => {
    if (!input) return suggestion;
    const regex = new RegExp(`(${input})`, "gi");
    const parts = suggestion.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === input.toLowerCase() ? (
        <span key={index} className="font-bold text-gray-500">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return suggestions.length > 0 ? (
    <ul className="max-h-52 overflow-y-auto rounded-b-lg border-x border-b border-gray-800 bg-white pb-2 text-gray-600">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className="mx-3 flex cursor-pointer p-2 hover:bg-[#c9f8ee]"
          onClick={() => {
            onSelect(suggestion);
          }}
        >
          <svg
            className="map-marker mr-1 h-5 w-5 align-middle"
            viewBox="0 -5 65 65"
          >
            <path
              className="fill"
              d="M 25 1 C 16.178 1 9 8.178 9 17 C 9 31.114 23.627 47.94625 24.25 48.65625 C 24.44 48.87325 24.712 49 25 49 C 25.31 48.979 25.56 48.87625 25.75 48.65625 C 26.373 47.93425 41 30.813 41 17 C 41 8.178 33.822 1 25 1 z M 25 12 C 28.313 12 31 14.687 31 18 C 31 21.313 28.313 24 25 24 C 21.687 24 19 21.313 19 18 C 19 14.687 21.687 12 25 12 z"
            />
          </svg>
          {highlightMatch(suggestion, searchInput)}
        </li>
      ))}
    </ul>
  ) : null;
}
