package com.movies.controller;

import com.movies.controller.entity.AddMovieToWatchlistRequest;
import com.movies.controller.entity.CreateWatchlistRequest;
import com.movies.controller.entity.WatchlistDTO;
import com.movies.entity.Watchlist;
import com.movies.service.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping("")
    public ResponseEntity<List<WatchlistDTO>> getAllWatchlist(Authentication authentication) {
        var watchlist = watchlistService.getCurrentUserWatchlist(authentication.getName());
        return ResponseEntity.ok(watchlist.stream().map(this::toDTO).collect(Collectors.toList()));
    }

    @PostMapping("")
    public ResponseEntity<Integer> createWatchlist(@RequestBody CreateWatchlistRequest createWatchlistRequest, Authentication authentication) {
        var id = watchlistService.createWatchlist(createWatchlistRequest.name(), authentication.getName());
        return ResponseEntity.ok(id);
    }

    @PutMapping("/{id}")
    public WatchlistDTO modify(@RequestBody AddMovieToWatchlistRequest addMovieToWatchlistRequest, @PathVariable Integer id) {
        return toDTO(watchlistService.modifyWatchlist(id, addMovieToWatchlistRequest.movieID(), addMovieToWatchlistRequest.name()));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        watchlistService.delete(id);
    }

    @DeleteMapping("/{watchlistID}/{movieID}")
    public WatchlistDTO deleteMovie(@PathVariable Integer movieID, @PathVariable Integer watchlistID) {
        return toDTO(watchlistService.deleteMovieFromWatchlist(watchlistID, movieID));
    }

    private WatchlistDTO toDTO(Watchlist watchlist) {
        return new WatchlistDTO(watchlist.getId(), watchlist.getMovies(), watchlist.getName(), watchlist.getUser().getId(), watchlist.getDateCreated());
    }
}
