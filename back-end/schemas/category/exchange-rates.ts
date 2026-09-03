import {BsCurrencyExchange} from 'react-icons/bs'

export default {
  title: 'Tỉ Giá Ngoại Tệ',
  name: 'exchangeRates',
  icon: BsCurrencyExchange,
  type: 'document',
  fields: [
    {
      title: 'Ngày cập nhật',
      name: 'exchangeDate',
      type: 'date',
    },
    {
      title: 'Tỉ giá quy đổi',
      name: 'rates',
      type: 'object',
      fields: [
        {
          title: 'EUR',
          name: 'rateEUR',
          type: 'number',
        },
        {
          title: 'USD',
          name: 'rateUSD',
          type: 'number',
        },
      ],
    },
  ],
  preview: {
    select: {
      date: 'exchangeDate',
      eur: 'rates.rateEUR',
      usd: 'rates.rateUSD',
    },
    prepare(selection: any) {
      const {date, eur, usd} = selection
      return {
        title: `Tỉ giá ngày: ${date || 'N/A'}`,
        subtitle: `USD: ${usd || 0} | EUR: ${eur || 0}`,
      }
    },
  },
}
