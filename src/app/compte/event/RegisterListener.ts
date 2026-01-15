export class RegistrationSuccessEvent {
  constructor(public readonly clientId: string) {}
}

export class RegistrationErrorEvent {
  constructor(public readonly message: string) {}
}
