import { type FC } from "react";
import Link from "next/link";

interface CreateListingButtonProps {
  isVisible: boolean;
}

const CreateListingButton: FC<CreateListingButtonProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 flex items-center space-x-2 border border-gray-200">
      <span className="text-gray-800">Need a room?</span>
      <Link
        href="/create-listing"
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        Create a listing
      </Link>
      <button
        className="ml-4 p-1 hover:bg-gray-100 rounded-full"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default CreateListingButton;