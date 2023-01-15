package com.movies.repository;

import com.movies.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<Watchlist, Integer> {
    @Query("SELECT w FROM Watchlist w WHERE w.userID.username = ?1")
    List<Watchlist> findByUsername(String username);
}
