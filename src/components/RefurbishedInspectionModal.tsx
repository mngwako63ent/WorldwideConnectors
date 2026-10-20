import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck, BatteryCharging, CheckCircle2, Award, ArrowRight } from 'lucide-react';

export const RefurbishedInspectionModal: React.FC = () => {
  const { isQualityCheckOpen, setIsQualityCheckOpen, setCurrentPage } = useCart();

  if (!isQualityCheckOpen) return null;

  const inspectionChecklist = [
    {
      category: 'Power & Battery Integrity',
      items: [
        'Battery health verified above 90% original capacity',
        'OEM fast-charging throughput verified (no overheating)',
        'Wireless MagSafe charging coils calibrated',
        'Charge cycle count logged and certified'
      ]
    },
    {
      category: 'Display & Touch Sensors',
      items: [
        'True Tone and ProMotion 120Hz refresh rate testing',
        'Zero dead pixels or backlight bleed verification',
        'Digitizer multi-touch response across 100% of surface area',
        'Ambient light sensor & Oleophobic coating restored'
      ]
    },
    {
      category: 'Audio, Camera & Biometrics',
      items: [
        'Face ID / Touch ID secure biometric enrollment',
        'Stereo speakers sound balance with zero distortion',
        'Triple-mic noise suppression and beamforming audit',
        'Ultrawide, Telephoto & LiDAR auto-focus precision calibration'
      ]
    },
    {
      category: 'Security & Connectivity',
      items: [
        'Clean IMEI & 100% iCloud activation unlocked',
        '5G, Wi-Fi 6E/7 and Bluetooth 5.3 range testing',
        'Factory reset with fresh official iPadOS/macOS/iOS installation',
        'Deep medical-grade ultrasonic sanitization'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 my-auto animate-in fade-in duration-150">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-zinc-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-950 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                The world-connect 70-Point Certified Standard
              </h2>
              <span className="text-xs text-zinc-400">
                Hardware Engineering &amp; Diagnostics Lab
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsQualityCheckOpen(false)}
            aria-label="Close quality check modal"
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-zinc-700">
          
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
            <h3 className="font-bold text-zinc-900 text-sm">
              Why Buy Refurbished from world-connect?
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every MacBook, iPhone, iPad, Apple Watch, and AirPods unit passes through our proprietary 70-point technical diagnosis before reaching our storefront. You receive Grade A+ condition, 12 months comprehensive warranty, and up to 45% savings compared to brand new retail.
            </p>
          </div>

          {/* Checklist Categories */}
          <div className="space-y-5">
            {inspectionChecklist.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{group.category}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-5">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-zinc-600">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Badges */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-blue-900 text-xs">12 Months Full Warranty Included</span>
              <p className="text-[11px] text-blue-700">
                Covers hardware defects, power issues, and display malfunctions. Free repairs or priority replacement.
              </p>
            </div>
            <Award className="w-8 h-8 text-blue-700 shrink-0 ml-3" />
          </div>

        </div>

        {/* Footer with rounded-xl button */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <button
            onClick={() => {
              setIsQualityCheckOpen(false);
              setCurrentPage('about');
            }}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Learn more in our Lab Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsQualityCheckOpen(false)}
            className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
