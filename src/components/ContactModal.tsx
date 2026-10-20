import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Refurbished Hardware Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsContactOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-950">
              Contact world-connect Showroom
            </h2>
            <span className="text-xs text-zinc-500">
              Direct Refurbished Hardware Consultation
            </span>
          </div>
          <button
            onClick={() => setIsContactOpen(false)}
            aria-label="Close contact dialog"
            className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Left Column: Contact details (left blank for now as requested) */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-zinc-900 uppercase tracking-wider mb-2">
                Physical Showroom
              </h3>
              <div className="flex items-start gap-2.5 text-zinc-500">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>— (Details to be announced)</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-zinc-900 uppercase tracking-wider mb-2">
                Direct Communications
              </h3>
              <div className="space-y-2 text-zinc-500">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>Phone: —</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span>Email: —</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-zinc-900 uppercase tracking-wider mb-2">
                Operating Hours
              </h3>
              <div className="flex items-start gap-2.5 text-zinc-600">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div><strong>Monday – Friday:</strong> 08:30 – 17:30</div>
                  <div><strong>Saturday:</strong> 09:00 – 14:00</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-zinc-500 text-[11px]">
              Fast nationwide courier dispatch with full transit insurance on every device.
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-2" />
                <h4 className="font-bold text-emerald-950 text-sm">Inquiry Received</h4>
                <p className="text-emerald-700 mt-1 text-xs">
                  A hardware advisor will follow up with your request shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Topic</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Refurbished Hardware Inquiry">Refurbished Hardware Inquiry</option>
                    <option value="Apple Trade-In Valuation">Apple Trade-In Valuation</option>
                    <option value="12-Month Warranty Support">12-Month Warranty Support</option>
                    <option value="B2B Bulk Hardware Procurement">B2B Bulk Hardware Procurement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-700 font-medium mb-1">Message *</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="How can we assist you today?"
                    className="w-full px-3.5 py-2.5 border border-zinc-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
