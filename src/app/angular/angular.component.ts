import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVo} from '../domain/todo.vo';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {
  todoList: Array<TodoVo>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getTodoList()
      .subscribe((data: Array<TodoVo>) => {
        console.log(data);
        this.todoList = data;
      });
  }

}
