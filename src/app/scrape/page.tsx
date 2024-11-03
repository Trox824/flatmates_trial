"use client";

import { useState } from "react";

interface ScrapeResponse {
  success: boolean;
  message: string;
  error?: string;
}

export default function TestPage() {
  const [homeResult, setHomeResult] = useState<ScrapeResponse | null>(null);
  const [roomResult, setRoomResult] = useState<ScrapeResponse | null>(null);
  const [loadingHomes, setLoadingHomes] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const handleScrapeHomes = async () => {
    setLoadingHomes(true);
    setHomeResult(null);
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as ScrapeResponse;
      setHomeResult(data);
    } catch (error: unknown) {
      console.error("Scraping homes failed:", error);
      setHomeResult({
        success: false,
        message: "Scraping homes failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoadingHomes(false);
    }
  };

  const handleScrapeRooms = async () => {
    setLoadingRooms(true);
    setRoomResult(null);
    try {
      const response = await fetch("/api/scrapeRooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as ScrapeResponse;
      setRoomResult(data);
    } catch (error: unknown) {
      console.error("Scraping rooms failed:", error);
      setRoomResult({
        success: false,
        message: "Scraping rooms failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoadingRooms(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="flex space-x-4">
        <button
          onClick={handleScrapeHomes}
          disabled={loadingHomes}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loadingHomes ? "Scraping Homes..." : "Scrape Homes"}
        </button>

        <button
          onClick={handleScrapeRooms}
          disabled={loadingRooms}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
        >
          {loadingRooms ? "Scraping Rooms..." : "Scrape Rooms"}
        </button>
      </div>

      {homeResult && (
        <div className="mt-4">
          <h3 className="mb-2 font-bold">Homes Scrape Response:</h3>
          <pre className="overflow-auto rounded bg-gray-100 p-4">
            {JSON.stringify(homeResult, null, 2)}
          </pre>
        </div>
      )}

      {roomResult && (
        <div className="mt-4">
          <h3 className="mb-2 font-bold">Rooms Scrape Response:</h3>
          <pre className="overflow-auto rounded bg-gray-100 p-4">
            {JSON.stringify(roomResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
