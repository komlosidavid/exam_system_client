import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';

import { ButtonComponent } from './button/button.component';
import { TestCardComponent } from './test-card/test-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavComponent, ButtonComponent, TestCardComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [NavComponent, ButtonComponent, TestCardComponent],
})
export class SharedModule {}
