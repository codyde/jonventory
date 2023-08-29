import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@uploadthing/react/styles.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jonventory",
  description: "Store and manage your things",
  viewport: "width=device-width, user-scalable=no",
};

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const [editState, setEditState] = useState(false);

  return (
    <html lang="en" className="dark">
      <body className="h-full">
        <Navbar />
        <div className="md:pl-20 pt-16 h-full">{children}</div>
      </body>
    </html>
  );
}
