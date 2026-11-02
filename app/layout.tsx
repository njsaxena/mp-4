import './globals.css';
import type { Metadata } from 'next';
import Nav from './Nav';

export const metadata: Metadata = {
  title: 'CS 303 Weather App',
  description: 'Simple weather lookup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body>
      <div className="page">
        <Nav />
        <main className="page-content">{children}</main>
      </div>
      </body>
      </html>
  );
}
