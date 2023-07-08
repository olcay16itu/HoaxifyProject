package com.hoaxify.webservice.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
//    @Value("${upload-path}")
//    String uploadpath;
    @Autowired
    AppConfiguration appConfiguration;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // http://localhost:8080/images/profile.png
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:"+appConfiguration.getUploadPath())
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }
    @Bean
    CommandLineRunner createStorageDirectories(){
        return (args)->{
          File folder = new File(appConfiguration.getUploadPath());
          boolean state = folder.exists()&&folder.isDirectory();
          if(!state){
            folder.mkdir();
          }
        };
    }
}
