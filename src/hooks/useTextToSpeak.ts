import React, { useCallback, useEffect, useState } from 'react'
import { initialValues, voiceNameOptions } from '../data'
import { Values } from '../type'

export const useTextToSpeak = () => {
  const [values, setValues] = useState<Values>({ ...initialValues })

  useEffect(() => {
    const defaultVoiceName = voiceNameOptions[values.language][0].value
    setValues({ ...values, voiceName: defaultVoiceName })
  }, [values.language])

  const handleValuesChange = (e: any) => {
    const name = e.target.name
    console.log({ ...values, [name]: e.target.value })
    setValues({ ...values, [name]: e.target.value })
  }

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      speak(values)
    },
    [values]
  )

  const speak = ({
    text,
    language,
    voiceName,
    speakingRate,
    pitch,
  }: Values) => {
    const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY
    const url =
      'https://texttospeech.googleapis.com/v1/text:synthesize?key=' +
      googleApiKey
    const data = {
      input: {
        text: text,
      },
      voice: {
        languageCode: language,
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speaking_rate: speakingRate,
        pitch: pitch,
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
    values,
    handleValuesChange,
    handleSubmit,
  }
}
