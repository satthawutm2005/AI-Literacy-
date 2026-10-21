import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  FlaskConical, 
  GitFork, 
  Award, 
  HelpCircle, 
  Menu, 
  X,
  Compass,
  GraduationCap
} from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: UserProgress;
  onOpenAbout: () => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onOpenAbout,
  onOpenCertificate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'หน้าแรก', fullLabel: 'หน้าแรก', icon: Compass },
    { id: 'lessons', label: 'บทเรียน', fullLabel: 'บทเรียน 5 บท', icon: BookOpen },
    { id: 'labs', label: 'ห้องแล็บ', fullLabel: 'ห้องแล็บฝึกปฏิบัติ', icon: FlaskConical },
    { id: 'scenarios', label: 'สถานการณ์', fullLabel: 'สถานการณ์จำลอง', icon: GitFork },
    { id: 'cps', label: 'กรอบคิด CPS', fullLabel: 'กรอบคิด CPS 5 ขั้น', icon: Sparkles },
    { id: 'quiz', label: 'แบบทดสอบ', fullLabel: 'แบบทดสอบ & เกียรติบัตร', icon: Award }
  ];

  const lessonsCount = progress.completedLessons.length;
  const badgesCount = progress.unlockedBadges.length;

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-30 blur group-hover:opacity-75 transition-opacity" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-indigo-300 transition-colors tracking-tight">
                  AI Literacy
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-md">
                  Vibe Coding
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden xl:block leading-none">
                ฉลาดรู้ทันปัญญาประดิษฐ์
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Bar with Balanced Proportions */}
          <nav className="hidden lg:flex items-center p-1 bg-slate-800/50 border border-slate-700/60 rounded-xl shadow-inner gap-0.5 xl:gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={item.fullLabel}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Actions & Badges */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {/* Lessons Progress Badge */}
            <div 
              onClick={() => handleNavClick('lessons')} 
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 cursor-pointer text-xs transition-colors"
              title="ความก้าวหน้าการเรียนรู้"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 hidden md:inline">บทเรียน</span>
              <span className="font-semibold text-emerald-400">{lessonsCount}/5</span>
            </div>

            {/* Certificate Button if passed */}
            {progress.quizPassed && (
              <button
                onClick={onOpenCertificate}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all"
                title="ดูเกียรติบัตรของคุณ"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden md:inline">เกียรติบัตร</span>
              </button>
            )}

            {/* About Project Button */}
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
              title="ข้อมูลผู้จัดทำและโครงงาน"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden xl:inline">โครงงาน</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Progress Pill */}
            <div 
              onClick={() => handleNavClick('lessons')} 
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-emerald-400">{lessonsCount}/5</span>
            </div>

            {progress.quizPassed && (
              <button
                onClick={onOpenCertificate}
                className="p-1.5 rounded-lg bg-amber-500 text-slate-950 shadow-sm"
                title="เกียรติบัตร"
              >
                <GraduationCap className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs text-slate-400">
            <span>เรียนจบแล้ว: {lessonsCount} จาก 5 บท</span>
            <span>เหรียญรางวัล: {badgesCount} ชิ้น</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 bg-slate-800/50 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.fullLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>ข้อมูลโครงการและการศึกษาค้นคว้า</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
