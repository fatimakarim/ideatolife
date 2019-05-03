import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { FeedNavigationComponent } from './navigation.component';
import { FeedNavVerticalItemComponent } from './vertical/nav-item/nav-vertical-item.component';
import { FeedNavVerticalCollapseComponent } from './vertical/nav-collapse/nav-vertical-collapse.component';
import { FeedNavVerticalGroupComponent } from './vertical/nav-group/nav-vertical-group.component';
import { FeedNavHorizontalItemComponent } from './horizontal/nav-item/nav-horizontal-item.component';
import { FeedNavHorizontalCollapseComponent } from './horizontal/nav-collapse/nav-horizontal-collapse.component';

@NgModule({
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        FeedNavigationComponent
    ],
    declarations: [
        FeedNavigationComponent,
        FeedNavVerticalGroupComponent,
        FeedNavVerticalItemComponent,
        FeedNavVerticalCollapseComponent,
        FeedNavHorizontalItemComponent,
        FeedNavHorizontalCollapseComponent
    ]
})
export class FeedNavigationModule
{
}
