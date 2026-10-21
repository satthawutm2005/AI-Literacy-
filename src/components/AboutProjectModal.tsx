import React from 'react';
import { X, Sparkles, BookOpen, ExternalLink, GraduationCap, Award, CheckCircle2, User, Layers } from 'lucide-react';
import { cpsProjectData } from '../data/cpsData';

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutProjectModal: React.FC<AboutProjectModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const references = [
    {
      title: 'ความฉลาดรู้ทางปัญญาประดิษฐ์ (AI Literacy)',
      source: 'Big Data Institute (BDI)',
      url: 'https://bdi.or.th/big-data-101/ai-literacy/'
    },
    {
      title: 'คู่มือการใช้ AI สำหรับครู นักเรียน โรงเรียนและผู้ปกครอง',
      source: 'กระทรวงศึกษาธิการ (MOE Thailand)',
      url: 'https://www.moe.go.th/'
    },
    {
      title: 'AI Literacy ทักษะสำคัญในยุคปัญญาประดิษฐ์',
      source: 'PDPA Thailand',
      url: 'https://pdpathailand.com/'
    },
    {
      title: 'ความฉลาดทางดิจิทัล (Digital Intelligence: DQ)',
      source: 'สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (Scimath)',
      url: 'https://www.scimath.org/'
    },
    {
      title: 'SU-MOOC แพลตฟอร์มการเรียนรู้ออนไลน์แบบเปิด',
      source: 'มหาวิทยาลัยศิลปากร',
      url: 'https://su-mooc.su.ac.th/moodle'
    },
    {
      title: 'THAI MOOC แพลตฟอร์มการศึกษาแบบเปิดเพื่อการเรียนรู้ตลอดชีวิต',
      source: 'กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม (อว.)',
      url: 'https://thaimooc.ac.th/'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>เกี่ยวกับโครงการและการศึกษาค้นคว้า</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Project Title & Author */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-500/30 space-y-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              โครงการการผลิตสื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้ ด้วย AI Vibe Coding
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              {cpsProjectData.topic}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <User className="w-4 h-4 text-indigo-400" />
                <span>ผู้จัดทำ: {cpsProjectData.creator.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>รหัสประจำตัวนักศึกษา: {cpsProjectData.creator.studentId}</span>
              </div>
            </div>
          </div>

          {/* Project Concept */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h4 className="font-heading font-semibold text-white text-base">
              1. แนวคิดและแรงบันดาลใจของโครงการ
            </h4>
            <p>
              ปัจจุบันปัญญาประดิษฐ์ (AI) เข้ามามีบทบาทในการเรียนและการทำงานของผู้เรียนอย่างรวดเร็ว ผู้เรียนจำนวนมากใช้ AI ช่วยค้นคว้าและเขียนงาน แต่ยังขาดทักษะในการตรวจสอบความถูกต้องของคำตอบ การปกป้องข้อมูลส่วนตัว และการใช้ AI อย่างมีจริยธรรม
            </p>
            <p>
              ผู้จัดทำจึงผลิตสื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้ เรื่อง AI Literacy (ความฉลาดรู้ด้านปัญญาประดิษฐ์) ด้วยแนวทาง AI Vibe Coding คือการสื่อสารกับ AI ด้วยภาษาธรรมชาติเพื่อสร้างแอปพลิเคชัน โดยให้ผู้เรียนได้เรียนรู้ผ่านกระบวนการแก้ปัญหาเชิงสร้างสรรค์ (CPS) 5 ขั้นตอน ภายในแอปพลิเคชันเดียว
            </p>
          </div>

          {/* CPS 5-Steps Summary */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h4 className="font-heading font-semibold text-white text-base">
              2. กระบวนการแก้ปัญหาเชิงสร้างสรรค์ (Creative Problem Solving: CPS)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-indigo-400 block mb-0.5">ขั้นที่ 1: การค้นหาความจริง (Fact Finding)</span>
                <span className="text-slate-400 text-xs">ศึกษาเอกสารวิชาการ แหล่งข้อมูล BDI, กระทรวงศึกษาธิการ, PDPA, Scimath</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-rose-400 block mb-0.5">ขั้นที่ 2: การค้นหาปัญหา (Problem Finding)</span>
                <span className="text-slate-400 text-xs">วิเคราะห์พฤติกรรมเสี่ยง 5 ประการของผู้เรียนและผลกระทบ</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400 block mb-0.5">ขั้นที่ 3: การค้นหาแนวคิด (Idea Finding)</span>
                <span className="text-slate-400 text-xs">กำหนดแนวคิดหลัก “ใช้ AI อย่างฉลาด ตรวจสอบก่อนเชื่อ และรับผิดชอบก่อนนำไปใช้”</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-0.5">ขั้นที่ 4: การค้นหาวิธีแก้ปัญหา (Solution Finding)</span>
                <span className="text-slate-400 text-xs">กระบวนการผลิตสื่อจริงด้วย AI Vibe Coding และการแก้ไขปัญหาระบบ</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 sm:col-span-2">
                <span className="font-bold text-emerald-400 block mb-0.5">ขั้นที่ 5: การค้นหาคำตอบที่เป็นที่ยอมรับ (Acceptance Finding)</span>
                <span className="text-slate-400 text-xs">ทดสอบการใช้งานจริงบนทุกอุปกรณ์ ส่งมอบสื่อการสอน และระบบเกียรติบัตรออนไลน์</span>
              </div>
            </div>
          </div>

          {/* Academic References */}
          <div className="space-y-3 pt-2">
            <h4 className="font-heading font-semibold text-white text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>3. แหล่งข้อมูลอ้างอิงทางวิชาการ (References)</span>
            </h4>
            <div className="space-y-2">
              {references.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-xs group"
                >
                  <div>
                    <span className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {ref.title}
                    </span>
                    <span className="text-slate-500 block mt-0.5">
                      {ref.source}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors flex-shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
