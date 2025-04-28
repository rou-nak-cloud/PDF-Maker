import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Compoments/Navbar'
import Home from './Compoments/Home'
import Footer from './Compoments/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <Navbar />
    <Home />
    <Footer />
   </>
  )
}

export default App
