import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  @Input() tabs: string[] = ['GENERAL','SEGURO OBLIGATORIO','POLIZA TODO RIESGO','REVISIÓN TECNOMECANICA','REVISIÓN PLUMA ARTICULADA'];
  @Output() tabSelected = new EventEmitter<string>();
  selectedTab: string = 'GENERAL';

  ngOnInit() {
    this.selectedTab = this.tabs[0];
    this.tabSelected.emit(this.selectedTab);
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.tabSelected.emit(tab);
  }
}
