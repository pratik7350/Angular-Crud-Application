export class Product {
    // Id!: number;
    firstname:string ="";
    lastname:string ="";
    dob:string ="";
    emailid:string ="";
    gender:string ="";
    country:string ="";
    state:string ="";
    city:string ="";
    address:string ="";
    pincode:string ="";
  _id: any;

    constructor(_id:any,firstname:string, lastname:string, dob:string ,  emailid:string,gender:string,country:string,state:string,city:string, address:string,pincode:string)
    {
       // this.Id = Id;
       this._id=_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dob = dob;
        this.emailid = emailid;
        this.gender = gender;
        this.country = country;
        this.state = state;
        this.city = city;
        this.address = address;
        this.pincode = pincode;




    }

}
