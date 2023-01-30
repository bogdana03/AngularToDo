import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
//created list colums
export class TodoComponent implements OnInit {
  todoForm !: FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  done : ITask [] = [];
  constructor(private fb : FormBuilder) {}

  //form to create to do items
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]

    })
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
