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
  updateIndex!:any;
  isEditEnabled :boolean = false;
  constructor(private fb : FormBuilder) {}
   session: any;
  //form to create to do items
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]

    })
    
  }

  // method to add new task from the form to the lists
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
      
    })
    
    localStorage.setItem("item", JSON.stringify(this.tasks));
    this.todoForm.reset();
  }

  saveTaskFromBrowser(){
    window.localStorage.getItem("item");
  }

  deleteTask(i: number){
    this.tasks.splice(i,1);
    localStorage.removeItem("item");
    this.todoForm.reset();
  }

  //method for delete items from inprogress
  deleteInProgressTask(i: number){
    this.inprogress.splice(i,1);
    localStorage.removeItem("item");
  }

  //method for delete items from done
   deleteCopyTask(i: number){
    this.done.splice(i,1)
    localStorage.removeItem("item");
  }

  onEdit(item:ITask, i : number){
     this.todoForm.controls['item'].setValue(item.description);
     this.updateIndex = i;
     this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  
  //method for drop items to lists
  drop(event: CdkDragDrop<ITask[]>) {
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
