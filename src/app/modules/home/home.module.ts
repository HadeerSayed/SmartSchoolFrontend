import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { LandingsectionComponent } from './pages/mainpage/sections/landing-section/landing-section.component';
import { BrightFutureSectionComponent } from './pages/mainpage/sections/bright-future-section/bright-future-section.component';
import { ActivitySectionComponent } from './pages/mainpage/sections/activity-section/activity-section.component';
import { ProviderSectionComponent } from './pages/mainpage/sections/provider-section/provider-section.component';
import { TeachersComponent } from './pages/mainpage/sections/teachers/teachers.component';
import { VideoComponent } from './pages/mainpage/sections/video/video.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollService } from "../../services/Scroll.service";


@NgModule({
  declarations: [
                 LandingsectionComponent,
                 BrightFutureSectionComponent,
                 ActivitySectionComponent,
                 ProviderSectionComponent,
                 TeachersComponent,
                 VideoComponent,
                 MainpageComponent,
                 HomeComponent,
                 SubjectsComponent
                 ],
  imports: [CommonModule,HomeRoutingModule,SharedModule,CarouselModule,],
  exports: [],
  providers: [ScrollService]
})
export class HomeModule {}
