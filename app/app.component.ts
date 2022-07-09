import { Component, OnInit } from '@angular/core';
import { Todo } from "./todo";

import {TaskService} from "./app.service";
import {Task} from './task';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        bottom: '0',
        opacity: 1
      })),
      state('closed', style({
        bottom: '-17.5vh',
        opacity: 1
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
    ]),
  ]
})
export class AppComponent {

  constructor(private taskService : TaskService) { }

  title:string = 'ΔΝ Development Studio';
  todoValue:string = "";
  list: Todo[] = [];

  arrows:string=">>";
  perc:number=30;
  percent:number=0;
  bodyPerc:number=70;

  

  ngOnInit(){
  	this.list = [];
  	this.todoValue = "";

    var resp:string =this.taskService.getDescription();

    //This is the process that takes the description to put it into Todo elements:
    var taskArray = resp.substring(1, resp.length -1).split("},");
    for(let i =0 ; i<taskArray.length; i++){
      if(i<taskArray.length-1){
        taskArray[i] += "}";
      }
      console.log(JSON.parse(taskArray[i]).description);
      var newTodo: Todo = {id: JSON.parse(taskArray[i])._id , value: JSON.parse(taskArray[i]).description , isDone: JSON.parse(taskArray[i]).isDone};
      this.list.push(newTodo);
    }
    this.list.sort((a, b) => {let fa = a.value.toLowerCase(),fb = b.value.toLowerCase();if (fa < fb) {return -1;}if (fa > fb) {return 1;}return 0;});
    this.list=this.list.filter(item => item.isDone !== true).concat(this.list.filter(item => item.isDone !== false));
  }
  deleteFromDB(name:string){
    var msg = {
      item: name
    };
    //console.log(JSON.stringify(msg));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.response);
      }
    };
  }
  addItem(){
  	if(this.todoValue !== ""){
  		const newItem: Todo = {
  			id:Date.now(),
  			value:this.todoValue,
  			isDone:false
  		};
  		this.list.push(newItem);
      console.log(newItem.id);
      this.taskService.postDescription(String(newItem.id),newItem.value);
  	}
    this.list.sort((a, b) => {let fa = a.value.toLowerCase(),fb = b.value.toLowerCase();if (fa < fb) {return -1;}if (fa > fb) {return 1;}return 0;});
    this.list=this.list.filter(item => item.isDone !== true).concat(this.list.filter(item => item.isDone !== false));
  	this.todoValue = "";
  }

  deleteItem(id:number,value:string){
    //this.deleteFromDB(value);
    this.taskService.deleteDescription(value);
  	this.list = this.list.filter(item => item.id !== id);
  }
  updateCheckboxes(value:string,status:boolean){
    this.taskService.updateStatus(value,status);
    this.list.sort((a, b) => {let fa = a.value.toLowerCase(),fb = b.value.toLowerCase();if (fa < fb) {return -1;}if (fa > fb) {return 1;}return 0;});
    this.list=this.list.filter(item => item.isDone !== true).concat(this.list.filter(item => item.isDone !== false));
  }
  hideUnhide(){
    if(this.arrows == ">>"){
      this.arrows = "<<";
      this.perc=0;
      this.percent=-30;
      this.bodyPerc=100;
    }
    else{
      this.arrows = ">>";
      this.perc=30;
      this.percent=0;
      this.bodyPerc=70;
    }
  }

  expand="Expand";
  isOpen = false;
  toggle() {
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      this.expand="Shrink";
    }
    else{
      this.expand="Expand";
    }
  }
}
