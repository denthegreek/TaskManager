import { Injectable } from '@angular/core';

import {Task} from './task';

import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

const urlPart:string="http://localhost:8800/api/task";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  getDescription(){
		var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", urlPart, false ); // false for synchronous request
    xmlHttp.send( null );
    return (xmlHttp.responseText);
	}

  postDescription(id:string, description:string){
    var body="{\"_id\":\""+id+"\",\"description\":\""+description+"\",\"isDone\":\"false\"}";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlPart, false);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("POST done");
        }
    }
    xhr.send(body);
  }

  deleteDescription(value:string){
    var xhr = new XMLHttpRequest();
    var wholeString:string = (urlPart.concat("/")).concat(value);
    xhr.open("DELETE", wholeString, false);
    xhr.onload = function () {
      var users = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.table(users);
      } else {
        console.error(users);
      }
    }
    xhr.send(null);
  }

  updateStatus(description:string,status:boolean){
    var body="{\"description\":\""+description+"\",\"isDone\":"+status+"}";
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", urlPart, false);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log("PUT done");
      }
    }
    xhr.send(body);
    return;
  }
}
