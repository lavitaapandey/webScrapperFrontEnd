import { Component ,ViewChild, ElementRef} from '@angular/core';
import { FormBuilder,Validators, FormGroup,FormControl } from '@angular/forms';
import { ScrapService } from './scrap.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

 
export class AppComponent {
  @ViewChild('content') content: ElementRef; 
  
  formModel:FormGroup; 
  allLinks: any[];
  imgsrc: any;
  showDiv: boolean=false;
  lblSite:any;
  lblTitle:any;
  lblDescription:any;
  lblKeywords:any;
 
  constructor(private fb: FormBuilder,private service: ScrapService) { }
  ngOnInit(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.formModel= this.fb.group({
      urlInput :['', [Validators.required, Validators.pattern(reg)]]
      
    });
  }
   title = 'WebScrapperApp';
   
  public SavePDF(): void { 
    const abc = new jsPDF();
    let content=this.content.nativeElement;  
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element,renderer){  
        return true;  
      }  
    };  
    doc.fromHTML(content.innerHTML,15,15,{  
  
      'width':190,  
      'elementHandlers':_elementHandlers  
    });  
  
    doc.save('test.pdf');  
  }  
  get f(){
    return this.formModel.controls;
  }
  onSubmit(){
    var data;
  this.service.getScrappedData(this.formModel.value.urlInput).subscribe(
   
    (res:any)=>{
      debugger;
     
     data= res; 
     this.lblSite=data.siteName;
    //  this.lblTitle=data.title;
    //  this.lblDescription=data.metaDescription;
    //  this.lblKeywords= data.metaKeywords;
     if(data.title!=""&&data.title!=null){
      this.lblTitle=data.title;
     }
     else{
      this.lblTitle="No Title exist"
     }
     if(data.metaDescription!=""&&data.metaDescription!=null){
      this.lblDescription=data.metaDescription;
     }
     else{
      this.lblDescription="No Description exist"
     }
     if(data.metaKeywords!=""&& data.metaKeywords!=null){
      this.lblKeywords=data.metaKeywords;
     }
     else{
      this.lblKeywords="No Keywords exist"
     }
     this.imgsrc= data.imagePath;
     this.allLinks= data.hyperlinks;
     this.showDiv= true;
    
     
    }
  )

}
 
}
