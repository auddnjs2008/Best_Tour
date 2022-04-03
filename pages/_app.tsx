import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SWRDevtools from "@jjordy/swr-devtools";

import { Provider } from "react-redux";
import { store } from "@modules/index";

declare global {
  interface Window {
    kakao: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {


  return <div className="w-full h-[100vh]">

    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>

  </div>
}

export default MyApp
