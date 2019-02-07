import { Component, OnInit, Inject, ElementRef } from "@angular/core";
import { DialogData } from "./../invoice-app/invoice-app.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
declare var jsPDF: any;;
import html2canvas from "html2canvas";

@Component({
  selector: "app-print-invoice",
  templateUrl: "./print-invoice.component.html",
  styleUrls: ["./print-invoice.component.scss"]
})
export class PrintInvoiceComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PrintInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private eleRef: ElementRef
  ) {}

  invoicePrint: any = {};

  ngOnInit() {
    this.invoicePrint = JSON.parse(localStorage.getItem("invoiceData"));
    console.log(this.invoicePrint);
    //this.previewInvoice();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // public generatePDF()
  // {

  // var data = document.getElementById('contentToConvert');
  // html2canvas(data).then(canvas => {
  // // Few necessary setting options
  // var margins = {
  //   top: 30,
  //   bottom: 40,
  //   left: 35,
  // };
  // var imgWidth = 220;
  // var imgHeight = 150;

  // const contentDataURL = canvas.toDataURL('text')

  // let pdf = new jspdf('p', 'mm', 'A4'); // A4 size page of PDF
  // var position = 0;
  // pdf.setFontSize(12);
  // pdf.setFontStyle('italic');
  // pdf.fromHTML(data,15,80)
  // pdf.save('MYPdf.pdf'); // Generated PDF
  // });
  // }

  generate() {
    let doc = new jsPDF("p", "mm", "A4");

 var res = doc.autoTableHtmlToJson(document.getElementById("table"));
 
doc.autoTable(res.columns, res.data, {margin: {top: 90}});


var data = document.getElementById("contentToConvert");
var data1 = document.getElementById('invoice1');
var data2 = document.getElementById('invoice2');
var total = document.getElementById('total');

var header = function(data) {
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.setFontStyle('normal');
  //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
  doc.text("Testing Report", data.settings.margin.left, 50);
};

var options = {
  beforePageContent: header,
  margin: {
    top: 80
  },
  startY: doc.autoTableEndPosY() + 10
};
doc.setFontType("bold");
doc.setFontSize("18")
doc.text(20, 20, 'INTEGRALIO', null, null, 'left');

doc.setFontType("normal");
doc.setFontSize("10");
doc.text(26, 25, 'TECHNOLOGY', null, null, 'left');

doc.setFontSize("25")
doc.text(180,20,'INVOICE',null, null, 'right')


html2canvas(data).then(canvas => {
  doc.fromHTML(data1,20,50,null,null,'left');
  doc.fromHTML(data2,150,40,null,null,'right')
  doc.fromHTML(total,150,130,null,null, 'right')
  doc.save("MYpdf.pdf");
});
}


  }

  


