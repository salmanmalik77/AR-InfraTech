// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Sections/Header";
import Footer from "./Sections/Footer";
import Hero from "./Sections/Hero";
import About from "./Sections/About";
import Services from "./Sections/Services";
import Portfolio from "./Sections/Portfolio";
import Working from "./Sections/Working";
import Testimonials from "./Sections/Testimonials";
import Contact from "./Sections/Contact";
import "./App.css";

import Agent from "./ai-agent/Agent";
import UsersPage from "./Users/UsersPage"; // NEW

// Home page structure
const HomePage = () => (
  <>
    <Header />
    <Hero />
    <About />
    <Services />
    <Portfolio />
    <Working />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

export default function App() {
  return (
    <BrowserRouter basename="/AR-InfraTech">
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Users page */}
        <Route
          path="/users"
          element={
            <>
              <Header />
              <UsersPage />
              <Footer />
            </>
          }
        />

        {/* Fallback - if route not found */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <div
                style={{
                  minHeight: "60vh",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for doesn’t exist.</p>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
      <Agent />
    </BrowserRouter>
  );
}
