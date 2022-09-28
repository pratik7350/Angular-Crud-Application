import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { DataService } from './data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DBOperation } from './dboperation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;

  buttonText: string = "Submit";

  p1: Product[] = [];
  dbops: DBOperation;



  constructor(private dataservice: DataService, private _fb: FormBuilder, private _toastr: ToastrService) { }

  ngOnInit() {

    this.setFromState();
    this.viewall();
  }

  setFromState() {
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;
    // this.registerForm = this._fb.group({
    //   firstname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
    //   lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
    //   dob: ['', Validators.compose([Validators.required])],
    //   emailid: ['', Validators.compose([Validators.required, Validators.email])],
    // })
    this.registerForm = this._fb.group({
    // _id:'',
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      dob: ['', Validators.compose([Validators.required])],
      emailid: ['', Validators.compose([Validators.required, Validators.email])],
      pincode: '',
      address: '',
      city:'',
      state:'',
      country:'',
      gender:'',
      


    });
  }
  id:any;
  viewall(): void {
    this.dataservice.getall().subscribe((resp: any) => {
      this.p1=resp;
     // console.log(resp);
    })
  }
  oncancel() {
    this.registerForm.reset();
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;
    this.submitted = false;
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
   // console.log (this.registerForm);
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;

    }
    switch (this.dbops) {
      case DBOperation.create:
        this.dataservice.addUser(this.registerForm.value).subscribe(res => {
          this._toastr.success("User Added", "User Registration");
          this.viewall();
          this.oncancel();
        });
        break;
      case DBOperation.update:
        console.log(this.id);
        this.dataservice.updateUser(this.id,this.registerForm.value).subscribe(res => {
          this._toastr.success("User Updated", "User Registration");
          this.viewall();
          this.oncancel();
        });
        break;
    }

  }

  
  Edit(userId:any) {
    this.buttonText = "Update";
    this.dbops = DBOperation.update;
    let user = this.p1.find((u: Product) => u._id === userId);
    this.id=userId;
    console.log(this.id);
    this.registerForm.patchValue(user);



  }

  Delete(userId: any) {
    this.dataservice.deleteUser(userId).subscribe(res =>{
      this.viewall();
      this._toastr.success("Deleted succes !!","user Registration")
    })

  }

  columns: any = ['First name', 'Last name', 'Date of birth', 'Email', 'Gender', 'Country', 'State', 'City', 'Address', 'Pincode'];
  columnvalue: any;
  filters:any;
  changefilter(e: any) {
    // console.log(e.target.value)
    // this.columnvalue = e.target.value;
    // console.log(this.columnvalue);
    if(e.target.value == "First name") {
      this.columnvalue = "firstname";
      // console.log(this.columnvalue);
    }
    if(e.target.value == "Last name") {
      this.columnvalue = "lastname";
    }
  }
  filter(filtervalue:any) {
    console.log(filtervalue);
    console.log(this.columnvalue);
    if(this.columnvalue == "firstname") {
      this.dataservice.findByfirstname(this.columnvalue,filtervalue).subscribe(
        {
          next: (data) => {
            this.p1 = data;
            // console.log(data);
          }
      })
    }
    if(this.columnvalue === "lastname") {
      this.dataservice.findBylastname(this.columnvalue,filtervalue).subscribe(
        {
          next: (data) => {
            this.p1 = data;
          }
      })
    }
  }

}
