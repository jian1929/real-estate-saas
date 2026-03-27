# Real Estate Reddit Lead Scraper Skill

## Description
Scrapes Reddit (r/realestate, r/realestateinvesting, etc.) for real estate leads and opportunities.

## Actions
1. Search Reddit for real estate keywords in specified subreddits
2. Extract lead information from posts and comments
3. Filter by geography (city/zip code) and price range
4. Store new leads in database

## Usage
```
Search Reddit for real estate leads
Subreddits: realestate, realestateinvesting, firsttimehomebuyer, landlord
Keywords: [city name], buying, selling, investment, cash offer
Filter: posted in last 7 days, has contact info
```

## Technical Notes
- Uses Reddit API (requires API credentials)
- Focus on subreddits with high real estate activity
- Deduplicate against existing leads
- Rate limiting: 60 requests/minute (Reddit limit)

## Output
Array of Lead objects
