package com.hoaxify.webservice.Annotations;

import com.hoaxify.webservice.Validator.UniqueUsernameValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotNull;

import java.lang.annotation.*;
//Kendi anatosyonumuzu yazdık Target nerede kullanılacagı , Retention hangi zamanda çalışacağı , Constraint validatedBy ise class
// içinde isValid metodu yazmak zorunlu.Bu metodu kullanarak valid mi değil mi kontrol ediyoruz.Body bizim tarafımızdan override ediliyor.
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {UniqueUsernameValidator.class}
)
public @interface UniqueUsername {
    //Bu 3 field ise anatosyonun içinde bulunması gereken alanlar.
    String message() default "{hoaxify.constraint.username.UniqueUsername.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
