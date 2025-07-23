import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';
import { LoginResponse } from '../types/login-response';
import { User } from '../types/user.type';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  carregarUsuario(id: number): Observable<User> {
    return this.httpClient.get<User>(`/usuarios/${id}`);
  }

  login(email: string, senha: string){
    return this.httpClient.post<User>(this.apiUrl + "/login", { email, senha }).pipe(
      tap((usuario) => {
        localStorage.setItem('usuarioId', usuario.id.toString());
        sessionStorage.setItem("auth-token", usuario.token)
        sessionStorage.setItem("username", usuario.name)
        this.authService.login();

        const decodedToken: any = jwtDecode(usuario.token);
        localStorage.setItem('usuarioId', decodedToken.sub);
      })
    )
  }

  register(userData: any) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
        this.authService.login(); // 4. Notifique o AuthService sobre o registro
      })
    )
  }

  logout() {
    sessionStorage.clear();
    localStorage.removeItem('usuarioId');
    this.authService.logout();
  }

  getUsuarioId(): number | null {
    const id = localStorage.getItem('usuarioId');
    return id && !isNaN(+id) ? +id : null;
  }

  getUserRole(): string | null {
    return sessionStorage.getItem("user-role");
  }

  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }
}
