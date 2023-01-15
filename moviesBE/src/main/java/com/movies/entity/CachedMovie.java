package com.movies.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "movies")
public class CachedMovie implements Serializable {

    @Id
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("movie")
    @Column(nullable = false, length = 10000)
    private String movie;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }
}
