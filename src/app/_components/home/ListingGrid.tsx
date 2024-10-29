import { type FC } from "react";
import ListingCard from "./ListingCard";

// Update the Listing interface to match ListingCardProps
interface Listing {
  id: string;
  imageUrl: string;
  price: number;
  name: string;
  age?: number;
  gender?: string;
  description: string;
  availableNow?: boolean;
}

interface ListingGridProps {
  listings: Listing[];
}

const ListingGrid: FC<ListingGridProps> = ({ listings }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            {...listing}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingGrid;