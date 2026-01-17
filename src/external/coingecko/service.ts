import { coingeckoClient } from './client';
import { CoinGeckoPriceResponse } from './types';

/**
 * Fetch USD prices for multiple coins in one request.
 */
export const getUsdPrices = async (
  coinIds: string[]
): Promise<CoinGeckoPriceResponse> => {
  if (coinIds.length === 0) {
    return {};
  }

  const uniqueCoinIds = [...new Set(coinIds)];

  const response = await coingeckoClient.get<CoinGeckoPriceResponse>(
    '/simple/price',
    {
      params: {
        ids: uniqueCoinIds.join(','),
        vs_currencies: 'usd',
      },
    }
  );

  return response.data;
};
