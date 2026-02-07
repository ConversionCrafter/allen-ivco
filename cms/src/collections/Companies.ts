import type { CollectionConfig } from 'payload'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'ticker', 'status', 'updatedAt'],
    group: 'IVC Calculator',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // ==================== 基本資訊 ====================
    {
      type: 'tabs',
      tabs: [
        {
          label: '📋 基本資訊',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: '公司名稱',
              admin: {
                description: '公司全名（如：Taiwan Semiconductor Manufacturing Company）',
              },
            },
            {
              name: 'ticker',
              type: 'text',
              required: true,
              unique: true,
              label: '股票代碼',
              admin: {
                description: '如：2330.TW, AAPL, MSFT',
              },
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'watching',
              label: '狀態',
              options: [
                { label: '🔍 觀察中', value: 'watching' },
                { label: '📊 分析中', value: 'analyzing' },
                { label: '✅ 持有中', value: 'holding' },
                { label: '🚫 已排除', value: 'excluded' },
              ],
            },
            {
              name: 'industry',
              type: 'text',
              label: '產業',
              admin: {
                description: '如：半導體、軟體、金融',
              },
            },
            {
              name: 'country',
              type: 'text',
              label: '國家',
              admin: {
                description: '如：Taiwan, USA, China',
              },
            },
            {
              name: 'website',
              type: 'text',
              label: '官方網站',
              admin: {
                description: 'IR 網站或公司官網',
              },
            },
            {
              name: 'monitoring_level',
              type: 'select',
              label: '監控強度',
              defaultValue: 'routine',
              options: [
                { label: '📡 例行收集', value: 'routine' },
                { label: '⚡ 加強監控', value: 'enhanced' },
                { label: '🔥 緊迫盯人', value: 'intensive' },
              ],
              admin: {
                description: 'routine=季報/年報時收集, enhanced=每週, intensive=每日',
              },
            },
            {
              name: 'monitoring_keywords',
              type: 'text',
              label: '監控關鍵字',
              admin: {
                description: '用逗號分隔，如：paypal, $pypl, dan schulman',
              },
            },
            {
              name: 'notes',
              type: 'textarea',
              label: '備註',
              admin: {
                description: '其他重要資訊或觀察',
              },
            },
          ],
        },

        // ==================== 階段一：誠信門檻 ====================
        {
          label: '🔒 階段一：誠信門檻',
          fields: [
            {
              name: 'integrity_score',
              type: 'number',
              label: '誠信評分 (%)',
              min: 0,
              max: 100,
              admin: {
                description: '管理層 Commitment 達成率（0-100%）',
                step: 1,
              },
            },
            {
              name: 'integrity_status',
              type: 'select',
              label: '誠信狀態',
              options: [
                { label: '✅ 通過（≥100%）', value: 'pass' },
                { label: '⚠️  需說明（<100%）', value: 'warning' },
                { label: '🚫 有污點', value: 'fail' },
              ],
            },
            {
              name: 'integrity_notes',
              type: 'richText',
              label: '誠信評估記錄',
              admin: {
                description: '記錄管理層承諾與實際達成情況',
              },
            },
          ],
        },

        // ==================== 階段二：歷史事實 ====================
        {
          label: '📊 階段二：歷史事實',
          fields: [
            {
              name: 'latest_oe',
              type: 'number',
              label: '最新業主盈餘 (Latest OE)',
              admin: {
                description: '以億或百萬為單位，須註明幣別',
              },
            },
            {
              name: 'oe_currency',
              type: 'select',
              label: '幣別',
              options: [
                { label: 'TWD (台幣)', value: 'TWD' },
                { label: 'USD (美元)', value: 'USD' },
                { label: 'CNY (人民幣)', value: 'CNY' },
              ],
            },
            {
              name: 'historical_cagr_7y',
              type: 'number',
              label: '歷史 7 年 CAGR (%)',
              admin: {
                description: '業主盈餘的 7 年平均複合成長率',
                step: 0.1,
              },
            },
            {
              name: 'total_shares',
              type: 'number',
              label: '總股本（股）',
              admin: {
                description: '流通在外股數',
              },
            },
            {
              name: 'historical_notes',
              type: 'richText',
              label: '歷史數據記錄',
              admin: {
                description: '財報來源、計算方法、特殊調整等',
              },
            },
          ],
        },

        // ==================== 階段三：展望因子 ====================
        {
          label: '🔮 階段三：展望因子',
          fields: [
            {
              name: 'confidence_low',
              type: 'number',
              label: '信心係數下限',
              min: 0,
              max: 3,
              admin: {
                description: '保守估計的信心係數（如 0.8, 1.0）',
                step: 0.1,
              },
            },
            {
              name: 'confidence_high',
              type: 'number',
              label: '信心係數上限',
              min: 0,
              max: 3,
              admin: {
                description: '樂觀估計的信心係數（如 1.3, 1.5）',
                step: 0.1,
              },
            },
            {
              name: 'iv_total_low',
              type: 'number',
              label: 'IV 總市值下限',
              admin: {
                description: '計算結果：Latest OE × Confidence Low',
              },
            },
            {
              name: 'iv_total_high',
              type: 'number',
              label: 'IV 總市值上限',
              admin: {
                description: '計算結果：Latest OE × Confidence High',
              },
            },
            {
              name: 'iv_per_share_low',
              type: 'number',
              required: false,
              label: '每股內在價值下限 ⭐',
              admin: {
                description: '計算結果：IV Total Low / Total Shares',
              },
            },
            {
              name: 'iv_per_share_high',
              type: 'number',
              required: false,
              label: '每股內在價值上限 ⭐',
              admin: {
                description: '計算結果：IV Total High / Total Shares',
              },
            },
            {
              name: 'forward_factors',
              type: 'richText',
              label: '展望因子評估',
              admin: {
                description: '重大資本支出、新產品、市場擴張等',
              },
            },
          ],
        },

        // ==================== 階段四：實戰導航 ====================
        {
          label: '🎯 階段四：實戰導航',
          fields: [
            {
              name: 'current_price',
              type: 'number',
              label: '最新市價',
              admin: {
                description: '當前股價',
              },
            },
            {
              name: 'price_updated_at',
              type: 'date',
              label: '價格更新時間',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'deviation_percentage',
              type: 'number',
              label: '偏離度 (%)',
              admin: {
                description: '(Current Price / IV Mid) - 1',
                step: 0.1,
              },
            },
            {
              name: 'investment_decision',
              type: 'select',
              label: '投資決策建議',
              options: [
                { label: '🟢 買入', value: 'buy' },
                { label: '🟡 持有', value: 'hold' },
                { label: '🔴 觀望', value: 'watch' },
                { label: '⚫ 賣出', value: 'sell' },
              ],
            },
            {
              name: 'stress_test_50',
              type: 'number',
              label: '壓力測試：跌 50% 後保證金缺口',
              admin: {
                description: '模擬股價大跌 50% 時的質押保證金缺口',
              },
            },
            {
              name: 'navigation_notes',
              type: 'richText',
              label: '實戰導航記錄',
              admin: {
                description: '決策依據、風險評估、操作計畫',
              },
            },
          ],
        },
      ],
    },
  ],
}
