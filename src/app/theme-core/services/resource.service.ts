import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

@Injectable()
export class ResourceService<T> {
  private url: string;
  private endpoint: string;
  private method: string;
  private contentType: string;

  constructor(private _dataService: DataService) {}

  setParameters(
    _url: string,
    endpoint: string,
    _method: string,
    _contentType: string
  ) {
    this.url = _url;
    this.endpoint = endpoint;
    this.method = _method;
    this.contentType = _contentType;
  }

  public fetch({ params, body }: { params: any; body: any }) {
    const api_url: string = this.url + this.endpoint;

    return this._dataService.fetchData({
      api_url: api_url,
      method: this.method,
      contentType: this.contentType,
      params: params,
      body: body
    });
  }
}
