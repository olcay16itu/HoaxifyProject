package com.hoaxify.webservice.Controller;

import com.hoaxify.webservice.Annotations.CurrentUser;
import com.hoaxify.webservice.DTO.UserDTO;
import com.hoaxify.webservice.DTO.UserUpdateDTO;
import com.hoaxify.webservice.Service.UserService;
import com.hoaxify.webservice.Shared.GenericResponse;
import com.hoaxify.webservice.entity.User;
import com.hoaxify.webservice.error.ApiError;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/1.0")
public class UserController {
    //private static final Logger log = LoggerFactory.getLogger(UserController.class);

    UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }
    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public GenericResponse createUser(@Valid @RequestBody User user){
        userService.addUser(user);
        return new GenericResponse("User created");
    }
    @GetMapping("/users")
    public Page<UserDTO> getAllUsers(Pageable page, @CurrentUser User current){
        return userService.getAllUsers(page,current).map((user)->{
                    UserDTO userDTO = new UserDTO(user);
                    return userDTO;
                }
        );
    }
    @GetMapping("/users/{username}")
    public UserDTO getUser(@PathVariable String username){
       User user =  userService.getUser(username);
       UserDTO userDTO = new UserDTO(user);
       return userDTO;
    }
    @PutMapping("/users/{username}")
    @PreAuthorize("#username == principal.username")
    UserDTO updateDisplayname(@Valid @RequestBody UserUpdateDTO userUpdateDTO, @PathVariable String username){
       // if (!Loggedin.getUsername().equals(username)) {
       //     ApiError apiError = new ApiError(403,"Cannot change another users data","api/1.0/users/"+username);
       //     return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiError);
       // }

        User user= userService.updateUser(username,userUpdateDTO);
        return new UserDTO(user);
    }

}
