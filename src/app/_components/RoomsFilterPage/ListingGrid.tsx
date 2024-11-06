"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ListingCard from "./ListingCard";

interface Listing {
  id: string;
  type: "person" | "room";
  heading: string;
  price: number;
  address?: string;
  secondaryContent?: string;
  description?: string;
  subheading?: string;
  availableFrom?: Date;
  location?: string;
  createdAt?: Date;
  lastActive?: Date;
}

interface ListingGridProps {
  isShortlist?: boolean;
  filter: string;
  locationKeyword: string;
  onResultsUpdate?: (count: number) => void;
  onViewUpdate?: (view: number) => void;
}

const ListingGrid = ({
  isShortlist = false,
  filter,
  locationKeyword,
  onResultsUpdate,
  onViewUpdate,
}: ListingGridProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null); // Ref for the sentinel

  const fetchListings = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Add locationKeyword to the query string
      const endpoint = `/api/roomFilter?page=${page}&limit=6&sort=${filter}&address=${locationKeyword}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      const newListings: Listing[] = data.listings;

      if (newListings.length === 0) {
        setHasMore(false);
        return;
      }

      setListings((prev) => [...prev, ...newListings]);
      setPage((prev) => prev + 1);

      // Update total results
      if (onResultsUpdate) {
        onResultsUpdate(data.totalResults);
      }

      // Update current view count
      if (onViewUpdate) {
        onViewUpdate(listings.length + newListings.length);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    loading,
    hasMore,
    isShortlist,
    filter,
    locationKeyword, // Include locationKeyword in dependency array
    onResultsUpdate,
    onViewUpdate,
    listings.length,
  ]);

  useEffect(() => {
    // Reset listings and pagination when filter changes
    setListings([]);
    setPage(1);
    setHasMore(true);
  }, [filter]);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries.length > 0 && entries[0]?.isIntersecting && !loading) {
          void fetchListings();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [loading, hasMore, fetchListings]);

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
      {!hasMore && <p className="mt-4 text-center">No more listings.</p>}
    </div>
  );
};

export default ListingGrid;
