'use client';

import {MenuItem, Stack, TextField, Typography} from "@mui/material";
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";
import {cropAddress} from "@components/helpers";
import {Button} from "@components/components/button";
import {WalletIcon} from "@components/components/icons/wallet";
import {styled} from "@mui/system";
import {ChartIcon} from "@components/components/icons/chart";
import {useForm, Controller, DefaultValues} from "react-hook-form";

const Box = styled('div')`
  border-radius: 16px;
  display: flex;
  width: 360px;
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

export const currencies = [
  {
    value: 'ETH',
    label: 'ETH'
  },
  {
    value: 'USDT',
    label: 'USDT',
  },
];

export const multiple = [
  {
    value: 'day',
    label: 'day',
  },
  {
    value: 'week',
    label: 'week'
  }
]

export type DCAFields = {
  sellToken: string,
  sellTokenAmount: string | number,
  getToken: string,
  getTokenAmount: string | number,
  dealsCount: string | number,
  everyCount: string | number,
  everyMultiple: string | number,
}

const defaultValues: DefaultValues<DCAFields> = {
  sellToken: currencies[0].value,
  sellTokenAmount: '0',
  getToken: currencies[1].value,
  getTokenAmount: '0',
  dealsCount: '0',
  everyCount: '0',
  everyMultiple: 'day'
}

const CreatePosition = () => {
  const { control, handleSubmit, getValues } = useForm<DCAFields>({
    defaultValues
  });
  const onSubmit = data => console.log(data);

  console.log('values: ', getValues())

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack width={'100%'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
        <ChartIcon/>
        <Typography>New DCA creation</Typography>

        <Stack direction={'row'} spacing={1}>
          <Controller
            control={control}
            name="sellToken"
            render={({ field }) => {
              return (
                <TextField select {...field} label="Sell">
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )
            }}
          />
          <Controller
            control={control}
            name={'sellTokenAmount'}
            render={({field}) => <TextField {...field} />}
          />
        </Stack>

        <Stack direction={'row'} spacing={1}>
          <Controller
            control={control}
            name="getToken"
            render={({ field }) => {
              return (
                <TextField select {...field} label={'Buy'}>
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )
            }}
          />
          <Controller
            control={control}
            name={'getTokenAmount'}
            render={({field}) => <TextField {...field} />}
          />
        </Stack>

        <Controller
          control={control}
          name={'dealsCount'}
          render={({field}) => <TextField {...field} label={'Number of deals'} />}
        />

        <Stack direction={'row'} spacing={1}>
          <Controller
            control={control}
            name={'everyCount'}
            render={({field}) => <TextField {...field} label={'Buy every'} />}
          />
          <Controller
            control={control}
            name="everyMultiple"
            render={({ field }) => {
              return (
                <TextField select {...field}>
                  {multiple.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )
            }}
          />
        </Stack>

        <Button type="submit">Create Position</Button>

        <Typography variant={'caption'}>
          Single purchase fee: x.xx TKN
        </Typography>
      </Stack>
    </form>
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
