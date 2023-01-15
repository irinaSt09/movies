package com.movies.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "watchlist")
public class Watchlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ElementCollection
    @Column(nullable = false)
    private Set<Integer> movies;

    @Column(nullable = false, length = 64)
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userID;

    @Column(nullable = false)
    private Date dateCreated;

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

    public User getUser() {
        return userID;
    }

    public void setUser(User user) {
        this.userID = user;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
}
