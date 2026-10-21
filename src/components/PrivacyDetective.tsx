import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { privacyDetectionItems } from '../data/privacyData';
import { UserProgress } from '../types';
import confetti from 'canvas-confetti';

interface PrivacyDetectiveProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const PrivacyDetective: React.FC<PrivacyDetectiveProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [isMasked, setIsMasked] = useState(false);
  const [inspectedLeaks, setInspectedLeaks] = useState<number[]>([]);
  const [copiedSafe, setCopiedSafe] = useState(false);

  const currentItem = privacyDetectionItems[selectedCaseIdx];

  const handleInspectLeak = (idx: number) => {
    if (!inspectedLeaks.includes(idx)) {
      const updated = [...inspectedLeaks, idx];
      setInspectedLeaks(updated);

      if (updated.length === currentItem.leakedItems.length) {
        if (!progress.unlockedBadges.includes('badge-privacy-guardian')) {
          const newBadges = [...progress.unlockedBadges, 'badge-privacy-guardian'];
          const newLabs = progress.completedLabs.includes('privacy-detective')
            ? progress.completedLabs
            : [...progress.completedLabs, 'privacy-detective'];

          onUpdateProgress({
            ...progress,
            unlockedBadges: newBadges,
            completedLabs: newLabs
          });

          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    }
  };

  const handleCopySafe = () => {
    navigator.clipboard.writeText(currentItem.safePromptAlternative);
    setCopiedSafe(true);
    setTimeout(() => setCopiedSafe(false), 2000);
  };

  // Helper to render masked text
  const getMaskedText = () => {
    let text = currentItem.userPromptText;
    currentItem.leakedItems.forEach((leak) => {
      text = text.replace(leak.text, `[🛡️ ปิดบัง: ${leak.type}]`);
    });
    return text;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Personal Data & PDPA Detective</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              นักสืบข้อมูลส่วนบุคคล & เวิร์กช็อป Data Masking
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              ฝึกตรวจจับข้อมูลอ่อนไหว (PII) ที่ผู้ใช้มักเผลอพิมพ์ให้ AI และเรียนรู้วิธีแปลงข้อมูลเป็นนิรนามก่อนกดส่ง
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">ตัวอย่าง:</span>
            <div className="flex gap-1">
              {privacyDetectionItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedCaseIdx(idx);
                    setIsMasked(false);
                    setInspectedLeaks([]);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    idx === selectedCaseIdx
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: User Prompt with Highlightable Leaks */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  กรณีศึกษา {selectedCaseIdx + 1}
                </span>
                <h3 className="font-heading font-semibold text-white text-base mt-1">
                  {currentItem.title}
                </h3>
              </div>

              {/* Data Masking Toggle Button */}
              <button
                onClick={() => setIsMasked(!isMasked)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isMasked 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {isMasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isMasked ? 'กำลังเปิดโหมด Data Masking' : 'ทดลองเปิด Data Masking'}</span>
              </button>
            </div>

            {/* Prompt Display Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-medium text-slate-400">
                ข้อความที่พิมพ์เตรียมส่งให้ AI:
              </span>
              <div className="p-3.5 rounded-lg bg-slate-900/90 text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap border border-slate-800">
                {isMasked ? (
                  <span className="text-emerald-300">{getMaskedText()}</span>
                ) : (
                  <span className="text-slate-200">{currentItem.userPromptText}</span>
                )}
              </div>
            </div>

            {/* Leaks Counter Callout */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>ตรวจพบจุดเสี่ยงข้อมูลรั่วไหลทั้งหมด:</span>
              </span>
              <span className="font-bold text-rose-400">
                {currentItem.leakedItems.length} จุด (คลิกดูด้านขวา)
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Breakdown of PII elements */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>รายการข้อมูลอ่อนไหวที่ตรวจพบ (คลิกเพื่อสืบสวน)</span>
            </h4>

            <div className="space-y-2.5">
              {currentItem.leakedItems.map((item, idx) => {
                const isInspected = inspectedLeaks.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleInspectLeak(idx)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isInspected 
                        ? 'bg-slate-950 border-rose-500/60 shadow-sm' 
                        : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {item.type}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.riskLevel === 'สูงมาก' 
                          ? 'bg-rose-500/20 text-rose-400' 
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        ความเสี่ยง: {item.riskLevel}
                      </span>
                    </div>

                    <div className="font-mono text-slate-300 text-[11px] truncate mt-1">
                      "{item.text}"
                    </div>

                    {isInspected && (
                      <p className="text-slate-400 mt-2 pt-2 border-t border-slate-800 text-[11px] leading-relaxed">
                        ⚠️ <strong>เหตุผลที่อันตราย:</strong> {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Safe Prompt Alternative Recommendation */}
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>เวอร์ชันปลอดภัย 100% (แนะนำ):</span>
                </span>
                <button
                  onClick={handleCopySafe}
                  className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded transition-colors"
                >
                  {copiedSafe ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSafe ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                </button>
              </div>
              <p className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-200/90 text-xs leading-relaxed">
                {currentItem.safePromptAlternative}
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
