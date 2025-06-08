export interface Diary {
    id: number
    title: string
    content: string
    createdAt: string
    // 나머지는 any로 처리하여 기존 코드와 호환
    [key: string]: any
  }