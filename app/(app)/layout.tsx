import BottomNav from '@/components/layout/BottomNav'
import Sidebar from '@/components/layout/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-[calc(var(--nav-h)+env(safe-area-inset-bottom))] md:pb-0">
        <div className="max-w-2xl mx-auto px-4 pt-6 md:px-8 md:pt-8">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
