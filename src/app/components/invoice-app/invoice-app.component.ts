import { Component, OnInit } from '@angular/core';
import { PrintInvoiceComponent } from '../print-invoice/print-invoice.component'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';

export class InvoiceItem {
  name = '';
  qty = '';
  cost = '';
  total = 0;
}

export interface DialogData {

}
@Component({
  selector: 'app-invoice-app',
  templateUrl: './invoice-app.component.html',
  styleUrls: ['./invoice-app.component.scss']
})
export class InvoiceAppComponent implements OnInit {


  ngOnInit() {
    
  }
  form: FormGroup;
  mintoday: string;
  events: string[] = [];
  private file1: File;
  url: any;


 

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public invoice = {
    items: [],
  };

  uploadImage(event) {
    if (event.target.files.length > 0) {
      this.file1 = event.target.files[0];

    }
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    let datePipe = new DatePipe("en-US");
    let convertedDate = datePipe.transform(this.form.value.doc, 'yyyy-MM-dd');
    this.form.patchValue({
      'doc': convertedDate
    })
  }
  addDate(type: string, event: MatDatepickerInputEvent<Date>){
    this.events.push(`${type}: ${event.value}`);
    let datePipe = new DatePipe("en-US");
    let convertedDate = datePipe.transform(this.form.value.due_date, 'yyyy-MM-dd');
    this.form.patchValue({
      'due_date': convertedDate
    })
  }
  constructor(public fb: FormBuilder, public dialog: MatDialog) {
    this.createForm();
    this.addItem();
  }

  get invoiceItems(): FormArray {
    return this.form.get('invoiceItems') as FormArray;
  };

  toggleLogo() { }
  editLogo() { }

  addItem() {
    this.invoiceItems.push(this.fb.group(new InvoiceItem()));
  }

  removeItem(item) {

    let i = this.invoiceItems.controls.indexOf(item);

    if (i != -1) {
      this.invoiceItems.controls.splice(i, 1);
      let items = this.form.get('invoiceItems') as FormArray;
      let data = { invoiceItems: items };
      this.updateForm(data);
    }
  }



  updateForm(data) {
    const items = data.invoiceItems;
    let sub = 0;
    for (let i of items) {
      i.total = i.qty * i.cost;
      sub += i.total;
    }
    this.form.value.subTotal = sub;
    const tax = sub * (this.form.value.taxPercent / 100);
    this.form.value.tax = tax;
    this.form.value.grantTotal = sub + tax;
  }
  createForm() {
    this.form = this.fb.group({
      invoiceName: ['', Validators.required],
      doc: [''],
      due_date: [''],
      profile_image: [''],
      inv_to: [''],
      inv_frm: [''],
      pay_terms: [''],
      notes: [''],
      terms_condition: [''],
      invoiceItems: this.fb.array([]),
      subTotal: [{ value: 0, disabled: true }],
      taxPercent: [],
      tax: [0],

      grantTotal: [{ value: 0, disabled: true }],

    });

    this.form.valueChanges.subscribe(data => this.updateForm(data));

  }




  submitData() {
    // var fieldData = this.form.value;
    // const formdata = new FormData();
    // formdata.append('profile_image', fieldData.profile_image);
    
    var data = this.form.value;
    localStorage.setItem("invoiceData", JSON.stringify(data));
    console.log(data)
    this.printDialog();

  }

  printDialog(): void {
    const dialogRef = this.dialog.open(PrintInvoiceComponent, {
      width: '1063px',
      height: '650px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}

