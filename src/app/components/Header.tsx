"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PenTool, Users, BarChart3, User, LogOut } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 w-full navbar-glass z-[1000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">✨</div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              감성 일기
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/dashboard" active={isActive('/dashboard')}>
              <Home className="w-4 h-4" />
              <span>대시보드</span>
            </NavLink>
            
            <NavLink href="/write" active={isActive('/write')}>
              <PenTool className="w-4 h-4" />
              <span>일기 쓰기</span>
            </NavLink>
            
            <NavLink href="/my-diary" active={isActive('/my-diary')}>
              <User className="w-4 h-4" />
              <span>내 일기</span>
            </NavLink>
            
            <NavLink href="/community" active={isActive('/community')}>
              <Users className="w-4 h-4" />
              <span>커뮤니티</span>
            </NavLink>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full glass-card hover:bg-purple-500/10 transition-colors">
              <User className="w-5 h-5 text-purple-300" />
            </button>
            <button className="p-2 rounded-full glass-card hover:bg-pink-500/10 transition-colors">
              <LogOut className="w-5 h-5 text-pink-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/10">
        <div className="flex justify-around py-2">
          <MobileNavLink href="/dashboard" active={isActive('/dashboard')}>
            <Home className="w-5 h-5" />
          </MobileNavLink>
          <MobileNavLink href="/write" active={isActive('/write')}>
            <PenTool className="w-5 h-5" />
          </MobileNavLink>
          <MobileNavLink href="/my-diary" active={isActive('/my-diary')}>
            <User className="w-5 h-5" />
          </MobileNavLink>
          <MobileNavLink href="/community" active={isActive('/community')}>
            <Users className="w-5 h-5" />
          </MobileNavLink>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        active
          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
          : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`p-3 rounded-lg transition-all ${
        active
          ? 'text-purple-400'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </Link>
  )
}