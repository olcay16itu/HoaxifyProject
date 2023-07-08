package com.hoaxify.webservice.Service;

import com.hoaxify.webservice.DTO.UserUpdateDTO;
import com.hoaxify.webservice.Repositories.UserRepository;
import com.hoaxify.webservice.entity.User;
import com.hoaxify.webservice.error.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    FileService fileService;
    public UserService(FileService fileService){
        this.fileService=fileService;
    }
    public void addUser(User user){
        String encryptedpass= passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedpass);
        userRepository.save(user);
    }
    public Page<User> getAllUsers(Pageable page,User user){
        //mapi referans olarak methoda paslama diye bir yenilik var.UserDTO::new şeklinde yaparsak.Eğer userDTO içinde constructor oluştursaydım.User objelerini direk User
        //fieldlarını UserDTO constructorına paslayıp yapacaktı.
        if(user!=null){
            return userRepository.findByusernameNot(user.getUsername(),page);
        }
        return userRepository.findAll(page);
    }
    public User getUser(String username){
        User user = userRepository.findByusername(username);
        if(user==null){
            throw new NotFoundException();
        }
        else {
            return user;
        }
    }
    public User updateUser(String username,UserUpdateDTO userUpdateDTO){
        User user= userRepository.findByusername(username);
        user.setDisplayname(userUpdateDTO.getDisplayname());
        if(userUpdateDTO.getImage()!=null){
            String oldimage = user.getImage();
            try {
                String storedFileName = fileService.writeBase64EncodedStringToFile(userUpdateDTO.getImage());
                user.setImage(storedFileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
            fileService.deleteimage(oldimage);
        }
        return userRepository.save(user);
    }


}
