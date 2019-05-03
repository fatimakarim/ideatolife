import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../theme-core/modules/shared.module";
import {FeedMainComponent} from "./layout.component";
import {FeedFooterComponent} from "./footer/footer.component";
import {FeedNavbarVerticalComponent} from "./navbar/vertical/navbar-vertical.component";
import {FeedToolbarComponent} from "./toolbar/toolbar.component";
import {FeedNavigationModule} from "../theme-core/components/navigation/navigation.module";
import {FeedNavbarVerticalToggleDirective} from "./navbar/vertical/navbar-vertical-toggle.directive";
import {FeedNavbarHorizontalComponent} from "./navbar/horizontal/navbar-horizontal.component";
import {FeedQuickPanelComponent} from "./quick-panel/quick-panel.component";
import {FeedSearchBarModule} from "../theme-core/components/search-bar/search-bar.module";
import {ROUTES} from "./layout.routes";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CanActivateGuard } from "../helpers/services/can-activate.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "../helpers/interceptors/jwt.interceptor";
import { TimerInterceptor } from "../helpers/interceptors/timer.interceptor";
import { HttpRequestInterceptor } from "../helpers/interceptors/http-request.interceptor";


@NgModule({
  declarations: [
    FeedFooterComponent,
    FeedMainComponent,
    FeedNavbarVerticalComponent,
    FeedNavbarHorizontalComponent,
    FeedToolbarComponent,
    FeedNavbarVerticalToggleDirective,
    FeedQuickPanelComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    BrowserAnimationsModule,
    FeedNavigationModule,
    FeedSearchBarModule,
    ROUTES
  ],
  exports: [
    FeedMainComponent
  ],
  providers: [
    CanActivateGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ]
})

export class FeedLayoutModule {
}
