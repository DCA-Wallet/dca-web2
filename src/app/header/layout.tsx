'use client';

import {Button, Stack, Typography} from "@mui/material";
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";
import {cropAddress} from "@components/helpers";

export const Header = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const handleProfile = () => {
    if (isConnected) {
      disconnect()
      return
    }
    connect()
  }

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Typography variant={'h4'}>DCA WALLET</Typography>
      <Button color={'inherit'} onClick={handleProfile}>
        {isConnected ? cropAddress(address as string) : 'Connect'}
      </Button>
    </Stack>
  )
}
