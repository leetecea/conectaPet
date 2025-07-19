import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialModules } from './material';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioToolbarInfoComponent } from './components/usuario-toolbar-info/usuario-toolbar-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModules, HttpClientModule, UsuarioToolbarInfoComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'conectaPet';
}
