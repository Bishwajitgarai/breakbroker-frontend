"use client"
import { useState, useEffect } from "react";
import { fetchListings } from "../lib/api";
import { Listing, ListingsResponse } from "../lib/types";

export default function SearchResults() {
  const [query, setQuery] = useState<string>("New York");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch listings whenever `query` changes
  useEffect(() => {
    const loadListings = async () => {
        setLoading(true);
        try {
        const data: ListingsResponse = await fetchListings(query); // Pass query to API
        setListings(data.items); // ✅ only set the array of listings
        } catch (error) {
        console.error("Error fetching listings:", error);
        } finally {
        setLoading(false);
        }
    };

    loadListings();
    }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>

      {/* Search bar */}
      <div className="flex items-center mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full max-w-md"
          placeholder="Search location..."
        />
        <button
          className="ml-2 p-2 bg-gray-200 rounded-lg"
          onClick={() => setQuery(query)}
        >
          🔍
        </button>
      </div>

      {/* Listings */}
      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={item.images?.[0] || "/placeholder.jpg"} // first image or fallback
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-bold">
                  {item.priceText || `$${item.price}/mo`}
                </p>
                <p className="text-gray-600">
                  {item.beds ?? "N/A"} Beds • {item.location}
                </p>
                {item.noBrokerage && (
                  <span className="mt-2 inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                    No Brokerage
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
}
