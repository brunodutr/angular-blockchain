import { ec } from 'elliptic';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { Block } from './block.model';
import { Transaction } from './transaction.model';
import { OnInit, Injectable } from '@angular/core';
import { generateKeys } from '../utils/key.generator';

@Injectable({
  providedIn: 'root'
})
export class Blockchain {
  wallet: string = '';
  private keys: ec.KeyPair;
  private _genesis_block: Block;

  isValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  walletAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  miningReward: number;
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 10;
    this.keys = generateKeys();
    interval(1000).subscribe(() => {
      this.valid();
    });
  }

  createGenesisBlock(): Block {
    if (!this._genesis_block) {
      this._genesis_block = new Block(Date.now(), [], '0', 'Bloco Gênese');
    }

    return Object.assign(
      Object.create(Object.getPrototypeOf(this._genesis_block)),
      this._genesis_block
    );
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string) {
    const rewardTx = new Transaction(
      this.keys.getPublic('hex'),
      miningRewardAddress,
      '' + this.miningReward
    );

    rewardTx.signTransaction(this.keys);

    this.pendingTransactions.push(rewardTx);

    let block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash,
      `Bloco ${this.chain.length}`
    );

    block.mineBlock(this.difficulty);

    this.chain.push(block);

    this.pendingTransactions = [];

    if (this.wallet) {
      let value = this.getBalanceOfAddress(this.wallet);
      this.walletAmount$.next(value);
    }
  }

  addTransaction(transaction: Transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error(
        'Transação precisa incluir endereço de remetente e destinatário'
      );
    }

    if (!transaction.isValid()) {
      throw new Error('Transação inválida não pode ser adicionada a cadeia');
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= parseFloat('' + trans.amount);
        }

        if (trans.toAddress === address) {
          balance += parseFloat('' + trans.amount);
        }
      }
    }
    return balance;
  }

  private valid() {
    if (JSON.stringify(this._genesis_block) !== JSON.stringify(this.chain[0])) {
      this.isValid$.next(false);
      return;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) {
        this.isValid$.next(false);
        return;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        this.isValid$.next(false);
        return;
      }

      if (currentBlock.previousHash !== previousBlock.calculateHash()) {
        this.isValid$.next(false);
        return;
      }
    }
    this.isValid$.next(true);
  }
}
