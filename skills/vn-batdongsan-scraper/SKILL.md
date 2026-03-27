# Vietnam Batdongsan.com.vn Lead Scraper Skill

## Description
Scrapes Batdongsan.com.vn (BĐS) for Vietnamese real estate leads and investor opportunities.

## Supported Cities
- Hồ Chí Minh (Ho Chi Minh City)
- Hà Nội (Hanoi)
- Đà Nẵng (Da Nang)
- Bình Dương (Binh Duong)
- Cần Thơ (Can Tho)

## Property Types
- Căn hộ (Apartment/Condo)
- Nhà ở (House/Villa)
- Đất nền (Land)
- Shophouse
- Officetel

## Lead Types

### Buyer Leads
- Tìm mua căn hộ (Looking for apartment)
- Cần mua nhà (Need to buy house)
- Tìm đất nền (Looking for land)

### Seller/Investor Leads
- Cần bán bất động sản (Need to sell property)
- Đầu tư cho thuê (Investment for rent)
- Dự án mới (New projects)

## Actions

### 1. Search Batdongsan
```
Search with:
- Tỉnh/Thành phố: [city]
- Quận/Huyện: [district]
- Loại BDS: [property type]
- Mức giá: [price range]
- Diện tích: [area]
- Hướng: [direction]
```

### 2. Extract Property Data
- Tiêu đề (Title)
- Giá (Price)
- Diện tích (Area in m²)
- Vị trí (Location/Address)
- Quận/Huyện (District)
- Phòng ngủ (Bedrooms)
- Phòng tắm (Bathrooms)
- Mặt tiền (Frontage)
- Tầng (Floor for apartments)
- Loại hình BDS (Property type)
- Ngày đăng (Post date)
- Người đăng (Poster name/type: cá nhân/môi giới)
- SĐT (Phone number)
- Mô tả (Description)

### 3. Qualify Leads
Score based on:
- Urgency indicators ("gấp", "cần bán ngay")
- Budget clearly stated
- Specific location
- Agent vs owner (agent = higher volume potential)
- Fresh listings (< 7 days)

### 4. Vietnamese AI Personalization
Generate outreach in Vietnamese:
- Friendly, professional tone
- Reference specific details
- Value proposition in local context

## Technical Notes
- Uses Playwright with Vietnamese locale
- Batdongsan.com.vn is the largest property portal in Vietnam
- Rate limit: 1 request per 5 seconds
- Phone numbers typically visible for agent listings
- Content negotiation for Vietnamese characters (UTF-8)

## Output
```json
{
  "source": "batdongsan_vn",
  "city": "Hồ Chí Minh",
  "listings_found": 520,
  "qualified_leads": 67,
  "agent_leads": 34,
  "owner_leads": 33,
  "leads": [
    {
      "title": "Cần bán căn hộ 2PN view sông",
      "price": "3.2 tỷ",
      "area": "75m²",
      "bedrooms": 2,
      "bathrooms": 2,
      "location": "Quận 7, Hồ Chí Minh",
      "district": "Quận 7",
      "poster_type": "môi giới",
      "poster_name": "Minh Ngọc",
      "phone": "0912 XXX XXX",
      "posted_days_ago": 2,
      "score": 85,
      "urgency": "high"
    }
  ]
}
```
