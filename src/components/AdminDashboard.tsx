import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Activity, AlertCircle, CheckCircle, XCircle, User as UserIcon } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, onSnapshot, orderBy, doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let unsubscribeDoc: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        unsubscribeDoc = onSnapshot(doc(db, 'users', currentUser.uid), (userDoc) => {
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            setLoading(false);
          }
        }, (error) => {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          setLoading(false);
        });
      } else {
        setIsAdmin(false);
        setAppointments([]);
        setLoading(false);
        if (unsubscribeDoc) unsubscribeDoc();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  React.useEffect(() => {
    if (!user || !isAdmin) return;

    const q = query(
      collection(db, 'appointments'),
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
      console.error("Error fetching all appointments:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  const updateStatus = async (app: Appointment, newStatus: 'confirmed' | 'cancelled') => {
    try {
      await updateDoc(doc(db, 'appointments', app.id), {
        status: newStatus
      });

      // Send email notification
      if (newStatus === 'confirmed') {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: app.email,
            subject: 'Appointment Confirmed - De Dental Square',
            html: `<p>Dear ${app.name},</p><p>Your appointment for <strong>${app.service} Dentistry</strong> on <strong>${app.date}</strong> at <strong>${app.time}</strong> has been <strong>confirmed</strong>.</p><p>We look forward to seeing you!</p><p>Best regards,<br/>De Dental Square</p>`
          })
        });
      } else if (newStatus === 'cancelled') {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: app.email,
            subject: 'Appointment Cancelled - De Dental Square',
            html: `<p>Dear ${app.name},</p><p>Your appointment for <strong>${app.service} Dentistry</strong> on <strong>${app.date}</strong> at <strong>${app.time}</strong> has been cancelled.</p><p>If you have any questions or would like to reschedule, please contact us.</p><p>Best regards,<br/>De Dental Square</p>`
          })
        });
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Failed to update status. Please check your permissions.");
    }
  };

  if (!user || !isAdmin) return null;

  return (
    <section className="py-32 bg-zen-bg relative" id="admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-zen-primary font-bold tracking-[0.3em] uppercase text-xs mb-4"
            >
              Admin Control Panel
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-zen-text"
            >
              All <span className="italic text-zen-primary">Bookings</span>
            </motion.p>
          </div>
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
                className="glass-card p-8 rounded-[2rem] border border-zen-primary/10 group hover:border-zen-primary/30 transition-all duration-500 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-zen-primary/10 rounded-2xl flex items-center justify-center text-zen-primary border border-zen-primary/20 group-hover:bg-zen-primary group-hover:text-white transition-all">
                    <Activity size={20} />
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    app.status === 'confirmed' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                    app.status === 'cancelled' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                    'bg-zen-primary/10 text-zen-primary border-zen-primary/20'
                  }`}>
                    {app.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif text-zen-text mb-2 capitalize">{app.service} Dentistry</h3>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-3 text-zen-muted font-light">
                    <UserIcon size={16} className="text-zen-primary" />
                    <span className="text-sm">{app.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zen-muted font-light">
                    <Calendar size={16} className="text-zen-primary" />
                    <span className="text-sm">{new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zen-muted font-light">
                    <Clock size={16} className="text-zen-primary" />
                    <span className="text-sm">{app.time}</span>
                  </div>
                  <div className="text-xs text-zen-muted/70 mt-2">
                    <p>Email: {app.email}</p>
                    <p>Phone: {app.phone}</p>
                  </div>
                </div>

                {app.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-zen-primary/10 mt-auto">
                    <button 
                      onClick={() => updateStatus(app, 'confirmed')}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors border border-green-500/20"
                    >
                      <CheckCircle size={16} /> Confirm
                    </button>
                    <button 
                      onClick={() => updateStatus(app, 'cancelled')}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors border border-red-500/20"
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  </div>
                )}
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
            <h3 className="text-2xl font-serif text-zen-text mb-4">No bookings found</h3>
            <p className="text-zen-muted font-light max-w-md mx-auto">There are currently no appointments in the system.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
