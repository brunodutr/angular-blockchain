import { Component, OnInit } from '@angular/core';
import { Block } from './models/block.model';
import { Blockchain } from './models/blockchain.model';
import { Transaction } from './models/transaction.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _block: Block;

  showTX: boolean;

  constructor(private blockChain: Blockchain) {}

  ngOnInit(): void {}

  show(block: Block) {
    this.showTX = true;
    this._block = block;
  }

  closeTX() {
    this.showTX = false;
    this._block = null;
  }

  addTX(tx: Transaction) {
    this.blockChain.addTransaction(tx);
  }
}
