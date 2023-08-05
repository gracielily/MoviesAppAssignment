import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import AuthContextProvider from "./contexts/authContext";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TopMoviesListPage from "./pages/topMoviePage";
import TvShowsPage from "./pages/tvShowsPage";
import TrendingActorsPage from "./pages/trendingActorsPage";
import CreateFantasyMoviePage from "./pages/createFantasyMoviePage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/loginPage";
import FantasyMoviesPage from "./pages/fantasyMoviesPage";
import FavouriteTvShowsPage from "./pages/favouriteTvShowsPage";
import TvShowDetailsPage from "./pages/tvShowDetailsPage";
import FavouriteActorsPage from "./pages/favouriteActorsPage";
import SearchPage from "./pages/searchPage";
import PlaylistsPage from "./pages/playlistsPage";
import PlaylistDetailsPage from "./pages/playlistDetailsPage";
import SignupPage from "./pages/signupPage";
import WatchlistMoviesPage from "./pages/watchlistPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});




const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthContextProvider>
        <SiteHeader/>
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/top" element={<TopMoviesListPage />} />
            <Route path="/tvshows" element={<TvShowsPage />} />
            <Route path="/tvshows/:id" element={<PrivateRoute><TvShowDetailsPage /></PrivateRoute>} />
            <Route
              path="/tvshows/favourites"
              element={<PrivateRoute><FavouriteTvShowsPage /></PrivateRoute>}
            />
            <Route path="/trending-actors/" element={<TrendingActorsPage />} />
            <Route
              path="/movies/favourites"
              element={<PrivateRoute><FavouriteMoviesPage /></PrivateRoute>}
            />
            <Route
              path="/movies/watchlist"
              element={<PrivateRoute><WatchlistMoviesPage /></PrivateRoute>}
            />
            <Route path="/reviews/form" element={<PrivateRoute><AddMovieReviewPage/></PrivateRoute>} />
            <Route path="/movies/:id" element={<PrivateRoute><MoviePage /></PrivateRoute>} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/reviews/:id" element={<PrivateRoute><MovieReviewPage /></PrivateRoute>} />
            <Route path="/fantasy-movies/" element={<PrivateRoute><FantasyMoviesPage /></PrivateRoute>} />
            <Route path="/fantasy-movies/form" element={<PrivateRoute><CreateFantasyMoviePage /></PrivateRoute>} />
            <Route path="/actor/:id" element={<PrivateRoute><ActorDetailsPage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/actors/favourites"
              element={<PrivateRoute><FavouriteActorsPage /></PrivateRoute>}
            />
            <Route
              path="/search"
              element={<PrivateRoute><SearchPage /></PrivateRoute>}
            />
            <Route path="/playlists" element={<PrivateRoute><PlaylistsPage /></PrivateRoute>} />
            <Route path="/playlists/:id" element={<PrivateRoute><PlaylistDetailsPage /></PrivateRoute>} />
          </Routes>
          </MoviesContextProvider>
          </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
