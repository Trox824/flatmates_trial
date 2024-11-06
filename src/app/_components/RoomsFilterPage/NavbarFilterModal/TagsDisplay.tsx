interface TagsDisplayProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export default function TagsDisplay({
  selectedTags,
  setSelectedTags,
}: TagsDisplayProps) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 flex flex-wrap gap-2 p-2">
      {selectedTags.map((tag, index) => (
        <div
          key={index}
          className="pointer-events-auto flex items-center rounded-lg bg-gray-300 px-2 py-1"
        >
          <span>{tag}</span>
          <button
            className="ml-2 text-red-500"
            onClick={() =>
              setSelectedTags(selectedTags.filter((t) => t !== tag))
            }
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
