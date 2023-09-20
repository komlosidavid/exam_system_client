import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';

import { ButtonComponent } from './button/button.component';
import { TestCardComponent } from './test-card/test-card.component';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AnimateModule } from 'primeng/animate';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [NavComponent, ButtonComponent, TestCardComponent],
  imports: [
    CommonModule,
    ButtonModule,
    PanelModule,
    MenuModule,
    TooltipModule,
    CardModule,
    AvatarModule,
    AnimateModule,
    ProgressBarModule,
  ],
  exports: [NavComponent, ButtonComponent, TestCardComponent],
})
export class SharedModule {}
