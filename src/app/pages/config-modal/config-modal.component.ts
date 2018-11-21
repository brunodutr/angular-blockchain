import { Component, OnInit } from '@angular/core';
import { Blockchain } from '../../models/blockchain.model';

@Component({
  selector: 'blockchain-config-modal',
  templateUrl: './config-modal.component.html'
})
export class ConfigModalComponent implements OnInit {
  constructor(public blockchain: Blockchain) {}

  ngOnInit() {}
}
