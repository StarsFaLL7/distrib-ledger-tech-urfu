"use client";

export default function InfoComponent() {
  return (
    <div className="card">
        <h2>Смарт-контракт - EFORCE (SAMPLE)</h2>
        <ul style={{listStyle: 'circle'}}>
            <li><p>Представляет NFT с названием "EFORCE"</p></li>
            <li><p>Соответствует ERC721</p></li>
            <li><p>Адрес: 0xa634278ba15bdf9A725005030FA5EB174d2cBf7b</p></li>
            <li><p>Etherscan: <a style={{color: 'blue', textDecoration: 'underline'}} href="https://sepolia.etherscan.io/address/0xa634278ba15bdf9a725005030fa5eb174d2cbf7b">https://sepolia.etherscan.io/address/0xa634278ba15bdf9a725005030fa5eb174d2cbf7b</a></p></li>
        </ul>
        <p></p>
    </div>
  );
}