import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ArrowRight,
  BookOpen,
  Sliders,
  FileText
} from 'lucide-react';
import { promptTemplates, beforeAfterComparisons } from '../data/promptLabData';
import { UserProgress } from '../types';
import confetti from 'canvas-confetti';

interface PromptStudioProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const PromptStudio: React.FC<PromptStudioProps> = ({
  progress,
  onUpdateProgress
}) => {
  // RTCF fields
  const [role, setRole] = useState('อาจารย์ผู้เชี่ยวชาญด้านวิทยาศาสตร์สิ่งแวดล้อม');
  const [task, setTask] = useState('อธิบายสาเหตุและผลกระทบของภาวะโลกร้อน (Global Warming)');
  const [context, setContext] = useState('สำหรับนักเรียนระดับมัธยมศึกษาตอนต้น ที่ยังไม่มีพื้นฐานฟิสิกส์ชั้นสูง');
  const [constraints, setConstraints] = useState('แบ่งเป็น 3 หัวข้อหลัก, ความยาวไม่เกิน 200 คำ, ยกตัวอย่างเหตุการณ์ในไทย 1 ข้อ, จัดทำเป็น bullet points, ห้ามใช้ศัพท์เทคนิคโดยไม่อธิบาย');

  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'before-after'>('builder');
  const [copied, setCopied] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Combined full prompt
  const combinedPrompt = `[Role]: สวมบทบาทเป็น ${role.trim()}
[Task]: ช่วย ${task.trim()}
[Context]: ${context.trim()}
[Format & Constraints]: ${constraints.trim()}`;

  // Calculate Quality Score
  const scoreChecks = [
    { label: 'กำหนดบทบาทชัดเจน (Role)', pass: role.trim().length >= 10, weight: 25 },
    { label: 'ระบุภารกิจเจาะจง (Task)', pass: task.trim().length >= 15, weight: 25 },
    { label: 'ให้ภูมิหลัง/กลุ่มเป้าหมาย (Context)', pass: context.trim().length >= 10, weight: 25 },
    { label: 'กำหนดรูปแบบ/ความยาว/ข้อจำกัด (Constraints)', pass: constraints.trim().length >= 15, weight: 25 },
  ];

  const totalScore = scoreChecks.reduce((acc, c) => acc + (c.pass ? c.weight : 0), 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(combinedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyTemplate = (tpl: typeof promptTemplates[0]) => {
    setRole(tpl.role);
    setTask(tpl.task);
    setContext(tpl.context);
    setConstraints(tpl.constraints);
    setActiveTab('builder');
    setSimulatedOutput(null);
  };

  const handleSimulateRun = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      // Realistic simulated AI output crafted strictly following the prompt parameters
      setSimulatedOutput(
        `🌿 สวัสดีครับนักเรียนทุกคน! ในฐานะครูวิทย์ วันนี้เรามาทำความเข้าใจเรื่อง "ภาวะโลกร้อน" แบบเห็นภาพง่ายๆ กันครับ:\n\n` +
        `1. สาเหตุหลัก: ก๊าซเรือนกระจกที่ถูกกักเก็บ\n` +
        `• เกิดจากกิจกรรมของมนุษย์ เช่น การเผาไหม้เชื้อเพลิงฟอสซิล (น้ำมัน ถ่านหิน) และโรงงานอุตสาหกรรม ทำให้เกิด "ก๊าซคาร์บอนไดออกไซด์" ห่อหุ้มโลกไว้เหมือนผ้าห่มหนาเกินไปจนความร้อนระบายออกสู่อวกาศไม่ได้\n\n` +
        `2. ผลกระทบสำคัญ: สภาพอากาศแปรปรวนสุดขั้ว\n` +
        `• น้ำแข็งขั้วโลกละลาย ระดับน้ำทะเลสูงขึ้น และเกิดคลื่นความร้อนรุนแรงในหลายทวีป\n\n` +
        `3. ตัวอย่างผลกระทบในประเทศไทย:\n` +
        `• ฤดูร้อนในไทยยาวนานและร้อนจัดขึ้น อุณหภูมิพุ่งทะลุ 42-44 องศาเซลเซียส ส่งผลให้เกิดภัยแล้งในพื้นที่การเกษตรภาคอีสาน และน้ำทะเลหนุนสูงบริเวณอ่าวไทยตอนบน\n\n` +
        `💡 สรุป: โลกไม่ได้ร้อนขึ้นเพราะดวงอาทิตย์แรงขึ้น แต่เพราะ "ผ้าห่มก๊าซ" ที่มนุษย์สร้างขึ้นหนาเกินไปครับ!`
      );

      // Unlock badge if not unlocked
      if (!progress.unlockedBadges.includes('badge-master-prompter')) {
        const newBadges = [...progress.unlockedBadges, 'badge-master-prompter'];
        const newLabs = progress.completedLabs.includes('prompt-studio')
          ? progress.completedLabs
          : [...progress.completedLabs, 'prompt-studio'];

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
    }, 600);
  };

  const handleReset = () => {
    setRole('');
    setTask('');
    setContext('');
    setConstraints('');
    setSimulatedOutput(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Studio Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <Terminal className="w-4 h-4" />
              <span>Interactive Prompt Studio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              ห้องทดลองเขียนและวิเคราะห์ Prompt (R-T-C-F Engine)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              ฝึกปรับแต่งคำสั่งตามสูตร Role, Task, Context และ Constraints พร้อมประเมินเกณฑ์คุณภาพแบบเรียลไทม์
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'builder'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              เครื่องมือสร้าง (Builder)
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'templates'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              คลังแม่แบบ (Templates)
            </button>
            <button
              onClick={() => setActiveTab('before-after')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'before-after'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              เปรียบเทียบ Before/After
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Builder */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: 4-Part Structure Input */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Role Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">R</span>
                  <span>Role (บทบาทสมมุติของ AI)</span>
                </label>
                <span className="text-[11px] text-slate-500">เช่น อาจารย์แพทย์, โปรแกรมเมอร์</span>
              </div>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="เช่น อาจารย์ผู้เชี่ยวชาญด้านวิทยาศาสตร์สิ่งแวดล้อม..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Task Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">T</span>
                  <span>Task (ภารกิจหลักที่ต้องการให้ทำ)</span>
                </label>
                <span className="text-[11px] text-slate-500">ต้องชัดเจน ไม่คลุมเครือ</span>
              </div>
              <textarea
                rows={2}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="เช่น อธิบายสาเหตุและผลกระทบของภาวะโลกร้อน..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
              />
            </div>

            {/* Context Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">C</span>
                  <span>Context (ภูมิหลัง / กลุ่มเป้าหมายผู้รับสาร)</span>
                </label>
                <span className="text-[11px] text-slate-500">เช่น สำหรับเด็ก ม.ต้น, สำหรับส่งประกวด</span>
              </div>
              <textarea
                rows={2}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="เช่น สำหรับนักเรียนระดับมัธยมศึกษาตอนต้น ที่ยังไม่มีพื้นฐานฟิสิกส์ชั้นสูง..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
              />
            </div>

            {/* Constraints Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">F</span>
                  <span>Format & Constraints (รูปแบบ ความยาว และข้อห้าม)</span>
                </label>
                <span className="text-[11px] text-slate-500">เช่น แบ่ง 3 หัวข้อ, ห้ามใช้คำศัพท์ยาก</span>
              </div>
              <textarea
                rows={3}
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="เช่น แบ่งเป็น 3 หัวข้อหลัก, ความยาวไม่เกิน 200 คำ, จัดทำเป็น bullet points..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
              />
            </div>

            {/* Reset Button */}
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ล้างข้อมูลเพื่อเริ่มเขียนใหม่</span>
              </button>
            </div>

          </div>

          {/* Right Column: Real-Time Evaluator & Simulator */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Rubric Score Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  คะแนนคุณภาพคำสั่ง (Prompt Score)
                </span>
                <span className={`text-lg font-bold font-mono ${
                  totalScore === 100 ? 'text-emerald-400' : totalScore >= 75 ? 'text-indigo-400' : 'text-amber-400'
                }`}>
                  {totalScore} / 100
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    totalScore === 100 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                      : totalScore >= 75 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                        : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${totalScore}%` }}
                />
              </div>

              {/* Checklist Rubric */}
              <div className="space-y-2 pt-1 text-xs">
                {scoreChecks.map((check, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-800/60 last:border-0">
                    <span className="text-slate-300">{check.label}</span>
                    {check.pass ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ครบถ้วน
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500">
                        <AlertCircle className="w-3.5 h-3.5" /> ยังไม่ระบุ
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Combined Prompt Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">ตัวอย่าง Prompt รวมพร้อมส่ง:</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto border border-slate-800">
                {combinedPrompt}
              </pre>

              {/* Run Test Simulation Button */}
              <button
                disabled={isSimulating || totalScore < 50}
                onClick={handleSimulateRun}
                className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                {isSimulating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>AI กำลังประมวลผลคำสั่ง...</span>
                  </span>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>ทดสอบประมวลผลคำสั่ง (Run Simulation)</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated AI Result Box */}
            {simulatedOutput && (
              <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>ผลลัพธ์จำลองที่ AI ตอบกลับมา:</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">ตรงตามโครงสร้าง 100%</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap border border-slate-800 max-h-64 overflow-y-auto">
                  {simulatedOutput}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Tab 2: Template Library */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promptTemplates.map((tpl) => (
            <div 
              key={tpl.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {tpl.category}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-white text-base">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {tpl.description}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <div className="line-clamp-3 italic text-slate-400">
                    "{tpl.examplePrompt}"
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleApplyTemplate(tpl)}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-indigo-500"
              >
                <span>โหลดแม่แบบนี้ไปปรับแต่ง</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Before & After Comparison */}
      {activeTab === 'before-after' && (
        <div className="space-y-6">
          {beforeAfterComparisons.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>{item.title}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Before (Weak) */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <span>❌ คำสั่งแบบทั่วไป (ก่อนปรับปรุง)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-rose-900/50 text-xs font-mono text-rose-200">
                    "{item.before.prompt}"
                  </div>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {item.before.flaws.map((flaw, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 text-rose-300/80">
                        <span>•</span>
                        <span>{flaw}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After (Strong) */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <span>✅ คำสั่งแบบ RTCF (หลังปรับปรุง)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-emerald-900/50 text-xs font-mono text-emerald-200">
                    "{item.after.prompt}"
                  </div>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {item.after.strengths.map((str, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5 text-emerald-300/80">
                        <span>•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
