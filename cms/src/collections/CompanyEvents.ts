import type { CollectionConfig } from 'payload'

export const CompanyEvents: CollectionConfig = {
  slug: 'company-events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'source', 'importance', 'event_date'],
    group: 'IVC Calculator',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
      label: '關聯公司',
    },
    {
      name: 'event_date',
      type: 'date',
      required: true,
      label: '事件日期',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: '事件發生或發現的時間',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      label: '來源',
      options: [
        { label: '𝕏 Twitter/X', value: 'x-twitter' },
        { label: '📰 新聞', value: 'news' },
        { label: '📋 SEC Filing', value: 'sec-filing' },
        { label: '📞 法說會', value: 'earnings-call' },
        { label: '📊 財報', value: 'financial-report' },
        { label: '🏢 公司公告', value: 'company-announcement' },
        { label: '📝 其他', value: 'other' },
      ],
    },
    {
      name: 'importance',
      type: 'select',
      defaultValue: 'medium',
      label: '重要程度',
      options: [
        { label: '🔵 低', value: 'low' },
        { label: '🟡 中', value: 'medium' },
        { label: '🟠 高', value: 'high' },
        { label: '🔴 關鍵', value: 'critical' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '標題',
      admin: {
        description: '簡短描述事件（一行）',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: '摘要',
      admin: {
        description: '事件重點摘要（幾句話）',
      },
    },
    {
      name: 'raw_content',
      type: 'textarea',
      label: '原始內容',
      admin: {
        description: '完整原文或截取內容',
      },
    },
    {
      name: 'source_url',
      type: 'text',
      label: '來源連結',
    },
    {
      name: 'keywords',
      type: 'text',
      label: '關鍵字標籤',
      admin: {
        description: '用逗號分隔，如：revenue, layoff, new-product',
      },
    },
    {
      name: 'ivc_impact',
      type: 'select',
      label: 'IVC 影響',
      options: [
        { label: '⬆️ 正面（提升信心係數）', value: 'positive' },
        { label: '➡️ 中性', value: 'neutral' },
        { label: '⬇️ 負面（降低信心係數）', value: 'negative' },
        { label: '❓ 待評估', value: 'pending' },
      ],
      defaultValue: 'pending',
      admin: {
        description: '此事件對 IVC 信心係數的潛在影響方向',
      },
    },
  ],
}
