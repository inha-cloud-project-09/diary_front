"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import Link from 'next/link'
import Header from "../components/Header"
import {
  Heart,
  TrendingUp,
  Users,
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Clock,
  BookOpen,
  Sparkles,
  MessageCircle
} from "lucide-react"

export default function DashboardPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))

  // 샘플 데이터 (실제로는 기존 API 사용)
  const sampleDiaries = [
    {
      id: 1,
      title: "오늘의 작은 기쁨",
      content: "오늘 아침 창가에 내리는 햇살이 참 따뜻했다. 커피 한 잔과 함께한 고요한 아침의 순간이 하루를 시작하는 작은 행복이 되었다.",
      createdAt: new Date().toISOString(),
      primaryEmotion: "기쁨",
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      title: "새로운 도전의 시작",
      content: "오늘부터 새로운 프로젝트를 시작했다. 설레면서도 긴장되는 마음이지만, 이 도전이 나를 더 성장시켜줄 것이라 믿는다.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      primaryEmotion: "설렘",
      likes: 8,
      comments: 2
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 환영 메시지 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            안녕하세요. <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"></span>
          </h1>
          <p className="text-gray-400">오늘도 당신의 이야기를 기록해보세요</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            title="작성한 일기"
            value="24"
            trend="+3 이번 주"
            gradientColor="from-purple-500 to-pink-500"
          />
          <StatCard
            icon={<Heart className="w-6 h-6" />}
            title="받은 공감"
            value="156"
            trend="+12 이번 주"
            gradientColor="from-pink-500 to-red-500"
          />
          <StatCard
            icon={<Sparkles className="w-6 h-6" />}
            title="감정 다양성"
            value="85%"
            trend="매우 풍부"
            gradientColor="from-purple-500 to-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 최근 일기 */}
          <div className="lg:col-span-2 space-y-6">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-purple-400" />
                  최근 일기
                </h2>
                <Link href="/write">
                  <Button className="btn-gradient text-white px-4 py-2 rounded-xl flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>새 일기 작성</span>
                  </Button>
                </Link>
              </div>

              {/* 샘플 일기 카드들 */}
              <div className="space-y-4">
                {sampleDiaries.map((diary) => (
                  <div key={diary.id} className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-purple-300/70 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(diary.createdAt).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <span className="emotion-tag px-3 py-1 rounded-full text-sm">
                        🌟 {diary.primaryEmotion}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white/90 mb-3">{diary.title}</h3>
                    <p className="text-gray-300/80 line-clamp-2 mb-4">{diary.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-pink-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{diary.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{diary.comments}</span>
                        </button>
                      </div>
                      <Link href={`/diary/${diary.id}`} className="text-sm text-purple-300 hover:text-purple-200">
                        자세히 보기 →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 감정 캘린더 */}
            <section className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                  감정 캘린더
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevMonth}
                    className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium text-gray-300">
                    {currentMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* 캘린더 미니 뷰 */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <div key={day} className="text-xs text-gray-500 py-1">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all
                      ${i % 7 === 0 || i % 7 === 6 ? 'text-gray-500' : 'text-gray-300'}
                      hover:bg-purple-500/20 hover:text-white
                      ${i === 7 ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-white' : ''}
                    `}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </section>

            {/* 오늘의 추천 */}
            <section className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                오늘의 추천
              </h3>
              <div className="space-y-3">
                <RecommendationItem
                  emoji="🎵"
                  title="감정에 맞는 음악"
                  description="오늘의 기분에 어울리는 플레이리스트"
                />
                <RecommendationItem
                  emoji="📖"
                  title="비슷한 감정의 일기"
                  description="다른 사람들의 이야기 둘러보기"
                />
                <RecommendationItem
                  emoji="🌈"
                  title="감정 팔레트"
                  description="오늘의 감정을 색으로 표현해보세요"
                />
              </div>
            </section>

            {/* 커뮤니티 활동 */}
            <section className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                나눔방 활동
              </h3>
              <div className="text-center py-4">
                <div className="text-4xl mb-2">🌙</div>
                <p className="text-gray-400 text-sm mb-3">
                  아직 참여한 나눔방이 없어요
                </p>
                <Link href="/community">
                  <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl">
                    나눔방 둘러보기
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

// 통계 카드 컴포넌트
function StatCard({ icon, title, value, trend, gradientColor }: {
  icon: React.ReactNode
  title: string
  value: string
  trend: string
  gradientColor: string
}) {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-10 group-hover:opacity-20 transition-opacity`} />
      <div className="relative">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradientColor} bg-opacity-20 mb-4`}>
          {icon}
        </div>
        <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-500">{trend}</p>
      </div>
    </div>
  )
}

// 추천 아이템 컴포넌트
function RecommendationItem({ emoji, title, description }: {
  emoji: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
      <div className="text-2xl">{emoji}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  )
}