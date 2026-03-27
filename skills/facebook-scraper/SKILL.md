# Real Estate Facebook Groups Scraper Skill

## Description
Scrapes Facebook Groups for real estate leads (property listings, buyer/seller requests).

## Actions
1. Search Facebook Groups for relevant real estate keywords
2. Extract lead information: title, price, location, contact, description
3. Deduplicate leads against existing database
4. Store new leads in the database

## Usage
```
Search Facebook Groups for real estate leads in [CITY/ZIP] area
Focus on: buying, selling, investment opportunities
Filter: price > $100k, within last 7 days
```

## Technical Notes
- Uses Facebook Graph API (requires proper permissions)
- Respects robots.txt and platform ToS
- Rate limiting: max 10 requests/minute
- Stores results in PostgreSQL via Prisma

## Output
Array of Lead objects with: source, title, description, price, location, contactInfo, scrapedAt
