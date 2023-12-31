package com.hoaxify.webservice.Service;

import com.hoaxify.webservice.Configuration.AppConfiguration;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileService {
    @Autowired
    AppConfiguration appConfiguration;
    Tika tika = new Tika();
    public String writeBase64EncodedStringToFile(String image) throws IOException {
        String filename=generateRandomName();
        File target = new File(appConfiguration.getUploadPath()+filename);
        OutputStream outputStream= new FileOutputStream(target);
        byte[] base64encoded = Base64.getDecoder().decode(image);
        outputStream.write(base64encoded);
        outputStream.close();
        return filename;
    }

    public String generateRandomName(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }

    public void deleteimage(String oldimage) {
        if(oldimage==null){
            return;
        }
        try {
            String filepath = appConfiguration.getUploadPath()+"/"+oldimage;
            Files.deleteIfExists(Paths.get(filepath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String detectType(String s) {
        byte[] base64encoded = Base64.getDecoder().decode(s);
        String filetype = tika.detect(base64encoded);
        return filetype;
    }
}
