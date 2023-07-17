'use client';

import {Stack} from "@mui/material";
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";
import {cropAddress} from "@components/helpers";
import {Button} from "@components/components/button";
import {Logo} from "@components/components/icons/logo";

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
    <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
      <Logo />
      <Button color={'inherit'} onClick={handleProfile}>
        {isConnected ? cropAddress(address as string) : 'Connect wallet'}
      </Button>
    </Stack>
  )
}
