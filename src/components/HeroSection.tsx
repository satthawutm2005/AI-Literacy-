import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BrainCircuit, 
  ShieldCheck, 
  FileSearch, 
  Terminal, 
  Scale, 
  Award,
  BookOpen,
  FlaskConical,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { UserProgress } from '../types';

interface HeroSectionProps {
  onStartLearning: () => void;
  onGoToLabs: () => void;
  onGoToQuiz: () => void;
  onGoToCps: () => void;
  onOpenAbout: () => void;
  progress: UserProgress;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onGoToLabs,
  onGoToQuiz,
  onGoToCps,
  onOpenAbout,
  progress
}) => {
  return (
    <div className="relative overflow-hidden py-12 sm:py-20 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Author & Academic Project Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div 
            onClick={onOpenAbout}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium hover:bg-slate-800 cursor-pointer transition-all shadow-sm group"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>โครงการ AI Vibe Coding & CPS 5 ขั้นตอน</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">นายเสฏฐวุฒิ เมืองพันธ์ (670610231)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight sm:leading-tight">
            AI Literacy : <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              ฉลาดรู้ทันปัญญาประดิษฐ์
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            เว็บแอปพลิเคชันเพื่อการเรียนรู้สำหรับนักเรียนและนักศึกษา มุ่งสร้างรากฐานความเข้าใจที่ถูกต้อง 
            รับมือ AI หลอน (Hallucination) ป้องกันข้อมูลส่วนบุคคลรั่วไหล ยึดมั่นจริยธรรม 
            และฝึกเขียน Prompt อย่างมืออาชีพ
          </p>

          {/* Core Motto Callout */}
          <div className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-sm">
            <p className="text-xs sm:text-sm font-medium text-amber-300 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>“ใช้ AI อย่างฉลาด • ตรวจสอบก่อนเชื่อ • รับผิดชอบก่อนนำไปใช้”</span>
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onStartLearning}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>เริ่มเรียนบทเรียนทั้ง 5 บท</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGoToLabs}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold text-sm sm:text-base hover:border-slate-600 transition-all hover:scale-105 active:scale-95"
            >
              <FlaskConical className="w-5 h-5 text-cyan-400" />
              <span>เข้าห้องแล็บฝึกปฏิบัติจริง</span>
            </button>

            <button
              onClick={onGoToQuiz}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
            >
              <Award className="w-5 h-5 text-amber-400" />
              <span>แบบทดสอบ & เกียรติบัตร</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: 5 Core Chapters */}
          <div 
            onClick={onStartLearning}
            className="p-5 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/70 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all mb-4">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-white text-base sm:text-lg group-hover:text-indigo-300 transition-colors">
              5 บทเรียนแกนหลัก
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              ครอบคลุมหลักการ AI, การเช็ก Fact-Check, กฎหมาย PDPA, จริยธรรม และ Prompt Engineering
            </p>
            <div className="mt-4 flex items-center text-xs text-indigo-400 font-medium">
              <span>{progress.completedLessons.length}/5 เรียนจบแล้ว</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Interactive Labs */}
          <div 
            onClick={onGoToLabs}
            className="p-5 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/70 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-white text-base sm:text-lg group-hover:text-cyan-300 transition-colors">
              3 แล็บฝึกปฏิบัติจริง
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Prompt Studio วัดคุณภาพคำสั่ง, เครื่องสแกนข้อมูลรั่วไหล (PII) และนักสืบจับ AI หลอน
            </p>
            <div className="mt-4 flex items-center text-xs text-cyan-400 font-medium">
              <span>ลงมือทดลองจริง</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: CPS Framework */}
          <div 
            onClick={onGoToCps}
            className="p-5 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/70 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all mb-4">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-white text-base sm:text-lg group-hover:text-purple-300 transition-colors">
              กระบวนการคิด CPS 5 ขั้น
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Creative Problem Solving ตั้งแต่ค้นหาความจริง ระบุปัญหา ค้นหาไอเดีย จนถึงส่งมอบสื่อสำเร็จ
            </p>
            <div className="mt-4 flex items-center text-xs text-purple-400 font-medium">
              <span>สำรวจกระบวนการคิด</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Certification */}
          <div 
            onClick={onGoToQuiz}
            className="p-5 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/70 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-white text-base sm:text-lg group-hover:text-amber-300 transition-colors">
              วัดผลและรับเกียรติบัตร
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              แบบทดสอบมาตรฐาน 10 ข้อ สอบผ่านเกณฑ์ 70% ออกใบประกาศนียบัตรพร้อมชื่อและรหัสพิมพ์ได้ทันที
            </p>
            <div className="mt-4 flex items-center text-xs text-amber-400 font-medium">
              <span>{progress.quizPassed ? 'ผ่านแล้ว • ดูใบประกาศ' : 'เริ่มทำแบบทดสอบ'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
