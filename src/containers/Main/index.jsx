import React, { useState, useEffect } from "react";
import "./index.scss";
import { Route, Switch } from "react-router-dom";
import TokenGenerator from "uuid-token-generator";

// routes
import routes from "../../routes";

// components
import Header from "../../components/Layouts/Header";
import Sidebar from "../../components/Layouts/Sidebar";
import Banner from "../../components/Layouts/Banner";

import { getAccountBalance, getPoolInfo } from '../../api-metamask';

const handleError = (err) => {
  console.log(err);
}

const Main = (props) => {
  const [connected, setConnected] = useState(false);
  const [accountBalance, setAccountBalance] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [poolInfo, setPoolInfo] = useState(null);

  const connectToMetaMask = () => {
      window.web3.eth.getAccounts().then((accountsList) => {
        setCurrentAccount(accountsList[0]);
        getAccountBalance(accountsList[0], setAccountBalance);
        setConnected(true);
      }).catch(err => {
        alert("Unlock Wallet First.");
      })
  }

  useEffect(() => {
    if (connected) {
      getPoolInfo(0, setPoolInfo, handleError);
    } 
  }, [connected]);

  return (
    <div className="main">
      <Header connected={connected} onConnect={connectToMetaMask} balance={accountBalance}/>

      <div className="mainContent">
        <Sidebar />

        <div className="content">
          <Banner connected={connected} account={currentAccount} />

          <Switch>
            {routes.map((route, i) => (
              <Route
                key={i}
                path={route.path}
                render={(props) => (
                  <route.component
                    {...props}
                    routes={route.routes}
                    connected={connected}
                    poolInfo = {poolInfo}
                  />
                )}
              />
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Main;
