package com.movies.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {

    @GetMapping("/test")
    public Integer getNumberOfUsers() {
        return 42;
    }
}
