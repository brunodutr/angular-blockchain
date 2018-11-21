import { Transaction } from './transaction.model';
import { SHA256 } from 'crypto-js';

export class Block {
  name: string;
  hash: any;
  nonce: number;
  transactions: Transaction[];
  timestamp: number;
  previousHash: string;

  constructor(
    timestamp: number,
    transactions: Transaction[],
    previousHash: string = '',
    name: string
  ) {
    this.name = name;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  hasValidTransactions(): boolean {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}
