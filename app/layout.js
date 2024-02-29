import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

async function getData() {
  const siteMetadataRes = await fetch(`https://cyclecms.com/api/v1/websites/airplanejames-com/production/entries/metadata`, { cache: 'force-cache' });
  const metadata = await siteMetadataRes.json();

  return {
    title: metadata.entry.content.title.value,
    description: metadata.entry.content.description.value,
  }
}

export const metadata = getData();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
