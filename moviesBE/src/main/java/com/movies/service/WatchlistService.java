package com.movies.service;

import com.movies.controller.entity.WatchlistDTO;
import com.movies.entity.Watchlist;
import com.movies.repository.UserRepository;
import com.movies.repository.WatchlistRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.util.Collections;
import java.util.List;

@Service
public class WatchlistService {
    private final WatchlistRepository watchlistRepository;
    private final UserRepository userRepository;

    public WatchlistService(WatchlistRepository watchlistRepository, UserRepository userRepository) {
        this.watchlistRepository = watchlistRepository;
        this.userRepository = userRepository;
    }

    public List<Watchlist> getCurrentUserWatchlist(String username) {
        return watchlistRepository.findByUsername(username);
    }

    public Integer createWatchlist(String name, String username) {
        var watchlist = new Watchlist();

        watchlist.setName(name);
        watchlist.setDateCreated((new Date(Instant.now().getEpochSecond())));
        watchlist.setUser(userRepository.findByUsername(username).get());
        watchlist.setMovies(Collections.emptySet());

        return watchlistRepository.save(watchlist).getId();
    }

    public Watchlist modifyWatchlist(Integer watchlistID, Integer movieID, String name) {
        var watchlist = watchlistRepository.findById(watchlistID).get();
        if (movieID != null) {
            watchlist.getMovies().add(movieID);
        }
        if (name != null) {
            watchlist.setName(name);
        }
        return watchlistRepository.save(watchlist);
    }

    public void delete(Integer id) {
        watchlistRepository.deleteById(id);
    }

    public Watchlist deleteMovieFromWatchlist(Integer watchlistID, Integer movieID) {
        var watchlist = watchlistRepository.findById(watchlistID).get();
        watchlist.getMovies().remove(movieID);
        return watchlistRepository.save(watchlist);
    }
}
