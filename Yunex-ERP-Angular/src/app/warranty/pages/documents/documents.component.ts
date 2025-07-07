import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent  implements OnInit {
  folders: Array<string>=['Formatos','Procesos','Historial Módulos'];//possible folders in the component
  actualFolder:string='Procesos';//the actual folter

  constructor(){}

  ngOnInit(): void {

  }
   /**
    * change the folter
    * @param folder 
    */
  filesRequest(folder:string){
    this.actualFolder=folder;
  }
}
