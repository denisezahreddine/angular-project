import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenCompteUseCase } from '../../compte/usecases/open-compte.usecase';
@Component({
  selector: 'app-open-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './open-account.component.html',
  styleUrls: ['./open-account.component.css']
})
export class OpenAccountComponent {
  private router = inject(Router);
  private openCompteUseCase = inject(OpenCompteUseCase); // Injecter le Use Case

  accountForm = new FormGroup({
    label: new FormControl('Checking account', { nonNullable: true, validators: [Validators.required] }),
    initialBalance: new FormControl(200, { nonNullable: true, validators: [Validators.required, Validators.min(0)] })
  });

  onBack() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const { label, initialBalance } = this.accountForm.getRawValue();

      this.openCompteUseCase.execute(label, initialBalance).subscribe({
        next: (compteCree) => {
          console.log('Compte créé avec succès !', compteCree);
          this.router.navigate(['/home']); // Redirection après succès
        },
        error: (err) => {
          console.error('Erreur lors de la création du compte', err);
        }
      });
    }
  }
}
