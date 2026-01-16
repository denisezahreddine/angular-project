import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventBus {
  private listeners = new Map<Function, ((event: any) => void)[]>();

  // Émettre un événement
  emit<T extends object>(event: T) {
    const handlers = this.listeners.get(event.constructor);
    if (!handlers) return;
    handlers.forEach(h => h(event));
  }

  // S'abonner à un type d'événement
  registerListener<T extends object>(
    eventType: new (...args: any[]) => T,
    handler: (event: T) => void
  ) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(handler);
  }

  // Supprimer un listener (optionnel)
  unregisterListener<T extends object>(
    eventType: new (...args: any[]) => T,
    handler: (event: T) => void
  ) {
    const handlers = this.listeners.get(eventType);
    if (!handlers) return;
    const index = handlers.indexOf(handler);
    if (index > -1) handlers.splice(index, 1);
  }
}
