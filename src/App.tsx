
import { Provider } from 'react-redux'
import './App.css'
import { store } from './app/store'
import { RouterProvider } from 'react-router-dom'
import { Router} from './Routes/Router'
import { Toaster } from 'sonner'

function App() {
  

  return (
    <>
        <Toaster position={'top-center'}/>
          <RouterProvider router={Router}/>
       
    </>
  )
}

export default App
