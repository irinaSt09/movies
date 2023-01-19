package com.movies.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movies.entity.Sort;
import com.movies.service.AnalyticsProducer;
import com.movies.service.MovieService;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.MovieDb;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class MoviesController {

    private final MovieService movieService;

    private final AnalyticsProducer analyticsProducer;

    private ObjectMapper objectMapper;

    public MoviesController(MovieService movieService, AnalyticsProducer analyticsProducer, ObjectMapper objectMapper) {
        this.movieService = movieService;
        this.analyticsProducer = analyticsProducer;
        this.objectMapper = objectMapper;
    }

    @QueryMapping
    public List<MovieDb> popularMovies() {
        produce(Map.of("endpoint", "popularMovies"));
        return movieService.getPopularMovies();
    }

    @QueryMapping
    public List<MovieDb> allPopularMovies() {
        produce(Map.of("endpoint", "allPopularMovies"));
        return movieService.getAllPopularMovies();
    }

    @QueryMapping
    public List<MovieDb> getMovies(@Argument List<Integer> ids) {
        produce(Map.of("endpoint", "getMovies", "arguments", ids.stream().map(Object::toString).collect(Collectors.joining(", "))));
        return movieService.getMovies(ids);
    }

    @QueryMapping
    public List<MovieDb> searchMoviesByTitle(@Argument String title) {
        produce(Map.of("endpoint", "searchMoviesByTitle", "arguments", title));
        return movieService.searchMoviesByTitle(title);
    }

    @QueryMapping
    List<Genre> getAllGenres() {
        produce(Map.of("endpoint", "getAllGenres"));
        return movieService.getAllGenres();
    }

    @QueryMapping
    List<MovieDb> discover(@Argument Sort sortBy, @Argument Integer minimumRatingCount, @Argument List<Integer> genres, @Argument Integer year, @Argument Boolean includeAdult) {
        genres = genres == null ? Collections.emptyList() : genres;
        var argument = sortBy.toSortBy() + " " + minimumRatingCount + " " + genres.stream().map(Object::toString).collect(Collectors.joining(", "))
                + " " + year + " " + includeAdult;
        produce(Map.of("endpoint", "discover", "arguments", argument));
        return movieService.discover(sortBy, minimumRatingCount, genres, year, includeAdult);
    }

    private void produce(Map<String, String> data) {
        try {
            analyticsProducer.sendMessage(objectMapper.writeValueAsString(data));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
