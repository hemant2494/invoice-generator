import { Component, OnInit } from '@angular/core';
declare var jsPDF: any; // Important

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent implements OnInit {

  constructor() {  
    var columns = [
      {title: "ID", dataKey: "id"},
      {title: "Name", dataKey: "name"}, 
      {title: "Country", dataKey: "country"},
    ];
    var rows = [
      {"id": 1, "name": "Shaw", "country": "Tanzania"},
      {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
      {"id": 3, "name": "Garcia", "country": "Madagascar"}
    ];
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save("table.pdf");
  }

  ngOnInit() {
  }

  generate() {

  }

}
