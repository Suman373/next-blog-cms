'use client';

import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <section className="bg-white">
        <Hero />
        <Features/>
      </section>
      <Footer />
    </>
  );
}