import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  AlertOctagon, 
  Lightbulb, 
  Hammer, 
  CheckCheck, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  User,
  Layers,
  ArrowRight
} from 'lucide-react';
import { cpsProjectData } from '../data/cpsData';

export const CpsWorkflow: React.FC = () => {
  const [activeStepNumber, setActiveStepNumber] = useState(1);

  const currentStep = cpsProjectData.steps.find((s) => s.stepNumber === activeStepNumber) || cpsProjectData.steps[0];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return Search;
      case 'AlertOctagon': return AlertOctagon;
      case 'Lightbulb': return Lightbulb;
      case 'Hammer': return Hammer;
      case 'CheckCheck': return CheckCheck;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>กระบวนการคิดและแก้ปัญหาเชิงสร้างสรรค์ (CPS 5 ขั้นตอน)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Creative Problem Solving ร่วมกับ AI Vibe Coding
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            {cpsProjectData.concept}
          </p>
          <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm font-medium text-amber-300 inline-block">
            {cpsProjectData.coreMotto}
          </div>
        </div>
      </div>

      {/* 5-Step Stepper Interactive Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cpsProjectData.steps.map((step) => {
          const Icon = getStepIcon(step.icon);
          const isActive = step.stepNumber === activeStepNumber;

          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepNumber(step.stepNumber)}
              className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center text-white bg-gradient-to-br ${step.color}`}>
                    {step.stepNumber}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                </div>
                <h4 className="font-heading font-semibold text-xs sm:text-sm text-white line-clamp-1">
                  ขั้นที่ {step.stepNumber}: {step.stepNameTh}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {step.stepNameEn}
                </p>
              </div>
              <div className="mt-3 text-[10px] text-slate-500 line-clamp-1">
                {step.tagline}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Content Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        
        {/* Step Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${currentStep.color}`}>
                CPS STEP {currentStep.stepNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentStep.stepNameEn}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
              ขั้นที่ {currentStep.stepNumber}: {currentStep.stepNameTh}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {currentStep.description}
            </p>
          </div>
        </div>

        {/* Activities and Outcomes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column 1: Activities conducted */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>กิจกรรมในขั้นตอนนี้ (Action & Activities)</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {currentStep.activities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Findings & Results */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCheck className="w-4 h-4" />
              <span>ผลลัพธ์และข้อสรุปที่ได้ (Findings & Outcomes)</span>
            </h4>
            <div className="space-y-2.5">
              {currentStep.findingsOrOutcomes.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                  <span className="font-semibold text-emerald-300 block mb-0.5">
                    {item.label}
                  </span>
                  <span className="text-slate-300">
                    {item.details}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Project Reference Deep-dive Box */}
        <div className="p-5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>การประยุกต์ใช้ในโครงงาน: {currentStep.projectReference.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentStep.projectReference.description}
          </p>

          {currentStep.projectReference.sourceReferences && (
            <div className="pt-2 text-xs space-y-1">
              <span className="font-semibold text-slate-400">แหล่งข้อมูลอ้างอิง:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-300/80 pl-1">
                {currentStep.projectReference.sourceReferences.map((ref, rIdx) => (
                  <li key={rIdx}>{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Step Stepper navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveStepNumber(Math.max(1, activeStepNumber - 1))}
            disabled={activeStepNumber === 1}
            className="text-xs text-slate-400 hover:text-white disabled:opacity-40"
          >
            ← ขั้นก่อนหน้า
          </button>
          <button
            onClick={() => setActiveStepNumber(Math.min(5, activeStepNumber + 1))}
            disabled={activeStepNumber === 5}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>ขั้นถัดไป (Step {activeStepNumber + 1})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Troubleshooting Matrix: AI System Issues & Solutions */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-heading font-bold text-lg sm:text-xl text-white flex items-center gap-2">
          <Hammer className="w-5 h-5 text-indigo-400" />
          <span>ตารางแนวทางการแก้ปัญหาในระบบ AI (AI System Troubleshooting)</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          การทำงานกับ AI ด้วยแนวคิด Vibe Coding ผู้พัฒนาต้องพบเจอกับปัญหาและมีแนวทางการแก้ไขอย่างเป็นระบบ ดังนี้:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="p-3 font-semibold">ปัญหาที่พบหรืออาจพบ</th>
                <th className="p-3 font-semibold text-emerald-400">แนวทางการแก้ไข (Solution)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-medium text-rose-300">
                  AI สร้างเนื้อหาที่ไม่ถูกต้องหรือไม่ตรงกับวัตถุประสงค์
                </td>
                <td className="p-3">
                  ตรวจสอบข้อมูลจากแหล่งอ้างอิงที่น่าเชื่อถือ ปรับ Prompt ให้ระบุขอบเขตและข้อจำกัดที่ชัดเจน และแก้ไขเนื้อหาก่อนนำไปใช้
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-medium text-rose-300">
                  AI สร้างโค้ดที่ทำงานผิดพลาด (Syntax/Runtime Bug)
                </td>
                <td className="p-3">
                  แจ้งรายละเอียดข้อความ Error ให้ AI ช่วยวิเคราะห์ ทำความเข้าใจตรรกะ แก้ไขโค้ด และทดสอบการทำงานซ้ำ
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-medium text-rose-300">
                  ผลลัพธ์ที่ได้ไม่ตรงตามรูปแบบหรือสไตล์ที่ต้องการ
                </td>
                <td className="p-3">
                  เพิ่มรายละเอียดเกี่ยวกับโครงสร้าง สี รูปแบบการจัดวาง และองค์ประกอบของหน้าเว็บใน Prompt ให้เฉพาะเจาะจง
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-medium text-rose-300">
                  การแก้ไขส่วนหนึ่งส่งผลกระทบต่อส่วนอื่นของระบบ (Regression)
                </td>
                <td className="p-3">
                  ระบุส่วนที่ต้องการแก้ไขให้ชัดเจน กำหนดให้คงส่วนที่ทำงานได้ดีไว้ และทดสอบระบบหลังการแก้ไขทุกครั้ง
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3 font-medium text-rose-300">
                  เนื้อหามีจำนวนมากและเข้าใจยาก
                </td>
                <td className="p-3">
                  สรุปเนื้อหาเป็นหัวข้อย่อย ใช้ตัวอย่างสถานการณ์จริง และจัดลำดับเนื้อหาจากพื้นฐานไปสู่การประยุกต์ใช้
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
