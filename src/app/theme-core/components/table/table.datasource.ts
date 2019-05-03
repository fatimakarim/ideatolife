import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { CollectionViewer } from "@angular/cdk/collections";

import { ResourceService } from "../../services";
import { finalize, map } from "rxjs/operators";
import * as Constants from '../../../helpers/constants/constant-list';

export class TableDataSource extends DataSource<any> {
    private dataSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public constants = Constants;
    public currentDataCount: number = 0;
    public requestBody: any = {};
    /**
     * this boolean will make sure there is no second request if the first request has not returned
     */
    public isLoading: boolean = false;

    constructor(private _service: ResourceService<any>) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    loadResource({ pageIndex = this.constants.DEFAULT_PAGE_INDEX, body = this.requestBody, appendTo = false }:
        { pageIndex?: number, body?: any, appendTo?: boolean }): Promise<any> {
        return new Promise((resolve, reject) => {
            this.loadingSubject.next(true);
            const params = {
                page: pageIndex,
            };

            if (status) {
                params["status"] = status;
            }

            if (body && body.search && body.search !== null) {
                params["search"] = body.search;
            }

            if (!this.isLoading) {
                this.isLoading = true;
                this._service.fetch({ params, body }).pipe(
                    map(response => response.data),
                    finalize(() => this.loadingSubject.next(false))
                ).subscribe(data => {
                    if (data) {
                        this.currentDataCount = data.length;
                        if (appendTo) {
                            this.dataSubject.next(this.dataSubject.getValue().concat(data));
                        } else {
                            this.dataSubject.next(data);
                        }
                    }
                    this.isLoading = false;
                    resolve(true);
                });
            }
        });

    }

    getCurrentValue() {
        return this.dataSubject.getValue();
    }

    setParams(config: any) {
        this._service.setParameters(config.url, config.endpoint, config.method, config.contentType);
    }
}
