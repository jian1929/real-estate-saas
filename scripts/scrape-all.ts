#!/usr/bin/env node

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface MarketConfig {
  sources: string[]
  locations: string[]
  frequency: string
}

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

interface MarketResult {
  leads_found: number
  new_leads: number
}

interface ScrapeResults {
  timestamp: string
  markets: { [key: string]: MarketResult }
  total_leads: number
  errors: Array<{ market: string; error: string }>
}

const MARKET_CONFIG: { [key: string]: MarketConfig } = {
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

const SCORE_WEIGHTS = {
  urgency: 25,
  budget_clear: 20,
  location_specific: 15,
  contact_available: 20,
  fresh_listing: 10,
  agent_type: 10
}

async function scrapeSource(source: string, locations: string[]): Promise<Lead[]> {
  console.log(`[LeadGen] Scraping ${source} for ${locations.join(', ')}`)
  return []
}

function deduplicateLeads(leads: Lead[]): Lead[] {
  const seen = new Set<string>()
  return leads.filter(lead => {
    const key = `${lead.title}|${lead.price}|${lead.location}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function calculateLeadScore(lead: Lead): number {
  let score = 0
  const urgencyKeywords = ['urgent', 'gấp', 'cần bán', 'motivated', 'fast', '迅速', '必死']
  if (urgencyKeywords.some(k => lead.title.toLowerCase().includes(k))) {
    score += SCORE_WEIGHTS.urgency
  }
  if (lead.price && lead.price.match(/\d+/)) {
    score += SCORE_WEIGHTS.budget_clear
  }
  if (lead.location && lead.location.length > 5) {
    score += SCORE_WEIGHTS.location_specific
  }
  if (lead.contactInfo) {
    score += SCORE_WEIGHTS.contact_available
  }
  if (lead.scrapedAt) {
    const now = new Date()
    const scraped = new Date(lead.scrapedAt)
    const diffDays = (now.getTime() - scraped.getTime()) / (1000 * 60 * 60 * 24)
    if (diffDays <= 7) {
      score += SCORE_WEIGHTS.fresh_listing
    }
  }
  if (lead.source === 'batdongsan_vn' && lead.posterType === 'agent') {
    score += SCORE_WEIGHTS.agent_type
  }
  return Math.min(score, 100)
}

async function storeLeads(leads: Lead[]): Promise<void> {
  for (const lead of leads) {
    try {
      const existing = await prisma.lead.findFirst({
        where: { title: lead.title, source: lead.source, userId: lead.userId || 'system' }
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
    } catch (err) {
      console.error('[LeadGen] Error storing lead:', (err as Error).message)
    }
  }
}

async function scrapeMarket(market: string, config: MarketConfig): Promise<Lead[]> {
  const leads: Lead[] = []
  for (const source of config.sources) {
    try {
      const sourceLeads = await scrapeSource(source, config.locations)
      leads.push(...sourceLeads)
    } catch (err) {
      console.error(`[LeadGen] Error scraping ${source}:`, (err as Error).message)
    }
  }
  const uniqueLeads = deduplicateLeads(leads)
  const scoredLeads = uniqueLeads.map(lead => ({
    ...lead,
    score: calculateLeadScore(lead)
  })).sort((a, b) => (b.score || 0) - (a.score || 0))
  await storeLeads(scoredLeads)
  return scoredLeads
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
    } catch (err) {
      console.error(`[LeadGen] Error scraping ${market}:`, (err as Error).message)
      results.errors.push({ market, error: (err as Error).message })
    }
  }
  console.log(`[LeadGen] Cycle complete. Total leads: ${results.total_leads}`)
  return results
}

async function generateWeeklyReport(userId: string) {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const leads = await prisma.lead.findMany({
    where: { userId, scrapedAt: { gte: weekAgo } },
    orderBy: { createdAt: 'desc' }
  })
  const bySource: { [key: string]: number } = {}
  const byStatus: { [key: string]: number } = {}
  for (const lead of leads) {
    bySource[lead.source] = (bySource[lead.source] || 0) + 1
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1
  }
  return {
    userId,
    period: `${weekAgo.toISOString().split('T')[0]} to ${new Date().toISOString().split('T')[0]}`,
    stats: { total: leads.length, bySource, byStatus, topLeads: leads.slice(0, 10) },
    leads: leads.slice(0, 50)
  }
}

export { scrapeAllMarkets, generateWeeklyReport }
console.log('[LeadGen] Module loaded.')
