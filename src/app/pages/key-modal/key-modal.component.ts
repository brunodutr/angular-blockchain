import { Component, OnInit } from '@angular/core';
import { generateKeys } from '../../utils/key.generator';

@Component({
  selector: 'blockchain-key-modal',
  templateUrl: './key-modal.component.html'
})
export class KeyModalComponent implements OnInit {
  keys: any = {};
  public_key: string = '';
  private_key: string = '';

  constructor() {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.keys = generateKeys();
    this.public_key = this.keys.getPublic('hex');
    this.private_key = this.keys.getPrivate('hex');
  }
}
