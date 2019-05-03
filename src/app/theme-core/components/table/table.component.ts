import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    HostListener,
    Injector
} from "@angular/core";
import { MatSelectChange } from "@angular/material";
import { throttle } from "lodash";
import { DataService, ResourceService } from "../../services";
import { TableDataSource } from "./table.datasource";
import * as Constants from '../../../helpers/constants/constant-list';
import { FeedBaseComponent } from "../../../helpers/components/base.component";

enum scrollDirection {
    UP = 'up',
    DOWN = 'down'
}

enum scrollListener {
    HOST = 'scroll',
    WINDOW = 'window:scroll'
}

@Component({
    selector: "feed-resource-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"]
})
export class FeedTableComponent extends FeedBaseComponent implements OnInit, AfterViewInit, OnChanges {
    public _constants = Constants;

    private _window: Element;
    private _element: Element;
    private scrollDelay = this._constants.DEFAULT_SCROLL_DELAY_TIME;
    private scrollOffset = this._constants.DEFAULT_SCROLL_OFFSET;

    public dataSource: TableDataSource;
    public selectedStatus: number;

    public pageIndex: number = this._constants.DEFAULT_PAGE_INDEX;
    public scrollTop = 0;
    public more: boolean = true;

    public sortKey: string = this._constants.DEFAULT_SORT_KEY;
    public sortOrder: string = this._constants.DEFAULT_SORT_ORDER;

    @Input() displayedColumnsViewArray: any[] = [];

    /**
     * API configuration object
     * @type {url: string; endpoint: string; method: string; contentType: string}
     */
    @Input()
    endPointConfiguration: {
        url: string;
        endpoint: string;
        method: string;
        contentType: string;
    } = {
            url: "",
            endpoint: "",
            method: "",
            contentType: ""
        };

    @Input() triggerChange: any = {};

    /**
     * Optional Request body
     * @type {{}}
     */
    @Input() requestBody: any = {};

    @Input() filters: any[] = [];

    @Output() elementClick: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild("input") input: ElementRef;

    @HostListener(scrollListener.HOST) _scroll: Function;
    @HostListener(scrollListener.WINDOW) _windowScroll: Function;

    displayedColumns: any[] = [];

    private _resourceService: ResourceService<any>;

    constructor(private _dataService: DataService,
        private elRef: ElementRef,
        injector: Injector) {
        super(injector);
        this._dataService = _dataService;
        this._window = document.documentElement as Element;
        this._element = this.elRef.nativeElement;
        this._scroll = this._windowScroll = throttle(this.handleScroll, this.scrollDelay);
    }

    ngOnInit() {
        this.displayedColumns = this.displayedColumnsViewArray.map(
            (column: { key: string; value: string }) => column.key
        );

        this._resourceService = new ResourceService<any>(this._dataService);
        this._resourceService.setParameters(
            this.endPointConfiguration.url,
            this.endPointConfiguration.endpoint,
            this.endPointConfiguration.method,
            this.endPointConfiguration.contentType
        );

        this.dataSource = new TableDataSource(this._resourceService);
        this.dataSource.requestBody = this.requestBody;

        const option = {};
        if (this.selectedStatus) {
            option["status"] = this.selectedStatus;
        }

        this.dataSource.loadResource(option)
            .then(() => {
                this.pageIndex += 1;
            });
        if (this.selectedStatus) {
            this.loadResourcesPage();
        }
    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes["triggerChange"] &&
            !changes["triggerChange"].firstChange &&
            changes["triggerChange"].currentValue
        ) {
            this.pageIndex = this._constants.DEFAULT_PAGE_INDEX; // reset pagination to initial value
            this.loadResourcesPage();
        }
    }

    loadResourcesPage(appendTo: boolean = true): void {
        if (this.more) {
            this.dataSource.loadResource({ pageIndex: this.pageIndex, appendTo: appendTo }).then(response => {
                if (response) {
                    if (!this.dataSource.getCurrentValue()
                        || this.dataSource.getCurrentValue().length < 1
                        || this.dataSource.currentDataCount < 1
                    ) {
                        this.more = false;
                    } else {
                        this.pageIndex += 1;
                        this.more = true;
                    }
                }
            });
        }
    }

    onSelectChange(event: MatSelectChange, filterKey?: null) {
        const status = event.value;
        this.pageIndex = this._constants.DEFAULT_PAGE_INDEX; // reset pagination to initial value
        this.loadResourcesPage(false);
    }

    emitEvent(element: any, action: { key: string; value: string }) {
        this.elementClick.emit({ element: element, action: action.key });
    }

    emitLinkEvent(element: any, action: { key: string; value: string }) {
        this.elementClick.emit({ element: element, action: action });
    }

    constructNestedObject(
        element,
        column: {
            key: string;
            value: string;
            type: string;
            map: object;
            callback: Function;
        }
    ) {
        if (!column.key && !column.callback) {
            return "";
        } else if (!column.key && column.callback) {
            return column.callback.call(column.callback, <any>element);
        }

        const key =
            column.key.split(".").length > 1
                ? this.getNestedPropertyValue(element, column.key)
                : column.key;
        if (key && key !== column.key) {
            return column.map ? column.map[key] ? column.map[key] : key : key;
        }

        if ((!key || !element[key]) && !column.callback && !column.map) {
            return "";
        }

        if ((!key || !element[key]) && column.callback) {
            return column.callback.call(column.callback, <any>element);
        }

        if (column.key.indexOf(".") > -1 && !column.map) {
            return key;
        }

        if (!element[key] && !column.map) {
            return "";
        }

        if (column.callback) {
            return column.callback.call(column.callback, <any>element[key]);
        }

        return column.map
            ? column.map[key]
                ? column.map[key]
                : column.map[element[key]]
            : element[key];
    }

    constructImage(element, column: { key: string }): any {
        return element[column.key];
    }

    getNestedPropertyValue(
        theObject: any,
        path: string,
        separator = "."
    ): string {
        try {
            separator = separator || ".";

            return path
                .replace("[", separator)
                .replace("]", "")
                .split(separator)
                .reduce(function (obj, property) {
                    return obj[property];
                }, theObject);
        } catch (err) {
            return "";
        }
    }

    roundTo(from: number, to: number = this.scrollOffset): number {
        return Math.floor(from / to) * to;
    }

    getListener(): string {
        return this.elRef.nativeElement.clientHeight === this.elRef.nativeElement.scrollHeight
            ? scrollListener.WINDOW
            : scrollListener.HOST;
    }

    getScrollDirection(st: number): string {
        return this.scrollTop <= st ? scrollDirection.DOWN : scrollDirection.UP;
    }

    canScroll(e: Element): boolean {
        if (e.scrollTop == 0 && e.clientHeight == 0) {
            return false;
        }

        const scrolled = this.more
            && this.getScrollDirection(e.scrollTop) === scrollDirection.DOWN
            && this.roundTo(e.clientHeight) === this.roundTo(e.scrollHeight - e.scrollTop);
        this.scrollTop = e.scrollTop;
        return scrolled;
    }

    handleScroll($event): void {
        const canScroll = (this.getListener() === scrollListener.HOST)
            ? this.canScroll(this._element)
            : this.canScroll(this._window);
        if (canScroll) {
            this.loadResourcesPage();
        }
    }

    sortTable(key: string) {
        if (key == 'businessReferenceId' || key == 'name' || key == 'firstName' || key == 'lastName'
            || key == 'brandManager') {
            this.sortKey = key == 'brandManager' ? 'brand_manager' : key;
            this.sortOrder = this.sortOrder === this._constants.DEFAULT_SORT_ORDER
                ? "ASC"
                : this._constants.DEFAULT_SORT_ORDER;

            this.more = true;
            this.pageIndex = this._constants.DEFAULT_PAGE_INDEX;

            this.endPointConfiguration.endpoint = this.endPointConfiguration.endpoint
                .replace(/(sort_key=)[^\&]+/, '$1' + this.sortKey)
                .replace(/(sort_order=)[^\&]+/, '$1' + this.sortOrder);

            this.dataSource.setParams(this.endPointConfiguration);
            this.loadResourcesPage(false);
        }
    }
}
