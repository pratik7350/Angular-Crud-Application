import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable,throwError } from 'rxjs';
import { Product } from './product';
// import { Schemasclass } from './schemas';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url="http://localhost:3000/";

  constructor(private httpclient:HttpClient) { }

  getall()
  {
    return this.httpclient.get(this.url+"show");
  }

  // createone(aaaa:Product):Observable<Product>
  // {
  //   return this.httpclient.post<Product>(this.url+'add',aaaa);
  // }
  addUser(user : Product){
    return this.httpclient.post(`${this.url}add`,user);

  }

  updateUser(id:any,user : Product){
    console.log(user._id);
    return this.httpclient.put(`${this.url}update/${id}`,user)

  }

  deleteUser(userId: string) {
    return this.httpclient.delete(`${this.url}delete/${userId}`)
  }

  // editone(aaaa:Product):Observable<any>
  // {
  //   return this.httpclient.put(`${this.url+'update'}/${aaaa.firstname}`,aaaa);
  // }
  // deleteone(aaaa:String):Observable<any>
  // {
  //   return this.httpclient.delete(`${this.url+'delete'}/${aaaa}`);
  // }
  findByfirstname(aaaa:any, bbbb:any):Observable<Product[]> {
    return this.httpclient.get<Product[]>(`${this.url+"filterfirstname"}/${bbbb}`);
  }

  findBylastname(aaaa:any, bbbb:any):Observable<Product[]> {
    return this.httpclient.get<Product[]>(`${this.url+"filterlastname"}/${bbbb}`);
  }
  
}