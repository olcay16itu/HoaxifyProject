package com.hoaxify.webservice.Controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.Repositories.UserRepository;
import com.hoaxify.webservice.Shared.Views;
import com.hoaxify.webservice.entity.User;
import com.hoaxify.webservice.error.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {
    @Autowired
    UserRepository userRepository;
    //private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    @PostMapping("api/1.0/auth")
    @JsonView(Views.Base.class) // Jsonu bu objeye göre oluştur.
    ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization")String authorization){
        //required=false kaldırdık çünkü header olmadığı senaryoda dahil spring boot security unauthorize olarak değerlendiriyor.
        // Buraya geliyorsa zaten succes ve headerı vardır.
        //log.info(authorization);
        //Spring securityde bu kısımları hallettik.Kontrol etmemize gerek kalmadı.Sadece success case buraya gelecek.
        /*if(authorization==null){
            ApiError error=new ApiError(401,"Unauthorized request","/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }*/
        String base64encoded = authorization.split("Basic ")[1];
        String decoded = new String(Base64.getDecoder().decode(base64encoded));
        String username = decoded.split(":")[0];
        /*String password = decoded.split(":")[1];
        */
        User user = userRepository.findByusername(username);
        /*String hashedpassword = user.getPassword();
        if(user==null){
            ApiError error=new ApiError(401,"Unauthorized request","/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        if(!passwordEncoder.matches(password,hashedpassword)){
            ApiError error=new ApiError(401,"Unauthorized request","/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }*/
        /*Map<String,String> responseBody = new HashMap<>();
        responseBody.put("username",user.getUsername());
        responseBody.put("displayName",user.getDisplayname());
        responseBody.put("image",user.getImage());*/


        return ResponseEntity.ok(user);
    }
    //Burada bu çalışmıyor.Bunun yerine hata yönetimini ErrorHandler ile yapacağız.
    /*
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiError handleException(){
        ApiError apiError= new ApiError(401,"Unauthorized error","/api/1.0/users");
        return apiError;
    }
     */
}
