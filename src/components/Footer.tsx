import React from 'react';
import { Sparkles, BookOpen, ExternalLink, Heart, GraduationCap, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, setActiveTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Motto */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-white text-base">
                AI Literacy: ฉลาดรู้ทันปัญญาประดิษฐ์
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              โครงการการผลิตสื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้ ด้วยแนวทาง AI Vibe Coding 
              และกระบวนการแก้ปัญหาเชิงสร้างสรรค์ (CPS) 5 ขั้นตอน สำหรับนักเรียน นักศึกษา และครูผู้สอน
            </p>
            <div className="text-amber-400/90 font-medium text-xs pt-1">
              “ใช้ AI อย่างฉลาด • ตรวจสอบก่อนเชื่อ • รับผิดชอบก่อนนำไปใช้”
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider">
              แผนผังการเรียนรู้
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => { setActiveTab('lessons'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  5 บทเรียนหลักสูตร AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('labs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  ห้องแล็บฝึกปฏิบัติ 3 มิติ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('scenarios'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  สถานการณ์จำลองการตัดสินใจ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('cps'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  กรอบแนวคิด CPS 5 ขั้นตอน
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  แบบทดสอบและเกียรติบัตร
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic References */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider">
              แหล่งอ้างอิงเชิงวิชาการ
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a 
                  href="https://bdi.or.th/big-data-101/ai-literacy/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-indigo-400 flex items-center gap-1"
                >
                  <span>Big Data Institute (BDI)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.moe.go.th/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-indigo-400 flex items-center gap-1"
                >
                  <span>กระทรวงศึกษาธิการ</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://pdpathailand.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-indigo-400 flex items-center gap-1"
                >
                  <span>PDPA Thailand</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.scimath.org/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-indigo-400 flex items-center gap-1"
                >
                  <span>Scimath (สสวท.) DQ</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            ผู้จัดทำ: <strong className="text-slate-300 font-normal">นายเสฏฐวุฒิ เมืองพันธ์</strong> • รหัสประจำตัวนักศึกษา 670610231
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAbout}
              className="text-indigo-400 hover:underline"
            >
              อ่านเอกสารโครงงานฉบับย่อ
            </button>
            <span>•</span>
            <span>เพื่อการศึกษาและพัฒนาเยาวชนไทย</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
