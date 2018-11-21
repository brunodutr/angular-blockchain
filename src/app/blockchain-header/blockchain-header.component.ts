import { Component, OnInit } from '@angular/core';
import { Blockchain } from '../models/blockchain.model';

@Component({
  selector: 'blockchain-header',
  templateUrl: './blockchain-header.component.html'
})
export class BlockchainHeaderComponent implements OnInit {
  valor_carteira: number;
  valid: string;

  buttons = [
    {
      target: '#txModal',
      icon: 'fa fa-plus',
      text: 'Transação'
    },
    {
      target: '#keyModal',
      icon: 'fa fa-key',
      text: 'Gerar Chaves'
    },
    {
      target: '#configModal',
      icon: 'fa fa-cog',
      text: 'Configurações'
    }
  ];

  constructor(private blockchain: Blockchain) {}

  ngOnInit() {
    this.blockchain.isValid$.subscribe(value =>
      value ? (this.valid = 'Válido') : (this.valid = 'Inválido')
    );

    this.blockchain.walletAmount$.subscribe(
      value => (this.valor_carteira = value)
    );
  }
}
