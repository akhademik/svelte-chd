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
          title: 'USD',
          name: 'rateUSD',
          type: 'number',
          description:
            'Nhập theo dạng thông thường: 1 USD = bao nhiêu VND (vd: 26035). Hệ thống sẽ tự quy đổi ngược khi hiển thị giá.',
          validation: (Rule: any) => Rule.required().min(15000).max(40000),
        },
        {
          title: 'EUR',
          name: 'rateEUR',
          type: 'number',
          description:
            'Nhập theo dạng thông thường: 1 EUR = bao nhiêu VND (vd: 28500). Hệ thống sẽ tự quy đổi ngược khi hiển thị giá.',
          validation: (Rule: any) => Rule.required().min(20000).max(40000),
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
