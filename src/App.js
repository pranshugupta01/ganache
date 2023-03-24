import React, { useState } from "react";
import Web3 from "web3";
import "./App.css";

const App = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [count, setCount] = useState(0);
  const [blockNumber, setBlockNumber] = useState("");
  const [block, setBlock] = useState({});

  const sendEther = async (event) => {
    event.preventDefault();
    const web3 = new Web3(
      new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
    );

    const sender = web3.eth.accounts.privateKeyToAccount("0xf9250e6ef44fdaafdefff8ea7da970e8edd01f9804cf84b8af1c5f97e52e3cd7");
    web3.eth.defaultAccount = sender.address;

    try {
      const transaction = await web3.eth.sendTransaction({
        from: sender.address,
        to: receiverAddress,
        value: web3.utils.toWei(amount, "ether"),
      });
      console.log(transaction);
      alert(`${amount} ethers sent to ${receiverAddress}`);
    } catch (error) {
      alert("Enter a valid Receiver's Address");
    }
  };

  
  const handleContractSearch = async () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
    );

    const balanceInWei = await web3.eth.getBalance(address);

    const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
    const c =web3.eth.getTransactionCount(address).then((e) =>{setCount(e)});

    setBalance(balanceInEther);
    
  };
 
  const handleBlockSearch = async () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("HTTP:127.0.0.1:7545")
    );

    const blockDetails = await web3.eth.getBlock(blockNumber);

    setBlock(blockDetails);
  };


 

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
      ampm = "AM",
      time;

    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh == 0) {
      h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm;
    return time;
  }

  return (
    <div className="container">
      <h1 className="title"> <u> Ether Scan</u></h1>
     

      <form onSubmit={sendEther}>
        <h3> <u>Receiver's Address:</u></h3>
        <input className=" mx-3"
          type="text"
          id="receiverAddress"
          placeholder="Enter Receiver Address"
          value={receiverAddress}
          onChange={(event) => setReceiverAddress(event.target.value)}
        />
        <h3><u>Amount:</u></h3>
        <input className="mx-3"
          type="text"
          id="Amount"
          placeholder="Enter Amount in Ethers"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <div className="title">
          <button className="button btn btn-dark " type="submit">
            Send Ether
          </button>
        </div>
        </form>
        <div className="row">
          <div className="col ">
            <h3><u>Contract Address:</u></h3>
            <input 
              placeholder="Enter Contract Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="col my-4 mx-1">
            <button className="button btn btn-dark " onClick={handleContractSearch}>
              Search
            </button>
          </div>
          <p> <strong>Balance: </strong> {balance} Ether</p>
          <p> <strong>No. of Transactions: </strong> {count}</p>
        </div>

        <div className="row">
          <div className="col ">
           <h3> <u> Block Number:</u></h3>
            <input 
              placeholder="Enter Block Number"
              type="text"
              value={blockNumber}
              onChange={(e) => setBlockNumber(e.target.value)}
            />
          </div>

          <div className="col">
            <button className='button hello btn btn-dark ' onClick={handleBlockSearch}>Search</button>
          </div>
        </div>

       
        <p> <strong>Block Number:</strong> {block.number}</p>
        <p> <strong>Timestamp: </strong> {convertTimestamp(block.timestamp)}</p>
        <p> <strong>Transactions:</strong> {block.transactions}</p>
        <p> <strong>Gas Limit:</strong> {block.gasLimit}</p>
        <p> <strong>Gas Used:</strong> {block.gasUsed}</p>
   
    </div>
  );
};

export default App;
