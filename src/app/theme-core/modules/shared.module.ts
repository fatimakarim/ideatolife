import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {MaterialModule} from "./material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { AngularCropperjsModule } from "angular-cropperjs";

import {FeedMatSidenavHelperDirective, FeedMatSidenavTogglerDirective} from "../directives/feed-mat-sidenav-helper/feed-mat-sidenav-helper.directive";
import {FeedMatSidenavHelperService} from "../directives/feed-mat-sidenav-helper/feed-mat-sidenav-helper.service";
import {FeedPipesModule} from "../pipes/pipes.module";
import {FeedConfirmDialogComponent} from "../components/confirm-dialog/confirm-dialog.component";
import {FeedNavbarVerticalService} from "../../layout/navbar/vertical/navbar-vertical.service";
import {FeedPerfectScrollbarDirective} from "../directives/feed-perfect-scrollbar/feed-perfect-scrollbar.directive";
import {FeedIfOnDomDirective} from "../directives/feed-if-on-dom/feed-if-on-dom.directive";
import {CookieService} from "ngx-cookie-service";
import {TranslateModule} from "@ngx-translate/core";

import { FeedTableComponent } from "../components/table/table.component";
import {
    FeedTranslationLoaderService, FeedMatchMedia, DataService, ResourceService
} from "../services";

import {CountrySearchComponent} from "../../helpers/components/country-search/country-search.component";
import {CountrySearchDialogComponent} from "../../helpers/components/country-search/country-search-dialog.component";
import {SearchComponent} from "../../helpers/components/search/search.component";
import {SearchDialogComponent} from "../../helpers/components/search/search-dialog.component";
import {ImageCropDialogComponent} from "../../helpers/components/image-cropper/image-crop-dialog.component";

@NgModule({
  declarations: [
    FeedMatSidenavHelperDirective,
    FeedMatSidenavTogglerDirective,
    FeedConfirmDialogComponent,
    FeedIfOnDomDirective,
    FeedPerfectScrollbarDirective,
    CountrySearchComponent,
    CountrySearchDialogComponent,
    SearchComponent,
    SearchDialogComponent,
    FeedTableComponent,
    ImageCropDialogComponent,
  ],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    FeedPipesModule,
    ReactiveFormsModule,
    AngularCropperjsModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    FeedMatSidenavHelperDirective,
    FeedMatSidenavTogglerDirective,
    FeedPipesModule,
    FeedPerfectScrollbarDirective,
    ReactiveFormsModule,
    FeedIfOnDomDirective,
    TranslateModule,
    CountrySearchComponent,
    CountrySearchDialogComponent,
    SearchComponent,
    SearchDialogComponent,
    FeedTableComponent,
    ImageCropDialogComponent,
  ],
  entryComponents: [
    FeedConfirmDialogComponent,
    CountrySearchComponent,
    CountrySearchDialogComponent,
    SearchComponent,
    SearchDialogComponent,
    ImageCropDialogComponent,
  ],
  providers: [
    CookieService,
    FeedMatchMedia,
    FeedNavbarVerticalService,
    FeedMatSidenavHelperService,
    FeedTranslationLoaderService,
    DataService,
    ResourceService
  ]
})

export class SharedModule {

}
