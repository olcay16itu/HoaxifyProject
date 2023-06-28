package com.hoaxify.webservice.Controller;

import com.hoaxify.webservice.Repositories.UserRepository;
import com.hoaxify.webservice.Service.UserService;
import com.hoaxify.webservice.Shared.GenericResponse;
import com.hoaxify.webservice.entity.User;
import com.hoaxify.webservice.error.ApiError;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    //private static final Logger log = LoggerFactory.getLogger(UserController.class);

    UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }
    @PostMapping("/api/1.0/users")
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse createUser(@Valid @RequestBody User user){
        userService.addUser(user);
        return new GenericResponse("User created");
    }
    //MethodArgumentNotValidException tipinde bir hatayı yakalıyor ve bad request dönüp ApiError olarak oluşturduğum nesneye mapleyip ApiError dönüyor.
    /*@ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidationException(MethodArgumentNotValidException methodArgumentNotValidException){
        ApiError apiError= new ApiError(400,"Validation error","/api/1.0/users");
        Map<String,String> validationErrors=new HashMap<>();
        for(FieldError fieldError:methodArgumentNotValidException.getBindingResult().getFieldErrors()){
            validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        apiError.setValidationErrors(validationErrors);
        return apiError;

    }
     */
}
