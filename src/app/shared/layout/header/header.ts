import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar-component/avatar-component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {}
