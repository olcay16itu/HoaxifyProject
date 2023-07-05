package com.hoaxify.webservice.Controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.webservice.Annotations.CurrentUser;
import com.hoaxify.webservice.DTO.UserDTO;
import com.hoaxify.webservice.Repositories.UserRepository;
import com.hoaxify.webservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("api/1.0/auth")
    UserDTO handleAuthentication(@CurrentUser User user ){
        return new UserDTO(user);
    }
}
