import { InvoiceAppComponent } from './components/invoice-app/invoice-app.component';
import { PrintInvoiceComponent } from './components/print-invoice/print-invoice.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';

const routes: Routes = [
  
  {path:'print-invoice',component:PrintInvoiceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
