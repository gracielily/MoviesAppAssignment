import React from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import { getActor, getActorCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const {
    data: actor,
    error,
    isLoading,
    isError,
  } = useQuery(["actor", { id: id }], getActor);


  const {
    data: actorCredits,
    error: creditsError,
    isLoading: creditsLoading,
    isError: isCreditsError,
  } = useQuery(["actorCredits", {id: id}], getActorCredits);

  if (isLoading || creditsLoading) {
    return <Spinner />;
  }

  if (isError || isCreditsError) {
    return <h1>{creditsError ? creditsError.message : error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <PageTemplate>
            <ActorDetails actor={actor} credits={actorCredits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;
