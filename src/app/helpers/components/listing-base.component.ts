import { Component, ViewEncapsulation, Injector, ViewChild, Input } from "@angular/core";

import { FeedBaseComponent } from "./base.component";
import { MatTableDataSource } from "@angular/material";
import { TableDataSource } from "../../theme-core/components/table/table.datasource";
import { FeedTableComponent } from "../../theme-core/components/table/table.component";
import { Subscription } from "rxjs";

/*
 * Base Component
 * Top Level Component
 */
@Component({
    selector: "feed-listing-base-component",
    encapsulation: ViewEncapsulation.None,
    template: ""
})
export class FeedListingBaseComponent extends FeedBaseComponent {

    /**
     * The following acts as the filters of the data table
     * @type {any[]}
     */
    public paramsFilter: any[] = [];

    /**
     * The following acts as the columns for the pagination of the data table
     * @type {any[]}
     */
    public displayedColumnsViewArray: any[] = [];

    /**
     * The following acts to delete record  from the data table
     * @type {any[]}
     */
    public deletedItemId: number | string = '';

    /**
     * The following acts as the api resource configuration for the pagination of the data table
     * @type {any}
     */
    public endPointConfiguration: any = {};

    /**
     * The following acts as the data source for the pagination of the data table
     * @type {MatTableDataSource<any>}
     */
    public dataSource = new MatTableDataSource();

    private _pageIndex: number = this.constantList.DEFAULT_PAGE_INDEX;

    /**
     * the following holds reference to the search subscription , which needs to be unsubscribe when respective component is destroyed from view
     */
    protected subscription: Subscription;

    @ViewChild(FeedTableComponent) table: FeedTableComponent;

    get pageIndex(): number {
        return this._pageIndex;
    }

    set pageIndex(value: number) {
        this._pageIndex = value;
    }

    constructor(injector: Injector) {
        super(injector);
    }

    /**
     * the following method is used to setup the search bar subscriber
     */
    setupSearchSubscriber() {
        // the following will subscribe to any changes in search field and trigger the respective search method
        this.subscription = this.sharedDataService.searchQuery.subscribe(message => {
            if (message !== '' && message !== null && this.table.dataSource) {
                this.table.pageIndex = 0;
                this.table.more = true;
                this.table.requestBody.search = message;
                this.table.loadResourcesPage(false);
            } else {
                this.table.pageIndex = 0;
                this.table.more = true;
                delete this.table.requestBody.search;
                // for cases where user enters empty text to search, but making sure datasource is initialized already
                if (this.table.dataSource) this.table.loadResourcesPage(false);
            }
        });
    }

    /*
     * check element if exist to add it or update the value of it
     */
    checkAndAdd(key: string, value: any) {
        if (this.paramsFilter.length === 0) {
            this.paramsFilter.push({ key: key, value: value });
        } else {
            const found = this.paramsFilter.some(function (el) {
                return el.key === key;
            });

            if (!found) {
                this.paramsFilter.push({ key: key, value: value });
            } else {
                for (let index = 0; index < this.paramsFilter.length; index++) {
                    if (this.paramsFilter[index].key === key) {
                        this.paramsFilter[index].value = value;
                    }
                }
            }
        }
    }

    /*
    * The following method is used to check if key exist or not
    */
    checkKey(key: string) {
        return this.paramsFilter.some(function (el) {
            return el.key === key;
        });
    }

    /*
     * remove specific key from array
     */
    removeByKey(key: string): void {
        const index = this.paramsFilter.findIndex(item => item.key === key);
        if (index) {
            this.paramsFilter.splice(index, 1);
        }
    }
}
