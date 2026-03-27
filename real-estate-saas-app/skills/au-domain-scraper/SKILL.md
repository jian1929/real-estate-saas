# Australia Domain.com.au Property Scraper Skill

## Description
Scrapes Domain.com.au for Australian real estate listings and buyer/seller leads.

## Supported Locations
- Sydney NSW
- Melbourne VIC
- Brisbane QLD
- Perth WA
- Adelaide SA
- Canberra ACT
- Hobart TAS
- Darwin NT

## Property Types
- Houses
- Apartments/Unites
- Townhouses
- Vacant Land
- Investment Properties

## Actions

### 1. Search Listings
```
Search Domain.com.au for listings matching:
- Location: [suburb/postcode]
- Price range: [min-max]
- Bedrooms: [min]
- Property type: [house/apartment/all]
- Listing type: [buy/rent/invest]
```

### 2. Extract Lead Information
For each listing, extract:
- Property address
- Price
- Bedrooms/Bathrooms/Car spaces
- Property type
- Listing agent name and agency
- Contact phone/email (if available)
- Days on market
- Description

### 3. Filter and Score Leads
Score leads based on:
- Price within client budget
- Location preferences
- Property features
- Fresh listings (< 7 days)
- Motivated sellers indicators

### 4. Store Leads
Store in database with:
- Source: "domain_au"
- Location
- Price
- Agent contact
- Score
- Scraped timestamp

## Technical Implementation
- Uses Playwright for browser automation
- Respects robots.txt
- Rate limit: 1 request per 5 seconds
- Handles CAPTCHA if encountered
- Stores cookies for session management

## Output
```json
{
  "source": "domain_au",
  "total_found": 150,
  "new_leads": 23,
  "leads": [
    {
      "title": "4 bed house in Sydney CBD",
      "address": "123 George St, Sydney NSW 2000",
      "price": "$1,250,000",
      "beds": 4,
      "baths": 2,
      "cars": 2,
      "agent": "John Smith",
      "agency": "ABC Real Estate",
      "phone": "02 1234 5678",
      "listed_days_ago": 3,
      "score": 85,
      "url": "https://www.domain.com.au/123-george-st-sydney-nsw-2000..."
    }
  ]
}
```
