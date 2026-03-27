import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    const leads = await prisma.lead.findMany({
      where: {
        userId,
        ...(status && status !== 'all' ? { status } : {}),
      },
      orderBy: { scrapedAt: 'desc' },
      take: limit,
    })

    const total = await prisma.lead.count({ where: { userId } })

    return NextResponse.json({ leads, total })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, source, sourceUrl, title, description, contactInfo, price, location } = body

    const lead = await prisma.lead.create({
      data: {
        userId,
        source,
        sourceUrl,
        title,
        description,
        contactInfo,
        price,
        location,
      },
    })

    return NextResponse.json({ lead })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
