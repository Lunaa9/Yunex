import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-repair-module',
  templateUrl: './repair-module.component.html',
  styleUrls: ['./repair-module.component.css']
})
export class RepairModuleComponent {

  @Output() moduleCreated = new EventEmitter<any>();

  onModuleCreated(event: any) {
    this.moduleCreated.emit(event);
  }

}
