import React, { useEffect } from "react";
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
    videos = videos.slice(0, 5);
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
          {videos.map((v, index) => {
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <VideoViewer key={index} video={v} />
            </Grid>;
          })}
        </>
      ) : (
        <p>No videos available</p>
      )}
    </>
  );
};

export default VideosList;
