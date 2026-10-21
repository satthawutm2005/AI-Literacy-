import React, { useState } from 'react';
import { 
  BrainCircuit, 
  FileSearch, 
  ShieldCheck, 
  Scale, 
  Terminal, 
  CheckCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  BookOpen,
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Lesson, UserProgress } from '../types';
import { lessonsData } from '../data/lessonsData';
import confetti from 'canvas-confetti';

interface LessonViewerProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onGoToLabs: () => void;
  onGoToQuiz: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  progress,
  onUpdateProgress,
  onGoToLabs,
  onGoToQuiz
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [activeSubtopicId, setActiveSubtopicId] = useState<string>('1-1');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const currentLesson = lessonsData.find((l) => l.id === selectedLessonId) || lessonsData[0];
  const isLessonCompleted = progress.completedLessons.includes(selectedLessonId);

  const handleSelectLesson = (id: number) => {
    setSelectedLessonId(id);
    const targetLesson = lessonsData.find((l) => l.id === id);
    if (targetLesson && targetLesson.subtopics.length > 0) {
      setActiveSubtopicId(targetLesson.subtopics[0].id);
    }
    setSelectedOption(null);
    setHasCheckedAnswer(false);
    setShowExplanation(false);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleQuickCheck = () => {
    if (selectedOption === null) return;
    setHasCheckedAnswer(true);
    setShowExplanation(true);

    if (selectedOption === currentLesson.quickCheck.correctIndex) {
      // Mark lesson as completed
      if (!progress.completedLessons.includes(currentLesson.id)) {
        const newCompleted = [...progress.completedLessons, currentLesson.id];
        let newBadges = [...progress.unlockedBadges];
        if (newCompleted.length === 1 && !newBadges.includes('badge-starter')) {
          newBadges.push('badge-starter');
        }
        if (newCompleted.length === 5 && !newBadges.includes('badge-cps-creator')) {
          newBadges.push('badge-cps-creator');
        }

        onUpdateProgress({
          ...progress,
          completedLessons: newCompleted,
          unlockedBadges: newBadges
        });

        // Trigger confetti celebration
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    }
  };

  const handleNextLesson = () => {
    if (selectedLessonId < lessonsData.length) {
      handleSelectLesson(selectedLessonId + 1);
    } else {
      onGoToLabs();
    }
  };

  const handlePrevLesson = () => {
    if (selectedLessonId > 1) {
      handleSelectLesson(selectedLessonId - 1);
    }
  };

  // Helper to get lesson icon
  const getLessonIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return BrainCircuit;
      case 'FileSearch': return FileSearch;
      case 'ShieldCheck': return ShieldCheck;
      case 'Scale': return Scale;
      case 'Terminal': return Terminal;
      default: return BookOpen;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Chapter Selection Tabs */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-indigo-400" />
              <span>หลักสูตร AI Literacy 5 บทเรียน</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              เรียนรู้ทีละขั้นตอน ตั้งแต่หลักการทำงานของ AI ไปจนถึงการประยุกต์ใช้งานอย่างปลอดภัย
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400">ความก้าวหน้ารวม:</span>
            <div className="text-lg font-bold text-indigo-400">
              {progress.completedLessons.length} / {lessonsData.length} บท
            </div>
          </div>
        </div>

        {/* Lesson Tab Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {lessonsData.map((lesson) => {
            const Icon = getLessonIcon(lesson.icon);
            const isSelected = lesson.id === selectedLessonId;
            const isDone = progress.completedLessons.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson.id)}
                className={`flex flex-col text-left p-3.5 sm:p-4 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${lesson.color} text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" /> ผ่าน
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.estimatedMinutes} นาที
                    </span>
                  )}
                </div>
                <h4 className="font-heading font-semibold text-xs sm:text-sm text-white line-clamp-1">
                  บทที่ {lesson.id}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                  {lesson.title.split(': ')[1] || lesson.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Subtopics Navigator */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 sticky top-24">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>หัวข้อย่อยในบทที่ {currentLesson.id}</span>
            </div>

            <nav className="space-y-1.5">
              {currentLesson.subtopics.map((sub, index) => {
                const isActive = activeSubtopicId === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveSubtopicId(sub.id);
                      window.scrollTo({ top: 220, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-start gap-2 ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="line-clamp-2">{sub.title}</span>
                  </button>
                );
              })}

              {/* Quick Check Jump Link */}
              <button
                onClick={() => {
                  const elem = document.getElementById('lesson-quick-check');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 mt-4"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>แบบทดสอบท้ายบท (Quick Check)</span>
              </button>
            </nav>

            {/* Practical Lab Shortcut Link */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <p className="text-[11px] text-slate-400 mb-2">เรียนจบบทนี้แล้วต้องการฝึกต่อ?</p>
              <button
                onClick={onGoToLabs}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>ไปที่ห้องแล็บฝึกปฏิบัติ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Main Column: Subtopic Content Reader */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Lesson Header Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-700/80 shadow-xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                บทเรียนที่ {currentLesson.id}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> ใช้เวลาประมาณ {currentLesson.estimatedMinutes} นาที
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              {currentLesson.title}
            </h1>
            <p className="text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
              {currentLesson.shortDescription}
            </p>
          </div>

          {/* Subtopics Detail */}
          {currentLesson.subtopics.map((subtopic) => {
            return (
              <div 
                key={subtopic.id}
                id={subtopic.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 scroll-mt-24 shadow-sm"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white flex items-center gap-3">
                    <span className="w-2.5 h-6 rounded-full bg-indigo-500" />
                    <span>{subtopic.title}</span>
                  </h3>
                  <div className="mt-2 p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium">
                    💡 สรุปใจความ: {subtopic.summary}
                  </div>
                </div>

                {/* Paragraph Content */}
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {subtopic.content.map((p, idx) => (
                    <p key={idx} className="tracking-wide">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Visual Infographic Items (if any) */}
                {subtopic.infographicItems && subtopic.infographicItems.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {subtopic.infographicItems.map((info, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex flex-col justify-between"
                      >
                        <h4 className="font-heading font-semibold text-sm text-indigo-300 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-indigo-400" />
                          <span>{info.title}</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-2">
                          {info.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Real-World Scenario / Case Study (if present) */}
                {subtopic.exampleSituation && (
                  <div className="mt-6 rounded-xl bg-slate-800/40 border border-slate-700 p-5 space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 font-heading font-semibold text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>ตัวอย่างสถานการณ์จริงที่พบบ่อย</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 italic">
                      "{subtopic.exampleSituation.scenario}"
                    </p>
                    <div className="text-xs sm:text-sm text-slate-300">
                      <strong className="text-indigo-300">การวิเคราะห์ผลกระทบ: </strong>
                      {subtopic.exampleSituation.analysis}
                    </div>

                    {/* DOs & DONTs Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/50">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>สิ่งที่ควรทำ (DO)</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {subtopic.exampleSituation.doAndDont.do.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-800/50">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 mb-2">
                          <XCircle className="w-4 h-4" />
                          <span>สิ่งที่ไม่ควรทำ (DON'T)</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {subtopic.exampleSituation.doAndDont.dont.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5">
                              <span className="text-rose-400 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Takeaways Box */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-indigo-400" />
                    <span>ข้อควรจำสำคัญ (Key Takeaways)</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    {subtopic.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* Quick Check Question Box */}
          <div 
            id="lesson-quick-check"
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-purple-950/30 border border-indigo-500/40 shadow-lg space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300 font-heading font-semibold text-base sm:text-lg">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <span>คำถามทบทวนความเข้าใจท้ายบทที่ {currentLesson.id} (Quick Check)</span>
              </div>
              {isLessonCompleted && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> ผ่านบทนี้แล้ว
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base font-medium text-white">
              {currentLesson.quickCheck.question}
            </p>

            {/* Options */}
            <div className="space-y-2.5">
              {currentLesson.quickCheck.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentLesson.quickCheck.correctIndex;

                let buttonStyle = 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600';
                if (hasCheckedAnswer) {
                  if (isCorrect) {
                    buttonStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                  } else if (isSelected) {
                    buttonStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  }
                } else if (isSelected) {
                  buttonStyle = 'bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-500';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasCheckedAnswer && isLessonCompleted}
                    onClick={() => {
                      setSelectedOption(idx);
                      setHasCheckedAnswer(false);
                      setShowExplanation(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${buttonStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {hasCheckedAnswer && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                    {hasCheckedAnswer && !isCorrect && isSelected && (
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Check Button */}
            {!hasCheckedAnswer && (
              <button
                disabled={selectedOption === null}
                onClick={handleQuickCheck}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-indigo-600/20"
              >
                ตรวจคำตอบ & บันทึกการเรียนรู้
              </button>
            )}

            {/* Explanation box */}
            {showExplanation && (
              <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                selectedOption === currentLesson.quickCheck.correctIndex
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-800 text-rose-200'
              }`}>
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  {selectedOption === currentLesson.quickCheck.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>คำตอบถูกต้อง! คุณผ่านบทเรียนนี้แล้ว</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>ยังไม่ถูกต้อง ลองอ่านคำอธิบายอีกครั้ง</span>
                    </>
                  )}
                </div>
                <p className="text-slate-300 mt-1">
                  {currentLesson.quickCheck.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Lesson Navigation bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={handlePrevLesson}
              disabled={selectedLessonId <= 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>บทก่อนหน้า</span>
            </button>

            <button
              onClick={handleNextLesson}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-indigo-600/20"
            >
              <span>{selectedLessonId < lessonsData.length ? 'บทถัดไป' : 'ไปที่ห้องแล็บฝึกปฏิบัติ'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
