import { useState } from 'react'
import './App.css'
import { useAuth } from '@clerk/react'
import PageLoader from './components/pageLoader'
import { Navigate, Route, Routes } from 'react-router'
import AuthPage from './pages/authPage'
import ChatPage from './pages/chatPage'

function App() {
  const {isLoaded,isSignedIn} = useAuth()
  if(!isLoaded){
    return <PageLoader/>
  }
  return (
    <>
      <Routes>
        <Route path='/' element={!isSignedIn?<AuthPage/>:<Navigate to={"/chat"}/>}/>
         <Route path="/chat" element={isSignedIn ? <ChatPage /> : <Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default App
