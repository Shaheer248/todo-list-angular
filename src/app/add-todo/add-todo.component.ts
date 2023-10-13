import { Component, Injectable } from '@angular/core'
import {
  Database,
  ref,
  set,
  remove,
  onChildAdded
} from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  todoList: any[] = []
  todoEmpty: any = ''
  getLocalData: any = localStorage.getItem('user')
  parsedLocalData: any = JSON.parse(this.getLocalData)

  constructor (private db: Database) {
    if (!this.getLocalData) {
    } else {
      onChildAdded(
        ref(db, 'todos/' + this.parsedLocalData.uid + '/'),
        snapshot => {
          const data = snapshot.val()
          if (data.id == 0) {
          } else {
            this.todoList.push({ id: data.id, todo: data.todo })
          }
        }
      )
    }
  }

  updateTodo (todo: string, todoEmpty: any) {
    if (!todo) {
      todoEmpty.style.display = 'block'
      setTimeout(() => {
        todoEmpty.style.display = 'none'
      }, 3500)
    } else {
      if (
        this.getLocalData == '' ||
        this.getLocalData == null ||
        this.getLocalData == undefined
      ) {
        this.todoList.push({ id: this.todoList.length, todo: todo })
      } else {
        set(
          ref(
            this.db,
            'todos/' +
              this.parsedLocalData.uid +
              '/' +
              (this.todoList.length + 1) +
              '/'
          ),
          {
            id: this.todoList.length + 1,
            uid: this.parsedLocalData.uid,
            todo: todo
          }
        )
      }
    }
  }

  removeTodo (id: number) {
    this.todoList = this.todoList.filter(item => item.id !== id)

    if (
      this.getLocalData == '' ||
      this.getLocalData == null ||
      this.getLocalData == undefined
    ) {
    } else {
      remove(ref(this.db, 'todos/' + this.parsedLocalData.uid + '/' + id + '/'))
    }
  }
}
