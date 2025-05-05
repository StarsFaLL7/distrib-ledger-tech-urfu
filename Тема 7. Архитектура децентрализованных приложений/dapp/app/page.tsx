import InfoComponent from "./infoComponent";
import MintComponent from "./mintComponent";
import TokenComponent from "./tokenComponent";
import TokenUriComponent from "./tokenUriComponent";
import TransactionComponent from "./transactionComponent";
import TransferComponent from "./transferComponent";
import WalletComponent from "./walletComponent";

export default function Home() {
      return (
            <main className="" style={{padding: '50px 200px'}}>
                  <div className="flex flex-col items-center justify-center">
                              <WalletComponent />   
                              <TransactionComponent />       
                              <InfoComponent />
                              <TokenComponent />
                              <MintComponent />
                              <TokenUriComponent />
                              <TransferComponent />
                 </div>
            </main>
      );
}
