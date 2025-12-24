package com.example.url_shortener.service.impl;

import com.example.url_shortener.entity.UrlMapping;
import com.example.url_shortener.exception.UrlNotFoundException;
import com.example.url_shortener.repository.UrlMappingRepository;
import com.example.url_shortener.service.UrlShorteningService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UrlShorteningServiceImplTest {

    @Mock
    private UrlMappingRepository repository;

    @InjectMocks
    private UrlShorteningServiceImpl shorteningService;

    private UrlMapping urlMapping;

    @BeforeEach
    void setup(){
        urlMapping=new UrlMapping(1L,"abc","www.google.com", Instant.now(),Instant.now().plus(7,ChronoUnit.DAYS));
    }

    @Test
    void redirectUrl_should_return_longUrl() {
        when(repository.findByShortUrl("abc")).thenReturn(Optional.of(urlMapping));

        String result=shorteningService.redirectUrl("abc");

        assertEquals(urlMapping.getLongUrl(),result);
    }
    @Test
    void redirectUrl_should_throw_UrlNotFoundException(){
        when(repository.findByShortUrl("bcd")).thenReturn(Optional.empty());

        Exception ex=assertThrows(UrlNotFoundException.class,()->shorteningService.redirectUrl("bcd"));

        assertEquals("Url doesnt exist with URI : "+"bcd",ex.getMessage());
    }
}