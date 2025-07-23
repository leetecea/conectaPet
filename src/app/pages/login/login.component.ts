import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { MatIcon } from '@angular/material/icon';
import { SecundaryButtonComponent } from '../../components/secundary-button/secundary-button.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    SecundaryButtonComponent,
    MatIcon,
    RouterModule,
    CadastroComponent
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerForm: FormGroup;

  isRegistering = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toast: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.registerForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  switchToRegister(): void {
    this.isRegistering = true;
  }

  switchToLogin(): void {
    this.isRegistering = false;
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.loginService
        .login(
          this.loginForm.value.email as string,
          this.loginForm.value.password as string
        )
        .subscribe({
          next: () => this.router.navigate(['feed']),
          error: (err) => {
            {
              console.error('Erro no login do Angular:', err);
              this.toast.error('Email ou senha incorretos!');
            }
          },
        });
    } else {
      console.warn('Formulário inválido. Não enviando.');
    }
  }

  submitRegister(userData: any): void {
    if (this.registerForm.valid) {
      const { nome, email, senha } = this.registerForm.value;

      this.loginService
        .register({
          name: userData.nome,
          email: userData.email,
          password: userData.senha})
        .subscribe({
          next: () => {
            this.toast.success('Cadastro realizado com sucesso!');
            this.router.navigate(['feed']);
          },
          error: (err) => {
            console.error('Erro no cadastro:', err);
            this.toast.error('Erro ao realizar cadastro.');
          },
        });
    } else {
      this.toast.warning('Preencha corretamente os campos do cadastro.');
    }
  }

  navigate() {
    this.router.navigate(['cadastro']);
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }
}
