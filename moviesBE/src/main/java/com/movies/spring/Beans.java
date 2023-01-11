package com.movies.spring;

import info.movito.themoviedbapi.TmdbApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class Beans {

    @Bean
    public TmdbApi tmdbApi() {
        return new TmdbApi("ec5715c3f3247a05815345ae1ad60fe3");
    }

//    @Bean
//    public DataSource dataSource() {
//        var dataSource = new DriverManagerDataSource();
//
//        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
//        dataSource.setUsername("mysqluser");
//        dataSource.setPassword("mysqlpass");
//        dataSource.setUrl("jdbc:mysql://localhost:3306/myDb?createDatabaseIfNotExist=true");
//
//        return dataSource;
//    }
}
