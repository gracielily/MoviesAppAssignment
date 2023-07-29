import React, { useContext } from "react";
import PageTemplate from '../components/templateActorsListPage';
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import MoveMovie from "../components/cardIcons/moveMovie";

const FavouriteActorsPage = (props) => {
  const { favourites } = useContext(MoviesContext);

  const favActorsQueries = useQueries(
    favourites.actors?.map((aId) => {
      return {
        queryKey: ["actor", { id: aId }],
        queryFn: getActor,
      };
    })
  );
  const isLoading = favActorsQueries.find((actor) => actor.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const actors = favActorsQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Favourite Actors"
      actors={actors}
      action={(actor) => {
        return (
            <>
              <RemoveFromFavourites el={actor} type="actors" />
              {actors.length > 1 && (
                <>
                {actors.indexOf(actor) !== 0 && (<><MoveMovie type="actors" el={actor} direction="up"/></>)}
                {actors.indexOf(actor) !== actors.length && (<><MoveMovie type="actors" el={actor} direction="down" /></>)}
                  
                </>
              )}
            </>
          );
      }}
    />
  );
};

export default FavouriteActorsPage;
;
