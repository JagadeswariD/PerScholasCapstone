package com.jagadeswarid.gsim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.ws.config.annotation.EnableWs;

@SpringBootApplication
@Configuration
@EnableScheduling
@EnableWs
public class DhanagopalJagadeswariGsimCaseStudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(DhanagopalJagadeswariGsimCaseStudyApplication.class, args);
	}

}
