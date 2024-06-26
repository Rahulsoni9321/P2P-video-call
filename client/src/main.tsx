import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from './Context/Socketcontext.tsx'
import { Toaster } from 'react-hot-toast'
import { PeerContextProvider } from './Context/PeerContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <SocketContextProvider>
    <PeerContextProvider>
    <App />
    </PeerContextProvider>
    </SocketContextProvider>
    <Toaster></Toaster>
    </BrowserRouter>
    )
