"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ListingCard from "./ListingCard";

interface Listing {
  id: string;
  type: "room";
  heading: string;
  weeklyRent: number;
  address?: string;
  availableFrom?: Date;
  location?: string;
  createdAt?: Date;
  lastActive?: Date;
  noBeds: number;
  noBathrooms: number;
  noFlatmates: number;
  billsIncluded?: boolean;
  images?: string[];
}

interface ListingGridProps {
  isShortlist?: boolean;
  filter: string;
  locationKeyword: string;
  filters?: { [key: string]: string };
  onResultsUpdate?: (count: number) => void;
  onViewUpdate?: (view: number) => void;
}

const ListingGrid = ({
  isShortlist = false,
  filter,
  locationKeyword,
  filters = {},
  onResultsUpdate,
  onViewUpdate,
}: ListingGridProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const canLoadMore = useRef(true); // Prevent multiple page increments

  // Function to build query parameters
  const buildQueryParams = () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "6",
      sort: filter,
      address: locationKeyword,
    });

    Object.entries(filters).forEach(([key, value]) => {
      params.append(key, value);
    });

    return params;
  };

  const fetchListings = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const queryParams = buildQueryParams();

      const endpoint = isShortlist
        ? "/api/favorites/index"
        : `/api/roomFilter?${queryParams.toString()}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      const newListings: Listing[] = isShortlist
        ? data.favorites
        : data.listings;
      const totalPages = data.totalPages;

      if (page >= totalPages || newListings.length === 0) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1); // Increment page after successful fetch
      }

      setListings((prev) =>
        page === 1 ? newListings : [...prev, ...newListings],
      );

      // Update total results
      if (onResultsUpdate) {
        onResultsUpdate(data.totalResults);
      }

      // Update current view count
      if (onViewUpdate) {
        onViewUpdate(
          page === 1
            ? newListings.length
            : listings.length + newListings.length,
        );
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      canLoadMore.current = true; // Re-enable loading more after fetch completes
    }
  }, [
    page,
    loading,
    hasMore,
    isShortlist,
    filter,
    locationKeyword,
    filters,
    listings.length,
    onResultsUpdate,
    onViewUpdate,
  ]);

  // Reset listings when filters or filter change
  useEffect(() => {
    setListings([]);
    setPage(1);
    setHasMore(true);
  }, [filters, filter, locationKeyword]);

  // Fetch listings when component mounts or when page changes
  useEffect(() => {
    // Initial fetch only
    if (page === 1) {
      void fetchListings();
    }
  }, [page, fetchListings]);

  // Callback ref for the sentinel element
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0]?.isIntersecting &&
            hasMore &&
            !loading &&
            canLoadMore.current
          ) {
            canLoadMore.current = false; // Prevent multiple triggers
            void fetchListings(); // Directly call fetchListings instead of updating page
          }
        },
        {
          root: null,
          rootMargin: "100px",
          threshold: 0.1,
        },
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, fetchListings], // Add fetchListings to dependencies
  );

  return (
    <div className="w-[64%] py-2">
      <div className="grid grid-cols-1 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            {...listing}
            isShortlist={isShortlist}
          />
        ))}
        {hasMore && (
          <div
            ref={sentinelRef}
            className="h-20"
            style={{ gridColumn: "1/-1" }}
          ></div>
        )}
      </div>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {!hasMore && !loading && listings.length === 0 && (
        <p className="mt-4 text-center">No listings found.</p>
      )}
      {!hasMore && listings.length > 0 && (
        <p className="mt-4 text-center">No more listings.</p>
      )}
    </div>
  );
};

export default ListingGrid;
