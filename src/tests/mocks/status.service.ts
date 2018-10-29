import { EventEmitter } from '@angular/core'

export class MockStatusService {
  public readonly isLoading = new EventEmitter<void>()
  public readonly finishedLoading = new EventEmitter<void>()
}
