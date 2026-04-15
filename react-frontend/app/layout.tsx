import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './src/styles/index.css';

export const metadata: Metadata = {
  title: 'Mini Shopee',
  description: 'Mini Shopee multi-vendor e-commerce platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
