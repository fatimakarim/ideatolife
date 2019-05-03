import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FeedMainComponent } from '../../layout.component';

@Component({
    selector     : 'feed-navbar-horizontal',
    templateUrl  : './navbar-horizontal.component.html',
    styleUrls    : ['./navbar-horizontal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FeedNavbarHorizontalComponent implements OnInit, OnDestroy
{
    constructor(private feedMainComponent: FeedMainComponent)
    {
    }

    ngOnInit()
    {
        this.feedMainComponent.addClass('feed-nav-bar-horizontal');
    }

    ngOnDestroy()
    {
        this.feedMainComponent.removeClass('feed-nav-bar-horizontal');
    }
}
