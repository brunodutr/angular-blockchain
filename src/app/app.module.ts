import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BlockchainHeaderComponent } from './blockchain-header/blockchain-header.component';
import { BlockchainInputComponent } from './blockchain-input/blockchain-input.component';
import { ModalComponent } from './modal/modal.component';
import { ConfigModalComponent } from './pages/config-modal/config-modal.component';
import { KeyModalComponent } from './pages/key-modal/key-modal.component';
import { MineModalComponent } from './pages/mine-modal/mine-modal.component';
import { TxModalComponent } from './pages/tx-modal/tx-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    TxModalComponent,
    KeyModalComponent,
    MineModalComponent,
    BlockchainInputComponent,
    BlockchainHeaderComponent,
    ConfigModalComponent
  ],
  imports: [BrowserModule, FormsModule],
  exports: [
    TxModalComponent,
    KeyModalComponent,
    MineModalComponent,
    BlockchainInputComponent,
    ConfigModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
