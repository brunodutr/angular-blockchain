import { ec } from 'elliptic';
import { Buffer } from 'buffer';

const EC = new ec('secp256k1');

export function generateKeys() {
  return EC.genKeyPair();
}

export function getKey(private_key: string) {
  return EC.keyFromPrivate(new Buffer(private_key, 'hex'), 'hex');
}
