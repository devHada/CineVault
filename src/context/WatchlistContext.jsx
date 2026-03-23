import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  // Read from localStorage or default to empty array/object
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("cinevault-watchlist")) || [],
  );
  const [watched, setWatched] = useState(
    JSON.parse(localStorage.getItem("cinevault-watched")) || [],
  );
  const [cineRatings, setCineRatings] = useState(
    JSON.parse(localStorage.getItem("cinevault-ratings")) || {},
  );

  // Helper — saves to localStorage every time state changes
  const saveWatchlist = (newList) => {
    setWatchlist(newList);
    localStorage.setItem("cinevault-watchlist", JSON.stringify(newList));
  };

  const saveWatched = (newList) => {
    setWatched(newList);
    localStorage.setItem("cinevault-watched", JSON.stringify(newList));
  };

  // Add to watchlist
  const addToWatchlist = (movie) => {
    const newList = [...watchlist, movie];
    saveWatchlist(newList);
  };

  // Add to watched
  const addToWatched = (movie) => {
    const newList = [...watched, movie];
    saveWatched(newList);
  };

  // Remove from watchlist by id
  const removeFromWatchlist = (id) => {
    const newList = watchlist.filter((m) => m.id !== id);
    saveWatchlist(newList);
  };

  // Remove from watched by id
  const removeFromWatched = (id) => {
    const newList = watched.filter((m) => m.id !== id);
    saveWatched(newList);
  };

  // Move from watchlist to watched
  const moveToWatched = (id) => {
    const movie = watchlist.find((m) => m.id === id);
    if (movie) {
      removeFromWatchlist(id);
      addToWatched(movie);
    }
  };

  // Move from watched back to watchlist
  const moveToWatchlist = (id) => {
    const movie = watched.find((m) => m.id === id);
    if (movie) {
      removeFromWatched(id);
      addToWatchlist(movie);
    }
  };

  // Rate a movie 1-5 stars
  const rateMovie = (id, rating) => {
    const newRatings = { ...cineRatings, [id]: rating };
    setCineRatings(newRatings);
    localStorage.setItem("cinevault-ratings", JSON.stringify(newRatings));
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        watched,
        cineRatings,
        addToWatchlist,
        addToWatched,
        removeFromWatchlist,
        removeFromWatched,
        moveToWatched,
        moveToWatchlist,
        rateMovie,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
