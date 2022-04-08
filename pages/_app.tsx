import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SWRDevtools from "@jjordy/swr-devtools";

import { Provider } from "react-redux";
import { store } from "@modules/index";
import { SWRConfig } from 'swr';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

declare global {
  interface Window {
    kakao: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then(response => response.json()) }}>
      <div className="w-full h-[100vh]">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    </SWRConfig>
  )
}

export default MyApp
