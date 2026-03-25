'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

function Login() {

    const handleLogin = () => {
        signIn('google')
    }

    return (
        <div className="bg-black text-white flex flex-col justify-center items-center min-h-screen gap-6">
            <div className="text-center mb-2">
                <h1 className="text-2xl font-bold text-white mb-1">uptime-bot</h1>
                <p className="text-sm text-white/40">Sign in to access your dashboard</p>
            </div>
            <Button
                className="bg-white text-black hover:bg-white/90 cursor-pointer px-6 py-3 rounded-lg font-medium transition-all duration-200"
                variant="outline"
                onClick={handleLogin}
            >
                Continue with Google
            </Button>
        </div>
    )
}

export default Login
