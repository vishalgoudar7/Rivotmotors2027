import type { Metadata } from "next"; import "./globals.css"; import { Navbar } from "@/components/Navbar"; import { Footer } from "@/components/Footer";
export const metadata: Metadata={title:"RIVOT Motors | Electric Mobility Reimagined",description:"RIVOT Motors electric mobility."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body suppressHydrationWarning><Navbar/><main>{children}</main><Footer/></body></html>}
