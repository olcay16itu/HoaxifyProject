package com.hoaxify.webservice.Controller;

import com.hoaxify.webservice.Annotations.CurrentUser;
import com.hoaxify.webservice.DTO.UserDTO;
import com.hoaxify.webservice.Service.UserService;
import com.hoaxify.webservice.Shared.GenericResponse;
import com.hoaxify.webservice.entity.User;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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

}
