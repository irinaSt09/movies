package com.movies.controller;

import com.movies.service.MovieService;
import info.movito.themoviedbapi.model.MovieDb;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
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
}
