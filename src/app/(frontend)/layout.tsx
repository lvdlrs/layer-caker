import '@/app/globals.css'
import { SanityLive } from '@/sanity/lib/live'
import { Header } from '@/components/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <SanityLive />
    </>
  )
}