package com.movies.controller;

import com.movies.entity.Sort;
import com.movies.service.MovieService;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.MovieDb;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MoviesController {

    private final MovieService movieService;

    public MoviesController(MovieService movieService) {
        this.movieService = movieService;
    }

    @QueryMapping
    public List<MovieDb> popularMovies() {
        return movieService.getPopularMovies();
    }

    @QueryMapping
    public List<MovieDb> allPopularMovies() {
        return movieService.getAllPopularMovies();
    }

    @QueryMapping
    public List<MovieDb> getMovies(@Argument List<Integer> ids) {
        return movieService.getMovies(ids);
    }

    @QueryMapping
    public List<MovieDb> searchMoviesByTitle(@Argument String title) {
        return movieService.searchMoviesByTitle(title);
    }

    @QueryMapping
    List<Genre> getAllGenres() {
        return movieService.getAllGenres();
    }

    @QueryMapping
    List<MovieDb> discover(@Argument Sort sortBy, @Argument Integer minimumRatingCount, @Argument List<Integer> genres, @Argument Integer year, @Argument Boolean includeAdult) {
        return movieService.discover(sortBy, minimumRatingCount, genres, year, includeAdult);
    }
}
