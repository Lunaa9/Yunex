import { Component } from '@angular/core';
import { BroComponentsService } from './shared/services/bro-components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
  content:string='';
  constructor(private brocomponent:BroComponentsService, private router:Router){}

  /**This function validates if the current route can show the content component
   * @returns boolean
   */
  isActiveRouter(): boolean {
    this.content=this.brocomponent.showContent();//This variable takes the route that the showContent returns
    return this.router.isActive(this.content, true);
  }
}
