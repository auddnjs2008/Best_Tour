import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'


declare global {
  interface Window {
    kakao: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {



  return <div className="w-full h-[100vh]">
    <Component {...pageProps} />
  </div>
}

export default MyApp
