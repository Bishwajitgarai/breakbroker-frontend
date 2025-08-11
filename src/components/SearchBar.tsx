"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSuggestionsApi, Suggestion } from "@/app/lib/api";

const PAGE_LIMIT = 20;
const DEBOUNCE_TIME = 1000; // milliseconds

export default function SearchBar() {
  const userLocation = useSelector((state: RootState) => state.userLocationData);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalSuggestions, setTotalSuggestions] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const mouseInsideSuggestions = useRef(false);

  async function fetchSuggestions(
    lat?: number | null,
    long?: number | null,
    search?: string,
    pageNum: number = 1
  ): Promise<{ suggestions: Suggestion[]; total: number }> {
    try {
      const params: any = { page: pageNum, limit: PAGE_LIMIT };
      if (search) params.query = search;
      if (lat !== undefined && lat !== null) params.lat = lat;
      if (long !== undefined && long !== null) params.long = long;

      const response = await getSuggestionsApi(params);
      return { suggestions: response.suggestions, total: response.total };
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
      setLocationError("Failed to fetch location suggestions.");
      return { suggestions: [], total: 0 };
    }
  }

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setTotalSuggestions(0);
      setPage(1);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (userLocation?.lat != null && userLocation?.long != null) {
        setLoading(true);
        fetchSuggestions(userLocation.lat, userLocation.long, query, 1)
          .then(({ suggestions, total }) => {
            setSuggestions(suggestions);
            setTotalSuggestions(total);
            setPage(1);
            setLocationError(null);
          })
          .catch(() => setLocationError("Failed to fetch location suggestions."))
          .finally(() => setLoading(false));
      } else {
        setLocationError("User location not available.");
        setSuggestions([]);
        setTotalSuggestions(0);
        setPage(1);
      }
    }, DEBOUNCE_TIME);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query, userLocation?.lat, userLocation?.long]);

  const handleScroll = () => {
    if (loadingMore || loading) return;
    if (!suggestionListRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = suggestionListRef.current;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      if (suggestions.length >= totalSuggestions) return;

      setLoadingMore(true);
      fetchSuggestions(userLocation.lat, userLocation.long, query, page + 1)
        .then(({ suggestions: newSuggestions }) => {
          setSuggestions((prev) => [...prev, ...newSuggestions]);
          setPage((prev) => prev + 1);
        })
        .catch(() => setLocationError("Failed to load more suggestions."))
        .finally(() => setLoadingMore(false));
    }
  };

  const handleSelectSuggestion = (city: string) => {
    setQuery(city);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!mouseInsideSuggestions.current) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  const handleSuggestionsMouseEnter = () => {
    mouseInsideSuggestions.current = true;
  };

  const handleSuggestionsMouseLeave = () => {
    mouseInsideSuggestions.current = false;
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      {/* Flex container for input + button */}
      <div className="relative flex gap-3">
        <div className="flex-1 relative">
          <input
            type="search"
            ref={inputRef}
            placeholder={loading ? "Loading suggestions..." : "Search city, locality, project..."}
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleInputBlur}
            disabled={loading}
            autoComplete="off"
            spellCheck={false}
            className={`w-full rounded-lg border border-gray-300 px-5 py-3 text-lg text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
              ${loading ? "cursor-wait" : "cursor-text"}`}
            aria-autocomplete="list"
            aria-controls="location-suggestion-list"
            aria-expanded={showSuggestions ? "true" : "false"}  // fix ARIA value
            aria-haspopup="listbox"
            role="combobox"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul
              id="location-suggestion-list"
              ref={suggestionListRef}
              onScroll={handleScroll}
              onMouseEnter={handleSuggestionsMouseEnter}
              onMouseLeave={handleSuggestionsMouseLeave}
              role="listbox"
              tabIndex={-1}
              className="absolute z-30 max-h-72 w-full overflow-y-auto rounded-b-lg border border-t-0 border-gray-300 bg-white
                         shadow-xl scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100"
              style={{ top: '100%', left: 0, right: 0 }} // ensure dropdown width = input width
            >
              {suggestions.map(
                ({ state_name, district_name, city_name, locality_name }, idx) => (
                  <li
                    key={`${state_name}-${district_name}-${city_name}-${locality_name ?? ''}-${idx}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectSuggestion(city_name);
                    }}
                    role="option"
                    aria-selected={false}
                    tabIndex={-1}
                    className="cursor-pointer px-4 py-3 hover:bg-blue-100 text-gray-900 transition-colors select-none"
                  >
                    <span className="font-semibold">{city_name}</span>
                    {locality_name ? ` ${locality_name}` : null}, {district_name}, {state_name}
                  </li>
                )
              )}
              {loadingMore && (
                <li className="text-center py-2 text-gray-600 select-none">Loading more...</li>
              )}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`flex-shrink-0 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition duration-200
            hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500
            disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          Search
        </button>
      </div>

      {locationError && (
        <p className="mt-3 text-center text-sm text-red-600 select-none" role="alert">
          {locationError}
        </p>
      )}
    </div>
  );
}
