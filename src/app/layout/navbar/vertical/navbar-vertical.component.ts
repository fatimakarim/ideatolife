import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedMatchMedia } from '../../../theme-core/services/match-media.service';
import { FeedNavbarVerticalService } from './navbar-vertical.service';
import { ObservableMedia } from '@angular/flex-layout';
import { FeedMainComponent } from '../../layout.component';
import { NavigationEnd, Router } from '@angular/router';
import { FeedNavigationService } from '../../../theme-core/components/navigation/navigation.service';
import { FeedPerfectScrollbarDirective } from '../../../theme-core/directives/feed-perfect-scrollbar/feed-perfect-scrollbar.directive';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

@Component({
    selector     : 'feed-navbar-vertical',
    templateUrl  : './navbar-vertical.component.html',
    styleUrls    : ['./navbar-vertical.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FeedNavbarVerticalComponent implements OnInit, OnDestroy
{
    private _backdropElement: HTMLElement | null = null;
    private _folded = false;

    @HostBinding('class.close') isClosed: boolean;
    @HostBinding('class.folded') isFoldedActive: boolean;
    @HostBinding('class.folded-open') isFoldedOpen: boolean;
    @HostBinding('class.initialized') initialized: boolean;
    @ViewChild(FeedPerfectScrollbarDirective) feedPerfectScrollbarDirective;

    @Input()
    set folded(value: boolean)
    {
        this._folded = value;

        if ( this._folded )
        {
            this.activateFolded();
        }
        else
        {
            this.deActivateFolded();
        }
    }

    get folded(): boolean
    {
        return this._folded;
    }

    matchMediaWatcher: Subscription;
    navigationServiceWatcher: Subscription;
    feedPerfectScrollbarUpdateTimeout;

    player: AnimationPlayer;

    constructor(
        private feedMainComponent: FeedMainComponent,
        private feedMatchMedia: FeedMatchMedia,
        private feedNavigationService: FeedNavigationService,
        private navBarService: FeedNavbarVerticalService,
        private router: Router,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private animationBuilder: AnimationBuilder,
        public media: ObservableMedia
    )
    {
        navBarService.setNavBar(this);

        this.navigationServiceWatcher =
            this.feedNavigationService.onNavCollapseToggle.subscribe(() => {
                this.feedPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.feedPerfectScrollbarDirective.update();
                }, 310);
            });

        this.matchMediaWatcher =
            this.feedMatchMedia.onMediaChange
                .subscribe((mediaStep) => {
                    setTimeout(() => {

                        if ( this.media.isActive('lt-lg') )
                        {
                            this.closeBar();
                            this.deActivateFolded();
                        }
                        else
                        {
                            this.openBar();
                            this._detachBackdrop();
                        }
                    });
                });

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationEnd )
                {
                    if ( this.media.isActive('lt-lg') )
                    {
                        setTimeout(() => {
                            this.closeBar();
                        });
                    }
                }
            }
        );
    }

    ngOnInit()
    {
        this.isClosed = false;
        this.isFoldedActive = this._folded;
        this.isFoldedOpen = false;
        this.initialized = false;
        this.updateCssClasses();

        setTimeout(() => {
            this.initialized = true;
        });

        if ( this.media.isActive('lt-lg') )
        {
            this.closeBar();
            this.deActivateFolded();
        }
        else
        {
            if ( !this._folded )
            {
                this.deActivateFolded();
            }
            else
            {
                this.activateFolded();
            }
        }
    }

    ngOnDestroy()
    {
        clearTimeout(this.feedPerfectScrollbarUpdateTimeout);
        this.matchMediaWatcher.unsubscribe();
        this.navigationServiceWatcher.unsubscribe();
    }

    openBar()
    {
        if ( !this.isClosed )
        {
            return;
        }

        this.isClosed = false;
        this.updateCssClasses();
        if ( this.media.isActive('lt-lg') )
        {
            this._attachBackdrop();
        }
    }

    closeBar()
    {
        if ( this.isClosed )
        {
            return;
        }

        this.isClosed = true;
        this.updateCssClasses();
        this._detachBackdrop();
    }

    toggleBar()
    {
        if ( this.isClosed )
        {
            this.openBar();
        }
        else
        {
            this.closeBar();
        }
    }

    toggleFold()
    {
        if ( !this.isFoldedActive )
        {
            this.activateFolded();
        }
        else
        {
            this.deActivateFolded();
        }
    }

    activateFolded()
    {
        this.isFoldedActive = true;
        this.feedMainComponent.addClass('feed-nav-bar-folded');
        this.isFoldedOpen = false;
    }

    deActivateFolded()
    {
        this.isFoldedActive = false;
        this.feedMainComponent.removeClass('feed-nav-bar-folded');
        this.isFoldedOpen = false;
    }

    @HostListener('mouseenter')
    onMouseEnter()
    {
        this.isFoldedOpen = true;
    }

    @HostListener('mouseleave')
    onMouseLeave()
    {
        this.isFoldedOpen = false;
    }

    updateCssClasses()
    {
        if ( !this.isClosed )
        {
            this.feedMainComponent.addClass('feed-navbar-opened');
            this.feedMainComponent.removeClass('feed-navbar-closed');
        }
        else
        {
            this.feedMainComponent.addClass('feed-navbar-closed');
            this.feedMainComponent.removeClass('feed-navbar-opened');
        }
    }

    private _attachBackdrop()
    {
        this._backdropElement = this._renderer.createElement('div');
        this._backdropElement.classList.add('feed-navbar-backdrop');

        this._renderer.appendChild(this._elementRef.nativeElement.parentElement, this._backdropElement);

        this.player =
            this.animationBuilder
                .build([
                    animate('400ms ease', style({opacity: 1}))
                ]).create(this._backdropElement);

        this.player.play();

        this._backdropElement.addEventListener('click', () => {
                this.closeBar();
            }
        );
    }

    private _detachBackdrop()
    {
        if ( this._backdropElement )
        {
            this.player =
                this.animationBuilder
                    .build([
                        animate('400ms cubic-bezier(.25,.8,.25,1)', style({opacity: 0}))
                    ]).create(this._backdropElement);

            this.player.play();

            this.player.onDone(() => {
                if ( this._backdropElement )
                {
                    this._backdropElement.parentNode.removeChild(this._backdropElement);
                    this._backdropElement = null;
                }
            });
        }
    }
}
