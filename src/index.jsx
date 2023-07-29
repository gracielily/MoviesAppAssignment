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
import TopMoviesListPage from "./pages/topMoviesPage";
import TvShowsPage from "./pages/tvShowsPage";
import TrendingActorsPage from "./pages/trendingActionsPasge";
import CreateFantasyMoviePage from "./pages/createFantasyMoviePage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/loginPage";
import FantasyMoviesPage from "./pages/fantasyMoviesPage";
import FavouriteTvShowsPage from "./pages/favouriteTvShowsPage";

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
          {/* <Route index element={<Home onLogin={handleLogin} />} />
          <Route path="home" element={<Home onLogin={handleLogin} />} /> */}

            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/top" element={<TopMoviesListPage />} />
            <Route path="/tvshows" element={<TvShowsPage />} />
            <Route
              path="/tvshows/favourites"
              element={<FavouriteTvShowsPage />}
            />
            <Route path="/trending-actors/" element={<TrendingActorsPage />} />
            <Route
              path="/movies/favourites"
              element={<FavouriteMoviesPage />}
            />
            <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
            
            <Route path="/movies/:id" element={<PrivateRoute><MoviePage /></PrivateRoute>} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/fantasy-movies/" element={<PrivateRoute><FantasyMoviesPage /></PrivateRoute>} />
            <Route path="/fantasy-movies/form" element={<PrivateRoute><CreateFantasyMoviePage /></PrivateRoute>} />
            <Route path="/actor/:id" element={<ActorDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
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
