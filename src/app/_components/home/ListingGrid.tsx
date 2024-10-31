'use client';

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
}

interface ListingsResponse {
  listings: Listing[];
}

const ListingGrid = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null); // Ref for the sentinel

  const fetchListings = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/listings?page=${page}&limit=6`);
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = (await response.json()) as ListingsResponse;
      
      if (!data.listings || data.listings.length === 0) {
        setHasMore(false);
        return;
      }
      
      setListings((prev) => [...prev, ...data.listings]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

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
        rootMargin: '100px',
        threshold: 0.1,
      }
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
        {hasMore && (
          <div ref={sentinelRef} className="h-20" style={{ gridColumn: '1/-1' }}></div>
        )}
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {!hasMore && <p className="text-center mt-4">No more listings.</p>}
    </div>
  );
};

export default ListingGrid;