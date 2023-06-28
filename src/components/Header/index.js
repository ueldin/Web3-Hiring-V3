import React, { useEffect, useState } from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

import './index.scss';
function HomePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState('');
  const [signature, setSignature] = useState();
  const [address, setAddress] = useState('');
  const [verifyAddress, setVerifyAddress] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const { utils } = require('ethers');

  useEffect(() => {
    // Check if Metamask is installed
    if (typeof window.ethereum == 'undefined') {
      alert('No Metamask!');
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          console.log('connect', result);
          setIsConnected(true);
          setAccount(utils.getAddress(result[0]));
          setProvider(new ethers.providers.Web3Provider(window.ethereum));
        })
        .catch((error) => {
          console.log('Could not detect Account', error);
        });
    } else {
      console.log('Need to install MetaMask');
    }
  };

  const handleSign = async () => {
    const message = 'Hello, Chainfuse!';
    const signer = await provider.getSigner();
    const signatureValue = await signer.signMessage(message);
    const addressValue = await signer.getAddress();
    setSignature(signatureValue);
    setAddress(addressValue);
    console.log('signature is : ' + signatureValue);
  };

  const verify = () => {
    const actualAddress = utils.verifyMessage('Hello, Chainfuse!', signature);
    console.log('verification address: ', actualAddress);
    setVerifyAddress(actualAddress);
    if (actualAddress !== address) {
      console.log('invalid');
      setVerificationStatus('False');
    } else {
      console.log('verified');
      setVerificationStatus('True');
    }
  };

  useEffect(() => {
    if (account) console.log('account: ', account);
  }, [account]);

  useEffect(() => {
    if (provider) handleSign();
  }, [provider]);

  useEffect(() => {
    if (signature && address) verify();
  }, [signature, address]);

  return (
    <Row className="padding-32">
      <Col xs="4" className="">
        {' '}
        <img src={require('assets/img/logo.png')} />{' '}
      </Col>
      <Col xs="4" className="logo">
        <Link to="/" className="margin-12">
          HOME
        </Link>{' '}
        <span>/</span>
        <Link to="/about" className="margin-12">
          ABOUT
        </Link>{' '}
        <span>/</span>
        <Link to="/loginpage" className="margin-12">
          LOGIN
        </Link>
      </Col>
      <Col xs="4" className="logo">
        <a className="margin-12" onClick={connectWallet}>
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </a>
      </Col>
    </Row>
  );
}

export default HomePage;
