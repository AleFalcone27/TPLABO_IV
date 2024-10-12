import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuotesApiService } from '../../services/quotes-api/quotes-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-typeracer-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typeracergame.component.html',
  styleUrls: ['./typeracergame.component.css']
})
export class TyperacerComponent {
  quote: string = ''; // Inicializamos la cita con un valor vacío
  userInput: string = ''; // Inicializamos el input del usuario
  arrayQuote: { character: string, correct: boolean | null }[] = []; // Para representar cada letra con su estado

  @ViewChild('hiddenTextarea') hiddenTextarea!: ElementRef; // Referencia al textarea oculto

  constructor(private http: HttpClient, private quoteApiService: QuotesApiService) {}

  ngOnInit(): void {
    this.renderNewQuote();
  }

  ngAfterViewInit(): void {
    this.focusTextarea(); // Enfocar el textarea después de la inicialización de la vista
  }

  // Forzar foco en el textarea oculto
  focusTextarea(): void {
    setTimeout(() => {
      this.hiddenTextarea.nativeElement.focus(); // Forzamos el foco
    }, 0); // Delay para asegurar que el textarea está disponible
  }

  // Obtiene una nueva cita de la API
  getRandomQuote(): void {
    this.quoteApiService.getQuote().subscribe((response) => {
      if (response && response.content) {
        this.quote = response.content;
        // Después de obtener la cita, la renderizamos
        this.renderArrayQuote();
      } else {
        this.quote = 'Error: No se pudo cargar la cita'; // Manejo de errores si no hay contenido en la respuesta
      }
    });
  }

  // Renderiza una nueva cita
  renderNewQuote(): void {
    this.getRandomQuote(); // Llamada a la API para obtener una nueva cita
  }

  // Renderiza la cita en un array de caracteres
  renderArrayQuote(): void {
    if (this.quote) { // Asegurarse de que la cita tiene valor antes de continuar
      this.userInput = '';
      this.arrayQuote = this.quote.split('').map((character) => ({
        character,
        correct: null
      }));
      this.focusTextarea(); // Forzar el foco cuando se renderiza una nueva cita
    }
  }

  // Maneja la entrada del usuario
  onInput(): void {
    const arrayValues = this.userInput.split('');
    this.arrayQuote.forEach((quoteChar, index) => {
      const character = arrayValues[index];
      if (character == null) {
        quoteChar.correct = null; // Si no hay input, quita las clases correct o incorrect
      } else if (character === quoteChar.character) {
        quoteChar.correct = true; // Si el input es correcto
      } else {
        quoteChar.correct = false; // Si el input es incorrecto
      }
    });

    if (this.arrayQuote.length === arrayValues.length) {
      this.renderNewQuote(); // Se carga una nueva cita si el input es completo
    }
  }
}
