import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVo} from '../domain/todo.vo';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {
  newTodo: TodoVo = new TodoVo(); // 할일 추가를 위한 모델 데이터
  todoList: Array<TodoVo>; // 할일 목록

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getTodoList()
      .subscribe((data: Array<TodoVo>) => {
        console.log(data);
        this.todoList = data;
      });
  }

  addTodo() {
    this.userService.addTodo(this.newTodo).subscribe((body: TodoVo) => {
      console.log(body);
      this.todoList.unshift(body); // Array 가장 앞에 추가
      this.newTodo = new TodoVo(); // 폼을 초기화
    });
  }
}
