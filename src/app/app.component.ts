import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { WelcomeMockService } from './services/welcome-mock.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly hero = {
    eyebrow: 'DevContainer Template',
    title: 'DevContainer Angular para APIs mockeadas',
    description:
      'Desarrolla una experiencia frontend moderna sobre un entorno reproducible con Angular, Node.js 20 y mocks locales listos para usar.'
  };

  readonly features = [
    {
      title: 'Frontend moderno',
      description: 'Angular 17 con componentes standalone, estilos SCSS y buenas prácticas listas para extender.'
    },
    {
      title: 'Mocks listos para usar',
      description: 'Simula los endpoints GET y POST de bienvenida para iterar sobre la interfaz sin depender de un backend real.'
    },
    {
      title: 'Stack ligero',
      description: 'Dependencias reducidas a lo imprescindible para desarrollar y servir la aplicación en el contenedor.'
    }
  ];

  readonly prerequisites = [
    'VS Code con la extensión Dev Containers o acceso a GitHub Codespaces.',
    'Docker en ejecución si trabajas en local.',
    'Al menos 4GB de RAM libres para instalar dependencias y servir la aplicación.'
  ];

  readonly customization = [
    'Edita la pantalla principal en src/app/app.component.* para adaptar el contenido.',
    'Crea nuevos servicios en src/app/services/ para conectar APIs reales o más mocks.',
    'Ajusta la configuración del contenedor en .devcontainer/devcontainer.json para añadir herramientas o cambiar de versión de Node.js.'
  ];

  readonly usageSnippets = {
    start: 'npm start',
    mock: 'curl http://localhost:4200/assets/mocks/welcome.json'
  };

  readonly mockUpdateMessage = '¡Hola desde Dev Containers en Angular!';

  isLoading = false;
  responseText = '';
  errorText = '';
  lastAction: 'fetch' | 'update' | null = null;

  constructor(private readonly welcomeMock: WelcomeMockService) {}

  triggerMock(action: 'fetch' | 'update'): void {
    this.isLoading = true;
    this.errorText = '';
    this.responseText = '';
    this.lastAction = action;

    const request$ =
      action === 'fetch'
        ? this.welcomeMock.getWelcomeMessage()
        : this.welcomeMock.updateWelcomeMessage(this.mockUpdateMessage);

    request$
      .pipe(take(1))
      .subscribe({
        next: (payload) => {
          this.responseText = JSON.stringify(payload, null, 2);
        },
        error: () => {
          this.errorText = 'No se pudo simular la petición. Inténtalo de nuevo.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  get responseTitle(): string {
    if (!this.lastAction) {
      return '';
    }

    return this.lastAction === 'fetch'
      ? 'Respuesta mock (GET /api/welcome)'
      : 'Respuesta mock (POST /api/welcome)';
  }
}
