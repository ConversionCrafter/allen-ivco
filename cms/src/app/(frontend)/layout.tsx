import React from 'react'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://ivco.ai'),
  title: 'IVCO Fisher — Value Investing Observatory',
  description:
    'Intrinsic Value Confidence Observatory. Facts compound. Noise fades.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">IVCO Fisher</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} IVCO Fisher</p>
        </footer>
      </body>
    </html>
  )
}
