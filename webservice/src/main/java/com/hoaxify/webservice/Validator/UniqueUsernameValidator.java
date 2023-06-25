package com.hoaxify.webservice.Validator;

import com.hoaxify.webservice.Annotations.UniqueUsername;
import com.hoaxify.webservice.Repositories.UserRepository;
import com.hoaxify.webservice.entity.User;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername,String> {
    @Autowired
    UserRepository userRepository;
    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        User user = userRepository.findByusername(username);
        if(user!=null){
            return false;
        }
        return true;
    }
}
