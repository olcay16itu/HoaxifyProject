package com.hoaxify.webservice;

import com.hoaxify.webservice.Repositories.UserRepository;
import com.hoaxify.webservice.Service.UserService;
import com.hoaxify.webservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
//(exclude = {SecurityAutoConfiguration.class})
public class WebserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebserviceApplication.class, args);
	}
	@Bean
	CommandLineRunner createInitialUsers(UserService userservice){
		return (args) ->{
				User user = new User();
				user.setUsername("user2");
				user.setDisplayname("display1");
				user.setPassword("user123");
				userservice.addUser(user);
			};
	}

}
