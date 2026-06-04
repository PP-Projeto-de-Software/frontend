import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesComponent } from './clientes';
import { provideHttpClient } from '@angular/common/http'; 
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesComponent],
      providers: [
        provideHttpClient(),        
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
