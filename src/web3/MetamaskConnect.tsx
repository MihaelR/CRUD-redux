import { useState } from "react";
import Home from "./components/WebHome/WebHome";
import Login from "./components/Login/Login";
import Web3 from "web3";
import "./MetamaskConnect.css";

function MetamaskConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | number>(0);

  const onLogin = async (provider: any) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      const accBalanceEth = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );

      setBalance(Number(accBalanceEth).toFixed(6));
      setIsConnected(true);
    }
  };

  const onLogout = () => {
    setIsConnected(false);
  };

  return (
    <div className="meta-container">
      <div className="meta-account">
        <a href="/">{currentAccount}</a>
      </div>
      <main>
        {!isConnected && <Login onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (
          <Home currentAccount={currentAccount} balance={balance} />
        )}
      </main>
    </div>
  );
}

export default MetamaskConnect;
