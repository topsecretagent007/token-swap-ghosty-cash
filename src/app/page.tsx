"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoadingModal from "@/components/LoadingModal";
import { useContext } from "react";
import UserContext from "@/contexts/usercontext";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const { loadingState } = useContext<any>(UserContext);

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between bg-black harlow">
      <Header />
      <Navbar />
      <Footer />
      {loadingState && <LoadingModal />}
      <ToastContainer style={{ fontSize: 14 }} />
    </main>
  );
}
