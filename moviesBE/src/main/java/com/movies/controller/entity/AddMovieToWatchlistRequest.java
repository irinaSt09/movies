package com.movies.controller.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AddMovieToWatchlistRequest(@JsonProperty("movie_id") Integer movieID, @JsonProperty("name") String name) {
}
