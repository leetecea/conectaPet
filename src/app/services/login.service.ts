import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IUsuario } from '../model/usuario';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usuarioLogadoSubject = new BehaviorSubject<IUsuario | null>(null);
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();
  apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  carregarUsuario(id: number): Observable<IUsuario> {
    return this.httpClient.get<IUsuario>(`/usuarios/${id}`);
  }

  login(email: string, senha: string){
    return this.httpClient.post<IUsuario>(this.apiUrl + "/login", { email, senha }).pipe(
      tap((usuario) => {
        this.usuarioLogadoSubject.next(usuario);
        localStorage.setItem('usuarioId', usuario.id.toString());
        sessionStorage.setItem("auth-token", usuario.token)
        sessionStorage.setItem("username", usuario.nome)

        const decodedToken: any = jwtDecode(usuario.token);
        if (decodedToken && decodedToken.role) {
          sessionStorage.setItem("user-role", decodedToken.role);
        }
      })
    )
  }

  getUsuarioId(): number | null {
    const id = localStorage.getItem('usuarioId');
    return id ? +id : null;
  }

  getUserRole(): string | null {
    return sessionStorage.getItem("user-role");
  }

  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  logout() {
    this.usuarioLogadoSubject.next(null);
    localStorage.removeItem('usuarioId');
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('user-name');
    sessionStorage.removeItem('user-role');
  }

}
