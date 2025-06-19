import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { LandingStoreModule } from '../shared/store/landing.store.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, HeaderModule, FooterModule, LandingStoreModule],
  exports: [LandingComponent],
})
export class LandingModule {}
