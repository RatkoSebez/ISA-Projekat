import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  user!: User;
  edit = true;
  email = '';
  firstName = '';
  lastName = '';
  city = '';
  country = '';
  address = '';
  phoneNumber!: number;
  password = '';

  constructor(private http: HttpClient, private renderer: Renderer2, private elem: ElementRef, private router: Router) { }

  ngOnInit() { 
    this.doGet();
  }

  doGet(){  
    //console.log('getujem');
    this.http.get<any>('api/user').subscribe(
      response => {
        this.user = response;
        console.log(response);
        this.email = this.user.email;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.city = this.user.city;
        this.country = this.user.country;
        this.address = this.user.address;
        this.phoneNumber = this.user.phoneNumber;
      }
    );
  }

  doEdit(){
    this.edit = !this.edit;
  }

  doEditPost(){
    // var e = (document.getElementById("roleSelect")) as HTMLSelectElement;
    // var sel = e.selectedIndex;
    // var opt = e.options[sel];
    // var CurValue = (<HTMLSelectElement><unknown>opt).value;
    //console.log('ajde: ' + CurValue)
    var postData = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      country: this.country,
      city: this.city,
      phoneNumber: this.phoneNumber
      //role: this.role
    }
    //console.log('edituje,: ' + this.email + this.password + this.firstName + this.lastName);
    this.http.post("api/user/edit", postData).toPromise().then(data => {
      //console.log(data);
      //this.router.navigate(['/home']);
      this.doGet();
      this.doEdit();
    });
  }

}
