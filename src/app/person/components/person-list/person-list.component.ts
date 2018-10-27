import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'panaka-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonListComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {

  }

}
