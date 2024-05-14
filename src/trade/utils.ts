import { ChainId, Currency } from '@xeiswap/sdk-core'
import { constants } from 'ethers'

export enum NativeAssets {
  MATIC = 'MATIC',
  BNB = 'BNB',
  AVAX = 'AVAX',
  ETH = 'ETH',
  SEI = 'SEI'
}

function nativeCurrencyAddressString(chainId: number): string {
  switch (chainId) {
    case ChainId.POLYGON:
      return NativeAssets.MATIC
    case ChainId.BNB:
    case ChainId.BSC_TESTNET:
      return NativeAssets.BNB
    case ChainId.AVALANCHE:
      return NativeAssets.AVAX
    case ChainId.SEI_TESTNET:
      return NativeAssets.SEI
    default:
      return NativeAssets.ETH
  }
}

export function areCurrenciesEqual(currency: Currency, address: string | null, chainId: number) {
  if (currency.chainId !== chainId) return false

  if (currency.isNative) {
    return address === constants.AddressZero || address === nativeCurrencyAddressString(chainId)
  }

  return currency.address.toLowerCase() === address?.toLowerCase()
}
