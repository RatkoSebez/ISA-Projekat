package com.example.service;

import com.example.dto.UserDTO;
import com.example.model.DeleteAccountRequest;
import com.example.model.ReservationBoat;
import com.example.model.User;
import com.example.model.UserRole;
import com.example.repository.DeleteAccountRequestRepository;
import com.example.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.hibernate.sql.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ClientService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private DeleteAccountRequestRepository deleteAccountRequestRepository;

    public User editUser(User user){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User oldUser = (User)principal;
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        if(user.getPassword().equals("")) encodedPassword = oldUser.getPassword();
        User newUser = new User(encodedPassword, user.getEmail(), user.getFirstName(), user.getLastName(), user.getAddress(), user.getCity(), user.getCountry(), user.getPhoneNumber(), oldUser.getId(), oldUser.getRole(), oldUser.getLoyaltyCategory(), oldUser.getLoyaltyPoints(), oldUser.getLoyaltyBenefits());
        userRepository.save(newUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(newUser, newUser.getPassword(), newUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return newUser;
    }

    public Boolean deleteUser(DeleteAccountRequest deleteRequest){
        deleteAccountRequestRepository.save(new DeleteAccountRequest(deleteRequest.getReason(), deleteRequest.getUserId()));
        return true;
    }
}
