'use client'

import { useState, useEffect } from 'react'

interface Lead {
  id: string
  title: string
  source: string
  price: string
  location: string
  status: string
  scrapedAt: string
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0 })

  useEffect(() => {
    // Mock data for demo
    setLeads([
      { id: '1', title: 'Looking for 3BR house in Austin, TX', source: 'reddit', price: '$350k-$450k', location: 'Austin, TX', status: 'new', scrapedAt: '2026-03-27' },
      { id: '2', title: 'Selling my home in suburban neighborhood', source: 'facebook', price: '$520k', location: 'Dallas, TX', status: 'new', scrapedAt: '2026-03-27' },
      { id: '3', title: 'Cash offer for investment property', source: 'reddit', price: '$200k-$300k', location: 'Houston, TX', status: 'contacted', scrapedAt: '2026-03-26' },
      { id: '4', title: 'First-time buyer looking for starter home', source: 'facebook', price: '$250k-$350k', location: 'Phoenix, AZ', status: 'new', scrapedAt: '2026-03-26' },
      { id: '5', title: 'Selling inherited property, motivated seller', source: 'reddit', price: '$180k', location: 'San Antonio, TX', status: 'qualified', scrapedAt: '2026-03-25' },
    ])
    setStats({ total: 5, new: 3, contacted: 1 })
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-blue-400">RealEstate AI</div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Professional Plan</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">J</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Leads', value: stats.total, color: 'text-blue-400' },
            { label: 'New This Week', value: stats.new, color: 'text-green-400' },
            { label: 'Contacted', value: stats.contacted, color: 'text-yellow-400' },
            { label: '转化率', value: '20%', color: 'text-purple-400' },
          ].map((s, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm mb-1">{s.label}</div>
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Leads</h2>
            <div className="flex gap-3">
              <select className="bg-slate-700 text-white px-3 py-2 rounded-lg text-sm">
                <option>All Sources</option>
                <option>Facebook</option>
                <option>Reddit</option>
              </select>
              <select className="bg-slate-700 text-white px-3 py-2 rounded-lg text-sm">
                <option>All Status</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
              </select>
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr className="text-left text-slate-400 text-sm">
                <th className="px-6 py-3">Lead</th>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="font-medium">{lead.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      lead.source === 'facebook' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-green-400 font-medium">{lead.price}</td>
                  <td className="px-6 py-4 text-slate-300">{lead.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      lead.status === 'new' ? 'bg-green-500/20 text-green-400' :
                      lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{lead.scrapedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
