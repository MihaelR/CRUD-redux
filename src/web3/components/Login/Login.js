import { useState } from "react";
import metaMaskImg from "../../../assets/metamask.png";
import "./Login.css";
import { useTranslation } from "react-i18next";

const Login = (props) => {
  const [isConnecting, setIsConnecting] = useState(false);

  //Translation
  const { t } = useTranslation();

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed ?"
        );
      }
      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });
      setIsConnecting(false);
    }
    props.onLogin(provider);
  };

  return (
    <div className="login-container">
      <img src={metaMaskImg} className="meta-logo" alt="metaMask" />
      <button onClick={onLoginHandler} className="button" type="button">
        {!isConnecting && `${t("home.connectToMetamask")}`}
        {isConnecting && "Loading..."}
      </button>
    </div>
  );
};

export default Login;
