package com.hoaxify.webservice.entity;

import com.hoaxify.webservice.Annotations.UniqueUsername;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //Kendi mesaj keyimizi verirek Validation message properties içerisinde değiştirebiliriz.
    @NotNull(message = "{hoaxify.constraints.username.NotNull.message}")
    @Size(min = 4,max = 255)
    @UniqueUsername
    private String username;
    @NotNull
    @Size(min = 4,max = 255)
    private String displayname;
    @NotNull(message = "{hoaxify.constraints.password.NotNull.message}")
    @Size(min = 8,max = 255,message = "{hoaxify.constraints.password.Size.message}")
    //içerisinde en az 1 adet büyük 1 adet küçük ve 1 adet sayı
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message = "{hoaxify.constraints.password.Pattern.message}")
    private String password;
}
