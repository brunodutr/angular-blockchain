import { Component, OnInit } from '@angular/core';
import { Blockchain } from '../../models/blockchain.model';

@Component({
  selector: 'blockchain-mine-modal',
  templateUrl: './mine-modal.component.html'
})
export class MineModalComponent implements OnInit {
  address: string = this.blockChain.wallet;

  constructor(public blockChain: Blockchain) {}

  ngOnInit() {}

  mine() {
    this.blockChain.minePendingTransactions(this.address);
  }
}
