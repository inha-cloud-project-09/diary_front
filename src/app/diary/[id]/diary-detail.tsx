"use client"

import { useState } from "react"
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

export default function Component() {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(17)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const diaryData = {
    id: "250324",
    title: "오늘의 소중한 8일차",
    author: {
      name: "최정혁",
      avatar: "/basic.jpeg?height=40&width=40",
    },
    date: "March 24, 2025 PM 20:39",
    location: "서울시 강남구",
    mood: "😊",
    tags: ["기쁨", "여행", "운동", "낙망", "감사"],
    bannerImages: ["/basic.jpeg", "/basic2.jpeg?height=400&width=600"],
    content: `어느덧 소위지은 8일차에 도달했습니다.
이제 이집 쉐이크, 점심 식단, 간식 쉐이크, 저녁 탄수화물 제한식의 코스입니다.

3일째 정체기가 찾아왔습니다. 6일에 5.5키로 빠졌는데, 그럼만도 합니다.

오늘은 운동 강도를 조금 더 높였습니다. 근력 운동과 추가적으로 30분 인터벌로 12km/h까지 올렸습니다. 점심 빠지기는 모양새라 기분이 좋습니다.

요리도 먹을 수 있는 것들 중 제한하여 소량 요리합니다.`,
    additionalImages: ["/basic3.jpeg?height=300&width=400", "/basic4.jpeg?height=300&width=400"],
    stats: {
      likes: likeCount,
      comments: 3,
      views: 124,
    },
  }

  return (
    <div className="min-h-screen bg-slate-50">
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
                    src={diaryData.author.avatar || "/placeholder.svg"}
                    alt={diaryData.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-slate-900">{diaryData.author.name}</span>
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

      {/* Banner Images */}
      <div className="relative">
        <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
          <div className="grid grid-cols-2 h-full">
            {diaryData.bannerImages.map((image, index) => (
              <div key={index} className="relative overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`배너 이미지 ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Floating Action Buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              isBookmarked ? "bg-yellow-500 text-white" : "bg-white/80 text-slate-700 hover:bg-white"
            }`}
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

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
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{diaryData.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{diaryData.mood}</span>
                <span>좋은 하루</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {diaryData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 sm:p-8">
            <div className="prose prose-slate max-w-none">
              {diaryData.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Additional Images */}
            {diaryData.additionalImages.length > 0 && (
              <div className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {diaryData.additionalImages.map((image, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-lg">
                      <img
                        src={image || "/basic.jpeg"}
                        alt={`추가 이미지 ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                  <span className="font-medium">{diaryData.stats.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{diaryData.stats.comments}</span>
                </button>
                <div className="flex items-center space-x-2 text-slate-500">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{diaryData.stats.views} views</span>
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
          <h3 className="text-lg font-semibold text-slate-900 mb-6">댓글 {diaryData.stats.comments}개</h3>

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
