import Image from "next/image";
import { type FC } from "react";
import housemate from "../../../../public/images/housemate.png";

interface ListingCardProps {
  price: number;
  name: string;
  age?: number;
  gender?: string;
  description: string;
  availableNow?: boolean;
}

const ListingCard: FC<ListingCardProps> = ({
  price,
  name,
  age,
  gender,
  description,
  availableNow = false,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={housemate}
          alt={name}
          fill
          className="object-cover"
        />
        <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-medium">{name}</h3>
          <button className="text-sm bg-white border border-gray-200 rounded-full px-4 py-1 hover:bg-gray-50">
            Free to message
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <span>${price}/week</span>
          <span>•</span>
          <span>{age} year old {gender}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        
        {availableNow && (
          <div className="mt-2">
            <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
              Available Now
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;