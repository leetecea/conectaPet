
import { Component, EventEmitter, OnInit, Output } from '@angular/core'; // <<< ADICIONADO
import { MaterialModules } from '../../material';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common'; // <<< ADICIONADO
import { SecundaryButtonComponent } from '../../components/secundary-button/secundary-button.component';


interface CadastroForm {
  userType: FormControl, // <<< ADICIONADO
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
  cnpj: FormControl,       // <<< ADICIONADO
  descricao: FormControl // <<< ADICIONADO
}
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    MaterialModules,
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatRadioModule,
    CommonModule,
    SecundaryButtonComponent
   ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',

})
export class CadastroComponent implements OnInit {
  @Output() cadastrar = new EventEmitter<any>();
  @Output() voltarParaLogin = new EventEmitter<void>();
   cadastroForm!: FormGroup<CadastroForm>;

  constructor(
    private router: Router,
  ){
    this.cadastroForm = new FormGroup({
      userType: new FormControl('adotante', [Validators.required]), // <<< Adicionado o campo "Perfil"
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),

      cnpj: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(14)]), // <<< ADICIONADO
      descricao: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(250)]) // <<< ADICIONADO
    })
  }

  ngOnInit(): void { // lógica de habilitação/desabilitação dos campos
    const userTypeControl = this.cadastroForm.get('userType');
    const cnpjControl = this.cadastroForm.get('cnpj');
    const descricaoControl = this.cadastroForm.get('descricao');

    userTypeControl?.valueChanges.subscribe(userType => {
      if (userType === 'ong') {
        cnpjControl?.enable();
        descricaoControl?.enable();
      } else {
        cnpjControl?.disable();
        descricaoControl?.disable();
        cnpjControl?.reset();
        descricaoControl?.reset();
      }
    });
  }

  submit() {
    if (this.cadastroForm.valid) {
      this.cadastrar.emit(this.cadastroForm.value);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  voltar() {
    this.voltarParaLogin.emit();
  }

  navigate(){
    this.router.navigate(["login"])
  }
}
