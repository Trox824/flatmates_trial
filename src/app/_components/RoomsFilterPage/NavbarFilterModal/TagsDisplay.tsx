import { useRouter, useSearchParams } from "next/navigation";

interface TagsDisplayProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  setSearchInput: (input: string) => void;
  setSuggestions: (suggestions: string[]) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function TagsDisplay({
  selectedTags,
  setSelectedTags,
  setSearchInput,
  setSuggestions,
}: TagsDisplayProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDeleteTag = (indexToRemove: number) => {
    const updatedTags = selectedTags.filter((_, i) => i !== indexToRemove);
    setSelectedTags(updatedTags);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (updatedTags.length > 0) {
      params.set("tags", updatedTags.join(","));
    } else {
      params.delete("tags");
    }

    // Update the URL without refreshing the page
    router.push(`?${params.toString()}`, { scroll: false });

    setSearchInput("");
    setSuggestions([]);
  };

  return (
    <div className="absolute inset-y-0 left-0 flex flex-wrap items-center gap-2 pl-3 pr-1">
      {selectedTags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center rounded-lg bg-gray-100 px-2 py-1"
        >
          <span className="text-gray-500">{tag}</span>{" "}
          <button
            className="ml-2 text-gray-500"
            onClick={() => handleDeleteTag(index)}
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-gray-500">
              <path
                className="fill text-gray-700"
                fillRule="evenodd"
                d="M10.942 8l4.456-4.457c.803-.802.803-2.14 0-2.94-.802-.804-2.14-.804-2.94 0L8 5.057 3.543.602C2.74-.2 1.403-.2.603.602c-.804.802-.804 2.14 0 2.94L5.057 8 .602 12.457c-.803.802-.803 2.14 0 2.94.802.804 2.14.804 2.94 0L8 10.943l4.457 4.456c.802.803 2.14.803 2.94 0 .804-.802.804-2.14 0-2.94L10.943 8z"
              ></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
