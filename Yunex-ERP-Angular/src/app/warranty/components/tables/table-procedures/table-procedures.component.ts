import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProceduresService } from 'src/app/warranty/services/procedures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-procedures',
  templateUrl: './table-procedures.component.html',
  styleUrls: ['./table-procedures.component.css']
})
export class TableProceduresComponent {
  @ViewChild('uploadFile',{static:true})//viewchild of uploadFile input
  fileInput!:ElementRef;//fileInput ElementRef
  sendButton:boolean=false;//sendButton validator
  yesDeleteIt:string='';//the file identifier to delete
  files:Array<any>=[];//files array
  fileNameSend:string='Agregar Archivo';//file name
  filterTable:string='';//filter table params
  page:number=0;//page number

  constructor(private procedureService:ProceduresService){}

  ngOnInit():void{
    this.getAllFiles();
  };

  /**
   * get the files array
   */
  getAllFiles(){
    this.procedureService.getAllFiles().subscribe(
      res=>{this.files=res.msg;}
    );
    this.deleteFile(this.fileInput);
  };

  /**
   * send the fle to the data base
   * @param event 
   */
  send(event:any){
    this.sendButton=false;
    const procedure=new FormData(event.currentTarget);   
    this.procedureService.createFile(procedure).subscribe(
      res=>{
        res ? this.getAllFiles() : console.log('ERROR ADDING FILE');
      });
  };

  /**
   * active the send button
   */
  activeSendButton(event:any){
    if((event.target.files).length>0){
      this.sendButton=true;
      this.fileNameSend=event.target.files[0].name;
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
    this.procedureService.dowloadFile(fileName).subscribe(
      res=>{
        const binaryData=[];
        if(res==='not found'){
          console.log('This file does not exist');
        }else{
          binaryData.push(res);
          const filePath = window.URL.createObjectURL(new Blob(binaryData, {type:mimetype}));
          const fileDownload=document.createElement('a');
          fileDownload.href=filePath;
          fileDownload.setAttribute('download',fileName);
          fileDownload.click();
        }
      })
  };
  
  /**
   * let preview the file to jpeg and pdf files
   * @param fileName 
   * @param mimetype 
   */
  preview(fileName:string,mimetype:string){
    this.procedureService.dowloadFile(fileName).subscribe(
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
   * delete the file by its name
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
          const response: boolean = await this.procedureService.deleteFile(
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