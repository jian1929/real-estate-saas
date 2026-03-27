#!/usr/bin/env node

/**
 * Real Estate Lead Generation System
 * Main automation script - runs on a schedule
 * 
 * This script orchestrates:
 * 1. Scraping property listings from multiple sources
 * 2. Deduplicating and scoring leads
 * 3. Generating personalized outreach messages
 * 4. Storing results in database
 * 5. Sending weekly reports to clients
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Configuration for each market
const MARKET_CONFIG = {
  australia: {
    sources: ['domain_au', 'reddit_au'],
    locations: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    frequency: 'daily'
  },
  vietnam: {
    sources: ['batdongsan_vn'],
    locations: ['Ho Chi Minh', 'Hanoi', 'Da Nang'],
    frequency: 'daily'
  },
  japan: {
    sources: ['suumo_jp'],
    locations: ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka'],
    frequency: 'daily'
  }
}

// Lead scoring weights
const SCORE_WEIGHTS = {
  urgency: 25,        // "motivated seller", "urgent", "gấp"
  budget_clear: 20,   // Price range clearly stated
  location_specific: 15, // Specific suburb/city mentioned
  contact_available: 20, // Phone/email visible
  fresh_listing: 10,  // Posted within 7 days
  agent_type: 10      // Agent listings = higher volume
}

/**
 * Main scraping orchestrator
 */
interface MarketResult {
  leads_found: number
  new_leads: number
}

interface ScrapeResults {
  timestamp: string
  markets: Record<string, MarketResult>
  total_leads: number
  errors: Array<{ market: string; error: string }>
}

async function scrapeAllMarkets(): Promise<ScrapeResults> {
  console.log('[LeadGen] Starting lead scraping cycle...')

  const results: ScrapeResults = {
    timestamp: new Date().toISOString(),
    markets: {},
    total_leads: 0,
    errors: []
  }

  for (const [market, config] of Object.entries(MARKET_CONFIG)) {
    console.log(`[LeadGen] Scraping ${market}...`)
    
    try {
      const marketLeads = await scrapeMarket(market, config)
      results.markets[market] = {
        leads_found: marketLeads.length,
        new_leads: marketLeads.filter(l => l.isNew).length
      }
      results.total_leads += marketLeads.length
    } catch (error: unknown) {
      const err = error as Error
      console.error(`[LeadGen] Error scraping ${market}:`, err.message)
      results.errors.push({ market, error: err.message })
    }
  }

  console.log(`[LeadGen] Cycle complete. Total leads: ${results.total_leads}`)
  return results
}

/**
 * Scrape a single market
 */
interface Lead {
  title: string
  source: string
  url?: string
  description?: string
  contactInfo?: string
  price?: string
  location?: string
  scrapedAt?: Date
  userId?: string
  isNew?: boolean
  score?: number
  posterType?: string
}

interface MarketConfig {
  sources: string[]
  locations: string[]
  frequency: string
}

async function scrapeMarket(market: string, config: MarketConfig): Promise<Lead[]> {
  const leads: Lead[] = []

  for (const source of config.sources) {
    try {
      const sourceLeads = await scrapeSource(source, config.locations)
      leads.push(...sourceLeads)
    } catch (error: unknown) {
      const err = error as Error
      console.error(`[LeadGen] Error scraping ${source}:`, err.message)
    }
  }

  // Deduplicate
  const uniqueLeads = deduplicateLeads(leads)

  // Score and rank
  const scoredLeads = uniqueLeads.map(lead => ({
    ...lead,
    score: calculateLeadScore(lead)
  })).sort((a, b) => (b.score || 0) - (a.score || 0))

  // Store in database
  await storeLeads(scoredLeads, market)

  return scoredLeads
}

/**
 * Scrape a specific source (placeholder for actual implementation)
 */
async function scrapeSource(source: string, locations: string[]): Promise<Lead[]> {
  // In production, this would call the actual scraper
  // For now, return mock data structure
  console.log(`[LeadGen] Scraping ${source} for ${locations.join(', ')}`)

  return []
}

/**
 * Deduplicate leads based on title + price + location
 */
function deduplicateLeads(leads: Lead[]): Lead[] {
  const seen = new Set()

  return leads.filter(lead => {
    const key = `${lead.title}|${lead.price}|${lead.location}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Calculate lead quality score
 */
function calculateLeadScore(lead: Lead): number {
  let score = 0
  
  // Urgency signals
  const urgencyKeywords = ['urgent', 'gấp', 'cần bán', 'motivated', 'fast', '迅速', '必死']
  if (urgencyKeywords.some(k => lead.title.toLowerCase().includes(k))) {
    score += SCORE_WEIGHTS.urgency
  }
  
  // Budget clearly stated
  if (lead.price && lead.price.match(/\d+/)) {
    score += SCORE_WEIGHTS.budget_clear
  }
  
  // Specific location
  if (lead.location && lead.location.length > 5) {
    score += SCORE_WEIGHTS.location_specific
  }
  
  // Contact available
  if (lead.contactInfo) {
    score += SCORE_WEIGHTS.contact_available
  }
  
  // Fresh listing
  if (lead.scrapedAt && isFresh(lead.scrapedAt, 7)) {
    score += SCORE_WEIGHTS.fresh_listing
  }
  
  // Agent type
  if (lead.source === 'batdongsan_vn' && lead.posterType === 'agent') {
    score += SCORE_WEIGHTS.agent_type
  }
  
  return Math.min(score, 100) // Cap at 100
}

/**
 * Check if lead was posted recently
 */
function isFresh(scrapedAt: Date | string, days: number): boolean {
  const now = new Date()
  const scraped = new Date(scrapedAt)
  const diffDays = (now.getTime() - scraped.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= days
}

/**
 * Store leads in database
 */
async function storeLeads(leads: Lead[], market: string): Promise<void> {
  for (const lead of leads) {
    try {
      // Check if already exists
      const existing = await prisma.lead.findFirst({
        where: {
          title: lead.title,
          source: lead.source,
          userId: lead.userId || 'system'
        }
      })

      if (!existing) {
        await prisma.lead.create({
          data: {
            userId: lead.userId || 'system',
            source: lead.source,
            sourceUrl: lead.url || null,
            title: lead.title,
            description: lead.description || null,
            contactInfo: lead.contactInfo || null,
            price: lead.price || null,
            location: lead.location || null,
            scrapedAt: new Date(lead.scrapedAt || Date.now()),
            status: 'new'
          }
        })
      }
    } catch (error: unknown) {
      const err = error as Error
      console.error('[LeadGen] Error storing lead:', err.message)
    }
  }
}

/**
 * Generate weekly report for a user
 */
async function generateWeeklyReport(userId: string) {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  const leads = await prisma.lead.findMany({
    where: {
      userId,
      scrapedAt: { gte: weekAgo }
    },
    orderBy: { createdAt: 'desc' }
  })

  const bySource: Record<string, number> = {}
  const byStatus: Record<string, number> = {}

  // Aggregate by source and status
  for (const lead of leads) {
    bySource[lead.source] = (bySource[lead.source] || 0) + 1
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1
  }

  const stats = {
    total: leads.length,
    bySource,
    byStatus,
    topLeads: leads.slice(0, 10)
  }

  return {
    userId,
    period: `${weekAgo.toISOString().split('T')[0]} to ${new Date().toISOString().split('T')[0]}`,
    stats,
    leads: leads.slice(0, 50) // Top 50 for report
  }
}

// Export for use by OpenClaw
export { scrapeAllMarkets, generateWeeklyReport }

console.log('[LeadGen] Module loaded. Functions available: scrapeAllMarkets, generateWeeklyReport')
