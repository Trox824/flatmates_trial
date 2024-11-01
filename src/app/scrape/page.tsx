'use client';

import { useState } from 'react';

interface ScrapeResponse {
  message?: string;
  error?: string;
  data?: {
    id: string;
    type: 'person' | 'room';
    heading: string;
    price: number;
    billsIncluded: boolean;
    address: string | null;
    secondaryContent: string | null;
    subheading: string | null;
    description: string | null;
    availableFrom: Date | null;
    noBeds: number;
    noBathrooms: number;
    noFlatmates: number;
    propertyFeatures: string[];
    accpetingTags: string[];
    inspectAvailable: boolean;
    weeklyRent: number;
  }[];
}

export default function TestPage() {
  const [result, setResult] = useState<ScrapeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json() as ScrapeResponse;
      setResult(data);
    } catch (error: unknown) {
      console.error('Scraping failed:', error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="apiKey" className="block mb-2">API Key:</label>
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your API key"
        />
      </div>

      <button 
        onClick={handleScrape}
        disabled={loading || !apiKey}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 hover:bg-blue-600"
      >
        {loading ? 'Scraping...' : 'Start Scrape'}
      </button>
      
      {result && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Response:</h3>
          <pre className="p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}