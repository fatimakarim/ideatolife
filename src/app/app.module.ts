import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import "hammerjs";
import { ImageCropperModule } from "ngx-image-cropper";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {SharedModule} from "./theme-core/modules/shared.module";
import {AppComponent} from "./app.component";
import {FeedLayoutModule} from "./layout/layout.module";
import {
 FeedConfigService,FeedSplashScreenService, DataService, ResourceService
} from "./theme-core/services";
import { FeedNavigationService } from "./theme-core/components/navigation/navigation.service";

import {TranslateModule} from "@ngx-translate/core";
import {Error404Module} from "./error/404/error-404.module";
import {AuthenticationModule} from "./authentication/authentication.module";

import { DialogComponent } from "./helpers/components/dialog/dialog.component";
import { FeedBaseComponent } from "./helpers/components/base.component";
import { FeedFormBaseComponent } from "./helpers/components/form-base.component";
import { FeedListingBaseComponent } from "./helpers/components/listing-base.component";
import { UserService } from "./helpers/services/user.service";
import { SharedDataService } from "./helpers/services/shared-data.service";
import { BaseNetworkService } from "./helpers/services/base-network.service";
import { DataListingService } from "./helpers/services/data-listing.service";
import { HelperService } from "./helpers/services/helper.service";
import { PermissionService } from "./helpers/services/permission.service";
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  {
    path: "", loadChildren: "./layout/layout.module#FeedLayoutModule", pathMatch: "full"
  }, {
    path: "auth",
    loadChildren: "./authentication/authentication.module#AuthenticationModule",
    pathMatch: "full"
  }, {
    path: "**", redirectTo: "error", pathMatch: "full"
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    FeedBaseComponent,
    FeedFormBaseComponent,
    FeedListingBaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ImageCropperModule,
    SharedModule,
    TranslateModule.forRoot(),
    FeedLayoutModule,
    Error404Module,
    AuthenticationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjvUDKCZDiOh5dgCVpCOGIp9yvzSGf6P4'
    })
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    FeedSplashScreenService,
    FeedConfigService,
    FeedNavigationService,
    UserService,
    BaseNetworkService,
    DataListingService,
    HelperService,
    PermissionService,
    SharedDataService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ]
})
export class AppModule {
}
