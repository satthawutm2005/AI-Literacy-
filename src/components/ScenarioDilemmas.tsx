import React, { useState } from 'react';
import { 
  GitFork, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  RotateCcw,
  User,
  ShieldCheck
} from 'lucide-react';
import { scenarioDilemmas } from '../data/scenariosData';
import { UserProgress } from '../types';
import confetti from 'canvas-confetti';

interface ScenarioDilemmasProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const ScenarioDilemmas: React.FC<ScenarioDilemmasProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null);

  const currentScenario = scenarioDilemmas[activeScenarioIdx];
  const chosenChoice = currentScenario.choices.find((c) => c.id === chosenOptionId);

  const handleMakeChoice = (choiceId: string) => {
    setChosenOptionId(choiceId);
    const choice = currentScenario.choices.find((c) => c.id === choiceId);

    if (choice?.isRecommended) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleResetChoice = () => {
    setChosenOptionId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-purple-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <GitFork className="w-4 h-4" />
              <span>Interactive Decision Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              สถานการณ์จำลอง & ทางแยกการตัดสินใจ (Case Dilemmas)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
              สวมบทบาทในสถานการณ์ที่กลืนไม่เข้าคายไม่ออก การตัดสินใจของคุณจะส่งผลต่อความซื่อสัตย์ ความปลอดภัยของข้อมูล และเกรดของคุณโดยตรง!
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex justify-center sm:justify-end gap-2">
            {scenarioDilemmas.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveScenarioIdx(idx);
                  setChosenOptionId(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  idx === activeScenarioIdx
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                กรณีที่ {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario Stage */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        {/* Role & Situation Title */}
        <div className="space-y-2 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <User className="w-3.5 h-3.5" />
              <span>บทบาทของคุณ: {currentScenario.role}</span>
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
            {currentScenario.title}
          </h3>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm sm:text-base leading-relaxed">
            {currentScenario.context}
          </div>
        </div>

        {/* Choices Options */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            คุณจะเลือกตัดสินใจอย่างไร? (คลิกเลือก 1 ข้อ)
          </h4>

          <div className="space-y-3">
            {currentScenario.choices.map((choice, idx) => {
              const isSelected = chosenOptionId === choice.id;

              return (
                <button
                  key={choice.id}
                  disabled={chosenOptionId !== null}
                  onClick={() => handleMakeChoice(choice.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border text-sm font-medium transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? choice.isRecommended
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500'
                        : 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500'
                      : chosenOptionId !== null
                        ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 hover:scale-[1.01]'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{choice.actionText}</span>
                  {isSelected && choice.isRecommended && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {isSelected && !choice.isRecommended && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Outcome Card */}
        {chosenChoice && (
          <div className={`p-6 rounded-2xl border space-y-4 animate-in fade-in duration-300 ${
            chosenChoice.isRecommended
              ? 'bg-emerald-950/30 border-emerald-500/50'
              : 'bg-rose-950/30 border-rose-500/50'
          }`}>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {chosenChoice.isRecommended ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                )}
                <h4 className="font-heading font-bold text-lg text-white">
                  ผลลัพธ์: {chosenChoice.outcomeTitle}
                </h4>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                chosenChoice.aiLiteracyScore > 0 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {chosenChoice.aiLiteracyScore > 0 ? `+${chosenChoice.aiLiteracyScore}` : chosenChoice.aiLiteracyScore} แต้ม AI Literacy
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {chosenChoice.outcomeDesc}
            </p>

            {/* In-depth Feedback / Teaching takeaway */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
              <strong className="text-indigo-400">บทเรียนสำคัญ: </strong>
              {chosenChoice.feedback}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleResetChoice}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ลองเลือกข้ออื่นใหม่เพื่อศึกษาผลลัพธ์</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
