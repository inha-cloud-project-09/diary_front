import { User } from "./user"

export interface Community {
  id: number
  name: string
  description: string
  tags?: string[]
  isPrivate: boolean
  memberCount: number
  activeMembers?: number
  todayPosts?: number
  weeklyGrowth?: number
  recentActivity?: string
  isJoined?: boolean
  isOwner?: boolean
  color?: string
  createdAt: string
  updatedAt: string
  creator: User
  diaries?: string[]
}

export interface CreateCommunityRequest {
  name: string
  description: string
  isPrivate: boolean
  tags?: string[]
}

export interface UpdateCommunityRequest {
  name: string
  description: string
  isPrivate: boolean
  tags?: string[]
}

export interface JoinCommunityRequest {
  joinCode: string
}