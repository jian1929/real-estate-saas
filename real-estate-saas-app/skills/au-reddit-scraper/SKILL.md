# Australia Real Estate Reddit Lead Scraper Skill

## Description
Scrapes Reddit communities for Australian real estate leads, investor discussions, and property opportunities.

## Target Subreddits
- r/AusFinance
- r/AustralianRealEstate
- r/AusProperty
- r/AusHomeless (occasionally)
- r/fiaustralia (financial independence)

## Lead Types Captured

### Buyer Leads
- "Looking for 3BR house under $800k in [city]"
- "First home buyer seeking advice"
- "Investment property inquiry"
- "Pre-approval questions"

### Seller Leads
- "Selling my home in [suburb]"
- "Motivated seller - need out fast"
- "Inherited property for sale"

### Investor Leads
- "Looking for positive cash flow properties"
- "SMSF property investment"
- "Off-the-plan opportunities"
- "Renovation project ideas"

## Actions

### 1. Search Reddit
```
Search for posts containing:
- Keywords: "buying", "selling", "investing", "looking for", "need agent"
- Location keywords: "Sydney", "Melbourne", "Brisbane", etc.
- Price indicators: "$500k", "under $1m", etc.
- Time filter: last 7 days
```

### 2. Extract Lead Data
For each relevant post:
- Post title
- Post content/body
- Author username
- Post timestamp
- Number of upvotes/comments
- User karma (credibility indicator)
- Cross-posted to other subreddits

### 3. Qualify Leads
Score based on:
- Specific location mentioned
- Budget range indicated
- Urgency indicators ("need to move", "urgent")
- Author credibility (account age, karma)
- Engagement level (comments = higher intent)

### 4. Generate Outreach
For high-scoring leads:
- Draft personalized Reddit comment or DM
- Reference specific details from their post
- Offer value (market data, agent recommendation)
- Include call-to-action

## Technical Notes
- Uses Reddit API (PRAW library)
- Respects rate limits (60 requests/minute)
- Stores API credentials in environment variables
- Filters out spam using keyword blacklists
- Deduplicates against existing leads

## Output
```json
{
  "source": "reddit_au",
  "subreddits_searched": ["AusFinance", "AustralianRealEstate"],
  "posts_scanned": 450,
  "qualified_leads": 28,
  "high_priority": 8,
  "leads": [
    {
      "type": "buyer",
      "title": "Looking for 3BR house under $700k in Melbourne",
      "author": "u/username",
      "post_url": "https://reddit.com/r/AusFinance/...",
      "budget": "$500k-$700k",
      "location": "Melbourne",
      "bedrooms": 3,
      "urgency": "medium",
      "score": 78,
      "outreach_draft": "Hi! I noticed you're looking for..."
    }
  ]
}
```
