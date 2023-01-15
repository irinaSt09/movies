package com.movies.entity;

public enum Sort {
    POPULARITY_ASC,
    POPULARITY_DESC,
    RELEASE_DATE_ASC,
    RELEASE_DATE_DESC,
    RATING_ASC,
    RATING_DESC;

    public String toSortBy() {
        return switch (this) {
            case POPULARITY_ASC -> "popularity.asc";
            case POPULARITY_DESC -> "popularity.desc";
            case RELEASE_DATE_ASC -> "release_date.asc";
            case RELEASE_DATE_DESC -> "release_date.desc";
            case RATING_ASC -> "vote_average.asc";
            case RATING_DESC -> "vote_average.desc";
        };
    }
}
