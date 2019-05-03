import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../theme-core/modules/shared.module";
import {FeedDashboardComponent} from "./feed-dashboard.component";
import { AgmCoreModule } from "@agm/core";

const routes = [
  {
    path: "",
    component: FeedDashboardComponent
  }
];

@NgModule({
  declarations: [
    FeedDashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAjvUDKCZDiOh5dgCVpCOGIp9yvzSGf6P4",
      libraries: ["places"]
    })
  ],
  exports: [
    FeedDashboardComponent
  ]
})

export class FeedDashboardModule {
}
