import { EthereumProvider } from 'ethers';

declare global {
  interface Window {
    ethereum: EthereumProvider;
  }
}