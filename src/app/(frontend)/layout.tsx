import '@/app/globals.css'
import { Header } from '@/components/Header'
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-white min-h-screen'>
        {draftMode().isEnabled && (
          <a
            className="fixed right-0 bottom-0 bg-blue-500 text-white"
            href='/api/draft-mode/disable'
          >Disable preview mode</a>
        )}
        <Header />
        {children}
        <VisualEditing />
      </body>
    </html>
  );
}
