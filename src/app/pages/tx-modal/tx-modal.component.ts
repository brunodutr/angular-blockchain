import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { getKey } from '../../utils/key.generator';
import { Blockchain } from '../../models/blockchain.model';

@Component({
  selector: 'blockchain-tx-modal',
  templateUrl: './tx-modal.component.html'
})
export class TxModalComponent implements OnInit {
  tx: {
    toAddress: string;
    fromAddress: string;
    amount: string;
    signature: string;
  };

  @Output()
  saveTX: EventEmitter<Transaction> = new EventEmitter();

  constructor(private blockchain: Blockchain) {}

  ngOnInit() {
    this.tx = {
      toAddress: '',
      fromAddress: '',
      amount: '',
      signature: ''
    };
  }

  emit() {
    let keys = getKey(this.tx.signature);

    let _tx = new Transaction(
      this.tx.fromAddress,
      this.tx.toAddress,
      this.tx.amount
    );

    _tx.signTransaction(keys);

    this.saveTX.emit(_tx);
  }
}
