import {Component, computed, EventEmitter, Input, OnDestroy, OnInit, Output, signal} from '@angular/core';
import {interval, startWith, Subscription} from 'rxjs';

@Component({
  selector: 'app-timer-component',
  imports: [],
  templateUrl: './timer-component.html',
  styleUrl: './timer-component.css',
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) transactionDate!: Date;
  @Output() timeout = new EventEmitter<void>();

  // 1. Create a Writable Signal for the remaining milliseconds
  private remainingMs = signal<number>(0);

  // 2. Computed Signal: Automatically updates whenever remainingMs changes
  readonly displayTime = computed(() => {
    const diff = this.remainingMs();
    if (diff <= 0) return '00:00:00';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  });

  // 3. Computed Signal for expiry state
  readonly isExpired = computed(() => this.remainingMs() <= 0);

  private timerId?: any;

  ngOnInit() {
    const expiryTime = this.transactionDate.getTime() +  60 * 1000;

    this.timerId = setInterval(() => {
      const now = new Date().getTime();
      const diff = expiryTime - now;

      if (diff <= 0) {
        this.remainingMs.set(0);
        this.timeout.emit();
        this.stopTimer();
      } else {
        this.remainingMs.set(diff);
      }
    }, 1000);
  }

  private pad(n: number) {
    return n.toString().padStart(2, '0');
  }

  private stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
