import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  ShieldCheck,
  BatteryCharging,
  Cpu,
  CheckCircle2,
  Award,
  Sparkles,
  RefreshCw,
  Zap,
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';

export const AboutLabPage: React.FC = () => {
  const { setCurrentPage, setIsTradeInOpen, setIsContactOpen } = useCart();
  const [activeGradeTab, setActiveGradeTab] = useState<'A+' | 'A' | 'B'>('A+');

  const technicalStages = [
    {
      stage: 'Stage 01',
      title: 'Acoustic & Diagnostic Audit',
      description: 'Automated diagnostic tests assessing CPU throttle rates, GPU metal engines, TrueTone calibration, and biometric sensors.'
    },
    {
      stage: 'Stage 02',
      title: 'Battery Cell Stress Testing',
      description: 'Continuous discharge and thermal load verification. Any cell with under 90% retention capacity is replaced with a certified cell.'
    },
    {
      stage: 'Stage 03',
      title: 'Microscopic Cosmetic Polish',
      description: 'Precision ultrasonic cleaning and sanitization. Optical surface buffing to remove micro-particulates from speaker grilles and ports.'
    },
    {
      stage: 'Stage 04',
      title: 'DoD Cryptographic Data Wipe',
      description: 'Permanent hardware-level sanitization ensuring zero residual data, clean IMEI registration, and iCloud unlock guarantee.'
    }
  ];

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 animate-in fade-in duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The world-connet Certified Standard</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            Refurbished Apple tech without compromise.
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            world-connet was founded to give clients an elevated Apple experience at up to 45% lower prices than retail, backed by rigorous 70-point diagnostics, certified 12-month warranties, and zero e-waste.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Certified Devices</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsTradeInOpen(true)}
              className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Trade In Your Old Device
            </button>
          </div>
        </div>

        {/* 4-Stage Diagnostic Pipeline */}
        <section className="space-y-8 pt-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Rigorous Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mt-1">
              The 70-Point Diagnostic Protocol
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Every MacBook, iPhone, and iPad must score 100% on functional tests before receiving our certified seal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {technicalStages.map((s, idx) => (
              <div
                key={idx}
                className="bg-zinc-50/80 rounded-2xl border border-zinc-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                    {s.stage}
                  </span>
                  <h3 className="text-base font-bold text-zinc-950 mt-2 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-zinc-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Lab Tested &amp; Certified</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Cosmetic Grading Guide */}
        <section className="bg-zinc-50 rounded-3xl p-6 sm:p-10 border border-zinc-200/80 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Transparent Quality
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mt-1">
              Our Cosmetic Grading Standard
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              No surprises. We categorize cosmetics clearly so you know exactly what condition your device arrives in.
            </p>
          </div>

          {/* Interactive Grade Selector Tabs */}
          <div className="flex gap-2 p-1.5 bg-zinc-200/80 rounded-2xl max-w-md">
            {[
              { id: 'A+', label: 'Pristine (Grade A+)' },
              { id: 'A', label: 'Excellent (Grade A)' },
              { id: 'B', label: 'Good (Grade B)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveGradeTab(tab.id as any)}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeGradeTab === tab.id
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-xs">
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Screen &amp; Display</span>
              <div className="text-sm font-semibold text-zinc-900">
                {activeGradeTab === 'A+' && 'Flawless pristine screen. Zero scratches, zero dead pixels, full True Tone.'}
                {activeGradeTab === 'A' && 'Near-mint display. Extremely subtle micro-abrasions undetectable when screen is lit.'}
                {activeGradeTab === 'B' && 'Light visible cosmetic marks that do not affect touch response or clarity.'}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Body &amp; Chassis</span>
              <div className="text-sm font-semibold text-zinc-900">
                {activeGradeTab === 'A+' && 'Like-new casing. Corners, chamfered edges, and rear glass free of dings or marks.'}
                {activeGradeTab === 'A' && 'Light signs of handling from normal protective case usage. No structural dents.'}
                {activeGradeTab === 'B' && 'Visible cosmetic scratches or light corner scuffs. 100% structurally sound.'}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Battery &amp; Savings</span>
              <div className="text-sm font-semibold text-zinc-900">
                {activeGradeTab === 'A+' && '95% to 100% capacity · Save up to 25% vs retail'}
                {activeGradeTab === 'A' && '90% to 95% capacity · Save up to 35% vs retail'}
                {activeGradeTab === 'B' && '88% to 92% capacity · Save up to 45% vs retail'}
              </div>
            </div>
          </div>
        </section>

        {/* 12-Month Warranty Statement */}
        <section className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 text-cyan-400 flex items-center justify-center border border-cyan-400/20">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              The world-connet 1-Year Hardware Promise
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Every device purchased from world-connet includes our comprehensive 12-month hardware warranty covering logic boards, displays, touch sensors, cameras, and microphones. If any component develops a manufacturer fault, we repair or replace it with priority turnaround.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer"
              >
                Shop Certified Hardware
              </button>
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-white/20 cursor-pointer"
              >
                Speak with a Hardware Specialist
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
