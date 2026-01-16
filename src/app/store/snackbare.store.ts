import { Injectable, signal, computed } from '@angular/core';

export interface SnackbarState {
  message: string | null;
  isOpen: boolean;
  retryAction?: () => void;
}

@Injectable({ providedIn: 'root' })
export class SnackbarStore {
  // État privé
  private state = signal<SnackbarState>({
    message: null,
    isOpen: false,
  });

  // Sélecteurs publics (Signaux en lecture seule)
  readonly message = computed(() => this.state().message);
  readonly isOpen = computed(() => this.state().isOpen);
  readonly retryAction = computed(() => this.state().retryAction);

  // Actions
  showError(message: string, retry?: () => void) {
    this.state.set({
      message,
      isOpen: true,
      retryAction: retry
    });
  }

  hide() {
    this.state.update(s => ({ ...s, isOpen: false }));
  }
}
