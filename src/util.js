import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export default function setQueryString(queryParams, query, type) {
  const queryToSend = { ...queryParams };
  if (type === "tv") {
    queryToSend.first_air_date_year = query.year;
  } else {
    queryToSend.primary_release_year = query.year
  }
  if (query.language) queryToSend.language = query.language;
  queryToSend.sort_by = query.sort_by;
  if (query.with_genres) {
    if (query.with_genres === "0" && queryToSend.with_genres) {
      delete queryToSend.with_genres;
    } else {
      queryToSend.with_genres = query.with_genres;
    }
  }
  if (query["vote_average.gte"]) queryToSend["vote_average.gte"] = query["vote_average.gte"];
  if (query["vote_average.lte"]) queryToSend["vote_average.lte"] = query["vote_average.lte"];
  return queryToSend
}
