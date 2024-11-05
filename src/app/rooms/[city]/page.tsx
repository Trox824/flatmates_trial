"use client";
import { Breadcrumb } from "~/app/_components/RoomsFilterPage/breadcrumb";
import { FilterHeader } from "~/app/_components/RoomsFilterPage/FilterHeader";
import ListingGrid from "~/app/_components/RoomsFilterPage/ListingGrid";
interface PageProps {
  params: {
    city: string;
  };
}

export default function RoomsPage({ params }: PageProps) {
  const { city } = params;
  return (
    <div className="bg-[#f8f8f9]">
      <div className="border-gray-300 py-2 shadow-xl">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Rooms", href: "/rooms" },
            { label: city },
          ]}
        />
      </div>
      <div className="mx-auto max-w-[62rem]">
        <div className="py-8 text-[1.125rem] font-bold text-gray-700">
          {city} Room for rent
        </div>
        <FilterHeader />
        <ListingGrid />
      </div>
    </div>
  );
}
