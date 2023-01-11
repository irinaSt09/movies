package com.movies.spring;

import info.movito.themoviedbapi.TmdbApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Beans {

    @Bean
    public TmdbApi tmdbApi() {
        return new TmdbApi("ec5715c3f3247a05815345ae1ad60fe3");
    }
}
