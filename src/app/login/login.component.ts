import { Component } from '@angular/core';
import { MaterialModules } from '../material';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModules, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form enviado!', form.value);
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }


}
