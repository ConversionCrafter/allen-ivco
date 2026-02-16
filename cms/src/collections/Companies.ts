import type { CollectionConfig } from 'payload'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'ticker', 'status', 'updatedAt'],
    group: 'IVCO',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Company Name',
      admin: {
        description: 'Full company name (e.g. Taiwan Semiconductor Manufacturing Company)',
      },
    },
    {
      name: 'ticker',
      type: 'text',
      required: true,
      unique: true,
      label: 'Ticker',
      admin: {
        description: 'e.g. 2330.TW, AAPL, MSFT',
      },
    },
    {
      name: 'exchange',
      type: 'select',
      label: 'Exchange',
      options: [
        { label: 'NYSE', value: 'NYSE' },
        { label: 'NASDAQ', value: 'NASDAQ' },
        { label: 'TPE (Taiwan)', value: 'TPE' },
        { label: 'HKEX (Hong Kong)', value: 'HKEX' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'watching',
      label: 'Status',
      options: [
        { label: 'Watching', value: 'watching' },
        { label: 'Analyzing', value: 'analyzing' },
        { label: 'Holding', value: 'holding' },
        { label: 'Excluded', value: 'excluded' },
      ],
    },
    {
      name: 'industry',
      type: 'text',
      label: 'Industry',
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website',
      admin: {
        description: 'IR website or company homepage',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      admin: {
        description: 'Public company profile for frontend display',
      },
    },
    {
      name: 'logoUrl',
      type: 'text',
      label: 'Logo URL',
      admin: {
        description: 'Company logo image URL',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
      admin: {
        description: 'Internal observations and important context',
      },
    },
  ],
}
