import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => in', [
        style({opacity: 0, transform: 'translate(-100%, 0)'}),
        animate(300)
      ]),
      transition('in => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-50px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ]),

    ])
  ]
})
export class AngularComponent implements OnInit {
  newTodo: TodoVO = new TodoVO(); // 할일 추가를 위한 모델 데이터
  todoList: Array<TodoVO>; // 할일 목록
  tempTodoMap = new Map<number, TodoVO>(); // 수정시 값을 저장하기 위한 임시 컬렉션

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getTodoList()
      .subscribe((data: Array<TodoVO>) => {
        console.log(data);
        this.todoList = data;
      });
  }

  addTodo() {
    this.userService.addTodo(this.newTodo).subscribe((body: TodoVO) => {
      console.log(body);
      this.todoList.unshift(body); // 방금 입력한것을 맨위에 올린다
      this.newTodo = new TodoVO(); // 폼을 초기화
    });
  }

  save(item: TodoVO) {
    item.isEdited = true;

    // shallow copy
    // this.tempTodoMap.set(item.todo_id, item);
    // shallow copy => deep copy를 해야 한다.
    this.tempTodoMap.set(item.todo_id, Object.assign({}, item));
  }

  restore(item: TodoVO) {
    item.isEdited = false;

    const tempTodo = this.tempTodoMap.get(item.todo_id);
    item.isFinished = tempTodo.isFinished;
    item.todo = tempTodo.todo;
  }

  modifyTodo(item: TodoVO) {
    this.userService.modifyTodo(item)
      .subscribe((body: TodoVO) => {
        item.isFinished = body.isFinished;
        item.todo = body.todo;
        item.updated = body.updated;
        // 수정 폼을 원복
        item.isEdited = false;
      });
  }

  removeTodo(item: TodoVO, index: number) {
    const result = confirm('삭제하시겠습니까?');
    if (result) {
      this.userService.removeTodo(item.todo_id)
        .subscribe(body => {
          console.log(body);
          // todoList 에서 해당 todo_id의 TodoVO 객체 삭제
          // splice(시작인덱스, 지울갯수, 삽입객체)
          this.todoList.splice(index, 1);
        });
    }
  }
}
