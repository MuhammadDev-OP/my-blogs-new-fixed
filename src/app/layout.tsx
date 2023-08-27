import "./globals.css";
import { Sora, Merriweather } from "next/font/google";
import Header from "./components/layout/Header";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import ToastProvider from "./providers/ToastProvider";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import BlogModal from "./components/modals/BlogModal";

const plf = Sora({ subsets: ["latin"] });

export const metadata = {
  title: "Bloging Web",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={plf.className}>
        <ClientOnly>
          <ToastProvider />
          <Header currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <BlogModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
