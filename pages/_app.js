import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from "next-auth/react"

import { Layout } from '../components'
import StateContext from '../context/StateContext'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <StateContext>
        <Layout>
          <Toaster containerStyle={{top: 70}}/>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </SessionProvider>
  )
}

export default MyApp
