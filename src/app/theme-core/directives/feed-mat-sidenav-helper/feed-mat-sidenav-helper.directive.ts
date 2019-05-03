import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { FeedMatchMedia } from '../../services/match-media.service';
import { FeedMatSidenavHelperService } from './feed-mat-sidenav-helper.service';

@Directive({
    selector: '[feedMatSidenavHelper]'
})
export class FeedMatSidenavHelperDirective implements OnInit, OnDestroy
{
    matchMediaSubscription: Subscription;

    @HostBinding('class.mat-is-locked-open') isLockedOpen = true;

    @Input('feedMatSidenavHelper') id: string;
    @Input('mat-is-locked-open') matIsLockedOpenBreakpoint: string;

    constructor(
        private feedMatSidenavService: FeedMatSidenavHelperService,
        private feedMatchMedia: FeedMatchMedia,
        private observableMedia: ObservableMedia,
        private matSidenav: MatSidenav
    )
    {
    }

    ngOnInit()
    {
        this.feedMatSidenavService.setSidenav(this.id, this.matSidenav);

        if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
        {
            this.isLockedOpen = true;
            this.matSidenav.mode = 'side';
            this.matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this.matSidenav.mode = 'over';
            this.matSidenav.toggle(false);
        }

        this.matchMediaSubscription = this.feedMatchMedia.onMediaChange.subscribe(() => {
            if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
            {
                this.isLockedOpen = true;
                this.matSidenav.mode = 'side';
                this.matSidenav.toggle(true);
            }
            else
            {
                this.isLockedOpen = false;
                this.matSidenav.mode = 'over';
                this.matSidenav.toggle(false);
            }
        });
    }

    ngOnDestroy()
    {
        this.matchMediaSubscription.unsubscribe();
    }
}

@Directive({
    selector: '[feedMatSidenavToggler]'
})
export class FeedMatSidenavTogglerDirective
{
    @Input('feedMatSidenavToggler') id;

    constructor(private feedMatSidenavService: FeedMatSidenavHelperService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.feedMatSidenavService.getSidenav(this.id).toggle();
    }
}
