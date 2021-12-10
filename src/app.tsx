import { languageOptions, voiceNameOptions } from './data'
import { useTextToSpeak } from './hooks/useTextToSpeak'

export function App() {
  const { values, handleValuesChange, handleSubmit } = useTextToSpeak()

  return (
    <div className="p-5 md:w-1/2 sm:w-full mx-auto">
      <h1 className="text-purple-600 font-bold text-2xl mb-5">読み上げくん</h1>
      <form onSubmit={handleSubmit}>
        <label className="block">
          <textarea
          placeholder="ここに読み上げたいテキストを貼り付けてください"
            className="
          mt-0
          block
          w-full
          px-0.5
          border-gray-400
          focus:ring-0 focus:border-black"
            name="text"
            value={values.text}
            onChange={handleValuesChange}
            rows={10}
          />
        </label>

        <div className="flex items-center my-5">
          <div className="w-36">言語</div>
          <select
            name="language"
            value={values.language}
            onChange={handleValuesChange}
            className="form-select block mt-1 w-full"
          >
            {languageOptions.map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center my-5">
          <div className="w-36">音声</div>
          <select
            name="voiceName"
            value={values.voiceName}
            onChange={handleValuesChange}
            className="form-select block mt-1 w-full"
          >
            {voiceNameOptions[values.language].map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center my-5">
          <label className="w-36">速度（{values.speakingRate}）</label>
          <input
            type="range"
            id="speakingRate"
            name="speakingRate"
            value={values.speakingRate}
            min="0.25"
            max="4"
            step="0.1"
            onChange={handleValuesChange}
            className="w-full"
          />
        </div>
        <div className="flex items-center my-5">
          <label htmlFor="pitch" className="w-36">
            高低（{values.pitch}）
          </label>
          <input
            type="range"
            id="pitch"
            name="pitch"
            value={values.pitch}
            min="-20"
            max="20"
            onChange={handleValuesChange}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          value="Submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l w-full"
        >
          読み上げ
        </button>
      </form>
    </div>
  )
}
