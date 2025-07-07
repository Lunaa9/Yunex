import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-add-security',
  templateUrl: './form-add-security.component.html',
  styleUrls: ['./form-add-security.component.css']
})
export class FormAddSecurityComponent implements OnInit  {
  @Input() selectedSecurity!: string;
  form!: FormGroup;

   // Definir las opciones para los menús desplegables
   options = [
    { value: 'cumple', label: 'Cumple' },
    { value: 'noCumple', label: 'No Cumple' }
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      brakingSystem: new FormControl(''),
      steeringSystem: new FormControl(''),
      suspensionSystem: new FormControl(''),
      tires: new FormControl(''),
      lightning: new FormControl(''),
      electricSystem: new FormControl(''),
      airConditioning: new FormControl(''),
      mirrors: new FormControl(''),
      stabilityControlSystem: new FormControl(''),
      seatBelts: new FormControl(''),
      airBags: new FormControl(''),
      chassisAndBody: new FormControl(''),
      windshieldGlass: new FormControl(''),
      headrest: new FormControl(''),
      roadKit: new FormControl(''),
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    console.log(this.form.value);
  }
}

