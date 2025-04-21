import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "./ui/BackToTopButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="font-sans text-neutral-700 antialiased bg-neutral-50">
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
