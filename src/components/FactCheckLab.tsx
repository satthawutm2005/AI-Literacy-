import React, { useState } from 'react';
import { 
  FileSearch, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  ExternalLink, 
  BookOpen, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { factCheckCases } from '../data/factCheckData';
import { UserProgress } from '../types';
import confetti from 'canvas-confetti';

interface FactCheckLabProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const FactCheckLab: React.FC<FactCheckLabProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [userVote, setUserVote] = useState<'has' | 'none' | null>(null);
  const [investigatedTools, setInvestigatedTools] = useState<string[]>([]);
  const [showFullResolution, setShowFullResolution] = useState<boolean>(false);

  const currentCase = factCheckCases[selectedCaseIndex];

  const handleToolClick = (toolName: string) => {
    if (!investigatedTools.includes(toolName)) {
      setInvestigatedTools([...investigatedTools, toolName]);
    }
  };

  const handleVote = (vote: 'has' | 'none') => {
    setUserVote(vote);
    setShowFullResolution(true);

    const isUserCorrect = (vote === 'has' && currentCase.hasHallucination) ||
                          (vote === 'none' && !currentCase.hasHallucination);

    if (isUserCorrect) {
      if (!progress.unlockedBadges.includes('badge-fact-checker')) {
        const newBadges = [...progress.unlockedBadges, 'badge-fact-checker'];
        const newLabs = progress.completedLabs.includes('fact-check')
          ? progress.completedLabs
          : [...progress.completedLabs, 'fact-check'];

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
  };

  const handleNextCase = () => {
    if (selectedCaseIndex < factCheckCases.length - 1) {
      setSelectedCaseIndex(selectedCaseIndex + 1);
      setUserVote(null);
      setInvestigatedTools([]);
      setShowFullResolution(false);
    }
  };

  const handlePrevCase = () => {
    if (selectedCaseIndex > 0) {
      setSelectedCaseIndex(selectedCaseIndex - 1);
      setUserVote(null);
      setInvestigatedTools([]);
      setShowFullResolution(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <FileSearch className="w-4 h-4" />
              <span>Interactive Fact-Checking Simulator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              ห้องปฏิบัติการจับ AI หลอน & อ้างอิงทิพย์ (Hallucination Detector)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              ฝึกเป็นนักสืบดิจิทัล ตรวจสอบคำตอบจาก AI ที่ดูน่าเชื่อถืออย่างยิ่ง แต่มีข้อมูลเท็จหรือแหล่งอ้างอิงที่แต่งขึ้น
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">กรณีศึกษา:</span>
            <div className="flex gap-1">
              {factCheckCases.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCaseIndex(idx);
                    setUserVote(null);
                    setInvestigatedTools([]);
                    setShowFullResolution(false);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    idx === selectedCaseIndex
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
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

      {/* Case Investigation Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
              สถานการณ์ที่ {selectedCaseIndex + 1} / {factCheckCases.length}
            </span>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white mt-2">
              {currentCase.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            {currentCase.context}
          </p>
        </div>

        {/* AI Answer Box */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>คำตอบที่ AI ส่งกลับมา:</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Generative AI Output</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 text-slate-200 text-sm sm:text-base leading-relaxed border border-slate-800/80 italic">
            "{currentCase.aiResponse}"
          </div>

          {/* Claimed Sources List */}
          {currentCase.claimedSources.length > 0 && (
            <div className="text-xs text-slate-400 pt-2 space-y-1">
              <span className="font-semibold text-slate-300">แหล่งอ้างอิงที่ปรากฏในคำตอบ:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-400 pl-1">
                {currentCase.claimedSources.map((source, sIdx) => (
                  <li key={sIdx} className="line-clamp-1">{source}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Interactive Investigation Tools */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>เครื่องมือสืบค้นก่อนตัดสินใจ (Investigation Tools)</span>
            </span>
            <span className="text-[11px] text-slate-400">คลิกเพื่อดูผลการสืบค้น</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleToolClick('journal')}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                investigatedTools.includes('journal')
                  ? 'bg-slate-900 border-indigo-500 text-slate-200'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <div className="font-semibold text-indigo-400 flex items-center gap-1 mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>1. ตรวจสอบชื่อวารสาร/สถาบันวิชาการ</span>
              </div>
              {investigatedTools.includes('journal') ? (
                <p className="text-slate-300 text-[11px] mt-1">
                  🔍 ตรวจสอบในดัชนี TCI / Scopus: {currentCase.hasHallucination ? 'ไม่พบชื่อวารสารหรือผลงานนี้ในฐานข้อมูลจริง' : 'พบรายการตรงตามบันทึกประวัติศาสตร์'}
                </p>
              ) : (
                <p className="text-slate-500 text-[11px]">คลิกเพื่อส่งนักสืบค้นหาในฐานข้อมูล</p>
              )}
            </button>

            <button
              onClick={() => handleToolClick('domain')}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                investigatedTools.includes('domain')
                  ? 'bg-slate-900 border-amber-500 text-slate-200'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              <div className="font-semibold text-amber-400 flex items-center gap-1 mb-1">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>2. ตรวจสอบความสมเหตุสมผลของข้อเท็จจริง</span>
              </div>
              {investigatedTools.includes('domain') ? (
                <p className="text-slate-300 text-[11px] mt-1">
                  🔍 วิเคราะห์ตรรกะ: {currentCase.hasHallucination ? 'ตัวเลขหรือข้ออ้างขัดแย้งกับหลักสถิติหรือวิทยาศาสตร์ความเป็นจริง' : 'สอดคล้องกับหลักฐานอ้างอิงปฐมภูมิ'}
                </p>
              ) : (
                <p className="text-slate-500 text-[11px]">คลิกเพื่อวิเคราะห์ความน่าเชื่อถือ</p>
              )}
            </button>
          </div>
        </div>

        {/* Voting Action Section */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-4">
          <h4 className="text-sm font-semibold text-white">
            จากข้อมูลและการสืบค้นข้างต้น คุณคิดว่าคำตอบนี้ "มี AI หลอน (Hallucination)" หรือไม่?
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleVote('has')}
              className={`px-6 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                userVote === 'has'
                  ? 'bg-rose-600 text-white border-rose-500 ring-2 ring-rose-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-rose-300 border-rose-500/30'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>มีข้อมูลหลอน / อ้างอิงทิพย์ (Fake / Hallucinated)</span>
            </button>

            <button
              onClick={() => handleVote('none')}
              className={`px-6 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                userVote === 'none'
                  ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-emerald-500/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>เป็นข้อมูลจริง ถูกต้องตามประวัติศาสตร์/วิทยาศาสตร์</span>
            </button>
          </div>
        </div>

        {/* Full Resolution & Explanation Reveal */}
        {showFullResolution && (
          <div className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-4 animate-in fade-in duration-300">
            
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold">
              {(userVote === 'has' && currentCase.hasHallucination) || (userVote === 'none' && !currentCase.hasHallucination) ? (
                <div className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>การวิเคราะห์ของคุณ "ถูกต้องแม่นยำ!"</span>
                </div>
              ) : (
                <div className="text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>ยังไม่ถูกต้อง มาดูข้อเท็จจริงเบื้องลึกกัน</span>
                </div>
              )}
            </div>

            {/* Hallucinated details breakdown */}
            {currentCase.hasHallucination && currentCase.hallucinatedParts.length > 0 && (
              <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-900/60 text-xs sm:text-sm space-y-1.5">
                <span className="font-semibold text-rose-300">จุดที่ AI หลอนแต่งเรื่องขึ้นมา:</span>
                <ul className="list-disc list-inside space-y-1 text-rose-200/90 pl-1">
                  {currentCase.hallucinatedParts.map((part, pIdx) => (
                    <li key={pIdx}>{part}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actual Fact */}
            <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-900/60 text-xs sm:text-sm text-emerald-200 space-y-1">
              <span className="font-semibold text-emerald-300">ข้อเท็จจริงที่ถูกต้อง (Actual Facts):</span>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {currentCase.actualFact}
              </p>
            </div>

            {/* Investigation Steps */}
            <div className="text-xs text-slate-400 pt-1 space-y-1">
              <span className="font-semibold text-slate-300">เทคนิคการสืบค้นเพื่อหาความจริง:</span>
              <ul className="space-y-1 text-slate-300 pl-1">
                {currentCase.investigationSteps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5">
                    <span className="text-indigo-400">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrevCase}
                disabled={selectedCaseIndex === 0}
                className="text-xs text-slate-400 hover:text-white disabled:opacity-40"
              >
                ← ดูกรณีก่อนหน้า
              </button>

              <button
                onClick={handleNextCase}
                disabled={selectedCaseIndex === factCheckCases.length - 1}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>กรณียกตัวอย่างถัดไป</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
