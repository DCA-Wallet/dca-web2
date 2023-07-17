'use client';

import {Stack, Typography} from "@mui/material";
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";
import {cropAddress} from "@components/helpers";
import {Button} from "@components/components/button";
import {WalletIcon} from "@components/components/icons/wallet";
import {styled} from "@mui/system";
import {ChartIcon} from "@components/components/icons/chart";

const Box = styled('div')`
  border-radius: 16px;
  display: flex;
  max-width: 360px;
  height: 720px;
  padding: 40px 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 4px solid #C3B1F3;
`

const Connect = () => {
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
    <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
      <WalletIcon />
      <Typography align={'center'}>Connect a wallet to view your DCA positions or to create a new one</Typography>
      <Button color={'inherit'} onClick={handleProfile}>
        Connect wallet
      </Button>
    </Stack>
  )
}

const CreatePosition = () => {
  return (
    <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
      <ChartIcon/>
      <Typography>New DCA creation</Typography>
    </Stack>
  )
}

export const LeftMenu = () => {
  const { isConnected } = useAccount()

  return (
    <Box>
      {isConnected ? (
        <CreatePosition />
      ) : (
        <Connect />
      )}
    </Box>
  )
}
