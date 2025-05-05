'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

function Login() {

    const handleLogin = () => {
        signIn('google')
    }

    return (
        <div className="bg-[#131a26] text-white flex justify-center items-center h-full">
            <Button
                className="md:w-auto 
                bg-slate-100 text-black hover:bg-slate-200 
                cursor-pointer px-5 py-2 rounded-xl transition duration-300
                "
                variant="outline"
                onClick={handleLogin}
            >
                Login with Google
            </Button>
        </div>
    )
}

export default Login