import { Directive, HostListener, Input } from '@angular/core';
import { FeedNavbarVerticalService } from './navbar-vertical.service';
import { FeedNavbarVerticalComponent } from './navbar-vertical.component';

@Directive({
    selector: '[feedNavbarVertical]'
})
export class FeedNavbarVerticalToggleDirective
{
    @Input() feedNavbarVertical: string;
    navbar: FeedNavbarVerticalComponent;

    constructor(private navbarService: FeedNavbarVerticalService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.navbar = this.navbarService.getNavBar();

        if ( !this.navbar[this.feedNavbarVertical] )
        {
            return;
        }

        this.navbar[this.feedNavbarVertical]();
    }
}
