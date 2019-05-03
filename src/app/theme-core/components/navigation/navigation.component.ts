import { Component, Input, OnDestroy, ViewEncapsulation } from "@angular/core";
import { FeedNavigationService } from "./navigation.service";
import { Subscription } from "rxjs";

@Component({
    selector     : "feed-navigation",
    templateUrl  : "./navigation.component.html",
    styleUrls    : ["./navigation.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class FeedNavigationComponent implements OnDestroy
{
    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;

    @Input("layout") layout = "vertical";

    constructor(private gpulseNavigationService: FeedNavigationService)
    {
        this.navigationModelChangeSubscription =
            this.gpulseNavigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    this.navigationModel = navigationModel;
                });
    }

    ngOnDestroy()
    {
        this.navigationModelChangeSubscription.unsubscribe();
    }

}
