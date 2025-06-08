"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import { Chrome } from 'lucide-react'
import { Button } from "@/app/components/ui/button"

export default function HomePage() {
  const [time, setTime] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // 구글 로그인 로직
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-start p-6 md:p-8 lg:p-12">
        <div className="space-y-1">
          <div className="text-sm text-purple-300/70 font-mono tracking-wider">
            {time?.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
          <div className="text-xl font-mono text-purple-200/80 tracking-wider">
            {time?.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 md:px-8 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9] mb-8">
              <span className="block bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_100%]">
                Daily
              </span>
              <span className="block bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_100%]">
                Letter
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-purple-200/80 font-semibold leading-relaxed mb-4">
              오늘의 네가 내일의 너에게 보내는
            </p>
            <p className="text-lg md:text-xl text-purple-300/60 font-semibold">
              시간과 감정을 담은 일기
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-6 items-center max-w-sm mx-auto">
            {/* Google Login Button */}
            <Button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full btn-gradient text-white border-0 px-8 py-6 text-lg font-medium group shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 rounded-2xl"
            >
              <Chrome className="w-5 h-5 mr-3" />
              {isLoading ? "로그인 중..." : "Google로 시작하기"}
            </Button>

            {/* Demo Link */}
            <Link 
              href="/dashboard"
              className="text-purple-300 hover:text-purple-200 text-sm font-medium transition-colors relative group"
            >
              <span>둘러보기</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 text-2xl animate-bounce opacity-30">✨</div>
          <div className="absolute top-40 right-20 text-3xl animate-pulse opacity-20">🌙</div>
          <div className="absolute bottom-40 left-20 text-2xl animate-bounce opacity-25" style={{ animationDelay: '1s' }}>⭐</div>
          <div className="absolute bottom-20 right-10 text-xl animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}>💫</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 text-purple-400/50 text-sm">
        <p>당신의 이야기가 데이터로</p>
      </footer>
    </div>
  )
}