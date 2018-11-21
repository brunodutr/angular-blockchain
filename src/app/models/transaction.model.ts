import { Buffer } from 'buffer';
import { SHA256 } from 'crypto-js';
import { ec } from 'elliptic';

const EC = new ec('secp256k1');

export class Transaction {
  signature: any;
  amount: number;
  toAddress: string;
  fromAddress: string;
  timestamp: number;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  calculateHash(): string {
    return SHA256(
      this.fromAddress + this.toAddress + this.amount + this.timestamp
    ).toString();
  }

  signTransaction(signingKey: ec.KeyPair) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('Você não pode assinar transações de outras carteiras!');
    }
    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');

    this.signature = sig.toDER('hex');
  }

  isValid(): boolean {
    if (!this.signature || this.signature.length === 0) {
      return false;
    }

    try {
      let buffer = Buffer.from(this.fromAddress, 'hex');
      const publicKey = EC.keyFromPublic(buffer, 'hex');
      return publicKey.verify(this.calculateHash(), this.signature);
    } catch (error) {
      return false;
    }
  }
}
