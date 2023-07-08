package com.hoaxify.webservice.DTO;

import com.hoaxify.webservice.Annotations.FileType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateDTO {
    @NotNull
    @Size(min = 4,max = 255)
    private String displayname;
    @FileType(types = {"jpeg","png"})
    private String image;
}
