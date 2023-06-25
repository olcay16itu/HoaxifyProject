package com.hoaxify.webservice.Service;

import com.hoaxify.webservice.Repositories.UserRepository;
import com.hoaxify.webservice.Shared.GenericResponse;
import com.hoaxify.webservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    public void addUser(User user){
        String encryptedpass= passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedpass);
        userRepository.save(user);
    }
}
