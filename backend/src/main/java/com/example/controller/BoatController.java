package com.example.controller;

import com.example.dto.ReservationDTO;
import com.example.model.Boat;
import com.example.model.Compliant;
import com.example.model.ReservationBoat;
import com.example.model.WeekendCottage;
import com.example.service.BoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/boat")
public class BoatController {
    @Autowired
    private BoatService boatService;

    @GetMapping()
    public List<Boat> getAllBoats(){
        return boatService.getAllBoats();
    }

    @PreAuthorize("hasRole('ROLE_BOATOWNER')")
    @GetMapping(path = "/myboats/{id}")
    public List<Boat> getAllMyBoats(@PathVariable Long id){
        return boatService.getAllMyBoats(id);
    }

    @GetMapping(path = "/reservation")
    public List<ReservationBoat> getAllReservationsThatCanBeCancelled(){
        return boatService.getAllBoatReservationsThatCanBeCancelled();
    }

    @GetMapping(path = "/allreservations")
    public List<ReservationBoat> getAllBoatReservations(){
        return boatService.getAllBoatReservations();
    }

    @GetMapping(path = "{id}")
    public Optional<Boat> getBoat(@PathVariable Long id){
        return boatService.getBoat(id);
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping(path = "/reservation")
    public Boolean makeBoatReservation(@RequestBody ReservationDTO boatReservationDTO) {
        System.out.println("--------------------" + boatReservationDTO.getStartDate());
        Boolean ans = boatService.makeBoatReservation(boatReservationDTO);
        return ans;
    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @DeleteMapping(path = "/reservation/{id}")
    public Boolean deleteBoatReservation(@PathVariable Long id){
        return boatService.cancelBoatReservation(id);
    }

//    @PostMapping(path = "/boatsForComplaint")
//    public List<Boat> getAllBoatsByIds(@RequestBody String[] ids){
//        ArrayList<Long> result = new ArrayList<>();
//        for(int i=0; i<ids.length; i++){
//            System.out.println(ids[i]);
//            result.add(Long.parseLong(ids[i]));
//        }
//        return boatService.getAllBoatsFromListOfIds(result);
//        //return null;
//    }

    @PreAuthorize("hasRole('ROLE_CLIENT')")
    @PostMapping(path = "/compliant")
    public Boolean makeCompliant(@RequestBody Compliant compliant) {
        boatService.makeCompliant(compliant);
        return true;
    }

    @PreAuthorize("hasRole('ROLE_BOATOWNER')")
    @PostMapping(path = "/addboat")
    public Boolean makeBoat(@RequestBody Boat boatReservationDTO) {
        Boolean ans = boatService.makeBoat(boatReservationDTO);
        return ans;
    }

    @PreAuthorize("hasRole('ROLE_BOATOWNER')")
    @DeleteMapping(path = "/{id}")
    public Boolean deleteBoat(@PathVariable Long id){
        return boatService.deleteBoat(id);
    }

    @PreAuthorize("hasRole('ROLE_BOATOWNER')")
    @PostMapping(path = "/editboat")
    public Boolean editBoat(@RequestBody Boat boatReservationDTO) {
        Boolean ans = boatService.editBoat(boatReservationDTO);
        return ans;
    }
}
