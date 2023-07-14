import {prisma} from "../../../lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {Request} from "next/dist/compiled/@edge-runtime/primitives";
import {Property} from "csstype";

const scheduledTransactions: { [requestId: string]: string[] } = {}; // Object to store scheduled transactions per request
const currentIndex: { [requestId: string]: number } = {}; // Object to store the current index per request
let nextRequestId = 1; // Variable to generate unique request IDs

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const requestId = getNextRequestId(); // Generate a unique request ID

        const signedHashes = json.signedHashes.split(',').map((hash: string) => hash.trim());

        scheduledTransactions[requestId] = signedHashes; // Set the signed hashes in the request-specific array
        currentIndex[requestId] = 0;

        const firstTransactionTime = Date.now() + json.interval * 1000; // Multiply by the number of milliseconds in a second

        setTimeout(() => executeNextTransaction(requestId, json), firstTransactionTime);

        let json_response = {
            status: "success",
            data: {},
        };
        return new NextResponse(JSON.stringify(json_response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        let error_response = {
            status: "error",
            message: error.message,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

function getNextRequestId() {
    return `request-${nextRequestId++}`; // Generate a unique request ID
}

async function executeNextTransaction(requestId: string, json: any) {
    const signedTransaction = scheduledTransactions[requestId][currentIndex[requestId]];

    if (signedTransaction) {
        executeTransaction(signedTransaction);
        currentIndex[requestId]++;
        if (currentIndex[requestId] < scheduledTransactions[requestId].length) {
            const nextTransactionTime = Date.now() + json.interval * 1000; // Multiply by the number of milliseconds in a second
            setTimeout(() => executeNextTransaction(requestId, json), nextTransactionTime - Date.now());
        }
    }
}

async function executeTransaction(signedTransaction: string) {
    // Perform the necessary logic to send the transaction to the blockchain
    // You can use the relevant library or API for your blockchain interaction
    // Example:
    // await web3.eth.sendSignedTransaction(signedTransaction);
    console.log('Executing transaction:', signedTransaction);
}

