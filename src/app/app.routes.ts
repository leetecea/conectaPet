// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './guard/auth.guard';
import { AcessoNegadoComponent } from './pages/acesso-negado/acesso-negado.component';
import { CadastroPetComponent } from './pages/cadastro-pet/cadastro-pet.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PetDetailsComponent } from './pages/pet-details/pet-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "cadastro",
        component: CadastroComponent
    },
    {
        path: "cadastro-pet",
        component: CadastroPetComponent
    },
    {
        path: "feed",
        component: FeedComponent
    },
    // Nova rota para detalhes do pet
    {
        path: "pet/:id",
        component: PetDetailsComponent
    },
    // Nova rota para favoritos
    {
        path: "favorites",
        component: FavoritesComponent
    },
    // Nova rota para perfil
    {
        path: "profile",
        component: ProfileComponent
    },
    // Redireciona qualquer rota não encontrada para o feed
    {
        path: '**',
        redirectTo: 'feed'
    }
];
