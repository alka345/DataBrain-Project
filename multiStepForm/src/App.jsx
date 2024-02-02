import { useState } from 'react'
import './App.css'
import MultiStepForm from './MultiStepForm/MultiStepForm'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div >
   <MultiStepForm></MultiStepForm>
   </div>
  )
}

export default App
