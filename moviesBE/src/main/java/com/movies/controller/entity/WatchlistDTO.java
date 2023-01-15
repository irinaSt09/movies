package com.movies.controller.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.sql.Date;
import java.util.Set;

public class WatchlistDTO implements Serializable {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("movies")
    private Set<Integer> movies;

    @JsonProperty("name")
    private String name;

    @JsonProperty("user_id")
    private Long userID;

    @JsonProperty("date_created")
    private Date dateCreated;

    public WatchlistDTO(Integer id, Set<Integer> movies, String name, Long userID, Date dateCreated) {
        this.id = id;
        this.movies = movies;
        this.name = name;
        this.userID = userID;
        this.dateCreated = dateCreated;
    }

    public WatchlistDTO() {
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public Set<Integer> getMovies() {
        return movies;
    }

    public void setMovies(Set<Integer> movies) {
        this.movies = movies;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUser() {
        return userID;
    }

    public void setUser(Long user) {
        this.userID = user;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
}
