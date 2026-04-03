import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, Calendar, LogIn, User, LogOut, Shield, Phone } from 'lucide-react';
import { auth, signInWithGoogle, logout, db } from "../../firebase";
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  const links = [
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  useMotionValueEvent(scrollY, 'change', (v) => setIsScrolled(v > 50));

  React.useEffect(() => {
    let unsubDoc: (() => void) | undefined;
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        unsubDoc = onSnapshot(doc(db, 'users', u.uid), (d) => {
          setIsAdmin(d.exists() && d.data().role === 'admin');
        }, () => setIsAdmin(false));
      } else {
        setIsAdmin(false);
        unsubDoc?.();
      }
    });
    return () => { unsubAuth(); unsubDoc?.(); };
  }, []);

  const handleLogin = async () => { try { await signInWithGoogle(); } catch (e) { console.error(e); } };
  const handleLogout = async () => { try { await logout(); } catch (e) { console.error(e); } };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${isScrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" data-hover>
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-accent))' }}
          >
            DE
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-xl text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors">
              DE Dental Square
            </span>
            <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-[var(--color-brand-primary)]">
              Center for Advanced Dental Care
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {isAdmin && (
            <Link to="/admin" data-hover className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-brand-primary)] hover:opacity-70 transition-opacity">
              <Shield size={13} /> Admin
            </Link>
          )}
          {links.map((link) => (
            <Link key={link.name} to={link.path} data-hover
              className="relative text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors"
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div layoutId="activeNav"
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'var(--color-brand-primary)' }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:8840066719" data-hover
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(232,115,90,0.1)', color: 'var(--color-brand-primary)' }}>
              <Phone size={14} />
            </div>
            8840066719
          </a>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/my-appointments" data-hover className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors">
                {user.photoURL
                  ? <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border-2" style={{ borderColor: 'var(--color-brand-primary)' }} referrerPolicy="no-referrer" />
                  : <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(232,115,90,0.1)' }}><User size={14} /></div>
                }
                <span className="hidden lg:inline">{user.displayName?.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} data-hover className="text-[var(--color-text-muted)] hover:text-red-400 transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} data-hover className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors">
              <LogIn size={16} /> Login
            </button>
          )}

          <Link to="/appointment" data-hover>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm"
            >
              <Calendar size={15} /> Book Now
            </motion.button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[var(--color-text-primary)] p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass border-t py-6 px-6 flex flex-col gap-4"
          style={{ borderColor: 'rgba(232,115,90,0.15)' }}
        >
          {isAdmin && (
            <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">
              <Shield size={14} /> Admin Panel
            </Link>
          )}
          {links.map((l) => (
            <Link key={l.name} to={l.path} onClick={() => setIsOpen(false)}
              className="text-base font-medium py-2 border-b text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors"
              style={{ borderColor: 'rgba(232,115,90,0.1)' }}
            >
              {l.name}
            </Link>
          ))}
          <div className="pt-4 space-y-4">
            {user ? (
              <div className="space-y-4">
                <Link to="/my-appointments" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">{user.displayName}</div>
                    <div className="text-xs text-[var(--color-brand-primary)] uppercase tracking-wider">My Appointments</div>
                  </div>
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-sm font-bold text-red-400 py-3 border border-red-200 rounded-2xl">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <button onClick={handleLogin} className="w-full flex items-center justify-center gap-2 text-sm font-bold py-3 border rounded-2xl text-[var(--color-text-secondary)]" style={{ borderColor: 'rgba(232,115,90,0.2)' }}>
                <LogIn size={16} /> Login with Google
              </button>
            )}
            <Link to="/appointment" onClick={() => setIsOpen(false)}>
              <button className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm">
                <Calendar size={16} /> Book Appointment
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
