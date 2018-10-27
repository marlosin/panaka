import { ImageResult } from './../interfaces/image-result'
import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap, map, finalize } from 'rxjs/operators'
import { GetParam } from '@shared/interfaces/get-param'
import { environment } from '@env/environment'
import { ImageSearchParam } from '@shared/interfaces/image-search-param'

const API_URL = '/swapi'
const IMAGE_API_URL = '/image'

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

  public searchImage(q: string, params: ImageSearchParam): Observable<ImageResult> {
    const options = {
      params: new HttpParams()
        .set('key', environment.searchApiKey)
        .set('cx', environment.searchApiCx)
        .set('q', q)
        .set('num', '1') // first result
        .set('searchType', 'image')
        .set('fields', 'items(link,image(height,thumbnailHeight,thumbnailLink,thumbnailWidth,width))')
        .set('imageType', params.imageType)
        .set('imageSize', params.imageSize)
    }

    return this._http.get<{ items: ImageResult[] }>(IMAGE_API_URL, options)
      .pipe(
        tap(() => {
          this._onGetStart.emit()
        }),
        map((response) => response.items ? response.items[0] : null),
        finalize(() => {
          this._onGetFinish.emit()
        })
      )
  }
}
