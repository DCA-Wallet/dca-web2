'use client';

import {Grid, Stack, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {useAccount} from "wagmi";

const Box = styled('div')`
  border-radius: 16px;
  display: flex;
  width: 100%;
  max-width: calc(1024px - 360px - 40px);
  max-height: 720px;
  padding: 40px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: 4px solid #F1F1F1;
  overflow-y: auto;
`

const DcaWalletInfo = () => {
  return (
    <Box sx={{ justifyContent: 'unset' }}>
      <Typography variant={'h4'} mb={2}>Welcome to DCA Wallet</Typography>
      <Typography mb={2}>Embark on your investment journey with DCA Wallet - a revolution in smart investing using the power of Dollar-Cost Averaging (DCA) and Account Abstraction.</Typography>
      <Typography variant={'h6'} mb={1}>Key Features</Typography>
      <Grid container spacing={1}>
        <Grid item xs={5.5}>
          <Typography>Full control over your funds</Typography>
          <Typography>Only you have access to your subaccount and its transactions. Stop purchases anytime, and withdraw funds at your discretion.</Typography>
        </Grid>
        <Grid item xs={5.5}>
          <Typography>Flexibility & Automation</Typography>
          <Typography>Select any token, duration, and frequency that fits your investment strategy. With a one-time signing of all transactions, you can rest easy and let the protocol do the work.</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Unlimited sub-accounts</Typography>
          <Typography>Diversify your investments by creating as many sub-accounts for different tokens as you like.</Typography>
        </Grid>
        <Grid item xs={3.5}>
          <Typography>Prompt transfers</Typography>
          <Typography>Post transaction, your purchased tokens are promptly transferred to your main account.</Typography>
        </Grid>
        <Grid item xs={3.5}>
          <Typography>Effortless fees</Typography>
          <Typography>Pay transaction fees in the same token used for the purchase, aiding in cost-effectiveness.</Typography>
        </Grid>
      </Grid>
      <Typography mb={1}>The DCA Advantage</Typography>
      <Typography>Dollar-Cost Averaging, is an investment strategy where you invest a fixed amount of money into a particular asset at regular intervals, regardless of its price. By spreading out your purchases, you reduce the impact of short-term price volatility and lower the risk of making a large investment at an unfavorable time. Over time, this strategy can result in an average cost per share that's lower than the market average, providing potential for greater returns in the long run. DCA is like watering a plant regularly, not flooding it just once.</Typography>
    </Box>
  )
}

const EmptyPosition = () => {
  return (
    <Stack width={'100%'} sx={{ padding: '40px' }}>
      <Typography variant={'h5'}>No DCA positions found</Typography>
      <Typography>Create your first one</Typography>
    </Stack>
  )
}

const Position = ({ id, address, sell, get, used, total, frequency, status }) => {
  return (
    <Stack>

    </Stack>
  )
}

export const Positions = () => {
  const { isConnected } = useAccount()
  const positions = []
  const isEmpty = positions.length === 0

  if (!isConnected) {
    return <DcaWalletInfo />
  }

  return (
    <Box>
      {isEmpty ? <EmptyPosition /> : (
        <>{
          positions.map(item => (
            <Position key={item.id} {...item} />
          ))
        }</>
      )}
    </Box>
  )
}

const MOCK_POSITIONS = [{
  id: 19853,
  address: '0x4b7E32A9f6e98dA4d3194199f5a18D960C12CE63',
  sell: 'BTC',
  get: 'ETH',
  used: 10,
  total: 100,
  frequency: 'week',
  status: 'In progress'
}]
