package com.psd.backend.respository;

import com.psd.backend.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends CrudRepository<User, Integer>{
    User findByUser(String username);

    boolean existsByUsername(String username);
    
}
