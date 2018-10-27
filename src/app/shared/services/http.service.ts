import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap, finalize } from 'rxjs/operators'
import { GetParam } from '../interfaces/get-param';

const API_URL = '/swapi'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly _onGetStart = new EventEmitter<void>()
  private readonly _onGetFinish = new EventEmitter<void>()

  constructor(
    private _http: HttpClient,
  ) { }

  public get(endpoint: string, params: GetParam = {}): Observable<any> {
    const { filter, page } = params
    const options = { params: new HttpParams() }

    if (params.filter) {
      options.params = options.params
        .set('search', filter)
    }

    if (!isNaN(params.page)) {
      options.params = options.params
        .set('page', page.toString())
    }

    return this._http.get(API_URL + endpoint, options)
      .pipe(
        tap(() => {
          this._onGetStart.emit()
        }),
        finalize(() => {
          this._onGetFinish.emit()
        })
      )
  }
}
