package com.hoaxify.webservice.entity;

import com.hoaxify.webservice.Annotations.UniqueUsername;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //Kendi mesaj keyimizi verirek Validation message properties içerisinde değiştirebiliriz.
    @NotNull(message = "{hoaxify.constraints.username.NotNull.message}")
    @Size(min = 4,max = 255)
    @UniqueUsername

    private String username;
    @NotNull(message = "{hoaxify.constraints.displayname.NotNull.message}")
    @Size(min = 4,max = 255)

    private String displayname;
    @NotNull(message = "{hoaxify.constraints.password.NotNull.message}")
    @Size(min = 8,max = 255,message = "{hoaxify.constraints.password.Size.message}")
    //içerisinde en az 1 adet büyük 1 adet küçük ve 1 adet sayı
    @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message = "{hoaxify.constraints.password.Pattern.message}")
    private String password;

    private String image;

    @Override

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList("Role_user");
    }

    @Override

    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override

    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
