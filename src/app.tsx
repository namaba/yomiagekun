import { useCallback, useEffect, useState } from 'react'
import { useTextToSpeak } from './hooks/useTextToSpeak'

export function App() {
  const { value, handleChange, handleSubmit } = useTextToSpeak()
  const [language, setLanguage] = useState<Langage['value']>('ja-JP')
  const [voiceName, setVoiceName] = useState<string>('ja-JP-Wavenet-A')
  const [pitch, setPitch] = useState<string>('')
  const [speakingRate, setSpeakingRate] = useState<string>('')

  const handleLanguageSelect = useCallback(
    (e) => {
      setLanguage(e.target.value)
    },
    [language]
  )

  const handleVoiceNameSelect = useCallback(
    (e) => {
      setVoiceName(e.target.value)
    },
    [language]
  )

  useEffect(() => {
    setVoiceName(voiceNameOptions[language][0].value)
  }, [language])

  return (
    <div>
      <h1 className="text-purple-600 font-bold text-2xl">yomiagekunだよ</h1>
      <form onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-gray-700">読み上げるテキスト</span>
          <textarea
            className="
          mt-0
          block
          w-full
          px-0.5
          border-0 border-b-2 border-gray-200
          focus:ring-0 focus:border-black"
            value={value}
            onChange={handleChange}
          />
        </label>
        <label className="block text-left" style={{ maxWidth: '400px' }}>
          <span className="text-gray-700">言語</span>
          <select
            value={language}
            onChange={handleLanguageSelect}
            className="form-select block w-full mt-1"
          >
            {languageOptions.map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </label>
        <label className="block text-left" style={{ maxWidth: '400px' }}>
          <span className="text-gray-700">音声</span>
          <select
            value={voiceName}
            onChange={handleVoiceNameSelect}
            className="form-select block w-full mt-1"
          >
            {voiceNameOptions[language].map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          value="Submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          送信
        </button>
      </form>
    </div>
  )
}

type Langage = {
  label: '日本語' | '英語'
  value: 'ja-JP' | 'en-US'
}

const languageOptions: Langage[] = [
  { label: '日本語', value: 'ja-JP' },
  { label: '英語', value: 'en-US' },
]

type VoiceName = {
  label: '女性A' | '女性B' | '男性A' | '男性B'
  value: string
}

type VoiceNameOptions = Record<Langage['value'], VoiceName[]>

const voiceNameOptions: VoiceNameOptions = {
  'ja-JP': [
    {
      label: '女性A',
      value: 'ja-JP-Wavenet-A',
    },
    {
      label: '女性B',
      value: 'ja-JP-Wavenet-B',
    },
    {
      label: '男性A',
      value: 'ja-JP-Wavenet-C',
    },
    {
      label: '男性B',
      value: 'ja-JP-Wavenet-D',
    },
  ],
  'en-US': [
    {
      label: '女性A',
      value: 'en-US-Wavenet-A',
    },
    {
      label: '女性B',
      value: 'en-US-Wavenet-B',
    },
    {
      label: '男性A',
      value: 'en-US-Wavenet-C',
    },
    {
      label: '男性B',
      value: 'en-US-Wavenet-D',
    },
  ],
}
