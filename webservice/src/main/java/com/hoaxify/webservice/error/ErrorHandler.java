package com.hoaxify.webservice.error;

import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ErrorHandler implements ErrorController {
    @Autowired
    ErrorAttributes errorAttributes;

    @RequestMapping("/error")
    ApiError handleError(WebRequest webRequest) {
        //ErrorAttributeOptions errorAttributeOptions = ErrorAttributeOptions.defaults()
        // .including(ErrorAttributeOptions.Include.MESSAGE).including(ErrorAttributeOptions.Include.BINDING_ERRORS);
        Map<String, Object> errorMap = errorAttributes.getErrorAttributes(webRequest, ErrorAttributeOptions.of(ErrorAttributeOptions.Include.MESSAGE, ErrorAttributeOptions.Include.BINDING_ERRORS));
        ApiError apiError = new ApiError((Integer) errorMap.get("status"), (String) errorMap.get("message"), (String) errorMap.get("path"));
        if (errorMap.containsKey("errors")) {
            List<FieldError> fieldErrors = (List<FieldError>) errorMap.get("errors");
            Map<String, String> validationErrors = new HashMap<>();
            for (FieldError fieldError : fieldErrors) {
                validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            apiError.setValidationErrors(validationErrors);
        }
        return apiError;
    }

    public String getErrorPath() {
        return "/error";
    }

}
