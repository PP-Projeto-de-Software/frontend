import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesComponent } from './clientes'; // Ajustado para o nome (ClientesComponent)
import { provideHttpClient } from '@angular/common/http'; //para não dar erro de falta do HttpClient
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesComponent], // Ajustado também
      providers: [
        provideHttpClient(),        // Garante que o serviço de clientes consiga carregar no teste
        provideHttpClientTesting() 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
