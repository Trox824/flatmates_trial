"use client";
import { useState, useEffect, useMemo } from "react";
import { Breadcrumb } from "~/app/_components/RoomsFilterPage/breadcrumb";
import { FilterHeader } from "~/app/_components/RoomsFilterPage/FilterHeader";
import ListingGrid from "~/app/_components/RoomsFilterPage/ListingGrid";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

interface PageProps {
  params: {
    city: string;
  };
}

export default function RoomsPage({ params }: PageProps) {
  const { city } = params;
  const decodedCity = decodeURIComponent(city);
  const [filter, setFilter] = useState("location");
  const [totalResults, setTotalResults] = useState(0);
  const [currentView, setCurrentView] = useState(0);

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
    // Reset listings and pagination in ListingGrid via a key or prop
    // This can be handled inside ListingGrid component
  };

  const searchParams = useSearchParams(); // Get the current search parameters

  // Memoize filters to prevent unnecessary re-renders
  const filters = useMemo(() => {
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      // Exclude page and limit from filters if you don't want them
      if (key !== "page" && key !== "limit") {
        params[key] = value;
      }
    });
    return params;
  }, [searchParams]);

  return (
    <div className="bg-[#f8f8f9]">
      <div className="border-gray-300 py-2 shadow-xl">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Rooms", href: "/rooms" },
            { label: decodedCity },
          ]}
        />
      </div>
      <div className="mx-auto max-w-[62rem]">
        <div className="py-8 text-[1.125rem] font-bold text-gray-700">
          {decodedCity} Rooms for Rent
        </div>
        <FilterHeader
          onFilterChange={handleFilterChange}
          currentView={currentView}
          totalResults={totalResults}
        />
        <ListingGrid
          isShortlist={false}
          filter={filter}
          locationKeyword={decodedCity}
          filters={filters} // Pass filters to ListingGrid
          onResultsUpdate={(count: number) => setTotalResults(count)}
          onViewUpdate={(view: number) => setCurrentView(view)}
        />
        <div
          className="text-center text-sm font-light"
          style={{ color: "#2f3a4a" }}
        ></div>
      </div>
    </div>
  );
}
