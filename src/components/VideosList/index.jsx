import React from "react";
import Grid from "@mui/material/Grid";
import VideoViewer from "../videoViewer";
import { getVideosFor } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const VideosList = ({ elId, type }) => {
  const { data, error, isLoading, isError, refetch } = useQuery("videos", () =>
    getVideosFor(type, elId), {keepPreviousData: true}
  );

  React.useEffect(() => {
    refetch(type, elId);
  }, [elId]);

  let videos = data ? data.results : [];
  if (videos.length > 5) {
    videos = videos.slice(0, 4);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {videos.length ? (
        <>
        <Grid item container spacing={4} sx={{mt: 4}}>
          {videos.map((v, index) => {
            return (
            <Grid key={index} item xs={6}>
              <VideoViewer key={index} video={v} />
            </Grid>
            )
          })}
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default VideosList;
