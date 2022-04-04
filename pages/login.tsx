import React from 'react'
import Button from '../components/Button'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {
  return (
    <div className="grid h-screen place-content-center place-items-center gap-5">
      <h1 className="text-5xl font-bold text-zinc-800">
        Welcome to <span className="text-blue-500">Denote</span>
      </h1>
      <Button
        variant="ring"
        icon="LoginIcon"
        onClick={() => signInWithPopup(auth, provider)}
      >
        Sign-In with Google
      </Button>
    </div>
  )
}

export default Login
