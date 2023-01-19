package com.movies.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.util.concurrent.CompletableFuture;

@Component
public class AnalyticsProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public AnalyticsProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String message) {
        var future = kafkaTemplate.send("analytics", message);
        future.whenComplete((result, error) -> {
            if (error != null) {
                System.out.println("Unable to send message=["
                        + message + "] due to : " + error.getMessage());
            }
            System.out.println("Sent message=[" + message +
                    "] with offset=[" + result.getRecordMetadata().offset() + "]");
        });
    }
}
