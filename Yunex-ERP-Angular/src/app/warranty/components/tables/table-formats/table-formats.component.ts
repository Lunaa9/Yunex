import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormatService } from 'src/app/warranty/services/formats.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-formats',
  templateUrl: './table-formats.component.html',
  styleUrls: ['./table-formats.component.css']
})
export class TableFormatsComponent {
  @ViewChild('uploadFile',{static:true})//viewchld of uploadFile input
  fileInput!:ElementRef;//fileInput ElementRef
  sendButton:boolean=false;//sendButton validator
  filesButton:boolean=false;//filesButton validator
  yesDeleteIt:string='';//module to delete
  files:Array<any>=[];//files Array
  fileNameSend:string='Agregar Archivo';//file name
  filterTable:string='';//filterTable params
  page:number=0;//page number

  constructor(private formatService:FormatService){}

  ngOnInit():void{
    this.getAllFiles();
  };

  /**
   * Get all files in format
   */
  getAllFiles(){
    this.formatService.getAllFiles().subscribe(
      res=>{this.files=res.msg;}
    );
    this.deleteFile(this.fileInput);
  };

  /**
   * send the file to the data base
   * @param event 
   */
  send(event:any){
    this.sendButton=false;
    const procedure=new FormData(event.currentTarget);   
    this.formatService.createFile(procedure).subscribe(
      res=>{
        res ? this.getAllFiles() : console.log('ERROR ADDING FILE');
      });
  };

  /**
   * active the sendButton and set the file name
   * @param event 
   */
  activeSendButton(event:any){
    if((event.target.files).length>0){
      this.sendButton=true;
      this.fileNameSend=event.target.files[0].name;
      this.filesButton=true;
    };
  };

  /**
   * delete the file in the input
   * @param input 
   */
  deleteFile(input:ElementRef){
    input.nativeElement.value = '';
    this.fileNameSend='Agregar Archivo';
    this.sendButton=false;
  }

  /**
   * 
   * @param fileName 
   * @param mimetype 
   */
  download(fileName:string,mimetype:string){
    this.formatService.dowloadFile(fileName).subscribe(
      res=>{
        const binaryData=[];
        binaryData.push(res);
        const filePath = window.URL.createObjectURL(new Blob(binaryData, {type:mimetype}));
        const fileDownload=document.createElement('a');
        fileDownload.href=filePath;
        fileDownload.setAttribute('download',fileName);
        fileDownload.click();
      })
  };
  
  /**
   * Give the option to preview the jpg and pdf files
   * @param fileName 
   * @param mimetype 
   */
  preview(fileName:string,mimetype:string){
    this.formatService.dowloadFile(fileName).subscribe(
      res=>{
        const binaryData=[];
        binaryData.push(res);
        const filePath = window.URL.createObjectURL(new Blob(binaryData, {type:mimetype}));
        const fileDownload=document.createElement('a');
        fileDownload.href=filePath;
        fileDownload.setAttribute('target','_blank');
        fileDownload.click();
      })
  };

  /**
   * Delete the file selected
   * @param name 
   */
  async delete(name:string):Promise<void>{
    await Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta acción no se podrá deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      if (result.isConfirmed) {
        const response: boolean = await this.formatService.deleteFile(
          name
        );
        if (response) {
          Swal.fire(
            'Eliminado!',
            'El archivo ha sido eleminado.',
            'success'
          );
          this.yesDeleteIt='';
          this.getAllFiles();
        } else {
          Swal.fire(
            'Algo salio mal!',
            'No se ha podido eliminar este archivo.',
            'error'
          );
        }
      }
    });
  };
}