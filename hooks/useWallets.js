import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { injected } from "../utils/injector"

export default function useWallet(){
    const { active: networkActive, error: networkError, activate: activateNetwork, account: wallet, library } = useWeb3React()
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
            });
    }, [activateNetwork, networkActive, networkError])
    return ({loaded, networkActive, networkError, wallet});
}