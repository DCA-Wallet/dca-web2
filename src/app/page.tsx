'use client';

import styles from './page.module.css'
import {Header} from "@components/app/header/layout";
import {Test} from "@components/app/test/layout";
import { useState } from "react";
import axios from 'axios';
import * as ethers from "ethers";
import * as zkSync from "zksync-web3";

export default function Home() {

    const [isExecuting, setIsExecuting] = useState(false);

    const handleExecuteTransactions = async () => {
        setIsExecuting(true);

        try {
            console.log("start 1")
            const provider = new zkSync.Provider("https://testnet.era.zksync.dev")
            const privateKey : string = process.env.PRIVATE_KEY ?? "9a43242a7c3e3069284875a8aaffbace23800752194fff9dee4ae92add1a930b"
            const senderWallet = new zkSync.Wallet(privateKey).connect(provider)
            const recipientAddress = "0x600FFAB28ae8A10d12429C0BD438160036F5D57d";

            const amount = ethers.utils.parseEther("0.00001");

            // Create the transfer transaction
            const transfer: zkSync.types.TransactionRequest = {
                to: recipientAddress,
                from: senderWallet.address,
                nonce: await senderWallet.getNonce(),
                value: zkSync.utils.ETH_ADDRESS
            }

            console.log(`senderWallet `, senderWallet)
            console.log(`transfer: `, transfer)

            const signedTransaction = await senderWallet.signTransaction(transfer);

            console.log(`signedTransaction: `, signedTransaction)
            // Assuming you have an array of signed transactions
            const signedTransactions = [signedTransaction];
            console.log("start 4")

            await axios.post('/transactions', {signedTransactions});
            setIsExecuting(false);
        } catch (error) {
            console.log(error);
            setIsExecuting(false);
        }
    };

    return (
        <main className={styles.main}>
            <Header/>
            <Test/>
            <button onClick={handleExecuteTransactions} disabled={isExecuting}>
                Execute Transactions
            </button>
        </main>
    )
}
