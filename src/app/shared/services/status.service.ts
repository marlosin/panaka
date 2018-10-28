import { LayoutModule } from '@angular/cdk/layout'
import { HttpService } from './http.service'
import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  public readonly isLoading = new EventEmitter<void>()
  public readonly finishedLoading = new EventEmitter<void>()

  constructor(
    private _httpService: HttpService,
  ) {
    this._registerListeners()
  }

  private _registerListeners(): void {
    this._httpService.onGetStart.subscribe(() => {
      this.isLoading.emit()
    })

    this._httpService.onGetFinish.subscribe(() => {
      this.finishedLoading.emit()
    })
  }
}
