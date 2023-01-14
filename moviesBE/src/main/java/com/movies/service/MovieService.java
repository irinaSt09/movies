package com.movies.service;

import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.MovieDb;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class MovieService {

    private static final String LANG = "en-US";
    private final TmdbApi tmdbApi;

    public MovieService(TmdbApi tmdbApi) {
        this.tmdbApi = tmdbApi;
    }

    public List<MovieDb> getPopularMovies() {
        return tmdbApi.getMovies().getPopularMovies("en-US", 1).getResults();
    }

    public List<MovieDb> getAllPopularMovies() {
        var list = new LinkedList<MovieDb>();
        var cnt = 1;
        var curr = tmdbApi.getMovies().getPopularMovies("en-US", cnt);
        list.addAll(curr.getResults());

        while (cnt < 10) {
            curr = tmdbApi.getMovies().getPopularMovies("en-US", cnt++);
            list.addAll(curr.getResults());
        }

        return list;
    }

    public MovieDb getMovie(Integer id){
        return tmdbApi.getMovies().getMovie(id,LANG);
    }
}
