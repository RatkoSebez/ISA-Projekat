import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Boat } from '../model/Boat';
import { User } from '../model/User';

@Component({
  selector: 'app-boat-info-page',
  templateUrl: './boat-info-page.component.html',
  styleUrls: ['./boat-info-page.component.css']
})
export class BoatInfoPageComponent implements OnInit {

  boat!: Boat;
  show = false;
  edit = true;
  user = false;
  boowner = false;
  subscribeButtonText = "subscribe";
  selectedFile = null;

  //Editable
  name: any
  description: any
  address: any
  rating: any
  pricePerDay: any
  additionalServices: any
  type: any
  length: any
  engineNumber: any
  enginePower: any
  maxSpeed: any
  navigation: any
  cancellationConditions: any
  fishingEqu: any

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        let id = params['id'];
        this.http.get<any>('api/boat/' + id).subscribe(
          response => {
            this.boat = response;
          }
        );
    });
    this.http.get<User>('api/user').subscribe(val => {
      console.log(val);
      if(val.role === "ROLE_CLIENT") {
        this.user = true;
      }else if(val.role ==="ROLE_BOATOWNER"){
        if(this.boat.boatOwnerId === val.id){this.boowner = true;}
      }
    });
  }

  subscribeToBoat(boatId: number){
    var postData = {
      entity: "BOAT",
      idOfEntity: boatId
    }
    this.http.post("api/user/subscribe", postData).toPromise().then(data => {
    });
  }

  doEdit(){
    this.edit = !this.edit;
  }

  doDeleteBoat(){
    this.http.delete('api/boat/'+ this.boat.id).toPromise().then(data => {
      if(data) this.router.navigate(['/myboats']);
      else{alert("Something went wrong")}
    });
  }

  doEditBoat(){
    if(this.name){this.boat.name = this.name}
    if(this.address){this.boat.address = this.address}
    if(this.description){this.boat.description = this.description}
    if(this.selectedFile){this.boat.image = this.selectedFile}
    if(this.pricePerDay){this.boat.pricePerDay = this.pricePerDay}
    if(this.additionalServices){this.boat.additionalServices = this.additionalServices}
    if(this.type){this.boat.type = this.type}
    if(this.length){this.boat.length = this.length}
    if(this.engineNumber){this.boat.engineNumber = this.engineNumber}
    if(this.enginePower){this.boat.enginePower = this.enginePower}
    if(this.maxSpeed){this.boat.maxSpeed = this.maxSpeed}
    if(this.navigation){this.boat.navigation = this.navigation}
    if(this.cancellationConditions){this.boat.cancellationConditions = this.cancellationConditions}
    if(this.fishingEqu){this.boat.fishingEqu = this.fishingEqu}

    this.http.post('api/boat/editboat', this.boat).toPromise().then(data => {
      if(data) window.location.reload();
      else{alert("Something went wrong")}
    });
  }

  selectImage(event: any){
    this.selectedFile = event.target.files[0].name;
  }

}
