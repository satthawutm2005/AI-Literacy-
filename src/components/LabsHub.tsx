import React, { useState } from 'react';
import { Terminal, FileSearch, ShieldCheck, Sparkles } from 'lucide-react';
import { PromptStudio } from './PromptStudio';
import { FactCheckLab } from './FactCheckLab';
import { PrivacyDetective } from './PrivacyDetective';
import { UserProgress } from '../types';

interface LabsHubProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const LabsHub: React.FC<LabsHubProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [activeLab, setActiveLab] = useState<'prompt' | 'fact-check' | 'privacy'>('prompt');

  const labs = [
    {
      id: 'prompt',
      title: 'Prompt Studio (RTCF)',
      desc: 'สร้างและประเมินคุณภาพคำสั่ง',
      icon: Terminal,
      color: 'text-indigo-400',
      badgeId: 'badge-master-prompter',
      isCompleted: progress.completedLabs.includes('prompt-studio')
    },
    {
      id: 'fact-check',
      title: 'นักสืบจับ AI หลอน',
      desc: 'ตรวจอ้างอิงทิพย์ & Fact-Checking',
      icon: FileSearch,
      color: 'text-amber-400',
      badgeId: 'badge-fact-checker',
      isCompleted: progress.completedLabs.includes('fact-check')
    },
    {
      id: 'privacy',
      title: 'ผู้พิทักษ์ข้อมูล PDPA',
      desc: 'สแกนข้อมูลรั่วไหล & Data Masking',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      badgeId: 'badge-privacy-guardian',
      isCompleted: progress.completedLabs.includes('privacy-detective')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Labs Tab Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span>ห้องปฏิบัติการ AI Literacy (Interactive Practice Labs)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ลงมือฝึกปฏิบัติจริง 3 มิติ เพื่อสร้างทักษะที่นำไปใช้ได้จริงในห้องเรียนและการทำงาน
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {labs.map((lab) => {
            const Icon = lab.icon;
            const isActive = activeLab === lab.id;

            return (
              <button
                key={lab.id}
                onClick={() => setActiveLab(lab.id as any)}
                className={`flex flex-col sm:flex-row items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${lab.color}`} />
                <span className="line-clamp-1">{lab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Lab */}
      <div>
        {activeLab === 'prompt' && (
          <PromptStudio 
            progress={progress} 
            onUpdateProgress={onUpdateProgress} 
          />
        )}
        {activeLab === 'fact-check' && (
          <FactCheckLab 
            progress={progress} 
            onUpdateProgress={onUpdateProgress} 
          />
        )}
        {activeLab === 'privacy' && (
          <PrivacyDetective 
            progress={progress} 
            onUpdateProgress={onUpdateProgress} 
          />
        )}
      </div>

    </div>
  );
};
