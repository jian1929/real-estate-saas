import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-400">RealEstate AI</div>
        <nav className="hidden md:flex gap-8">
          <a href="#features" className="hover:text-blue-300 transition">功能</a>
          <a href="#pricing" className="hover:text-blue-300 transition">定价</a>
          <a href="#faq" className="hover:text-blue-300 transition">FAQ</a>
        </nav>
        <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg font-medium transition">
          开始使用
        </Link>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          AI 自动挖掘<br className="md:hidden" />房地产潜在客户
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          不再手动搜索 Facebook Groups 和 Reddit。<br />
          我们的 AI 每天自动为你抓取、筛选并生成个性化联系信息。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#pricing" className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition">
            立即开始 - $197/月
          </a>
          <a href="#demo" className="border border-slate-500 hover:border-slate-400 px-8 py-4 rounded-xl font-semibold text-lg transition">
            观看演示
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">核心功能</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: '自动抓取',
              desc: '24/7 自动监控 Facebook Groups 和 Reddit，实时发现新线索',
              icon: '🔍'
            },
            {
              title: 'AI 个性化',
              desc: '为每个线索生成专属联系信息，提高回复率 3x',
              icon: '🤖'
            },
            {
              title: '每周报告',
              desc: '每周一自动发送上周线索汇总，直接推送到你的邮箱',
              icon: '📊'
            },
            {
              title: 'CRM 集成',
              desc: '自动同步到你的 CRM，不遗漏任何一个潜在客户',
              icon: '🔄'
            },
            {
              title: '多地区支持',
              desc: '支持北美、澳洲主要城市的房产市场',
              icon: '🌍'
            },
            {
              title: '去重过滤',
              desc: '智能识别重复线索，节省你的处理时间',
              icon: '✨'
            }
          ].map((f, i) => (
            <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-6 py-20 bg-slate-800/30">
        <h2 className="text-3xl font-bold text-center mb-4">简单透明定价</h2>
        <p className="text-center text-slate-400 mb-12">无隐藏费用，随时取消</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: 'Starter',
              price: 197,
              desc: '单人经纪人',
              features: ['每日 50 条线索', 'Facebook + Reddit', 'AI 个性化消息', '每周报告', '1 个地区']
            },
            {
              name: 'Professional',
              price: 397,
              desc: '小型团队（2-5人）',
              features: ['无限线索', '所有数据源', 'AI 个性化消息', '每日报告', '5 个地区', 'CRM 集成', '优先支持'],
              popular: true
            },
            {
              name: 'Enterprise',
              price: 797,
              desc: '大型经纪公司',
              features: ['无限线索', '所有数据源', 'AI 个性化消息', '实时推送', '无限地区', '高级 CRM 集成', '专属成功经理', '自定义报告']
            }
          ].map((p, i) => (
            <div key={i} className={`rounded-2xl p-8 ${p.popular ? 'bg-blue-500/20 border-2 border-blue-500' : 'bg-slate-800/50 border border-slate-700'}`}>
              {p.popular && <span className="bg-blue-500 text-xs font-bold px-3 py-1 rounded-full">最受欢迎</span>}
              <h3 className="text-2xl font-bold mt-4">{p.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{p.desc}</p>
              <div className="text-4xl font-bold mb-6">
                ${p.price}<span className="text-lg text-slate-400">/月</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition ${p.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}>
                开始试用 14 天
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {[
            {
              q: '线索是怎么抓取的？',
              a: '我们使用 Facebook Groups 和 Reddit 的公开数据 API，结合 AI 过滤和去重，确保你只收到高质量的潜在客户信息。'
            },
            {
              q: '我可以取消订阅吗？',
              a: '可以，随时取消，没有锁定期。取消后你仍然可以使用到当月订阅到期日。'
            },
            {
              q: '线索的准确性如何？',
              a: '我们通过多重验证确保线索质量。AI 会过滤垃圾信息，识别重复线索，并进行初步资格筛选。'
            },
            {
              q: '需要安装什么软件吗？',
              a: '不需要。完全基于云端，你只需要一个浏览器即可访问仪表盘。'
            }
          ].map((faq, i) => (
            <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-slate-800 text-center text-slate-500">
        <p>© 2026 RealEstate AI. All rights reserved.</p>
      </footer>
    </div>
  )
}
