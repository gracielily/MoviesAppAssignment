import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} )
  const [favourites, setFavourites] = useState({movies: [], tvShows: []});
  const [mustWatch, setMustWatch] = useState([]);
  const [myFantasyMovies, setFantasyMovies] = useState([]);

  const addToFavourites = (el, type) => {
    let updatedFavourites = {...favourites};
    if (!favourites[type].includes(el.id)) {
      updatedFavourites[type].push(el.id);
    }
    setFavourites(updatedFavourites);
  };

  const removeFromFavourites = (el, type) => {
    let updatedFavourites = {...favourites};
    updatedFavourites[type].splice(updatedFavourites[type].indexOf(el.id), 1)
    setFavourites(updatedFavourites);
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToMustWatch = (movie) => {
    let updatedMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      updatedMustWatch.push(movie.id);
    }
    setMustWatch(updatedMustWatch);
  };

  const createFantasyMovie = async (fantasyMovie) => {
    fantasyMovie.id = Math.floor(Math.random() * 100000000)
    if(fantasyMovie.posterImg) {
      const posterFile = fantasyMovie.posterImg
      const { data } = await supabase
      .storage
      .from('fantasyMoviePosters')
      .upload(`${fantasyMovie.id}_${posterFile.name}`, posterFile, {
        cacheControl: '3600',
        upsert: false
      })
      fantasyMovie.posterImg = data.path; 
    }
    let fantasyMovies = [...myFantasyMovies];
    fantasyMovies.push(fantasyMovie)
    setFantasyMovies(fantasyMovies)
  }

  const removeFromFantasyMovies = (movie) => {
    setFantasyMovies(myFantasyMovies.filter((fm) => fm.id !== movie.id));
  };

  const reorderFavorites = (el, type, direction) => {
    const currentPosition = favourites[type].indexOf(el.id)
    const newPosition = direction === "down" ? currentPosition + 1 : currentPosition - 1
    const newFavs = {...favourites}
    // remove movie
    newFavs[type].splice(currentPosition, 1);
    // re add movie at position
    newFavs[type].splice(newPosition, 0, el.id)
    setFavourites(newFavs);
  }

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        mustWatch,
        addToMustWatch,
        createFantasyMovie,
        myFantasyMovies,
        removeFromFantasyMovies,
        reorderFavorites,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
