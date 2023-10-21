package com.psd.backend.respository;

import com.psd.backend.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRespository extends CrudRepository<User, Integer>{
    
}
