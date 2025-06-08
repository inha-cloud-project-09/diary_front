"use client"

import { useEffect, useRef } from 'react'

export default function StarryBackground() {
  const starsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 별 생성
    const createStars = () => {
      if (!starsContainerRef.current) return
      
      const starCount = 200
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.width = Math.random() * 3 + 'px'
        star.style.height = star.style.width
        star.style.animationDelay = Math.random() * 3 + 's'
        starsContainerRef.current.appendChild(star)
      }
    }

    // 유성 생성
    const createShootingStar = () => {
      if (!starsContainerRef.current) return
      
      const shootingStar = document.createElement('div')
      shootingStar.className = 'shooting-star'
      shootingStar.style.left = Math.random() * 100 + '%'
      shootingStar.style.top = Math.random() * 50 + '%'
      shootingStar.style.animationDelay = Math.random() * 5 + 's'
      shootingStar.style.animationDuration = (Math.random() * 2 + 2) + 's'
      starsContainerRef.current.appendChild(shootingStar)
      
      setTimeout(() => {
        shootingStar.remove()
      }, 5000)
    }

    createStars()

    // 3-7초마다 유성 생성
    const interval = setInterval(() => {
      createShootingStar()
    }, Math.random() * 4000 + 3000)

    // 스크롤 효과
    const handleScroll = () => {
      const scrollY = window.scrollY
      const aurora1 = document.querySelector('.aurora-1') as HTMLElement
      const aurora2 = document.querySelector('.aurora-2') as HTMLElement
      
      if (aurora1) aurora1.style.transform = `translateY(${scrollY * 0.5}px)`
      if (aurora2) aurora2.style.transform = `translateY(${scrollY * 0.3}px)`
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* 배경 그라데이션 */}
      <div className="background-gradient" />
      
      {/* 오로라 효과 */}
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      
      {/* 별 배경 */}
      <div 
        ref={starsContainerRef} 
        className="fixed top-0 left-0 w-full h-full z-[-2] overflow-hidden pointer-events-none"
      />
    </>
  )
}