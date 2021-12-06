import React, { useCallback, useState } from 'react'

export const useTextToSpeak = () => {
  const [value, setValue] = useState<string>('')

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
    },
    []
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      speak(value)
    },
    [value]
  )

  const speak = (text: string) => {
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY
    const url =
      'https://texttospeech.googleapis.com/v1/text:synthesize?key=' +
      googleApiKey
    const data = {
      input: {
        text: text,
      },
      voice: {
        languageCode: 'ja-JP',
        name: 'ja-JP-Standard-B',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speaking_rate: '1.00',
        pitch: '0.00',
      },
    }
    const otherparam = {
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
      method: 'POST',
    }
    fetch(url, otherparam)
      .then((data) => {
        return data.json()
      })
      .then((res) => {
        try {
          var blobUrl = base64ToBlobUrl(res.audioContent)
          var audio = new Audio()
          audio.src = blobUrl
          audio.play()
        } catch (e) {
          console.log(e)
        }
      })
      .catch((error) => alert(error))
  }

  // Base6z4 → BlobUrl
  function base64ToBlobUrl(base64: string) {
    var bin = atob(base64.replace(/^.*,/, ''))
    var buffer = new Uint8Array(bin.length)
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i)
    }
    return window.URL.createObjectURL(
      new Blob([buffer.buffer], { type: 'audio/wav' })
    )
  }

  return {
    value,
    handleChange,
    handleSubmit,
  }
}
