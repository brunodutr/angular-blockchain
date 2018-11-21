import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'blockchain-input',
  templateUrl: './blockchain-input.component.html',
  styleUrls: ['./blockchain-input.component.css']
})
export class BlockchainInputComponent implements OnInit {
  @Input()
  texto: string;

  @Input()
  value: any;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  emit(event: any) {
    this.valueChange.emit(this.value);
  }
}
