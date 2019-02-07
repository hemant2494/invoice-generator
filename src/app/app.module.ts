import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceAppComponent } from './components/invoice-app/invoice-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PrintInvoiceComponent } from './components/print-invoice/print-invoice.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceAppComponent,
    PrintInvoiceComponent,
    InvoicePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
     BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  
  ],
  providers: [],
  entryComponents: [
    InvoiceAppComponent,
    PrintInvoiceComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
