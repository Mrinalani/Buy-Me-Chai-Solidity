import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../../artifacts/contracts/Chai.sol/chai.json";
import BuyChai from "./components/BuyChai";
import Memo from "./components/Memo";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState('none')
  const connectWallet = async () => {
    const contractAddress = "0xa2b05Ece5168aF2cDE09Ad3970d11Ce94321673e";
    try {
      const { ethereum } = window;
      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountChange" ,() =>{
          window.location.reload()
        })
        window.ethereum.on("chainChanged", () => {
          window.location.reload()
        })
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi.abi, signer);
        setAccount(account)
        setState({provider, signer, contract});
        console.log(state);
      }else{
        alert("please inatall metamask")
      }
    } catch (error) {
      console.log(error)
    }
  };
  console.log(state);


  useEffect(() => {
    connectWallet()
  },[])

  return (
    <div>
      <h1>Buy Chai</h1>
      <BuyChai state={state}/>
      <div>connected account: {account}</div>
      <Memo state={state} />
    </div>
  );
}

export default App;
