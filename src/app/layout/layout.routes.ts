import {RouterModule, Routes} from "@angular/router";
import {FeedMainComponent} from "./layout.component";

// noinspection TypeScriptValidateTypes
const protectedRoutes: Routes = [
  {
    path: "", component: FeedMainComponent, children: [
      {path: "dashboard", loadChildren: "./content/dashboard/feed-dashboard.module#FeedDashboardModule"},
      {path: "feed-offer", loadChildren: "./content/feed-offer/feed-offer.module#FeedOfferModule"},

    ]
  },
];
export const ROUTES = RouterModule.forChild(protectedRoutes);
