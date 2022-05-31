import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { User } from '../model/User';
import { WeekendCottage } from '../model/WeekendCottage';

@Component({
  selector: 'app-weekend-cottage-info-page',
  templateUrl: './weekend-cottage-info-page.component.html',
  styleUrls: ['./weekend-cottage-info-page.component.css']
})
export class WeekendCottageInfoPageComponent implements OnInit {

  weekendCottage!: WeekendCottage;
  user = false;
  coowner = false;
  edit = true;
  postCottage! : WeekendCottage;

  public name = null;
  public address = null
  public description = null
  public rules = null
  public pricelist = null
  public additionalservices = null
  selectedFile = null;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        let id = params['id'];
        this.http.get<WeekendCottage>('api/weekendCottage/' + id).subscribe(
          response => {
            this.weekendCottage = response;
            this.postCottage = this.weekendCottage
          }
        );
    });
    this.http.get<User>('api/user').subscribe(val => {
      console.log(val);
      if(val.role === "ROLE_CLIENT") {
        this.user = true;
      }else if(val.role ==="ROLE_WEEKENDCOTTOWNER"){
        if(this.weekendCottage.cottageOwnerId === val.id){this.coowner = true;}
      }
    });
  }

  doEdit(){
    this.edit = !this.edit;
  }

  selectImage(event: any){
    this.selectedFile = event.target.files[0].name;
  }

  subscribeToCottage(cottageId: number){
    var postData = {
      entity: "WEEKEND_COTTAGE",
      idOfEntity: cottageId
    }
    this.http.post("api/user/subscribe", postData).toPromise().then(data => {
    });
  }

  doDeleteCottage(){
    this.http.delete('api/weekendCottage/cottage/'+ this.postCottage.id).toPromise().then(data => {
      this.router.navigate(['/mycottages']);
    });
  }

  doEditCottage(){
    if(this.name){this.postCottage.name = this.name}
    if(this.address){this.postCottage.address = this.address}
    if(this.description){this.postCottage.description = this.description}
    if(this.rules){this.postCottage.rulesOfConduct = this.rules}
    if(this.selectedFile){this.postCottage.image = this.selectedFile}
    if(this.pricelist){this.postCottage.priceList = this.pricelist}
    if(this.additionalservices){this.postCottage.additionalServices = this.additionalservices}

    this.http.post('api/weekendCottage/editCottage', this.postCottage).toPromise().then(data => {
      this.router.navigate(['/mycottages']);
    });
  }
}
