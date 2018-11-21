import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blockchain-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input()
  target: string;

  constructor() {}

  ngOnInit() {}
}
