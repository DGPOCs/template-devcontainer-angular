import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface WelcomePayload {
  message: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class WelcomeMockService {
  private currentMessage = 'Hola desde Dev Containers';

  getWelcomeMessage(): Observable<WelcomePayload> {
    return of(this.currentMessage).pipe(
      delay(200),
      map((message) => ({
        message,
        description: 'Mock del endpoint GET /api/welcome'
      }))
    );
  }

  updateWelcomeMessage(newMessage: string): Observable<WelcomePayload> {
    this.currentMessage = newMessage;

    return of(this.currentMessage).pipe(
      delay(200),
      map((message) => ({
        message,
        description: 'Mock del endpoint POST /api/welcome'
      }))
    );
  }
}
