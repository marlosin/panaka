import { ImageResult } from './../interfaces/image-result'
import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap, map, catchError } from 'rxjs/operators'
import { GetParam } from '@shared/interfaces/get-param'
import { environment } from '@env/environment'
import { ImageSearchParam } from '@shared/interfaces/image-search-param'

const API_URL = '/swapi'
const IMAGE_API_URL = '/image'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public readonly onGetStart = new EventEmitter<void>()
  public readonly onGetFinish = new EventEmitter<void>()

  constructor(
    private _http: HttpClient,
  ) { }

  public get(endpoint: string, params: GetParam = {}, emitStatus = true): Observable<any> {
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

    const req = this._http.get(API_URL + endpoint, options)

    if (!emitStatus) {
      return req
    }

    this.onGetStart.emit()
      return req.pipe(
        catchError((error) => {
          this.onGetFinish.emit()
          return error
        }),
        tap(() => {
          this.onGetFinish.emit()
        })
      )
  }

  public searchImage(q: string, params: ImageSearchParam): Observable<ImageResult> {
    const key = q + '|' + params.imageSize + params.imageType
    const item: ImageResult = JSON.parse(localStorage.getItem(key))

    if (item) {
      return of(item)
    }

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

    this.onGetStart.emit()
    return this._http.get<{ items: ImageResult[] }>(IMAGE_API_URL, options)
      .pipe(
        map((response) => response.items ? response.items[0] : null),
        tap((imageResult: ImageResult) => {
          localStorage.setItem(key, JSON.stringify(imageResult))
          this.onGetFinish.emit()
        }),
        catchError(({ error }) => {
          console.warn('oops: ', error.error.message)
          throw error
        })
      )
  }
}
