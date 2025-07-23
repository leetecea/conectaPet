// src/app/services/favorites.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritesSubject = new BehaviorSubject<number[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavoritesFromSession();
  }

  private loadFavoritesFromSession(): void {
    const stored = sessionStorage.getItem('favorites');
    if (stored) {
      this.favoritesSubject.next(JSON.parse(stored));
    }
  }

  private saveFavorites(favorites: number[]): void {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  toggleFavorite(petId: number): void {
    const current = this.favoritesSubject.value;
    if (current.includes(petId)) {
      this.saveFavorites(current.filter(id => id !== petId));
    } else {
      this.saveFavorites([...current, petId]);
    }
  }

  isFavorite(petId: number): boolean {
    return this.favoritesSubject.value.includes(petId);
  }

  getFavorites(): number[] {
    return this.favoritesSubject.value;
  }
}
