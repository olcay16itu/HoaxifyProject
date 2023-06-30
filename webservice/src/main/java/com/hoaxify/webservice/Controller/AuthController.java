package com.hoaxify.webservice.Controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.Annotations.CurrentUser;
import com.hoaxify.webservice.Repositories.UserRepository;
import com.hoaxify.webservice.Shared.Views;
import com.hoaxify.webservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    @Autowired
    UserRepository userRepository;
    //private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    @PostMapping("api/1.0/auth")
    @JsonView(Views.Base.class) // Jsonu bu objeye göre oluştur.
    ResponseEntity<?> handleAuthentication(@CurrentUser User user ){
        return ResponseEntity.ok(user);
    }
}
