import { Badge } from '../types';

export const badgesList: Badge[] = [
  {
    id: 'badge-starter',
    name: 'AI Explorer',
    description: 'เริ่มก้าวแรกในการเรียนรู้ความฉลาดรู้ด้านปัญญาประดิษฐ์',
    icon: 'Compass',
    category: 'lesson'
  },
  {
    id: 'badge-fact-checker',
    name: 'นักสืบจับ AI หลอน',
    description: 'ผ่านการทดสอบในห้องแล็บตรวจสอบข้อเท็จจริง (Fact-Check Lab)',
    icon: 'FileSearch',
    category: 'lab'
  },
  {
    id: 'badge-privacy-guardian',
    name: 'ผู้พิทักษ์ข้อมูล PDPA',
    description: 'ผ่านการฝึกตรวจจับและทำ Data Masking ข้อมูลส่วนบุคคล',
    icon: 'ShieldCheck',
    category: 'lab'
  },
  {
    id: 'badge-master-prompter',
    name: 'จอมยุทธ์เขียน Prompt',
    description: 'สร้างสรรค์และประเมินคุณภาพคำสั่งใน Prompt Studio',
    icon: 'Sparkles',
    category: 'lab'
  },
  {
    id: 'badge-cps-creator',
    name: 'นักคิดสร้างสรรค์ CPS',
    description: 'เรียนรู้ครบกระบวนการแก้ปัญหาเชิงสร้างสรรค์ 5 ขั้นตอน',
    icon: 'Lightbulb',
    category: 'lesson'
  },
  {
    id: 'badge-certified-literate',
    name: 'Certified AI Literate 2024',
    description: 'สอบผ่านแบบทดสอบวัดระดับด้วยคะแนนเกิน 70% และได้รับเกียรติบัตร',
    icon: 'Award',
    category: 'master'
  }
];
