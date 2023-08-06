
# Full Stack Development 2 - Assignment.

__Name:__ Grace Kelly

## Features.

+ Trending Actors
+ Actor Details
+ Similar Movies/TV Shows
+ Tv Shows
+ Tv Show Details
+ Trending Actors
+ Actor Details
+ Favourite Actors
+ Upcoming Movies
+ Top Rated Movies
+ TV Shows
+ TV Show Details
+ Favourite TV Shows
+ Fantasy Movies
+ Fantasy Movie Form
+ Fantasy Movie Details
+ Playlists
+ Create Playlist
+ Playlsit Details
+ Add Movie to Playlist
+ User Login
+ User Signup
+ User Logout
+ Multi Criteria Search
+ Sort Movies/TV Shows
+ Filter Movies/TV Shows
+ Pagination
+ Extended Movie Details
+ Authentication
+ Protected Routes/Functionality
+ Data Hyperlinking
+ Server State Caching
+ Supabase used
+ Deployed to Vercel

## Feature Design.

#### Trending Actors

> Lists trending actors from Trending People endpoint of TMDB.

![](images/trending_actors.jpg)

> Click 'View' link in card to view Actor Details and Click 'Add to Favourites' to add Actor to Favourite Actors

![](images/add_actor_to_favourites.jpg)


#### Actor Details

> Displays overview of actor from People Details endpoint of TMDB

![](images/actor_details.jpg)

> Also displays movie credits of actor (retrieved using Combined Credits TMDB Endpoint). Clicking on row brings 
user to details page of that movie.

![](images/actor_credits.jpg)

> Clicking on IMDB Button brings user to actor's IMDB Page

![](images/imdb_page.jpg)

#### Favourite Actors

> Lists actors that user has added to favourites

![](images/fav_actors.jpg)

> Order of actors can be changed via arrow buttons

![](images/order_changed.jpg)

> Actor can be deleted from list

![](images/actor_deleted.jpg)

> If no favourite actors, message is displayed

![](images/no_actors.jpg)


#### Upcoming Movies

> Lists Movies from Upcoming Movies endpoint of TMDB.

![](images/upcoming.jpg)

> Movie can be added to watchlist

![](images/add_to_watchlist.jpg)


#### Top Rated Movies

> Lists Movies from Top Rated Movies endpoint of TMDB.

![](images/top_rated.jpg)

> Movie can be added to favourites

![](images/top_rated_fav.jpg)


#### TV Shows

> Lists TV Shows from List TV endpoint of TMDB.

![](images/tv_shows_list.jpg)

> Tv Show can be added to favourites

![](images/add_to_fav_tv_shows.jpg)


#### TV Show Details

> Displays overview of TV Show from TV Details endpoint of TMDB. Displays Snapshot of Cast and Videos (videos 
retrieved using TV Videos Endpoint)

![](images/tv_show_details.jpg)

> Displays Similar TV Shows (retrieved using Similar TV TMDB Endpoint). Clicking on table row brings user to details page
of that TV Show.

![](images/similar_tv_shows.jpg)

> If user clicks on "Watch" icon, brought to where the show can be viewed e.g Netflix/BBC iplayer

![](images/bbc_iplayer.jpg)


#### Favourite TV Shows

> Lists TV Shows that user has added to favourites. Order of Tv Shows can be changed and 
TV Show can be deleted from list (same as favourite movies/actors)

![](images/fav_tv_shows.jpg)

> User can click on Write Review Button to be brought to Write Review Page

![](images/review_page.jpg)

#### Fantasy Movies

> Fantasy Movies Listed, displays title, poster (if one is uploaded) and shows options to delete/view

![](images/fantasy_movie_list.jpg)

> If none, displays alert message

![](images/no_fantasy_movies.jpg)

#### Create a Fantasy Movie

> Form where user enters in fantasy movie details (title, overview, genres, release date, production company
 poster image and cast)

 ![](images/create_fantasy_movie_form.jpg)

> Can select multiple genres (options retrieved from Genres List TMDB Endpoint)

![](images/multiple_genres.jpg)

> Release date is a datepicker component with current date as default

![](images/datepicker.jpg)

> Can add multiple cast members

![](images/cast.jpg)

> Can delete each row if no longer wish to add cast member (below is after deleting rows)

![](images/deleting_cast_members.jpg)

> Submitting form displays success message and redirects back to list page

![](images/success_message_fantasy_movie.jpg)

#### Fantasy Movie Details

> Displays Fantasy Movie information

![](images/fantasy_movie_details.jpg)


#### Playlists

> Lists playlists created by user

![](images/playlist_details.jpg)

> If no playlists, displays alert message

![](images/no_playlists_found.jpg)

> Clicking 'Create Playlist' displays dialog with form, submitting form creates a playlist and adds to list

![](images/playlist_dialog.jpg)

#### Playlist Details

> Displays Playlists overview with movies belonging to list displayed in table

![](images/playlist_movies.jpg)

> Movies can be deleted from the playlist using delete option in table (table after deleting movie)

![](images/playlist_overview.jpg)

> If no movies listed, message is displayed

![](images/playlist_details_no_movies.jpg)

#### Add Movie to Playlist

> If playlist has been created, user sees add to playlist icon on movie card

![](images/add_to_playlsit.jpg)

> Clicking this presents user with dialog and dropdown of playlists to choose from

![](images/playlist_dropdown.jpg)

> Selecting playlist, adds movie to it and displays icon on movie card. When icon is hovered over, tooltip is displayed
listing which playlist(s) the movie has been added to

![](images/added_to_playlist.jpg)


#### User Login/Logout

> Form which user enters in credentials to login to application (stored in Supabase Authentication)

![](images/login.jpg)


> If credentials are invalid, message is displayed

![](images/invalid_login.jpg)

> When user logs out, it unsets the session and user is redirected back to login page.

#### User Signup

> User can provide email and password in order to create a user for the appliation (stored in supabase). User
must confirm their email before they can proceed to login to app.

![](images/signup.jpg)


#### Multi Criteria Search
> User can search for movies/tv shows with a specific title, release year, language. They can also choose whether to include adult in the results 
by checking the checkbox. Querieds the Search TMDB Endpoint.

![](images/search_results.jpg)


> If no results found, message is displayed

![](images/no_results_found.jpg)

#### Sort Movies/TV Shows

> Movies/TV Shows can be sorted by the following in ascending/descending order: revenue, release date, vote average

![](images/sort_options.jpg)

> Movies sorted by revenue (desc)

![](images/sort_by_rev_desc.jpg)


#### Extended Filters

> Movies/TV Shows can be filtered by the following: genre, release year, language, vote average (gte), vote average (lte). Genres and Languages 
are retrieved using respective TMDB endpoints and the release year is a datepicker component.

![](images/filter_form.jpg)

Movies filtered by Music genre

![](images/filter_by_music_genre.jpg)


Movies filterd by release year of 2001

![](images/movies_filtered_by_release_year_2001.jpg)

> TV Shows can also be filtered using the above criteria. Example of TV Shows being filtered by Animation genre:


![](images/tv_shows_filtered_animation.jpg)

#### Pagination

> Pagination added to home page, upcoming movies, top rated movies and tv shows pages. Total results displayed.

![](images/pagination.jpg)

> Clicking arrow/number displays an updated list of results

![](images/pagination_change.jpg)


#### Reorder Favourites/Watchlist

> Cards in list can be reorderd. If the element is first on the list, it can only be moved down. 
If it is last on the list it can only be moved up.

![](images/move_btns.jpg)

#### Extended Movie Details

> Cast Snapshot, Videos and Similar Movies added to Movie Details page

![](images/extended_movie_details.jpg)

#### Data Hyperlinking

Multiple links across site: 
 - navbar links to different pages on site
 - links to view movie/tv/actor from cards
 - forward/back and home links on page header
 - link to write review both from card and from within details page
 - link to view review details in reviews table
 - link to add movies to playlist from playlist details page
 - link to visit movie/tv show details page within similar movies/tv table
 - external links to actor's imdb page and to tv show's page to watch it.

#### Server State Caching

Made use of [server state caching](https://github.com/gracielily/MoviesAppAssignment/blob/main/src/index.jsx#L42) using `react-query`

## Storybook.

No added storybook stories beyond previous lab work

## Authentication

Authentication added using supabase, user must login in order to access 
all pages/features. Token set on login and is unset when user logs out.

#### Protected routes 

+ / - Homepage - lists all movies
+ /login - Login to application
+ /login - Signup to application
+ /movies/upcoming - List of upcoming movies
+ /movies/top - Top Rated Movies
+ /movies/{id} (Protected) - Movie Details
+ /movies/watchlist (Protected) - List movies marked as must watch
+ /movies/favourites (Protected) - Favourite Movies
+ /tvshows - List of tv shows
+ /tvshows/{id} (Protected) - TV Show Details
+ /tvshows/favourites (Protected) - Favourite TV Shows
+ /trending-actors/ - List of actors that are trending
+ /actors/{id} (Protected) - Actor Details
+ /actors/favourites (Protected) - Favourite Actors
+ /reviews/{id} (Protected) - Review Details
+ /reviews/form (Protected) - Add a new review
+ /fantasy-movies (Protected) - List of fantasy movies
+ /fantasy-movies/{id} (Protected) - Fantasy Movie Details
+ /fantasy-movies/form (Protected) - Create a new fantasy movie
+ /search (Protected) - Search for a specific movie
+ /playlists (Protected) - List of playlists
+ /playlists/{id} (Protected) - Playlist Details

#### Protected functionality

> Only Authenticated users can filter movies/tv shows if not logged in the following is displayed:

![](images/login_use_filters.jpg)

> Only authenticated users can see option to view a movie/tv show/actor and to add to favourites/watchlist/playlist and also to write a review, 
if not logged in these options are not visible on the movie card.

![](images/cannot_add_to_favourites.jpg)


> Private page links are displayed on navbar only if user is authenticated

Unauthenticated User Navbar:

![](images/unauth_links.jpg)


Authenticated User Navbar:

![](images/auth_links.jpg)



#### Supabase 

> Supabase Setup

![](images/supabase_project_1.jpg)

![](images/supabase_project_2.jpg)

> Supabase Authentication (users storage)

![](images/supabase_auth.jpg)

> Supabase Storage (fantasy movie poster storage)

![](images/supabase_storage.jpg)

## Deployment

Username: 12722041@mail.wit.ie ; Password: admin

URL: https://movies-app-assignment-eight.vercel.app/

Vercel Project Details:

![](images/vercel_setup.jpg)

Project Deployments Snapshot:

![](images/vercel_deployments_snapshot.jpg)


## Additional Information

> Featured Card displayed at top of page above list of movies and tv shows

![](images/feature_card.jpg)

> User Review added to top of Reviews 

![](images/my_review.jpg)

> When Form submitted, button changes to display 'submitting' and form buttons are disabled

![](images/buttons_changed.jpg)


