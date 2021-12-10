export type Values = {
  text: string | undefined
  language: Langage['value']
  voiceName: string
  speakingRate: number
  pitch: number
}

export type Langage = {
  label: '日本語' | '英語'
  value: 'ja-JP' | 'en-US'
}

export type VoiceName = {
  label: '女性A' | '女性B' | '男性A' | '男性B'
  value: string
}

export type VoiceNameOptions = Record<Langage['value'], VoiceName[]>
