import { Component, Injectable, ViewChild, ElementRef } from '@angular/core'
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login-form.css']
})
export class LoginComponent {
  UserData: any
  @ViewChild('errorBox') errorBox: ElementRef

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.errorBox = <any>this.route.data.subscribe(data => {})

    const user = localStorage.getItem('user')
    if (!user) {
    } else {
      window.location.href = '/add-todo'
    }
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(result => {
        this.UserData = result.user
        localStorage.setItem('user', JSON.stringify(this.UserData))
        window.location.href = '/add-todo'
      })
      .catch(error => {
        this.errorBox.nativeElement.innerHTML = error.message
        setTimeout(() => {
          this.errorBox.nativeElement.innerHTML = ''
        }, 5500)
      })
  }
}
