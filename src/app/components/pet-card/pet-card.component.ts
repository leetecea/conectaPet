import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from '../../types/pet.type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { MatCard, MatCardModule } from '@angular/material/card';
import { SecundaryButtonComponent } from '../secundary-button/secundary-button.component';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule, MatIcon, MatChipsModule, MatCardModule, SecundaryButtonComponent],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent {
  @Input({ required: true }) pet!: Pet;
  @Output() favoriteToggled = new EventEmitter<{ petId: number, isFavorite: boolean }>();

  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  get isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.pet.id);
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();

    const currentlyFavorite = this.isFavorite;
    this.favoriteService.toggleFavorite(this.pet.id);

    this.favoriteToggled.emit({
      petId: this.pet.id,
      isFavorite: !currentlyFavorite
    });
  }

  onCardClick(): void {
    this.router.navigate(['/pet', this.pet.id]);
  }
}
