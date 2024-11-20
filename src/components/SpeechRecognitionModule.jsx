import 'regenerator-runtime/runtime'
import { useContext } from 'react'
import { BsFillMicFill } from "react-icons/bs"
import { SpeechProvider, SpeechContext } from '../context/SpeechRecognitionContext'
import { BsFillMicMuteFill } from "react-icons/bs"

const SpeechRecognitionModule = ({children}) => {
  const { SpeechRecognition } = useContext(SpeechContext)
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'es-Es', interimResults: false })
  const stopListening = () => SpeechRecognition.stopListening()
  
  return (
    <>
      <div className="bg-black text-white p-5">
        <div>
          <button onClick={startListening} className="mr-2 p-2 rounded bg-green-500 text-white border-none cursor-pointer">
            <BsFillMicFill /> Start
          </button>
          <button onClick={stopListening} className="p-2 rounded bg-red-500 text-white border-none cursor-pointer">
            <BsFillMicMuteFill /> Stop
          </button>
        </div>
      </div>
      {children}
    </>
  )
}

const SpeechRecognitionModuleWrapper = ({children}) => {
  return(
      <SpeechProvider>
        <SpeechRecognitionModule>
          {children}
        </SpeechRecognitionModule>
      </SpeechProvider>
  );
}

export default SpeechRecognitionModuleWrapper;
