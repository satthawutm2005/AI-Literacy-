import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  GraduationCap, 
  Sparkles, 
  HelpCircle,
  BookOpen,
  User,
  Check
} from 'lucide-react';
import { quizQuestions } from '../data/quizData';
import { UserProgress } from '../types';
import confetti from 'canvas-confetti';

interface QuizSectionProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onOpenCertificate: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  progress,
  onUpdateProgress,
  onOpenCertificate
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentNameInput, setStudentNameInput] = useState(progress.studentName || '');
  const [studentIdInput, setStudentIdInput] = useState(progress.studentId || '');
  const [hasSavedProfile, setHasSavedProfile] = useState(false);

  const currentQ = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore();
    const passed = finalScore >= 7; // 70% threshold

    let newBadges = [...progress.unlockedBadges];
    if (passed && !newBadges.includes('badge-certified-literate')) {
      newBadges.push('badge-certified-literate');
    }

    onUpdateProgress({
      ...progress,
      quizScore: finalScore,
      quizCompleted: true,
      quizPassed: passed,
      unlockedBadges: newBadges
    });

    setIsSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProgress({
      ...progress,
      studentName: studentNameInput.trim() || 'ผู้เรียนรู้ AI Literacy',
      studentId: studentIdInput.trim() || '-'
    });
    setHasSavedProfile(true);
    setTimeout(() => setHasSavedProfile(false), 2500);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>AI Literacy Assessment & Certification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              แบบทดสอบวัดระดับ & เกียรติบัตรออนไลน์
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              วัดผลความฉลาดรู้ด้านปัญญาประดิษฐ์ 10 ข้อ ครอบคลุมทั้ง 5 บทเรียน ทำคะแนนได้ 70% (7/10 ข้อ) ขึ้นไป เพื่อรับเกียรติบัตรรับรองพร้อมชื่อของคุณ
            </p>
          </div>

          {progress.quizPassed && (
            <button
              onClick={onOpenCertificate}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex-shrink-0"
            >
              <Award className="w-5 h-5" />
              <span>ดูเกียรติบัตรของคุณ</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Name & School Form (For Certificate) */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <form onSubmit={handleSaveProfile} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 flex-shrink-0">
            <User className="w-4 h-4 text-indigo-400" />
            <span>ชื่อสำหรับระบุบนเกียรติบัตร:</span>
          </div>
          <input
            type="text"
            value={studentNameInput}
            onChange={(e) => setStudentNameInput(e.target.value)}
            placeholder="พิมพ์ชื่อ-นามสกุลจริง (เช่น นายณัฐพล สมบูรณ์)..."
            className="flex-1 w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            value={studentIdInput}
            onChange={(e) => setStudentIdInput(e.target.value)}
            placeholder="รหัสประจำตัว หรือ สถาบันการศึกษา..."
            className="w-full sm:w-56 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
          >
            {hasSavedProfile ? <Check className="w-4 h-4 text-emerald-400" /> : null}
            <span>{hasSavedProfile ? 'บันทึกแล้ว' : 'บันทึกชื่อ'}</span>
          </button>
        </form>
      </div>

      {/* Quiz Progress & Question Box */}
      {!isSubmitted ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
            <span className="font-semibold text-indigo-400">
              คำถามข้อที่ {currentQuestionIndex + 1} จาก {totalQuestions} ข้อ
            </span>
            <span className="text-slate-400">
              ตอบแล้ว {answeredCount}/{totalQuestions} ข้อ
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1">
            {quizQuestions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center flex-shrink-0 ${
                    isCurrent
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                      : isAnswered
                        ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40'
                        : 'bg-slate-950 text-slate-500 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              หมวด: {currentQ.category}
            </span>
            <h3 className="text-base sm:text-lg font-heading font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-500 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 flex-shrink-0 mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation & Submit Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 disabled:opacity-40"
            >
              ← ข้อก่อนหน้า
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <span>ข้อถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                disabled={answeredCount < totalQuestions}
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ส่งคำตอบเพื่อตรวจข้อสอบ ({answeredCount}/{totalQuestions})</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Result Banner */}
          <div className={`p-8 rounded-2xl border text-center space-y-4 ${
            percentage >= 70
              ? 'bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-500/50 shadow-xl'
              : 'bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-500/50 shadow-xl'
          }`}>
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-slate-900 border border-slate-700">
              {percentage >= 70 ? (
                <Award className="w-9 h-9 text-amber-400" />
              ) : (
                <HelpCircle className="w-9 h-9 text-amber-400" />
              )}
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                {percentage >= 70 ? '🎉 ยินดีด้วย! คุณผ่านการทดสอบ AI Literacy' : 'เกือบผ่านแล้ว! ลองทบทวนเนื้อหาอีกครั้ง'}
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                {percentage >= 70 
                  ? 'คุณมีความฉลาดรู้ด้านปัญญาประดิษฐ์ พร้อมนำความรู้ไปประยุกต์ใช้อย่างปลอดภัยและมีจริยธรรม'
                  : 'เกณฑ์การผ่านคือ 70% (7 ข้อ) คุณสามารถดูเฉลยละเอียดด้านล่างแล้วกดสอบใหม่ได้ทันที'}
              </p>
            </div>

            <div className="inline-block p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">คะแนนของคุณ</span>
              <span className={`text-4xl font-extrabold font-heading ${
                percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {score} / {totalQuestions}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">({percentage}%)</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {percentage >= 70 && (
                <button
                  onClick={onOpenCertificate}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Award className="w-5 h-5 text-slate-950" />
                  <span>เปิดดูเกียรติบัตร (E-Certificate)</span>
                </button>
              )}

              <button
                onClick={handleRetake}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review & Explanations */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              เฉลยคำตอบพร้อมคำอธิบายละเอียดทั้ง 10 ข้อ:
            </h4>

            <div className="space-y-4">
              {quizQuestions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-3 ${
                      isCorrect 
                        ? 'bg-slate-900/90 border-emerald-500/40' 
                        : 'bg-slate-900/90 border-rose-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-400">
                        ข้อที่ {idx + 1} • {q.category}
                      </span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4" /> ถูกต้อง
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-400 font-bold text-xs">
                          <XCircle className="w-4 h-4" /> ไม่ถูกต้อง
                        </span>
                      )}
                    </div>

                    <h5 className="font-heading font-medium text-white text-sm sm:text-base">
                      {q.question}
                    </h5>

                    <div className="space-y-1.5 pt-1">
                      <div className={`p-2.5 rounded-lg border ${
                        isCorrect 
                          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200' 
                          : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                      }`}>
                        <strong>คำตอบที่คุณเลือก: </strong>
                        {userAns !== undefined ? q.options[userAns] : 'ไม่ได้ตอบ'}
                      </div>

                      {!isCorrect && (
                        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-emerald-200">
                          <strong>คำตอบที่ถูกต้องคือ: </strong>
                          {q.options[q.correctIndex]}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs leading-relaxed">
                      <strong className="text-indigo-400">คำอธิบายเชิงวิชาการ: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
