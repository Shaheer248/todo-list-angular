import { Component, Injectable, ViewChild, ElementRef } from '@angular/core'
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from '@angular/fire/auth'

import { Database, ref, set } from '@angular/fire/database'

import { ActivatedRoute, Data, Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', './signup-form.css']
})
export class SignupComponent {
  UserData: any
  @ViewChild('errorBox') errorBox: ElementRef

  constructor(
    private auth: Auth,
    private db: Database,
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

  signupUser(email: string, password: string, cpassword: string) {
    if (password == cpassword) {
      return createUserWithEmailAndPassword(this.auth, email, password)
        .then(result => {
          this.UserData = result.user
          localStorage.setItem('user', JSON.stringify(this.UserData))

          set(ref(this.db, 'todos/' + result.user.uid + '/' + 0 + '/'), {
            id: 0,
            uid: result.user.uid
          })

          window.location.href = '/add-todo'
        })
        .catch(error => {
          this.errorBox.nativeElement.innerHTML = error.message
          setTimeout(() => {
            this.errorBox.nativeElement.innerHTML = ''
          }, 5500)
        })
    } else {
      this.errorBox.nativeElement.innerHTML = "Passwords don't match"
      setTimeout(() => {
        this.errorBox.nativeElement.innerHTML = ''
      }, 5500)
    }
  }
}
