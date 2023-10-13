import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list-angular'
  active: any = 1
  getLocalData: any = localStorage.getItem('user')
  parsedLocalData: any = JSON.parse(this.getLocalData)
  logoutDisplayNone = false
  logoutText = ''

  constructor (private router: Router) {
    this.getLocalData == '' ||
    this.getLocalData == null ||
    this.getLocalData == undefined
      ? (this.logoutDisplayNone = true, this.logoutText = '')
      : (this.logoutText = this.parsedLocalData.email)

    setInterval(() => {
      switch (this.active) {
        case 1:
          this.router.navigateByUrl('/add-todo')
          break

        case 2:
          this.router.navigateByUrl('/login')
          break

        case 3:
          this.router.navigateByUrl('/signup')
          break
      }
    }, 100)
  }

  logout () {
    let confirmLogout = confirm('Are you sure you want to logout')
    if (confirmLogout == true) {
      localStorage.removeItem('user')
      window.location.href = '/add-todo'
    }
  }
}
