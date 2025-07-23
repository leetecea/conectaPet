import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../types/pet.type';
import { PetService } from '../../services/pet.service';
import { ToastrService } from 'ngx-toastr';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit {
  pet: Pet | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService,
    private favoriteService: FavoriteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    if (petId) {
      this.loadPet(petId);
    } else {
      this.router.navigate(['/feed']);
    }
  }

  private loadPet(id: number): void {
    this.petService.getPetById(id).subscribe({
      next: (pet) => {
        if (pet) {
          this.pet = pet;
        } else {
          this.toastr.error('Pet não encontrado');
          this.router.navigate(['/feed']);
        }
      },
      error: () => {
        this.toastr.error('Erro ao carregar informações do pet');
        this.router.navigate(['/feed']);
      }
    });
  }

  get isFavorite(): boolean {
    return this.pet ? this.favoriteService.isFavorite(this.pet.id) : false;
  }

  toggleFavorite(): void {
    if (!this.pet) return;

    const wasFavorite = this.isFavorite;

    this.favoriteService.toggleFavorite(this.pet.id);
    const action = wasFavorite ? 'removido dos' : 'adicionado aos';
    const message = `${this.pet.name} ${action} favoritos`;

    this.toastr.success(message);
  }
}
