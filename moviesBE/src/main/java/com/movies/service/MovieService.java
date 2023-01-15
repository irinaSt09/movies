package com.movies.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movies.entity.CachedMovie;
import com.movies.entity.Sort;
import com.movies.repository.CachedMovieRepository;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.Discover;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.MovieDb;
import info.movito.themoviedbapi.model.core.IdElement;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MovieService {

    private static final String LANG = "en-US";
    private final TmdbApi tmdbApi;
    private final CachedMovieRepository cachedMovieRepository;
    private final ObjectMapper om;

    public MovieService(TmdbApi tmdbApi, CachedMovieRepository cachedMovieRepository, ObjectMapper om) {
        this.tmdbApi = tmdbApi;
        this.cachedMovieRepository = cachedMovieRepository;
        this.om = om;
    }

    public List<MovieDb> getPopularMovies() {
        var movies = tmdbApi.getMovies().getPopularMovies(LANG, 1).getResults();
        return cacheAll(movies.stream().map(IdElement::getId).collect(Collectors.toList()));
    }

    public List<MovieDb> getAllPopularMovies() {
        var cnt = 1;
        var curr = tmdbApi.getMovies().getPopularMovies(LANG, cnt);
        var list = new LinkedList<>(curr.getResults());

        while (cnt < 10) {
            curr = tmdbApi.getMovies().getPopularMovies(LANG, cnt++);
            list.addAll(curr.getResults());
        }

        return cacheAll(list.stream().map(IdElement::getId).collect(Collectors.toList()));
    }

    public MovieDb getMovie(Integer id) {
        var cached = cachedMovieRepository.findById(id);
        if (cached.isPresent()) {
            try {
                return om.readValue(cached.get().getMovie(), MovieDb.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        var apiMovie = tmdbApi.getMovies().getMovie(id, LANG);
        cache(apiMovie);

        return apiMovie;
        }

    public List<Genre> getAllGenres() {
        return tmdbApi.getGenre().getGenreList(LANG);
    }

    public List<MovieDb> searchMoviesByTitle(String name) {
        var movies = tmdbApi.getSearch().searchMovie(UriUtils.encodePath(name, StandardCharsets.UTF_8), 0, LANG, true, 0).getResults();
        return cacheAll(movies.stream().map(IdElement::getId).collect(Collectors.toList()));
    }

    public List<MovieDb> discover(Sort sortBy, Integer minimumRatingCount, List<Integer> genres, Integer year, Boolean includeAdult) {
        var discover = new Discover();
        discover.sortBy(sortBy.toSortBy());

        discover.includeAdult(false);
        if (includeAdult != null) {
            discover.includeAdult(includeAdult);
        }

        if (year != null) {
            discover.year(year);
        }

        if (genres != null && !genres.isEmpty()) {
            discover.withGenres(genres.stream().map(String::valueOf).collect(Collectors.joining(",")));
        }

        discover.language(LANG);
        discover.voteCountGte(minimumRatingCount != null ? minimumRatingCount : 1000);
        return tmdbApi.getDiscover().getDiscover(discover).getResults();
    }

    private List<MovieDb> cacheAll(List<Integer> ids) {
        var availableMovies = cachedMovieRepository.findAllById(ids);
        var availableMoviesIds = availableMovies.stream().map(CachedMovie::getId).collect(Collectors.toSet());
        var needsToBeCached = ids.stream().filter(id -> !availableMoviesIds.contains(id)).collect(Collectors.toSet());

        for (var id : needsToBeCached) {
            var apiMovie = tmdbApi.getMovies().getMovie(id, LANG);

            var cachedMovie = cache(apiMovie);
            availableMovies.add(cachedMovie);
        }

        return availableMovies.stream().map(m -> {
            try {
                return om.readValue(m.getMovie(), MovieDb.class);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

    private CachedMovie cache(MovieDb movieDb) {
        var cachedMovie = new CachedMovie();
        cachedMovie.setId(movieDb.getId());

        try {
            cachedMovie.setMovie(om.writeValueAsString(movieDb));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return cachedMovieRepository.save(cachedMovie);
    }
}
