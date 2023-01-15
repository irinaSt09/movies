package com.movies.repository;

import com.movies.entity.CachedMovie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CachedMovieRepository extends JpaRepository<CachedMovie, Integer> {
}
