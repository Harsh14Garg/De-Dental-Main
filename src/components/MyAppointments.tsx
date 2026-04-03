import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, Activity, AlertCircle } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Appointment {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function MyAppointments() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setAppointments([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  React.useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'appointments'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      setAppointments(apps);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  return (
    <section className="py-32 bg-zen-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-zen-primary font-bold tracking-[0.3em] uppercase text-xs mb-4"
            >
              Dashboard
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-zen-text"
            >
              My <span className="italic text-zen-primary">Appointments</span>
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/appointment" 
              className="inline-flex items-center justify-center bg-zen-gradient text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all zen-shadow"
            >
              Book New Appointment
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-2 border-zen-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : appointments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-[2rem] border border-zen-primary/10 group hover:border-zen-primary/30 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-zen-primary/10 rounded-2xl flex items-center justify-center text-zen-primary border border-zen-primary/20 group-hover:bg-zen-primary group-hover:text-white transition-all">
                    <Activity size={24} />
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    app.status === 'confirmed' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                    app.status === 'cancelled' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                    'bg-zen-primary/10 text-zen-primary border-zen-primary/20'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-zen-text mb-6 capitalize">{app.service} Dentistry</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-zen-muted font-light">
                    <Calendar size={18} className="text-zen-primary" />
                    <span className="text-sm">{new Date(app.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-4 text-zen-muted font-light">
                    <Clock size={18} className="text-zen-primary" />
                    <span className="text-sm">{app.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-[3rem] p-20 text-center border border-zen-primary/10"
          >
            <div className="w-20 h-20 bg-zen-primary/5 text-zen-muted rounded-full flex items-center justify-center mx-auto mb-8 border border-zen-primary/10">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-2xl font-serif text-zen-text mb-4">No appointments found</h3>
            <p className="text-zen-muted mb-10 font-light max-w-md mx-auto">You haven't booked any elite dental experiences yet. Start your journey to a masterpiece smile today!</p>
            <Link to="/appointment" className="text-zen-primary font-bold uppercase tracking-widest text-xs hover:text-zen-text transition-colors">Book your first appointment</Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
