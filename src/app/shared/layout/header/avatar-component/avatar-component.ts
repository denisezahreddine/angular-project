import {Component, computed, inject} from '@angular/core';
import {LoginStore} from '../../../../compte/store/login.store';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-avatar-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './avatar-component.html',
  styleUrl: './avatar-component.css'
})
export class AvatarComponent {

  private store = inject(LoginStore);


// Génère les initiales (ex: "Olfa Laarif" -> "OL")
  initials = computed(() => {
    const name = this.store.userName();
    if (!name) return '??';

    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  });


}
