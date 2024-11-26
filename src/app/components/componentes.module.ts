import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloComponent } from './articulo/articulo.component';
import { ArticulosComponent } from './articulos/articulos.component';



@NgModule({
  declarations: [
    ArticuloComponent,
    ArticulosComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ArticulosComponent,
  ]
})
export class ComponentesModule { }
