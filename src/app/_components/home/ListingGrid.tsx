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
  billsIncluded?: boolean;
  images?: string[];
}

interface ListingGridProps {
  isShortlist?: boolean;
}

const ListingGrid = ({ isShortlist = false }: ListingGridProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null); // Ref for the sentinel

  const fetchListings = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const endpoint = isShortlist
        ? "/api/favorites/index"
        : `/api/listings?page=${page}&limit=6`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = (await response.json()) as {
        favorites: Listing[];
        listings: Listing[];
      };

      const newListings: Listing[] = isShortlist
        ? data.favorites
        : data.listings;

      if (newListings.length === 0) {
        setHasMore(false);
        return;
      }

      setListings((prev) => [...prev, ...newListings]);
      if (!isShortlist) {
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, isShortlist]);

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
    <div className="mx-auto max-w-[75rem] py-2">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            {...listing}
            isShortlist={isShortlist}
            billsIncluded={listing.billsIncluded}
            images={listing.images}
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

      {loading && (
        <div className="mt-4 text-center">
          <div className="loader"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      )}
      {!hasMore && (
        <p className="mt-4 text-center text-gray-500">No more listings.</p>
      )}
    </div>
  );
};

export default ListingGrid;
