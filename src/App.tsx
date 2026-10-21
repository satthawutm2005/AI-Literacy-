/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LessonViewer } from './components/LessonViewer';
import { LabsHub } from './components/LabsHub';
import { ScenarioDilemmas } from './components/ScenarioDilemmas';
import { CpsWorkflow } from './components/CpsWorkflow';
import { QuizSection } from './components/QuizSection';
import { CertificateModal } from './components/CertificateModal';
import { AboutProjectModal } from './components/AboutProjectModal';
import { Footer } from './components/Footer';
import { UserProgress } from './types';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import { Sparkles, BookOpen, FlaskConical, Award, GitFork, Lightbulb } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);

  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Sarabun',sans-serif] selection:bg-indigo-500 selection:text-white antialiased">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        progress={progress}
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenCertificate={() => setCertModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <HeroSection
              onStartLearning={() => handleTabChange('lessons')}
              onGoToLabs={() => handleTabChange('labs')}
              onGoToQuiz={() => handleTabChange('quiz')}
              onGoToCps={() => handleTabChange('cps')}
              onOpenAbout={() => setAboutModalOpen(true)}
              progress={progress}
            />

            {/* Quick Preview of Curriculum & Labs on Homepage */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
              
              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  onClick={() => handleTabChange('lessons')}
                  className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 hover:border-indigo-500/60 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg group-hover:text-indigo-300">
                    5 บทเรียนความฉลาดรู้ด้าน AI
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    เนื้อหาเข้มข้น จัดหมวดหมู่ชัดเจน พร้อมตัวอย่างสถานการณ์จริงและข้อควรจำ
                  </p>
                  <span className="text-xs font-semibold text-indigo-400 mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    เริ่มเรียนรู้ →
                  </span>
                </div>

                <div 
                  onClick={() => handleTabChange('labs')}
                  className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30 hover:border-cyan-500/60 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg group-hover:text-cyan-300">
                    3 ห้องแล็บฝึกปฏิบัติจริง
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    ทดลองวิเคราะห์ Prompt Studio, ตรวจจับข้อมูลส่วนบุคคล และสืบสวน AI หลอน
                  </p>
                  <span className="text-xs font-semibold text-cyan-400 mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    เข้าห้องทดลอง →
                  </span>
                </div>

                <div 
                  onClick={() => handleTabChange('quiz')}
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg group-hover:text-amber-300">
                    วัดระดับและรับเกียรติบัตร
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    แบบทดสอบ 10 ข้อ สอบผ่าน 70% สามารถออกใบประกาศนียบัตรพร้อมชื่อของตนเองได้ทันที
                  </p>
                  <span className="text-xs font-semibold text-amber-400 mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    ทำแบบทดสอบ →
                  </span>
                </div>
              </div>

              {/* Banner for CPS & Student Reference */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Creative Problem Solving (CPS) 5 ขั้นตอน</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    เรียนรู้กระบวนการแก้ปัญหาเชิงสร้างสรรค์ ผ่านการทำโครงงานจริง
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                    ถอดบทเรียนจากโครงงานของ นายเสฏฐวุฒิ เมืองพันธ์ (รหัส 670610231) 
                    ตั้งแต่การค้นหาความจริง ระบุปัญหา ค้นหาไอเดีย ผลิตสื่อด้วย AI Vibe Coding จนถึงการส่งมอบผลงาน
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => handleTabChange('cps')}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-purple-600/20"
                  >
                    สำรวจกรอบคิด CPS
                  </button>
                  <button
                    onClick={() => setAboutModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
                  >
                    เอกสารโครงงาน
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <LessonViewer
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onGoToLabs={() => handleTabChange('labs')}
            onGoToQuiz={() => handleTabChange('quiz')}
          />
        )}

        {activeTab === 'labs' && (
          <LabsHub
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioDilemmas
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {activeTab === 'cps' && (
          <CpsWorkflow />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
            onOpenCertificate={() => setCertModalOpen(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenAbout={() => setAboutModalOpen(true)}
        setActiveTab={handleTabChange}
      />

      {/* Printable Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        progress={progress}
      />

      {/* Project & Research Details Modal */}
      <AboutProjectModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />

    </div>
  );
}
