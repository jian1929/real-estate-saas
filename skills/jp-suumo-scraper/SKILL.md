# Japan Suumo.jp Property Scraper Skill

## Description
Scrapes Suumo.jp (スーモ) for Japanese real estate listings and property investor leads.

## Supported Cities
- 東京23区 (Tokyo 23 wards)
- 横浜市 (Yokohama)
- 大阪市 (Osaka)
- 京都市 (Kyoto)
- 名古屋市 (Nagoya)
- 福岡市 (Fukuoka)
- 札幌市 (Sapporo)

## Property Types
- マンション (Mansion/Apartment)
- 一戸建 (Detached House)
- 土地 (Land)
- 投資用物件 (Investment Properties)
- 収益物件 (Income Properties)

## Lead Types

### Investment Property Leads
- 表面利回り (Gross yield) listings
- 想定賃料 (Projected rent)
- 空室率 (Vacancy rate)
- エリア分析 (Area analysis)

### Owner Occupier Leads
- 購入検討中 (Considering purchase)
- 新区画 (New developments)
- 二手房子的翻新 (Renovated)

## Actions

### 1. Search Suumo
```
Search with:
- エリア: [city/ward/postcode]
- 価格: [min-max]
- 駅徒歩: [minutes]
- 面積: [min sqm]
- 户型: [1R/1K/1DK/1LDK/etc]
- 物件タイプ: [mansion/house/land]
```

### 2. Extract Property Data
- 物件名 (Property name)
- 価格 (Price)
- 所在地 (Location)
- 沿線・駅 (Train lines/Stations)
- 步行分数 (Walking time to station)
- 面積 (Floor area)
- 户型 (Layout)
- 建築年月 (Building age)
- 管理費 (Management fees)
- 表面利回り (Gross yield - for investment)
- 予想租金 (Projected rent)
- 不動产業者 (Agent/Agency name)
- 連絡先 (Contact info)

### 3. Qualify Investment Leads
Score based on:
- Yield rate (> 5% = high interest)
- Location (major cities preferred)
- Price (under ¥50M for individual investors)
- Vacancy history
- Management complexity

### 4. Japanese AI Personalization
Generate personalized outreach in Japanese:
- Formal keigo (敬語) language
- Respectful of Japanese business culture
- Specific details from listing
- Clear value proposition

## Technical Notes
- Uses Playwright with Japanese locale
- Suumo has anti-bot measures - use proxy rotation
- Rate limit: 1 request per 10 seconds
- Japanese text requires proper encoding (UTF-8)
- Date format: YYYY年MM月DD日

## Output
```json
{
  "source": "suumo_jp",
  "location": "東京23区",
  "listings_found": 320,
  "investment_leads": 45,
  "leads": [
    {
      "title": "投資用マンション（、表面利回り6.2%）",
      "price": "¥28,000,000",
      "monthly_rent": "¥145,000",
      "gross_yield": "6.2%",
      "location": "大阪市北区兎我野町",
      "station": "大阪駅步行5分",
      "area": "25.5m²",
      "layout": "1K",
      "building_age": "2019年",
      "agency": "○○不動产",
      "contact": "06-XXXX-XXXX",
      "score": 92
    }
  ]
}
```
