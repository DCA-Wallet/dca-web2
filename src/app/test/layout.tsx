'use client';

import {Button} from "@mui/material";
import {useContractRead, useContractWrite} from "wagmi";
import {dcaWalletContract} from "@components/contracts/dca-wallet";

export const Test = () => {
  const read = useContractRead({
    address: dcaWalletContract.address as `0x${string}`,
    abi: dcaWalletContract.ABI,
    functionName: '',
  }) as any
  //@ts-ignore
  const { data, isLoading, isSuccess, isError, error, write, ...res } = useContractWrite({
    address: dcaWalletContract.address as `0x${string}`,
    abi: dcaWalletContract.ABI,
    functionName: '',
  })
  const handleWrite = () => {
    write()
  }

  console.log('read: ', read)

  console.log('write: ', {data, isLoading, isSuccess})

  return (
    <div>
      <Button color={'inherit'} onClick={handleWrite}>
        Test
      </Button>
    </div>
  )
}
