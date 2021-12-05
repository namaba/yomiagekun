import { useTextToSpeak } from './hooks/useTextToSpeak'
import './index.css'

export function App() {
  const { value, handleChange, handleSubmit } = useTextToSpeak<{}>()

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
