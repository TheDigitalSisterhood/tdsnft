import {useState, useEffect} from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { injected } from '../utils/injector'

import '../styles/globals.css'

function getLibrary(provider) {
  return new Web3(provider)
}

function MetamaskProvider({ children }) {
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true)
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected)
        }
      })
      .catch(() => {
        setLoaded(true)
      })
  }, [activateNetwork, networkActive, networkError])
  if (loaded) {
    return children
  }
  return <>Loading</>
}

function MyApp({ Component, pageProps, props }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <Component {...pageProps} {...props} />
      </MetamaskProvider>
    </Web3ReactProvider>
  );
}

export default MyApp
