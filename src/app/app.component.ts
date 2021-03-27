import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title='frontend';
  todos: Todo[] = [];
  todo: Todo = new Todo;
  form: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required)
  })

  constructor(private service: TodoService){}

  ngOnInit(){
   this.listTodos();
  }

  listTodos(){
    this.service.listAll().subscribe(todoList => this.todos = todoList);
  }

  submit(){
    console.log(this.form.value);
    const todo: Todo = {...this.form.value};
    this.service.save(todo).subscribe(todo => {
      console.log(todo);
      this.todos.push(todo);
      this.form.reset();
      });
  }

  delete(todo: Todo){
    this.service.delete(todo.id).subscribe({
      next: (response) => this.listTodos()
    });
  }

  done(todo: Todo){
    this.service.setAsDone(todo.id).subscribe({
      next: (doneTodo) =>{
        todo.done = doneTodo.done
        todo.doneDate = doneTodo.doneDate
      }
    });
  }
}
