package com.example.url_shortener.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import java.time.Instant;

@Data
public class ShortUrlRequestDto {

    @NotEmpty(message = "please provide valid url")
    @URL(message = "provide a valid url")
    private String longUrl;
    private Instant expiredAt;
}
