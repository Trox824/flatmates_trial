export function FilterHeader() {
  return (
    <div className="mb-8 flex items-center justify-between border-b border-t border-gray-300 py-4">
      <button
        type="button"
        className="mr-4 flex items-center rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
      >
        <span className="far fa-map-marker-alt mr-2"></span>
        <p>Map</p>
      </button>
      <div className="flex-grow text-center text-gray-700">
        Viewing 1-12 of 4120 results
      </div>
      <div className="flex items-center">
        <div className="mr-4 flex cursor-pointer items-center rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
          <span>Featured First</span>
          <svg
            className="ml-2 h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.146 4.646a.5.5 0 0 0 0 .708l6.5 6.5a.5.5 0 0 0 .708 0l6.5-6.5a.5.5 0 0 0-.708-.708L8 10.793 1.854 4.646a.5.5 0 0 0-.708 0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <button
          type="button"
          className="flex items-center rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          <span className="far fa-star mr-2"></span>Save Search
        </button>
      </div>
    </div>
  );
}
