import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { PageTransition } from './components/layout/PageTransition';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import AppointmentForm from './components/AppointmentForm';
import Contact from './components/Contact';
import MyAppointments from './components/MyAppointments';
import AdminDashboard from './components/AdminDashboard';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <CustomCursor />
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-base-bg)', color: 'var(--color-text-primary)' }}>
          <Navbar />
          <main className="flex-grow">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/appointment" element={<AppointmentForm />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/my-appointments" element={<MyAppointments />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}
