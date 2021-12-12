import { Langage, Values, VoiceNameOptions } from './type'


export const initialValues: Values = {
  text: '',
  language: 'ja-JP',
  voiceName: 'ja-JP-Standard-A',
  speakingRate: 1,
  pitch: 0,
}

export const languageOptions: Langage[] = [
  { label: '日本語', value: 'ja-JP' },
  { label: '英語', value: 'en-US' },
]

export const voiceNameOptions: VoiceNameOptions = {
  'ja-JP': [
    {
      label: '女性A',
      value: 'ja-JP-Standard-A',
    },
    {
      label: '女性B',
      value: 'ja-JP-Standard-B',
    },
    {
      label: '男性A',
      value: 'ja-JP-Standard-C',
    },
    {
      label: '男性B',
      value: 'ja-JP-Standard-D',
    },
  ],
  'en-US': [
    {
      label: '女性A',
      value: 'en-US-Standard-A',
    },
    {
      label: '女性B',
      value: 'en-US-Standard-B',
    },
    {
      label: '男性A',
      value: 'en-US-Standard-C',
    },
    {
      label: '男性B',
      value: 'en-US-Standard-D',
    },
  ],
}
