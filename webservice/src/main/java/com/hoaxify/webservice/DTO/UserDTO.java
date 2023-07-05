package com.hoaxify.webservice.DTO;


import com.hoaxify.webservice.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    public UserDTO(User user) {
        this.username = user.getUsername();
        this.displayname = user.getDisplayname();
        this.image = user.getImage();
    }

    private String username;
    private String displayname;
    private String image;

}
