import React, { useRef } from 'react';
import { X, Award, Printer, Download, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { UserProgress } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  progress
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const recipientName = progress.studentName?.trim() || 'ผู้เรียนรู้ AI Literacy';
  const scorePercent = progress.quizScore ? Math.round((progress.quizScore / 10) * 100) : 100;
  
  // Format current Thai Buddhist date
  const today = new Date();
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const thaiDateString = `${today.getDate()} ${thaiMonths[today.getMonth()]} พ.ศ. ${today.getFullYear() + 543}`;
  const certId = `AILIT-CPS-${today.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
            <Award className="w-5 h-5 text-amber-400" />
            <span>เกียรติบัตรรับรองความฉลาดรู้ทางปัญญาประดิษฐ์ (AI Literacy E-Certificate)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ / บันทึกเป็น PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div className="p-4 sm:p-8 bg-slate-950 flex justify-center">
          
          <div 
            ref={certRef}
            className="w-full max-w-3xl bg-gradient-to-br from-amber-50/5 via-slate-900 to-indigo-950/20 p-8 sm:p-12 rounded-2xl border-4 border-amber-500/40 relative shadow-2xl text-center space-y-6"
            style={{ minHeight: '520px' }}
          >
            {/* Elegant Inner Border */}
            <div className="absolute inset-3 border border-amber-500/20 rounded-xl pointer-events-none" />

            {/* Corner Ornaments */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/60" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/60" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/60" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/60" />

            {/* Crest / Emblem */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20">
                <Sparkles className="w-9 h-9" />
              </div>
            </div>

            {/* Certificate Header */}
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-400/90 font-mono">
                CERTIFICATE OF ACHIEVEMENT & AI LITERACY
              </p>
              <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-white mt-1">
                เกียรติบัตรฉลาดรู้เท่าทันปัญญาประดิษฐ์
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                โครงการการผลิตสื่อมัลติมีเดียแอปพลิเคชันเพื่อการเรียนรู้ ด้วย AI Vibe Coding
              </p>
            </div>

            {/* Recipient Details */}
            <div className="py-2">
              <p className="text-xs text-slate-400">เกียรติบัตรฉบับนี้มอบให้แก่</p>
              <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-amber-300 mt-2 tracking-wide underline decoration-amber-500/40 underline-offset-8">
                {recipientName}
              </h3>
              {progress.studentId && progress.studentId !== '-' && (
                <p className="text-xs text-slate-400 mt-3 font-mono">
                  รหัสประจำตัว/สถาบัน: {progress.studentId}
                </p>
              )}
            </div>

            {/* Statement of Accomplishment */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              ได้ผ่านการเรียนรู้หลักสูตรความฉลาดรู้ด้านปัญญาประดิษฐ์ (AI Literacy) 
              การตรวจสอบความถูกต้องของข้อมูล (Fact-Checking) การปกป้องข้อมูลส่วนบุคคล (PDPA) 
              จริยธรรมในการใช้ AI และการเขียนคำสั่ง Prompt อย่างมีประสิทธิภาพ 
              ด้วยผลคะแนนประเมินร้อยละ <strong className="text-amber-400">{scorePercent}%</strong> ตามกระบวนการ CPS 5 ขั้นตอน
            </p>

            {/* Signatures & Verification Row */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 items-end gap-4 text-xs border-t border-slate-800">
              <div className="text-left">
                <span className="text-slate-500 block text-[10px]">วันที่อนุมัติผล</span>
                <span className="font-semibold text-slate-300 text-xs">{thaiDateString}</span>
              </div>

              <div className="text-center">
                <div className="inline-block p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono">
                  {certId}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">Verification Code</span>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-slate-500 block text-[10px]">ผู้พัฒนาสื่อการเรียนรู้</span>
                <span className="font-semibold text-slate-300 text-xs">นายเสฏฐวุฒิ เมืองพันธ์</span>
                <span className="text-[10px] text-indigo-400 block font-mono">รหัส นศ. 670610231</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer info */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 text-center text-xs text-slate-400">
          สามารถกดปุ่ม "พิมพ์ / บันทึกเป็น PDF" เพื่อเก็บเป็นหลักฐานการพัฒนาตนเอง หรือแนบในแฟ้มสะสมผลงาน (Portfolio)
        </div>

      </div>
    </div>
  );
};
