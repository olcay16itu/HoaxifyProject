package com.hoaxify.webservice.Repositories;

import com.hoaxify.webservice.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "select count(u) from User u where u.username=:username")
    User anyUserexist(@Param("username")String username);
    //JPA sql sorgusu yazmadan direk olarak By ile sorgu özelliği
    User findByusername(String username);
    Page<User> findByusernameNot(String username,Pageable page);
}
