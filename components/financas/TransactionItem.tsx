'use client'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils/formatters'
import type { Transaction } from '@/lib/types'

export default function TransactionItem({ tx }: { tx: Transaction }) {
  const isIncome = tx.type === 'income'
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#1a1a1a] last:border-0 active:bg-[#1a1a1a] -mx-4 px-4 transition-colors rounded-xl">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-none"
        style={{ background: isIncome ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)' }}>
        {isIncome
          ? <ArrowUpRight size={16} className="text-[#4ade80]" />
          : <ArrowDownLeft size={16} className="text-[#f87171]" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#e8e8e8] text-sm font-medium truncate">{tx.description}</p>
        <p className="text-[#555] text-xs">{tx.category} · {formatDate(tx.date)}</p>
      </div>
      <span className={`text-sm font-semibold ${isIncome ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
        {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
      </span>
    </div>
  )
}
