import { createConfig, configureChains } from 'wagmi'
import { zkSync, zkSyncTestnet } from '@wagmi/core/chains'
import { publicProvider } from 'wagmi/providers/public'

const { publicClient, webSocketPublicClient } = configureChains(
  [zkSyncTestnet],
  [publicProvider()],
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

console.log('wagmiConfig: ', wagmiConfig)

