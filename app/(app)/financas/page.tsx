'use client'
import { useState } from 'react'
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import StatCard from '@/components/ui/StatCard'
import CategoryChart from '@/components/financas/CategoryChart'
import MonthlyChart from '@/components/financas/MonthlyChart'
import TransactionItem from '@/components/financas/TransactionItem'
import { formatCurrency } from '@/lib/utils/formatters'
import type { Transaction } from '@/lib/types'

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', user_id: '', type: 'income',  amount: 5000, category: 'Salário',    description: 'Salário Março',     date: '2026-04-01', created_at: '' },
  { id: '2', user_id: '', type: 'expense', amount: 1200, category: 'Moradia',    description: 'Aluguel',           date: '2026-04-05', created_at: '' },
  { id: '3', user_id: '', type: 'expense', amount: 350,  category: 'Alimentação',description: 'Supermercado',      date: '2026-04-08', created_at: '' },
  { id: '4', user_id: '', type: 'expense', amount: 89,   category: 'Lazer',      description: 'Netflix + Spotify', date: '2026-04-10', created_at: '' },
  { id: '5', user_id: '', type: 'income',  amount: 800,  category: 'Freelance',  description: 'Projeto design',    date: '2026-04-12', created_at: '' },
  { id: '6', user_id: '', type: 'expense', amount: 240,  category: 'Transporte', description: 'Combustível',       date: '2026-04-15', created_at: '' },
  { id: '7', user_id: '', type: 'expense', amount: 180,  category: 'Saúde',      description: 'Farmácia',          date: '2026-04-18', created_at: '' },
]

const CATEGORIES = [
  { name: 'Moradia',     value: 1200, color: '#60a5fa' },
  { name: 'Alimentação', value: 350,  color: '#4ade80' },
  { name: 'Lazer',       value: 89,   color: '#a78bfa' },
  { name: 'Transporte',  value: 240,  color: '#facc15' },
  { name: 'Saúde',       value: 180,  color: '#f87171' },
]

const MONTHLY = [
  { month: 'Jan', income: 5200, expense: 3100 },
  { month: 'Fev', income: 5800, expense: 3400 },
  { month: 'Mar', income: 5000, expense: 2900 },
  { month: 'Abr', income: 5800, expense: 2059 },
]

export default function FinancasPage() {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')

  const income  = MOCK_TRANSACTIONS.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = MOCK_TRANSACTIONS.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = income - expense

  const filtered = filter === 'all' ? MOCK_TRANSACTIONS : MOCK_TRANSACTIONS.filter(t => t.type === filter)

  return (
    <div className="space-y-5 page-enter">
      <PageHeader title="Finanças" subtitle="Abril 2026" accent="#4ade80"
        action={
          <button className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
            <Plus size={20} className="text-[#4ade80]" />
          </button>
        }
      />

      {/* balance */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 text-center"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,222,128,0.04) 0%, #111 70%)' }}>
        <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Saldo do mês</p>
        <p className="text-4xl font-semibold text-[#e8e8e8]">{formatCurrency(balance)}</p>
        <p className="text-xs text-[#4ade80] mt-1">↑ {Math.round(balance / income * 100)}% de economia</p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Receitas" value={formatCurrency(income)} icon={TrendingUp} color="#4ade80"
          delta={{ value: '8% vs mês ant.', positive: true }} />
        <StatCard label="Despesas" value={formatCurrency(expense)} icon={TrendingDown} color="#f87171"
          delta={{ value: '5% vs mês ant.', positive: false }} />
      </div>

      <MonthlyChart data={MONTHLY} />
      <CategoryChart data={CATEGORIES} />

      {/* transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#555] uppercase tracking-wider font-medium">Lançamentos</p>
          <div className="flex bg-[#1a1a1a] rounded-xl p-0.5 gap-0.5">
            {(['all','income','expense'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-1 rounded-lg text-xs transition-all duration-200"
                style={{ background: filter === f ? '#2a2a2a' : 'transparent', color: filter === f ? '#e8e8e8' : '#555' }}>
                {f === 'all' ? 'Todos' : f === 'income' ? 'Receitas' : 'Despesas'}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl px-4 py-1">
          {filtered.map(tx => <TransactionItem key={tx.id} tx={tx} />)}
        </div>
      </div>

      <div className="h-2" />
    </div>
  )
}
