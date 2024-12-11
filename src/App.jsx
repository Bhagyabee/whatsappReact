
import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'
import Messenger from './components/Messenger'
import AccountProvider from './contexts/AccountProvider'

function App() {
  const clientId ='656340365232-bvq18slp6g39pka24e48pjmvgbsjvsrm.apps.googleusercontent.com'

  return (
    <>
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
         <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
    
     
    </>
  )
}

export default App
