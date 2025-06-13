"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "../../components/ui/button"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Tag,
  User,
} from "lucide-react"
import api from "@/lib/axios"
import { mockCurrentUserDiaries } from "@/mock/diary"

export default function Component() {
  const params = useParams()
  const diaryId = Number(params?.id)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [diaryData, setDiaryData] = useState<any>(null)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  useEffect(() => {
    let ignore = false
    const fetchDiary = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/diary/${diaryId}`)
        if (!ignore) {
          setDiaryData({
            ...res.data,
            likes: res.data.likes ?? 0,
            comments: res.data.comments ?? 0,
          })
          setLikeCount(res.data.likes ?? 0)
        }
      } catch (e) {
        const mock = mockCurrentUserDiaries.find((d) => d.id === diaryId)
        if (!ignore && mock) {
          setDiaryData({
            ...mock,
            likes: mock.likes ?? 0,
            comments: mock.comments ?? 0,
            date: new Date(mock.createdAt).toLocaleString("ko-KR"),
            stats: {
              likes: mock.likes ?? 0,
              comments: mock.comments ?? 0,
              views: 0,
            },
          })
          setLikeCount(mock.likes ?? 0)
        }
      } finally {
        setLoading(false)
      }
    }
    if (diaryId) fetchDiary()
    return () => { ignore = true }
  }, [diaryId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="text-slate-400">로딩 중...</span>
      </div>
    )
  }

  if (!diaryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="text-slate-400">일기를 찾을 수 없습니다.</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={diaryData.user.profileImage || "/placeholder.svg"}
                    alt={diaryData.user.nickname}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-slate-900">{diaryData.user.nickname}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Article Header */}
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{diaryData.title}</h1>
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{diaryData.date}</span>
              </div>
            </div>
            {/* Tags */}
          </div>
          {/* Article Content */}
          <div className="p-6 sm:p-8">
            <div className="prose prose-slate max-w-none">
              {diaryData.content.split("\n").map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          {/* Interaction Bar */}
          <div className="px-6 sm:px-8 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 transition-colors ${
                    isLiked ? "text-red-500" : "text-slate-600 hover:text-red-500"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                  <span className="font-medium">{likeCount}</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{diaryData.stats?.comments ?? 0}</span>
                </button>
                <div className="flex items-center space-x-2 text-slate-500">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{diaryData.stats?.views ?? 0} views</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </article>
        {/* Comments Section */}
        <section className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">댓글 {diaryData.stats?.comments ?? 0}개</h3>
          {/* Comment Input */}
          <div className="mb-6">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="댓글을 작성해보세요..."
                  className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    댓글 작성
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Sample Comments */}
          <div className="space-y-4">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-slate-900">김민수</span>
                    <span className="text-xs text-slate-500">2시간 전</span>
                  </div>
                  <p className="text-slate-700">
                    정말 대단하세요! 꾸준히 하시는 모습이 인상적입니다. 저도 동기부여가 되네요 💪
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                  <button className="hover:text-red-500 transition-colors">좋아요</button>
                  <button className="hover:text-blue-500 transition-colors">답글</button>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex-1">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-slate-900">이지은</span>
                    <span className="text-xs text-slate-500">1시간 전</span>
                  </div>
                  <p className="text-slate-700">음식 사진이 너무 맛있어 보여요! 레시피 공유해주실 수 있나요? 😋</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                  <button className="hover:text-red-500 transition-colors">좋아요</button>
                  <button className="hover:text-blue-500 transition-colors">답글</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
