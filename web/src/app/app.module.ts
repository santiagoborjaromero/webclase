// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { FacturaComponent } from './components/factura/factura.component';
// import { ModalDialogModule } from 'ngx-modal-dialog';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';

@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    SharedModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ModalModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
