//Angular Imports
import { NgModule } from '@angular/core';
import { 
  MatAutocompleteModule, 
  MatButtonModule, 
  MatCardModule, 
  MatChipsModule,
  MatCheckboxModule, 
  MatDialogModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule, 
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatTabsModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule, 
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatTabsModule
  ]
})
export class MaterialDesignModule { }