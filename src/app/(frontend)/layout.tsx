import '@/app/globals.css'
import { SanityLive } from "@/sanity/lib/live";
import { Header } from '@/components/Header'
import { DisableDraftMode } from '@/components/DisableDraftMode'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <Header />
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  )
}