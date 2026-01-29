'use client';

import { useEffect, useMemo, useState } from 'react';
import TripGrid from '@/components/TripGrid';

type Trip = {
  id: number;
  name: string;
  image: string;
  short_description: string;
  long_description: string;
  rating: number;
};

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [sortByRating, setSortByRating] = useState(false);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch('/data/data.json');
        if (!res.ok) throw new Error('Failed to load trips');
        const data = await res.json();
        setTrips(data);
      } catch {
        setError('Could not fetch trip data');
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, []);

  const filteredTrips = useMemo(() => {
    let result = [...trips];

    if (search) {
      result = result.filter((trip) =>
          trip.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortByRating) {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [trips, search, sortByRating]);

  if (loading) return <p style={{ padding: 24 }}>Loading trips...</p>;
  if (error) return <p style={{ padding: 24 }}>Error: {error}</p>;

  return (
      <main style={{ padding: 24 }}>
        <h1>Trips</h1>

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <input
              type="text"
              placeholder="Search trips..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: 8, flex: 1 }}
          />

          <button
              onClick={() => setSortByRating((prev) => !prev)}
              style={{ padding: '8px 12px' }}
          >
            Sort by Rating {sortByRating ? '↓' : ''}
          </button>
        </div>

        <TripGrid trips={filteredTrips} />
      </main>
  );
}
