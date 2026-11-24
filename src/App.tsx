import React, { useState, useEffect, useMemo, Component } from 'react';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Edit3,
  TrendingUp,
  Database,
  Users,
  GraduationCap,
  Calendar,
  Award,
  Plus,
  Trash2,
  Printer,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Trophy,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Save,
  Sparkles,
  Check,
  Pencil,
  X,
  Layers,
  Mail,
  KeyRound,
  ShieldCheck,
  Cloud,
  RefreshCw,
  Smartphone,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// ============================================================================
// 0. ERROR BOUNDARY (QABTE KHALADAADKA RUNTIME-KA)
// ============================================================================
class ErrorBoundary extends Component<any> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || 'Khalad ayaa ka dhacay socodsiinta koodhka.',
    };
  }

  componentDidCatch(error, info) {
    console.error('Runtime Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl border border-rose-200 shadow-lg p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Cillad Farsamo Ayaa Dhacday
            </h2>
            <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono break-words">
              {this.state.errorMessage}
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, errorMessage: '' })}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-sm font-bold transition-colors"
            >
              Isku Day Mar Kale
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// 1. XOGTA HORE U DIYAARSAN & ICON-KA APP-KA / WEBSITE-KA
// ============================================================================
const STORAGE_KEY = 'somali_school_exam_portal_v1';
const AUTH_SESSION_KEY = 'somali_school_exam_portal_unlocked_v1';
const PASSCODE_STORAGE_KEY = 'somali_school_exam_portal_passcode_v1';
const OTP_STATE_STORAGE_KEY = 'somali_school_exam_portal_otp_state_v1';
const EMAILJS_CONFIG_STORAGE_KEY = 'somali_school_exam_portal_emailjs_v1';
const SUPABASE_CONFIG_STORAGE_KEY = 'somali_school_exam_portal_supabase_v1';
const DEFAULT_PASSCODE = '2026';
const REGISTERED_EMAIL = 'farhaanmohamed943@gmail.com';
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://hlhfxzuuqmzpfybygyxh.supabase.co',
  anonKey: 'sb_publishable_c9Ym9T-ZZ-xmSygP1_efug_IPEtXkuv',
  rowId: 'main_school_portal',
};

const DEFAULT_EMAILJS_CONFIG = {
  serviceId: 'service_cabklr7',
  templateId: 'template_rvnfv8p',
  publicKey: '-u5ab7_OQa8aGl2Vj',
};

const RAW_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1E3A8A"/><stop offset="55%" stop-color="#1B365D"/><stop offset="100%" stop-color="#0B192F"/></linearGradient><linearGradient id="tl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2DD4BF"/><stop offset="100%" stop-color="#0D9488"/></linearGradient></defs><rect width="512" height="512" rx="116" fill="url(#bg)"/><polygon points="256,112 418,186 256,260 94,186" fill="#FFFFFF"/><polygon points="256,216 364,266 364,312 256,356 148,312 148,266" fill="#E2E8F0"/><line x1="382" y1="203" x2="382" y2="288" stroke="#F59E0B" stroke-width="10" stroke-linecap="round"/><circle cx="368" cy="356" r="54" fill="url(#tl)" stroke="#FFFFFF" stroke-width="6"/><text x="368" y="368" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="38" font-weight="900">A+</text><rect x="92" y="384" width="218" height="62" rx="18" fill="#0F2342" stroke="#2DD4BF" stroke-width="3"/><text x="201" y="423" text-anchor="middle" fill="#5EEAD4" font-family="sans-serif" font-size="25" font-weight="800">NATIIJO PRO</text></svg>`;

const APP_ICON_DATA_URI = `data:image/svg+xml;base64,${
  typeof btoa === 'function'
    ? btoa(unescape(encodeURIComponent(RAW_ICON_SVG)))
    : ''
}`;

const APP_ICON_SRC =
  APP_ICON_DATA_URI || `data:image/svg+xml;utf8,${encodeURIComponent(RAW_ICON_SVG)}`;

const DEFAULT_GRADE_6_SUBJECTS = [
  { id: 'sub_1', name: 'Cilmi Bulsho', maxScore: 40 },
  { id: 'sub_2', name: 'English', maxScore: 40 },
  { id: 'sub_3', name: 'Tiknoolajiyad', maxScore: 40 },
  { id: 'sub_4', name: 'Carabi', maxScore: 40 },
  { id: 'sub_5', name: 'Tarbiyo', maxScore: 40 },
  { id: 'sub_6', name: 'Xisaab', maxScore: 40 },
  { id: 'sub_7', name: 'Saynis', maxScore: 40 },
  { id: 'sub_8', name: 'Af-Soomaali', maxScore: 40 },
];

const DEFAULT_GRADE_5_SUBJECTS = [
  { id: 'g5_sub_1', name: 'Cilmi Bulsho', maxScore: 40 },
  { id: 'g5_sub_2', name: 'English', maxScore: 40 },
  { id: 'g5_sub_3', name: 'Tiknoolajiyad', maxScore: 40 },
  { id: 'g5_sub_4', name: 'Carabi', maxScore: 40 },
  { id: 'g5_sub_5', name: 'Tarbiyo', maxScore: 40 },
  { id: 'g5_sub_6', name: 'Xisaab', maxScore: 40 },
  { id: 'g5_sub_7', name: 'Saynis', maxScore: 40 },
  { id: 'g5_sub_8', name: 'Af-Soomaali', maxScore: 40 },
];

const INITIAL_DATA = {
  students: [
    { id: 'stu_ayuub', name: 'Ayuub', gender: 'Wiil', rollNo: 'ARD-001' },
    { id: 'stu_ayaan', name: 'Ayaan', gender: 'Gabar', rollNo: 'ARD-002' },
  ],
  grades: [
    {
      id: 'grade_6_2026',
      name: 'Fasalka 6aad - 2026',
      year: '2026',
      level: 6,
      subjects: DEFAULT_GRADE_6_SUBJECTS,
      exams: [
        { id: 'exam_bisha_1', name: 'Imtixaanka Bisha 1aad', order: 1 },
        { id: 'exam_bisha_2', name: 'Imtixaanka Bisha 2aad', order: 2 },
        { id: 'exam_dhexe', name: 'Imtixaanka Dhexe (Mid-Term)', order: 3 },
        { id: 'exam_final', name: 'Imtixaanka Ugu Dambeeya (Final)', order: 4 },
      ],
    },
    {
      id: 'grade_5_2025',
      name: 'Fasalka 5aad - 2025 (Hore)',
      year: '2025',
      level: 5,
      subjects: DEFAULT_GRADE_5_SUBJECTS,
      exams: [
        { id: 'g5_exam_final', name: 'Imtixaanka Ugu Dambeeya (Final)', order: 1 },
      ],
    },
  ],
  records: {
    grade_6_2026: {
      exam_bisha_1: {
        stu_ayuub: {
          sub_1: 37,
          sub_2: 20,
          sub_3: 30,
          sub_4: 34,
          sub_5: 32,
          sub_6: 31,
          sub_7: 29,
          sub_8: 35,
        },
        stu_ayaan: {
          sub_1: 37,
          sub_2: 34,
          sub_3: 34,
          sub_4: 34,
          sub_5: 32,
          sub_6: 33,
          sub_7: 35,
          sub_8: 36,
        },
      },
      exam_bisha_2: {
        stu_ayuub: {},
        stu_ayaan: {},
      },
      exam_dhexe: {
        stu_ayuub: {},
        stu_ayaan: {},
      },
      exam_final: {
        stu_ayuub: {},
        stu_ayaan: {},
      },
    },
    grade_5_2025: {
      g5_exam_final: {
        stu_ayuub: {
          g5_sub_1: 35,
          g5_sub_2: 24,
          g5_sub_3: 29,
          g5_sub_4: 33,
          g5_sub_5: 34,
          g5_sub_6: 28,
          g5_sub_7: 31,
          g5_sub_8: 36,
        },
        stu_ayaan: {
          g5_sub_1: 36,
          g5_sub_2: 35,
          g5_sub_3: 33,
          g5_sub_4: 35,
          g5_sub_5: 34,
          g5_sub_6: 32,
          g5_sub_7: 34,
          g5_sub_8: 37,
        },
      },
    },
  },
};

// Tirinta buundooyinka la geliyay si looga hortago in xog cusub la duugo
function countEnteredScoresInData(dataset) {
  if (!dataset || typeof dataset !== 'object' || !dataset.records) return 0;
  let total = 0;
  Object.values(dataset.records).forEach((gradeRecs) => {
    if (!gradeRecs || typeof gradeRecs !== 'object') return;
    Object.values(gradeRecs).forEach((examRecs) => {
      if (!examRecs || typeof examRecs !== 'object') return;
      Object.values(examRecs).forEach((stuScores) => {
        if (!stuScores || typeof stuScores !== 'object') return;
        Object.values(stuScores).forEach((val) => {
          if (val !== null && val !== undefined && val !== '' && !isNaN(Number(val))) {
            total += 1;
          }
        });
      });
    });
  });
  return total;
}

function mergePortalDatasets(localOrDefault, remoteData) {
  if (!remoteData || !Array.isArray(remoteData.students) || !Array.isArray(remoteData.grades)) {
    return localOrDefault;
  }
  const localCount = countEnteredScoresInData(localOrDefault);
  const remoteCount = countEnteredScoresInData(remoteData);

  if (remoteCount === 0 && localCount > 0) {
    return localOrDefault;
  }
  if (remoteCount < localCount) {
    return localOrDefault;
  }
  return remoteData;
}

// ============================================================================
// 2. XISAABINTA & QIIMEYNTA (GRADING & ANALYTICS HELPERS)
// ============================================================================
function calculateGradeInfo(score, maxScore) {
  if (score === null || score === undefined || score === '' || isNaN(Number(score))) {
    return {
      grade: '-',
      status: 'Wali Lama Galin',
      badgeClass: 'bg-slate-100 text-slate-500 border-slate-200',
      percentage: 0,
      hasScore: false,
    };
  }
  const pct = maxScore > 0 ? (Number(score) / maxScore) * 100 : 0;
  if (pct >= 90) {
    return {
      grade: 'A+',
      status: 'Aad u Sareeya',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      percentage: pct,
      hasScore: true,
    };
  }
  if (pct >= 80) {
    return {
      grade: 'A',
      status: 'Aad u Fiican',
      badgeClass: 'bg-teal-100 text-teal-800 border-teal-200',
      percentage: pct,
      hasScore: true,
    };
  }
  if (pct >= 70) {
    return {
      grade: 'B',
      status: 'Fiican',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      percentage: pct,
      hasScore: true,
    };
  }
  if (pct >= 60) {
    return {
      grade: 'C',
      status: 'Dhexdhexaad',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      percentage: pct,
      hasScore: true,
    };
  }
  if (pct >= 50) {
    return {
      grade: 'D',
      status: 'Wuu Baasay',
      badgeClass: 'bg-orange-100 text-orange-800 border-orange-200',
      percentage: pct,
      hasScore: true,
    };
  }
  return {
    grade: 'F',
    status: 'Dadaal Dheeraad ah',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
    percentage: pct,
    hasScore: true,
  };
}

function computeStudentExamStats(subjects, studentScores = {}) {
  let totalMaxAll = 0;
  let totalEarned = 0;
  let totalMaxTaken = 0;
  let takenCount = 0;
  let highestSubject = null;
  let lowestSubject = null;

  const subjectRows = subjects.map((sub, idx) => {
    const rawVal = studentScores ? studentScores[sub.id] : null;
    const hasScore =
      rawVal !== null && rawVal !== undefined && rawVal !== '' && !isNaN(Number(rawVal));
    const earned = hasScore ? Number(rawVal) : 0;
    const remaining = hasScore ? Math.max(0, sub.maxScore - earned) : sub.maxScore;
    const info = calculateGradeInfo(hasScore ? earned : null, sub.maxScore);

    totalMaxAll += sub.maxScore;
    if (hasScore) {
      totalEarned += earned;
      totalMaxTaken += sub.maxScore;
      takenCount += 1;

      if (!highestSubject || info.percentage > highestSubject.percentage) {
        highestSubject = {
          name: sub.name,
          score: earned,
          max: sub.maxScore,
          percentage: info.percentage,
        };
      }
      if (!lowestSubject || info.percentage < lowestSubject.percentage) {
        lowestSubject = {
          name: sub.name,
          score: earned,
          max: sub.maxScore,
          percentage: info.percentage,
        };
      }
    }

    return {
      index: idx + 1,
      id: sub.id,
      name: sub.name,
      maxScore: sub.maxScore,
      hasScore,
      earned: hasScore ? earned : null,
      remaining,
      percentage: info.percentage,
      grade: info.grade,
      status: info.status,
      badgeClass: info.badgeClass,
    };
  });

  const remainingAll = Math.max(0, totalMaxAll - totalEarned);
  const remainingTakenOnly = Math.max(0, totalMaxTaken - totalEarned);
  const percentageTakenOnly = totalMaxTaken > 0 ? (totalEarned / totalMaxTaken) * 100 : 0;
  const percentageAll = totalMaxAll > 0 ? (totalEarned / totalMaxAll) * 100 : 0;
  const avgPerTakenSubject = takenCount > 0 ? totalEarned / takenCount : 0;
  const overallTakenInfo = calculateGradeInfo(takenCount > 0 ? percentageTakenOnly : null, 100);

  return {
    subjectRows,
    totalSubjects: subjects.length,
    takenCount,
    unenteredCount: subjects.length - takenCount,
    totalMaxAll,
    totalMaxTaken,
    totalEarned,
    remainingAll,
    remainingTakenOnly,
    percentageTakenOnly,
    percentageAll,
    avgPerTakenSubject,
    highestSubject,
    lowestSubject,
    overallGrade: overallTakenInfo.grade,
    overallStatus: overallTakenInfo.status,
    overallBadgeClass: overallTakenInfo.badgeClass,
  };
}

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================
function NatiijadaPortalApp() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.students) && Array.isArray(parsed.grades)) {
          return countEnteredScoresInData(parsed) >= countEnteredScoresInData(INITIAL_DATA)
            ? parsed
            : mergePortalDatasets(INITIAL_DATA, parsed);
        }
      }
    } catch (e) {
      console.error('Error loading saved data:', e);
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }, [data]);

  // Ku xir Icon-ka Website-ka & PWA Manifest si app ahaan loogu degsado
  useEffect(() => {
    try {
      if (typeof document === 'undefined' || !document.head) return;

      const ensureLink = (rel, href, extraAttrs = {}) => {
        if (!href) return;
        let el = document.querySelector(`link[rel="${rel}"]`);
        if (!el) {
          el = document.createElement('link');
          el.setAttribute('rel', rel);
          document.head.appendChild(el);
        }
        el.setAttribute('href', href);
        Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
      };

      const ensureMeta = (name, content) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      document.title = 'Nidaamka Natiijada Ardayda';
      ensureMeta('theme-color', '#1B365D');
      ensureMeta('mobile-web-app-capable', 'yes');
      ensureMeta('apple-mobile-web-app-capable', 'yes');
      ensureMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
      ensureMeta('apple-mobile-web-app-title', 'Natiijada');

      ensureLink('icon', APP_ICON_SRC, { type: 'image/svg+xml' });
      ensureLink('apple-touch-icon', APP_ICON_SRC);

      const isRestrictedProtocol =
        typeof window !== 'undefined' &&
        window.location &&
        (window.location.protocol === 'about:' ||
          window.location.protocol === 'data:' ||
          window.location.protocol === 'blob:');

      if (!isRestrictedProtocol && typeof Blob === 'function' && URL?.createObjectURL) {
        const dynamicManifest = {
          name: 'Nidaamka Natiijada Ardayda',
          short_name: 'Natiijada',
          description: 'Nidaamka Natiijada, Isbarbardhiga & Kaarka Imtixaanka Ardayda',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait-primary',
          background_color: '#f8fafc',
          theme_color: '#1B365D',
          icons: [
            {
              src: APP_ICON_SRC,
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        };
        const blob = new Blob([JSON.stringify(dynamicManifest)], {
          type: 'application/manifest+json',
        });
        const manifestUrl = URL.createObjectURL(blob);
        ensureLink('manifest', manifestUrl);
      }
    } catch {
      // Ignore sandbox DOM restrictions
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !(window as any).html2pdf && document?.body) {
        const script = document.createElement('script');
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.async = true;
        document.body.appendChild(script);
      }
    } catch {
      // Ignore script errors in sandbox
    }
  }, []);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedGradeId, setSelectedGradeId] = useState('grade_6_2026');
  const [selectedExamId, setSelectedExamId] = useState('exam_bisha_1');
  const [selectedStudentId, setSelectedStudentId] = useState('stu_ayuub');
  const [toastMessage, setToastMessage] = useState(null);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsAppInstalled(true);
      }
    } catch {
      // Ignore
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
    };
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredInstallPrompt(null);
      showToast('App-ka Natiijada si guul leh ayaa loogu rakibay taleefankaaga!');
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallAppClick = async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice?.outcome === 'accepted') {
        setDeferredInstallPrompt(null);
      }
      return;
    }
    const isIOS =
      typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      showToast(
        'iPhone/Safari: Taabo badhanka Share (fallaarta kor u baxda) -> dooro "Add to Home Screen".'
      );
    } else {
      showToast(
        'Browser-kaaga (⋮) ka dooro "Install app" ama "Add to Home screen" si aad app ahaan ugu degsato.'
      );
    }
  };

  const [passcode, setPasscode] = useState(() => {
    try {
      return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_PASSCODE;
    } catch {
      return DEFAULT_PASSCODE;
    }
  });

  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(SUPABASE_CONFIG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          url: parsed.url || DEFAULT_SUPABASE_CONFIG.url,
          anonKey: parsed.anonKey || DEFAULT_SUPABASE_CONFIG.anonKey,
          rowId: parsed.rowId || DEFAULT_SUPABASE_CONFIG.rowId,
        };
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_SUPABASE_CONFIG;
  });

  const [cloudStatus, setCloudStatus] = useState('syncing');
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [isInitialCloudFetchDone, setIsInitialCloudFetchDone] = useState(false);

  const pushStateToSupabase = async (nextData, nextPasscode, cfg = supabaseConfig) => {
    const cleanUrl = (cfg?.url || '').trim().replace(/\/+$/, '');
    const cleanKey = (cfg?.anonKey || '').trim();
    const rowId = (cfg?.rowId || 'main_school_portal').trim();
    if (!cleanUrl || !cleanKey) {
      setCloudStatus('offline');
      return false;
    }
    setCloudStatus('syncing');
    try {
      const res = await fetch(`${cleanUrl}/rest/v1/portal_state?on_conflict=id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cleanKey,
          Authorization: `Bearer ${cleanKey}`,
          Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify({
          id: rowId,
          payload: { data: nextData, passcode: nextPasscode },
          updated_at: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        setCloudStatus('offline');
        return false;
      }
      setCloudStatus('synced');
      setLastSyncedAt(new Date().toISOString());
      return true;
    } catch {
      setCloudStatus('offline');
      return false;
    }
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchInitialCloudState = async () => {
      const cleanUrl = (supabaseConfig?.url || '').trim().replace(/\/+$/, '');
      const cleanKey = (supabaseConfig?.anonKey || '').trim();
      const rowId = (supabaseConfig?.rowId || 'main_school_portal').trim();
      if (!cleanUrl || !cleanKey) {
        if (!isCancelled) {
          setCloudStatus('offline');
          setIsInitialCloudFetchDone(true);
        }
        return;
      }
      setCloudStatus('syncing');
      try {
        const res = await fetch(
          `${cleanUrl}/rest/v1/portal_state?id=eq.${encodeURIComponent(rowId)}&select=payload,updated_at`,
          {
            method: 'GET',
            headers: {
              apikey: cleanKey,
              Authorization: `Bearer ${cleanKey}`,
            },
          }
        );
        if (!res.ok) {
          if (!isCancelled) {
            setCloudStatus('offline');
            setIsInitialCloudFetchDone(true);
          }
          return;
        }
        const rows = await res.json();
        if (!isCancelled) {
          if (Array.isArray(rows) && rows.length > 0 && rows[0]?.payload?.data) {
            const remoteData = rows[0].payload.data;
            const remotePass = rows[0].payload.passcode;
            let resolvedPass = passcode;
            if (remotePass && String(remotePass).trim().length >= 4) {
              resolvedPass = String(remotePass).trim();
              setPasscode(resolvedPass);
              try {
                localStorage.setItem(PASSCODE_STORAGE_KEY, resolvedPass);
              } catch {
                // Ignore
              }
            }
            setData((prevData) => {
              const merged = mergePortalDatasets(prevData, remoteData);
              if (countEnteredScoresInData(remoteData) < countEnteredScoresInData(merged)) {
                pushStateToSupabase(merged, resolvedPass, supabaseConfig);
              }
              return merged;
            });
            setCloudStatus('synced');
            setLastSyncedAt(rows[0].updated_at || new Date().toISOString());
          } else {
            setData((prevData) => {
              pushStateToSupabase(prevData, passcode, supabaseConfig);
              return prevData;
            });
          }
          setIsInitialCloudFetchDone(true);
        }
      } catch {
        if (!isCancelled) {
          setCloudStatus('offline');
          setIsInitialCloudFetchDone(true);
        }
      }
    };
    fetchInitialCloudState();
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabaseConfig]);

  useEffect(() => {
    if (!isInitialCloudFetchDone) return;
    const timer = setTimeout(() => {
      pushStateToSupabase(data, passcode, supabaseConfig);
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, passcode, isInitialCloudFetchDone]);

  const handleManualSyncNow = async () => {
    const ok = await pushStateToSupabase(data, passcode, supabaseConfig);
    if (ok) {
      showToast('Xogtaada si guul leh ayaa loogu kaydiyay Supabase Cloud!');
    } else {
      showToast('Laguma xiriirin karo Supabase Cloud. Hubi internet-kaaga.', 'error');
    }
  };

  const handleSaveSupabaseConfig = (cfg) => {
    const clean = {
      url: (cfg.url || '').trim(),
      anonKey: (cfg.anonKey || '').trim(),
      rowId: (cfg.rowId || 'main_school_portal').trim(),
    };
    setSupabaseConfig(clean);
    try {
      localStorage.setItem(SUPABASE_CONFIG_STORAGE_KEY, JSON.stringify(clean));
    } catch {
      // Ignore storage errors
    }
    showToast('Furayaasha Supabase Cloud waa la kaydiyay!');
  };

  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [otpFeedback, setOtpFeedback] = useState(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [otpPageActive, setOtpPageActive] = useState(false);
  const [forgotOtpInput, setForgotOtpInput] = useState('');
  const [forgotNewPassInput, setForgotNewPassInput] = useState('');

  const [emailJsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(EMAILJS_CONFIG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          serviceId: parsed.serviceId || DEFAULT_EMAILJS_CONFIG.serviceId,
          templateId: parsed.templateId || DEFAULT_EMAILJS_CONFIG.templateId,
          publicKey: parsed.publicKey || DEFAULT_EMAILJS_CONFIG.publicKey,
        };
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_EMAILJS_CONFIG;
  });

  const hashOtpCode = async (code) => {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof TextEncoder !== 'undefined') {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(`${code}:${REGISTERED_EMAIL}:otp_salt_v1`);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
    const str = `${code}:${REGISTERED_EMAIL}:otp_salt_v1`;
    let h1 = 0x811c9dc5;
    let h2 = 0x01000193;
    for (let i = 0; i < str.length; i += 1) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 0x01000193);
      h2 = Math.imul(h2 ^ ch, 0x85ebca6b);
    }
    return `${(h1 >>> 0).toString(16).padStart(8, '0')}${(h2 >>> 0)
      .toString(16)
      .padStart(8, '0')}`;
  };

  const readStoredOtpState = () => {
    try {
      const raw = sessionStorage.getItem(OTP_STATE_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const writeStoredOtpState = (otpObj) => {
    try {
      if (otpObj) {
        sessionStorage.setItem(OTP_STATE_STORAGE_KEY, JSON.stringify(otpObj));
      } else {
        sessionStorage.removeItem(OTP_STATE_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  };

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    if (loginInput.trim() === passcode) {
      setIsUnlocked(true);
      setLoginError('');
      setLoginInput('');
      setForgotMode(false);
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      } catch {
        // Ignore storage errors
      }
      showToast('Si guul leh ayaad u gashay nidaamka!');
    } else {
      setLoginError('Password-ka aad gelisay waa khalad. Fadlan mar kale isku day.');
    }
  };

  const handleRequestPasscodeOtp = async () => {
    if (isSendingOtp) return;
    setIsSendingOtp(true);
    setOtpFeedback(null);
    try {
      const randomArr = new Uint32Array(1);
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(randomArr);
      } else {
        randomArr[0] = Math.floor(Math.random() * 900000);
      }
      const generatedOtp = String(100000 + (randomArr[0] % 900000));
      const codeHash = await hashOtpCode(generatedOtp);
      const expiresAt = Date.now() + OTP_TTL_MS;

      const otpPayload = {
        email: REGISTERED_EMAIL,
        codeHash,
        expiresAt,
        attempts: 0,
      };
      writeStoredOtpState(otpPayload);

      const serviceId = emailJsConfig.serviceId || DEFAULT_EMAILJS_CONFIG.serviceId;
      const templateId = emailJsConfig.templateId || DEFAULT_EMAILJS_CONFIG.templateId;
      const publicKey = emailJsConfig.publicKey || DEFAULT_EMAILJS_CONFIG.publicKey;
      const hasEmailJs = Boolean(serviceId && templateId && publicKey);

      let deliveredViaServerOrEmailJs = false;

      if (hasEmailJs) {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_email: REGISTERED_EMAIL,
              email: REGISTERED_EMAIL,
              otp_code: generatedOtp,
              expires_minutes: '5',
              app_name: 'Nidaamka Natiijada Ardayda',
            },
          }),
        });

        if (!res.ok) {
          throw new Error('EmailJS failed');
        }
        deliveredViaServerOrEmailJs = true;
      } else {
        try {
          const apiRes = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: REGISTERED_EMAIL,
              otpCode: generatedOtp,
            }),
          });
          if (apiRes.ok) {
            deliveredViaServerOrEmailJs = true;
          }
        } catch {
          deliveredViaServerOrEmailJs = false;
        }
      }

      setOtpPageActive(true);

      if (!deliveredViaServerOrEmailJs) {
        const errMsg = `Dirista OTP-ga ee ${REGISTERED_EMAIL} way fashilantay. Hubi furayaasha EmailJS ama Gmail App Password.`;
        setOtpFeedback({ type: 'error', text: errMsg });
        showToast(`OTP-ga looma diri karin ${REGISTERED_EMAIL} hadda.`, 'error');
        return;
      }

      const okMsg = `Koodhka xaqiijinta ee 6-da lambar ah waxaa si toos ah loogu diray Gmail-ka ${REGISTERED_EMAIL}. Hubi Inbox-ka ama Spam-ka.`;
      setOtpFeedback({ type: 'success', text: okMsg });
      showToast(`Koodhka xaqiijinta waxaa loo diray ${REGISTERED_EMAIL}!`);
    } catch {
      setOtpPageActive(true);
      const errMsg = `Email-ka lama xaqiijin karo hadda. Hubi furayaasha EmailJS ama Gmail App Password.`;
      showToast(`Waxaa laguu furay bogga OTP-ga ee ${REGISTERED_EMAIL}.`, 'error');
      setOtpFeedback({ type: 'error', text: errMsg });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyAndChangePasscode = async (enteredOtp, newCode) => {
    const cleanCode = (newCode || '').trim();
    const cleanOtp = (enteredOtp || '').trim();
    const storedOtp = readStoredOtpState();

    if (!cleanOtp) {
      const msg = 'Fadlan geli koodhka OTP-ga ee 6-da lambar ah.';
      setOtpFeedback({ type: 'error', text: msg });
      showToast(msg, 'error');
      return false;
    }

    if (!cleanCode) {
      const msg = 'Fadlan geli password-ka cusub.';
      setOtpFeedback({ type: 'error', text: msg });
      showToast(msg, 'error');
      return false;
    }

    if (cleanCode.length < 4) {
      const msg = 'Password-ku waa inuu ka koobnaadaa ugu yaraan 4 xaraf ama tiro.';
      setOtpFeedback({ type: 'error', text: msg });
      showToast(msg, 'error');
      return false;
    }

    if (!storedOtp || storedOtp.email !== REGISTERED_EMAIL) {
      const msg = `Koodh OTP ah lama dirin. Fadlan marka hore taabo "Dir Koodhka" si loogu diro ${REGISTERED_EMAIL}.`;
      setOtpFeedback({ type: 'error', text: msg });
      showToast(msg, 'error');
      return false;
    }

    if (Date.now() > storedOtp.expiresAt) {
      writeStoredOtpState(null);
      const msg = 'Koodhka xaqiijinta waqtigiisii wuu dhacay (5 daqiiqo). Mar kale taabo "Dir Koodhka".';
      setOtpFeedback({ type: 'error', text: msg });
      showToast(msg, 'error');
      return false;
    }

    if (storedOtp.attempts >= MAX_OTP_ATTEMPTS) {
      writeStoredOtpState(null);
      const msg = 'Waa laga badbadshay isku-dayga koodhka. Mar kale taabo "Dir Koodhka".';
      setOtpFeedback({ type: 'error', text: msg });
      showToast(msg, 'error');
      return false;
    }

    const enteredHash = await hashOtpCode(cleanOtp);
    if (enteredHash !== storedOtp.codeHash) {
      const nextAttempts = storedOtp.attempts + 1;
      const remainingAttempts = MAX_OTP_ATTEMPTS - nextAttempts;
      if (remainingAttempts <= 0) {
        writeStoredOtpState(null);
        const msg = 'Koodhka OTP-ga waa khalad (0 isku-day ayaa haray). Mar kale dir koodhka.';
        setOtpFeedback({ type: 'error', text: msg });
        showToast(msg, 'error');
      } else {
        writeStoredOtpState({ ...storedOtp, attempts: nextAttempts });
        const msg = `Koodhka OTP-ga waa khalad! Waxaa kuu haray ${remainingAttempts} isku-day.`;
        setOtpFeedback({ type: 'error', text: msg });
        showToast(msg, 'error');
      }
      return false;
    }

    setPasscode(cleanCode);
    writeStoredOtpState(null);
    try {
      localStorage.setItem(PASSCODE_STORAGE_KEY, cleanCode);
    } catch {
      // Ignore storage errors
    }
    const okMsg =
      'Waa sax! Koodhka OTP-ga waa la xaqiijiyay, password-ka cusubna si guul leh ayaa loo kaydiyay.';
    setOtpFeedback({ type: 'success', text: okMsg });
    showToast('Password-ka cusub si guul leh ayaa loo beddelay!');
    setOtpPageActive(false);
    return true;
  };

  const handleDownloadPDF = (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) {
      window.print();
      return;
    }
    if ((window as any).html2pdf) {
      showToast('Faylka PDF-ka waa la diyaarinayaa, fadlan sug...');
      element.classList.add('pdf-export-mode');
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          ignoreElements: (el) =>
            el.classList?.contains('no-print') ||
            el.classList?.contains('pdf-hide') ||
            el.tagName === 'BUTTON',
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };
      (window as any)
        .html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          element.classList.remove('pdf-export-mode');
          showToast(`Faylka "${filename}.pdf" si guul leh ayaa loo soo dejiyay!`);
        })
        .catch(() => {
          element.classList.remove('pdf-export-mode');
          window.print();
        });
    } else {
      window.print();
    }
  };

  const currentGrade = useMemo(() => {
    return data.grades.find((g) => g.id === selectedGradeId) || data.grades[0];
  }, [data.grades, selectedGradeId]);

  useEffect(() => {
    if (currentGrade && currentGrade.id !== selectedGradeId) {
      setSelectedGradeId(currentGrade.id);
    }
  }, [currentGrade, selectedGradeId]);

  const currentExam = useMemo(() => {
    if (!currentGrade) return null;
    return currentGrade.exams.find((e) => e.id === selectedExamId) || currentGrade.exams[0];
  }, [currentGrade, selectedExamId]);

  useEffect(() => {
    if (currentExam && currentExam.id !== selectedExamId) {
      setSelectedExamId(currentExam.id);
    }
  }, [currentExam, selectedExamId]);

  const currentStudent = useMemo(() => {
    return data.students.find((s) => s.id === selectedStudentId) || data.students[0];
  }, [data.students, selectedStudentId]);

  useEffect(() => {
    if (currentStudent && currentStudent.id !== selectedStudentId) {
      setSelectedStudentId(currentStudent.id);
    }
  }, [currentStudent, selectedStudentId]);

  const allStudentsExamStats = useMemo(() => {
    if (!currentGrade || !currentExam) return [];
    const examRecords = data.records?.[currentGrade.id]?.[currentExam.id] || {};
    return data.students.map((stu) => {
      const stats = computeStudentExamStats(currentGrade.subjects, examRecords[stu.id] || {});
      return {
        student: stu,
        stats,
      };
    });
  }, [data, currentGrade, currentExam]);

  const handleUpdateScore = (gradeId, examId, studentId, subjectId, rawValue) => {
    const grade = data.grades.find((g) => g.id === gradeId);
    const subject = grade?.subjects.find((s) => s.id === subjectId);
    const maxAllowed = subject ? subject.maxScore : 100;

    let cleanVal = null;
    if (rawValue !== '' && rawValue !== null && rawValue !== undefined) {
      const num = Number(rawValue);
      if (!isNaN(num)) {
        cleanVal = Math.max(0, Math.min(maxAllowed, num));
      }
    }

    setData((prev) => ({
      ...prev,
      records: {
        ...prev.records,
        [gradeId]: {
          ...(prev.records[gradeId] || {}),
          [examId]: {
            ...(prev.records[gradeId]?.[examId] || {}),
            [studentId]: {
              ...(prev.records[gradeId]?.[examId]?.[studentId] || {}),
              [subjectId]: cleanVal,
            },
          },
        },
      },
    }));
  };

  const handleAddStudent = (name, gender = 'Wiil') => {
    if (!name.trim()) return;
    const newId = 'stu_' + Date.now();
    const rollNo = 'ARD-' + String(data.students.length + 1).padStart(3, '0');
    setData((prev) => ({
      ...prev,
      students: [...prev.students, { id: newId, name: name.trim(), gender, rollNo }],
    }));
    setSelectedStudentId(newId);
    showToast(`Ardayga "${name.trim()}" si guul leh ayaa loogu daray!`);
  };

  const handleDeleteStudent = (studentId) => {
    if (data.students.length <= 1) {
      showToast('Ugu yaraan hal arday waa inuu ku jiraa nidaamka.', 'error');
      return;
    }
    const target = data.students.find((s) => s.id === studentId);
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== studentId),
    }));
    showToast(`Ardayga "${target?.name}" waa la tirtiray.`);
  };

  const handleRenameStudent = (studentId, newName) => {
    if (!newName.trim()) return;
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) =>
        s.id === studentId ? { ...s, name: newName.trim() } : s
      ),
    }));
    showToast('Magaca ardayga waa la cusboonaysiiyay!');
  };

  const handleAddGrade = (gradeName, year, copySubjectsFromCurrent = true) => {
    if (!gradeName.trim()) return;
    const newGradeId = 'grade_' + Date.now();
    const baseSubjects =
      copySubjectsFromCurrent && currentGrade
        ? currentGrade.subjects.map((s, idx) => ({
            id: `${newGradeId}_sub_${idx + 1}`,
            name: s.name,
            maxScore: s.maxScore,
          }))
        : Array.from({ length: 8 }, (_, idx) => ({
            id: `${newGradeId}_sub_${idx + 1}`,
            name: `Maadada ${idx + 1}aad`,
            maxScore: 40,
          }));

    const defaultExams = [
      { id: `${newGradeId}_ex_1`, name: 'Imtixaanka Bisha 1aad', order: 1 },
      { id: `${newGradeId}_ex_2`, name: 'Imtixaanka Bisha 2aad', order: 2 },
      { id: `${newGradeId}_ex_3`, name: 'Imtixaanka Dhexe (Mid-Term)', order: 3 },
      { id: `${newGradeId}_ex_4`, name: 'Imtixaanka Ugu Dambeeya (Final)', order: 4 },
    ];

    setData((prev) => ({
      ...prev,
      grades: [
        ...prev.grades,
        {
          id: newGradeId,
          name: gradeName.trim(),
          year: year || '2026',
          level: prev.grades.length + 1,
          subjects: baseSubjects,
          exams: defaultExams,
        },
      ],
      records: {
        ...prev.records,
        [newGradeId]: {},
      },
    }));
    setSelectedGradeId(newGradeId);
    setSelectedExamId(defaultExams[0].id);
    showToast(`Fasalka "${gradeName.trim()}" waa la abuuray!`);
  };

  const handleUpdateGrade = (gradeId, newName, newYear) => {
    if (!newName.trim()) return;
    setData((prev) => ({
      ...prev,
      grades: prev.grades.map((g) =>
        g.id === gradeId
          ? { ...g, name: newName.trim(), year: newYear ? newYear.trim() : g.year }
          : g
      ),
    }));
    showToast('Magaca fasalka waa la cusboonaysiiyay!');
  };

  const handleDeleteGrade = (gradeId) => {
    if (data.grades.length <= 1) {
      showToast('Ugu yaraan hal fasal waa inuu ku jiraa nidaamka.', 'error');
      return;
    }
    const target = data.grades.find((g) => g.id === gradeId);
    setData((prev) => {
      const updatedRecords = { ...prev.records };
      delete updatedRecords[gradeId];
      return {
        ...prev,
        grades: prev.grades.filter((g) => g.id !== gradeId),
        records: updatedRecords,
      };
    });
    showToast(`Fasalka "${target?.name}" waa la tirtiray.`);
  };

  const handleAddExamToGrade = (gradeId, examName) => {
    if (!examName.trim()) return;
    const newExamId = 'exam_' + Date.now();
    setData((prev) => ({
      ...prev,
      grades: prev.grades.map((g) => {
        if (g.id !== gradeId) return g;
        return {
          ...g,
          exams: [
            ...g.exams,
            { id: newExamId, name: examName.trim(), order: g.exams.length + 1 },
          ],
        };
      }),
    }));
    setSelectedExamId(newExamId);
    showToast(`Imtixaanka "${examName.trim()}" waa lagu daray!`);
  };

  const handleRenameExam = (gradeId, examId, newExamName) => {
    if (!newExamName.trim()) return;
    setData((prev) => ({
      ...prev,
      grades: prev.grades.map((g) => {
        if (g.id !== gradeId) return g;
        return {
          ...g,
          exams: g.exams.map((ex) =>
            ex.id === examId ? { ...ex, name: newExamName.trim() } : ex
          ),
        };
      }),
    }));
    showToast('Magaca imtixaanka waa la beddelay!');
  };

  const handleDeleteExam = (gradeId, examId) => {
    const grade = data.grades.find((g) => g.id === gradeId);
    if (!grade || grade.exams.length <= 1) {
      showToast('Ugu yaraan hal imtixaan waa inuu ku jiraa fasalka.', 'error');
      return;
    }
    const target = grade.exams.find((ex) => ex.id === examId);
    setData((prev) => {
      const updatedGradeRecords = { ...(prev.records?.[gradeId] || {}) };
      delete updatedGradeRecords[examId];
      return {
        ...prev,
        grades: prev.grades.map((g) => {
          if (g.id !== gradeId) return g;
          return {
            ...g,
            exams: g.exams.filter((ex) => ex.id !== examId),
          };
        }),
        records: {
          ...prev.records,
          [gradeId]: updatedGradeRecords,
        },
      };
    });
    showToast(`Imtixaanka "${target?.name}" waa la tirtiray.`);
  };

  const handleUpdateSubject = (gradeId, subjectId, newName, newMaxScore) => {
    setData((prev) => ({
      ...prev,
      grades: prev.grades.map((g) => {
        if (g.id !== gradeId) return g;
        return {
          ...g,
          subjects: g.subjects.map((sub) => {
            if (sub.id !== subjectId) return sub;
            return {
              ...sub,
              name: newName !== undefined ? newName : sub.name,
              maxScore:
                newMaxScore !== undefined ? Math.max(1, Number(newMaxScore) || 40) : sub.maxScore,
            };
          }),
        };
      }),
    }));
  };

  const handleAddSubjectToGrade = (gradeId, subjectName, maxScore = 40) => {
    const newSubId = 'sub_' + Date.now();
    setData((prev) => ({
      ...prev,
      grades: prev.grades.map((g) => {
        if (g.id !== gradeId) return g;
        return {
          ...g,
          subjects: [
            ...g.subjects,
            {
              id: newSubId,
              name: subjectName.trim() || `Maadada ${g.subjects.length + 1}aad`,
              maxScore: Math.max(1, Number(maxScore) || 40),
            },
          ],
        };
      }),
    }));
    showToast('Maado cusub waa lagu daray fasalkan!');
  };

  const handleRemoveSubjectFromGrade = (gradeId, subjectId) => {
    setData((prev) => ({
      ...prev,
      grades: prev.grades.map((g) => {
        if (g.id !== gradeId) return g;
        if (g.subjects.length <= 1) return g;
        return {
          ...g,
          subjects: g.subjects.filter((s) => s.id !== subjectId),
        };
      }),
    }));
    showToast('Maadada waa laga saaray fasalka.');
  };

  const handleResetDemo = () => {
    setData(INITIAL_DATA);
    setSelectedGradeId('grade_6_2026');
    setSelectedExamId('exam_bisha_1');
    setSelectedStudentId('stu_ayuub');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    } catch {
      // Ignore
    }
    showToast('Xogtii asalka ahayd ee Ayuub iyo Ayaan dib ayaa loo soo celiyay!');
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Natiijada_Imtixaanka_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Faylka Backup-ka JSON waa la soo dejiyay!');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const rawResult = event.target?.result;
        if (typeof rawResult !== 'string') throw new Error('Faylka JSON lama akhrin karin.');
        const parsed = JSON.parse(rawResult);
        if (parsed && Array.isArray(parsed.students) && Array.isArray(parsed.grades)) {
          setData(parsed);
          showToast('Xogta cusub si guul leh ayaa loo soo geliyay!');
        } else {
          showToast('Faylkani ma ahan qaab sax ah.', 'error');
        }
      } catch {
        showToast('Khalad ayaa ka dhacay akhrinta faylka JSON.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isUnlocked) {
    if (otpPageActive) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="bg-[#1B365D] text-white p-6 text-center">
              <img
                src={APP_ICON_SRC}
                alt="Natiijada App Icon"
                className="w-14 h-14 rounded-2xl mx-auto mb-3 shadow-md border border-teal-400/40"
              />
              <h1 className="text-xl font-bold tracking-tight">Bogga Xaqiijinta OTP-ga</h1>
              <p className="text-xs text-slate-300 mt-1">
                Gmail-ka: <strong className="text-teal-300">{REGISTERED_EMAIL}</strong>
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-[#1B365D] uppercase tracking-wider">
                  Xaqiiji OTP & Beddel Password-ka
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setOtpPageActive(false);
                    setOtpFeedback(null);
                    setForgotOtpInput('');
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-[#1B365D]"
                >
                  Ku noqo
                </button>
              </div>

              {otpFeedback && (
                <div
                  className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold border flex items-start gap-2 ${
                    otpFeedback.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {otpFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{otpFeedback.text}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Geli OTP-ga (6 lambar)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Geli koodhka 6-da lambar..."
                  value={forgotOtpInput}
                  onChange={(e) => {
                    setForgotOtpInput(e.target.value);
                    if (otpFeedback) setOtpFeedback(null);
                  }}
                  className="w-full rounded-xl border-2 border-slate-300 focus:border-[#1B365D] px-3.5 py-2 text-sm font-mono font-bold focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password-ka Cusub
                </label>
                <input
                  type="password"
                  placeholder="Geli password-ka cusub..."
                  value={forgotNewPassInput}
                  onChange={(e) => {
                    setForgotNewPassInput(e.target.value);
                    if (otpFeedback) setOtpFeedback(null);
                  }}
                  className="w-full rounded-xl border-2 border-slate-300 focus:border-teal-600 px-3.5 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  disabled={isSendingOtp}
                  onClick={handleRequestPasscodeOtp}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shrink-0"
                >
                  {isSendingOtp ? 'Diraya...' : 'Dir Mar Kale'}
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await handleVerifyAndChangePasscode(
                      forgotOtpInput,
                      forgotNewPassInput
                    );
                    if (ok) {
                      setForgotOtpInput('');
                      setForgotNewPassInput('');
                      setOtpFeedback(null);
                      setForgotMode(false);
                    }
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-sm font-bold shadow-sm transition-colors"
                >
                  Xaqiiji & Kaydi Password-ka
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-[#1B365D] text-white p-6 text-center">
            <img
              src={APP_ICON_SRC}
              alt="Natiijada App Icon"
              className="w-14 h-14 rounded-2xl mx-auto mb-3 shadow-md border border-teal-400/40"
            />
            <h1 className="text-xl font-bold tracking-tight">Nidaamka Natiijada Ardayda</h1>
            <p className="text-xs text-slate-300 mt-1">
              Website-kan waa mid gaar ah — geli password-ka si aad u furto
            </p>
          </div>

          {!forgotMode ? (
            <form onSubmit={handleUnlockSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Geli Password-ka Sirta ah
                </label>
                <input
                  type="password"
                  value={loginInput}
                  onChange={(e) => {
                    setLoginInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Geli password-ka..."
                  className="w-full rounded-xl border-2 border-slate-300 focus:border-[#1B365D] focus:outline-none px-4 py-2.5 text-sm font-semibold text-slate-900"
                  autoFocus
                />
                {loginError && (
                  <p className="text-xs text-rose-600 font-medium mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-sm font-bold shadow-sm transition-colors"
              >
                Fur Nidaamka (Unlock)
              </button>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>{REGISTERED_EMAIL}</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(true);
                    setLoginError('');
                    setOtpFeedback(null);
                  }}
                  className="font-bold text-teal-700 hover:text-teal-800 underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-teal-600" />
                  <h2 className="text-sm font-bold text-[#1B365D]">
                    Beddel Password-ka (Gmail: {REGISTERED_EMAIL})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(false);
                    setForgotOtpInput('');
                    setForgotNewPassInput('');
                    setOtpFeedback(null);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-[#1B365D]"
                >
                  Ku noqo Galidda
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Password-ka Cusub
                </label>
                <input
                  type="password"
                  placeholder="Geli password-ka cusub..."
                  value={forgotNewPassInput}
                  onChange={(e) => {
                    setForgotNewPassInput(e.target.value);
                    if (otpFeedback) setOtpFeedback(null);
                  }}
                  className="w-full rounded-xl border-2 border-slate-300 focus:border-teal-600 px-3.5 py-2 text-sm focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  2. Dir Koodhka Gmail-ka ({REGISTERED_EMAIL})
                </label>
                <button
                  type="button"
                  disabled={isSendingOtp}
                  onClick={handleRequestPasscodeOtp}
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isSendingOtp ? 'Waa la dirayaa...' : 'Dir Koodhka'}</span>
                </button>
              </div>

              {otpFeedback && (
                <div
                  className={`rounded-xl px-3 py-2 text-xs font-semibold border ${
                    otpFeedback.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {otpFeedback.text}
                </div>
              )}

              <div className="space-y-2.5 pt-1 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    3. Geli OTP-ga Gmail-ka Kuugu Soo Dhacay
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Geli OTP-ga (6 lambar)..."
                    value={forgotOtpInput}
                    onChange={(e) => {
                      setForgotOtpInput(e.target.value);
                      if (otpFeedback) setOtpFeedback(null);
                    }}
                    className="w-full rounded-xl border-2 border-slate-300 focus:border-[#1B365D] px-3.5 py-2 text-sm font-mono font-bold focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const ok = await handleVerifyAndChangePasscode(
                      forgotOtpInput,
                      forgotNewPassInput
                    );
                    if (ok) {
                      setForgotOtpInput('');
                      setForgotNewPassInput('');
                      setOtpFeedback(null);
                      setForgotMode(false);
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-sm font-bold shadow-sm transition-colors"
                >
                  Xaqiiji & Kaydi Password-ka
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans print:bg-white">
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
        }
        .pdf-export-mode .no-print,
        .pdf-export-mode .pdf-hide,
        .pdf-export-mode button {
          display: none !important;
        }
        .pdf-export-mode .hidden.md\\:block {
          display: block !important;
        }
        .pdf-export-mode .md\\:hidden {
          display: none !important;
        }
        .pdf-export-mode {
          background: #ffffff !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
        .pdf-export-mode table {
          font-size: 11px !important;
        }
        .pdf-export-mode th,
        .pdf-export-mode td {
          padding-top: 6px !important;
          padding-bottom: 6px !important;
        }
        @media print {
          .no-print, .pdf-hide { display: none !important; }
          .print-only { display: block !important; }
          .hidden.md\\:block { display: block !important; }
          .md\\:hidden { display: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-card { box-shadow: none !important; border: 1px solid #cbd5e1 !important; }
        }
      `}</style>

      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-5 left-4 right-4 md:left-auto md:right-5 z-50 no-print animate-bounce flex justify-center md:justify-end pointer-events-none">
          <div
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs sm:text-sm font-medium max-w-md w-full md:w-auto ${
              toastMessage.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-[#1B365D] text-white border-teal-500'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
            )}
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      <header className="bg-[#1B365D] text-white shadow-md no-print sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 sm:py-3.5 gap-2.5 sm:gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <img
                  src={APP_ICON_SRC}
                  alt="Natiijada Icon"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-teal-400/40 shrink-0 shadow-xs"
                />
                <div className="min-w-0">
                  <h1 className="text-base sm:text-xl font-bold tracking-tight text-white leading-tight truncate">
                    Nidaamka Natiijada Ardayda
                  </h1>
                  <p className="text-[11px] sm:text-xs text-slate-300 truncate">
                    Xisaabin Otomaatig ah & Kaarka Imtixaanka
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleManualSyncNow}
                title="Guji si aad xogta ugu kaydiso Supabase Cloud hadda"
                className={`md:hidden flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold border shrink-0 transition-colors ${
                  cloudStatus === 'synced'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : cloudStatus === 'syncing'
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                    : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                }`}
              >
                <Cloud className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {cloudStatus === 'synced'
                    ? 'Online'
                    : cloudStatus === 'syncing'
                    ? 'Sync...'
                    : 'Offline'}
                </span>
              </button>

              {!isAppInstalled && (
                <button
                  type="button"
                  onClick={handleInstallAppClick}
                  className="md:hidden flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold bg-teal-500 hover:bg-teal-400 text-[#0f2342] shrink-0 shadow-xs transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span>Degso App</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 sm:gap-3">
              {!isAppInstalled && (
                <button
                  type="button"
                  onClick={handleInstallAppClick}
                  className="hidden md:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-400 text-[#0f2342] shadow-xs transition-colors"
                  title="Ku rakib website-kan sida App leh icon-kiisa"
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span>Degso App-ka</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleManualSyncNow}
                title="Guji si aad xogta ugu kaydiso Supabase Cloud hadda"
                className={`hidden md:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition-colors ${
                  cloudStatus === 'synced'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                    : cloudStatus === 'syncing'
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                    : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                }`}
              >
                <Cloud className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {cloudStatus === 'synced'
                    ? 'Online Cloud: Kaydsan'
                    : cloudStatus === 'syncing'
                    ? 'Kaydinaya...'
                    : 'Cloud Offline'}
                </span>
              </button>

              <div className="flex items-center gap-1.5 bg-[#132744] border border-slate-600/60 rounded-lg px-2.5 py-2 md:py-1.5 min-w-0">
                <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs text-slate-300 hidden lg:inline">Fasalka:</span>
                <select
                  value={currentGrade?.id || ''}
                  onChange={(e) => setSelectedGradeId(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer w-full truncate"
                >
                  {data.grades.map((g) => (
                    <option key={g.id} value={g.id} className="text-slate-900 bg-white">
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-[#132744] border border-slate-600/60 rounded-lg px-2.5 py-2 md:py-1.5 min-w-0">
                <BookOpen className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs text-slate-300 hidden lg:inline">Imtixaanka:</span>
                <select
                  value={currentExam?.id || ''}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer w-full truncate"
                >
                  {currentGrade?.exams.map((ex) => (
                    <option key={ex.id} value={ex.id} className="text-slate-900 bg-white">
                      {ex.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex overflow-x-auto gap-1 pt-1 pb-0 border-t border-slate-700/70 scrollbar-none">
            {[
              { id: 'dashboard', label: 'Dashboard & Isbarbardhig', icon: LayoutDashboard },
              { id: 'kaarka', label: 'Kaarka Natiijada (Excel)', icon: FileSpreadsheet },
              { id: 'entry', label: 'Geli Buundooyinka & Maamulka', icon: Edit3 },
              { id: 'progress', label: 'Horumarka & Sanadaha', icon: TrendingUp },
              { id: 'backup', label: 'Kaydinta Xogta (Backup)', icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-t-lg transition-all ${
                    isActive
                      ? 'bg-slate-50 text-[#1B365D] font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-8">
        {activeTab === 'dashboard' && (
          <ComparisonDashboardView
            currentGrade={currentGrade}
            currentExam={currentExam}
            allStudentsExamStats={allStudentsExamStats}
            onOpenKaarka={(stuId) => {
              setSelectedStudentId(stuId);
              setActiveTab('kaarka');
            }}
            onOpenEntry={() => setActiveTab('entry')}
            onDownloadPDF={handleDownloadPDF}
          />
        )}

        {activeTab === 'kaarka' && (
          <ReportCardKaarkaView
            students={data.students}
            currentStudent={currentStudent}
            setSelectedStudentId={setSelectedStudentId}
            currentGrade={currentGrade}
            currentExam={currentExam}
            allStudentsExamStats={allStudentsExamStats}
            onDownloadPDF={handleDownloadPDF}
          />
        )}

        {activeTab === 'entry' && (
          <DataEntryAndAdminView
            data={data}
            currentGrade={currentGrade}
            currentExam={currentExam}
            currentStudent={currentStudent}
            setSelectedStudentId={setSelectedStudentId}
            setSelectedGradeId={setSelectedGradeId}
            setSelectedExamId={setSelectedExamId}
            onUpdateScore={handleUpdateScore}
            onAddStudent={handleAddStudent}
            onRenameStudent={handleRenameStudent}
            onDeleteStudent={handleDeleteStudent}
            onAddGrade={handleAddGrade}
            onUpdateGrade={handleUpdateGrade}
            onDeleteGrade={handleDeleteGrade}
            onAddExam={handleAddExamToGrade}
            onRenameExam={handleRenameExam}
            onDeleteExam={handleDeleteExam}
            onUpdateSubject={handleUpdateSubject}
            onAddSubject={handleAddSubjectToGrade}
            onRemoveSubject={handleRemoveSubjectFromGrade}
            showToast={showToast}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressAndCrossYearView
            data={data}
            currentGrade={currentGrade}
            currentStudent={currentStudent}
            setSelectedStudentId={setSelectedStudentId}
          />
        )}

        {activeTab === 'backup' && (
          <BackupAndDeploymentView
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}
            onResetDemo={handleResetDemo}
            supabaseConfig={supabaseConfig}
            onSaveSupabaseConfig={handleSaveSupabaseConfig}
            cloudStatus={cloudStatus}
            lastSyncedAt={lastSyncedAt}
            onManualSyncNow={handleManualSyncNow}
          />
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] no-print pb-safe">
        <div className="grid grid-cols-5">
          {[
            { id: 'dashboard', shortLabel: 'Guud', icon: LayoutDashboard },
            { id: 'kaarka', shortLabel: 'Kaarka', icon: FileSpreadsheet },
            { id: 'entry', shortLabel: 'Buundo', icon: Edit3 },
            { id: 'progress', shortLabel: 'Sanado', icon: TrendingUp },
            { id: 'backup', shortLabel: 'Cloud', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`flex flex-col items-center justify-center py-2 px-1 gap-0.5 transition-colors relative ${
                  isActive ? 'text-[#1B365D] font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 inset-x-3 h-0.5 bg-teal-600 rounded-full" />
                )}
                <div
                  className={`p-1 rounded-lg transition-colors ${
                    isActive ? 'bg-teal-50 text-teal-600' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight leading-none">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <NatiijadaPortalApp />
    </ErrorBoundary>
  );
}

// ============================================================================
// TAB 1: DASHBOARD-KA GUUD & ISBARBARDHIGA (COMPARISON DASHBOARD)
// ============================================================================
function ComparisonDashboardView({
  currentGrade,
  currentExam,
  allStudentsExamStats,
  onOpenKaarka,
  onOpenEntry,
  onDownloadPDF,
}) {
  if (!currentGrade || !currentExam) return null;

  const rankedStudents = [...allStudentsExamStats].sort(
    (a, b) => b.stats.totalEarned - a.stats.totalEarned
  );
  const topStudent = rankedStudents[0];
  const secondStudent = rankedStudents[1];
  const pointDiff =
    topStudent && secondStudent
      ? topStudent.stats.totalEarned - secondStudent.stats.totalEarned
      : 0;

  const chartData = currentGrade.subjects.map((sub, idx) => {
    const row = {
      name: sub.name.length > 14 ? sub.name.slice(0, 13) + '…' : sub.name,
      fullName: sub.name,
      max: sub.maxScore,
    };
    allStudentsExamStats.forEach(({ student, stats }) => {
      const sRow = stats.subjectRows[idx];
      row[student.name] = sRow?.hasScore ? sRow.earned : 0;
    });
    return row;
  });

  const STUDENT_COLORS = ['#1B365D', '#0D9488', '#D97706', '#7C3AED', '#E11D48', '#2563EB'];

  return (
    <div id="dashboard-pdf-area" className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">
            <span>Isbarbardhiga Natiijada Imtixaanka</span>
            <span>•</span>
            <span>{currentGrade.name}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B365D]">{currentExam.name}</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Wadarta Guud:{' '}
            <strong className="text-slate-700">{currentGrade.subjects.length} Maado</strong> (
            {currentGrade.subjects.reduce((acc, s) => acc + s.maxScore, 0)} Buundo) — Hadda la
            galay:{' '}
            <strong className="text-teal-700">
              {topStudent?.stats.takenCount || 0} / {currentGrade.subjects.length} Maado
            </strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 no-print">
          <button
            onClick={() =>
              onDownloadPDF(
                'dashboard-pdf-area',
                `Natiijada_Guud_${currentGrade.name.replace(/\s+/g, '_')}_${currentExam.name.replace(/\s+/g, '_')}`
              )
            }
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>U Soo Saar PDF</span>
          </button>

          <button
            onClick={onOpenEntry}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-sm font-semibold shadow-sm transition-colors"
          >
            <Edit3 className="w-4 h-4 text-teal-300" />
            <span>Geli / Wax Ka Beddel Buundooyinka</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rankedStudents.map(({ student, stats }, rankIdx) => {
          const isLeader = rankIdx === 0 && stats.totalEarned > 0;
          return (
            <div
              key={student.id}
              className={`bg-white rounded-2xl p-5 border transition-all shadow-sm relative overflow-hidden ${
                isLeader ? 'border-teal-500 ring-1 ring-teal-500/30' : 'border-slate-200'
              }`}
            >
              {isLeader ? (
                <div className="absolute top-0 right-0 bg-teal-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Kaalinta 1aad</span>
                </div>
              ) : (
                <div className="absolute top-0 right-0 bg-slate-100 text-slate-600 text-[11px] font-semibold px-3 py-1 rounded-bl-xl">
                  Kaalinta {rankIdx + 1}aad
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg text-white ${
                    rankIdx === 0 ? 'bg-[#1B365D]' : 'bg-teal-600'
                  }`}
                >
                  {student.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{student.name}</h3>
                  <p className="text-xs text-slate-500">
                    {student.rollNo} • {stats.takenCount}/{stats.totalSubjects} Maado la galay
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="text-xs text-slate-500">Waxa La Haysto</div>
                  <div className="text-xl font-extrabold text-[#1B365D] mt-0.5">
                    {stats.totalEarned}{' '}
                    <span className="text-xs font-normal text-slate-400">
                      / {stats.totalMaxTaken > 0 ? stats.totalMaxTaken : stats.totalMaxAll}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Wadarta Guud: {stats.totalEarned}/{stats.totalMaxAll}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="text-xs text-slate-500">Celceliska (La Galay)</div>
                  <div className="text-xl font-extrabold text-teal-600 mt-0.5">
                    {stats.percentageTakenOnly.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Darajada: <strong className="text-slate-700">{stats.overallGrade}</strong>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">
                    Waxa ka dhiman maadooyinka la galay:{' '}
                    <strong className="text-rose-600">{stats.remainingTakenOnly}</strong>
                  </span>
                  <span className="text-slate-500">
                    Guud dhiman: <strong>{stats.remainingAll}</strong>
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, stats.percentageTakenOnly)}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => onOpenKaarka(student.id)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-[#1B365D] hover:bg-[#1B365D] hover:text-white text-xs font-semibold text-[#1B365D] transition-colors flex items-center justify-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Eeg Kaarka Natiijada {student.name}</span>
              </button>
            </div>
          );
        })}

        {rankedStudents.length >= 2 && (
          <div className="bg-gradient-to-br from-[#1B365D] to-[#0f2342] text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Xogta Isbarbardhiga</span>
              </div>
              <h3 className="text-lg font-bold">
                {pointDiff === 0
                  ? 'Way Siman Yihiin!'
                  : `${topStudent.student.name} ayaa ku horeeya +${pointDiff} buundo`}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {pointDiff === 0
                  ? `${topStudent.student.name} iyo ${secondStudent.student.name} waxay haystaan dhibco isku mid ah (${topStudent.stats.totalEarned}).`
                  : `${topStudent.student.name} wuxuu haystaa ${topStudent.stats.totalEarned} buundo (${topStudent.stats.percentageTakenOnly.toFixed(1)}%), halka ${secondStudent.student.name} uu haysto ${secondStudent.stats.totalEarned} buundo (${secondStudent.stats.percentageTakenOnly.toFixed(1)}%).`}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block">Farqiga Boqolleyda:</span>
                <span className="font-bold text-teal-300 text-sm">
                  +
                  {Math.abs(
                    topStudent.stats.percentageTakenOnly - secondStudent.stats.percentageTakenOnly
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Maadooyinka Dhiman:</span>
                <span className="font-bold text-amber-300 text-sm">
                  {topStudent.stats.unenteredCount} Maado
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-[#1B365D] text-white flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-bold text-sm sm:text-base">
            Shaxda Isbarbardhiga Maadooyinka — {currentGrade.name} ({currentExam.name})
          </h3>
          <span className="text-xs text-teal-300 font-medium">Xisaab Otomaatig ah</span>
        </div>

        <div className="md:hidden divide-y divide-slate-200">
          {currentGrade.subjects.map((sub, idx) => {
            const s0 = allStudentsExamStats[0]?.stats.subjectRows[idx];
            const s1 = allStudentsExamStats[1]?.stats.subjectRows[idx];
            const stu0Name = allStudentsExamStats[0]?.student.name;
            const stu1Name = allStudentsExamStats[1]?.student.name;

            let diffBadge = null;
            if (allStudentsExamStats.length === 2) {
              if (s0?.hasScore && s1?.hasScore) {
                const diff = s0.earned - s1.earned;
                if (diff === 0) {
                  diffBadge = (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                      Siman (0)
                    </span>
                  );
                } else if (diff > 0) {
                  diffBadge = (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#1B365D] border border-blue-200">
                      {stu0Name} (+{diff})
                    </span>
                  );
                } else {
                  diffBadge = (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                      {stu1Name} (+{Math.abs(diff)})
                    </span>
                  );
                }
              } else {
                diffBadge = (
                  <span className="text-[11px] text-slate-400 italic">Wali lama dhammaystirin</span>
                );
              }
            }

            return (
              <div key={sub.id} className="p-3.5 space-y-2.5 bg-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm text-slate-900 truncate">{sub.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                    Buuxda: {sub.maxScore}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {allStudentsExamStats.map(({ student, stats }) => {
                    const row = stats.subjectRows[idx];
                    const fullRemaining = Math.max(
                      0,
                      sub.maxScore - (row.hasScore ? row.earned : 0)
                    );
                    return (
                      <div
                        key={student.id}
                        className="rounded-xl bg-slate-50 border border-slate-200/80 p-2.5"
                      >
                        <div className="text-[11px] font-semibold text-slate-500 truncate">
                          {student.name}
                        </div>
                        <div className="flex items-baseline justify-between mt-0.5">
                          <span className="text-base font-extrabold text-[#1B365D]">
                            {row.hasScore ? row.earned : '—'}
                          </span>
                          <span className="text-[11px] font-semibold text-rose-600">
                            Dhiman: {fullRemaining}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {diffBadge && (
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-400">Isbarbardhig:</span>
                    {diffBadge}
                  </div>
                )}
              </div>
            );
          })}

          <div className="p-4 bg-[#1B365D] text-white space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Wadarta Guud ee Fasalka ({currentGrade.subjects.length} Maado)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {allStudentsExamStats.map(({ student, stats }) => {
                const allFullRem = Math.max(0, stats.totalMaxAll - stats.totalEarned);
                return (
                  <div
                    key={student.id}
                    className="rounded-xl bg-white/10 border border-white/15 p-2.5"
                  >
                    <div className="text-xs text-slate-200 font-semibold">{student.name}</div>
                    <div className="text-base font-extrabold text-teal-300 mt-0.5">
                      {stats.totalEarned} / {stats.totalMaxAll}
                    </div>
                    <div className="text-[11px] text-amber-300">
                      Dhiman: {allFullRem} • {stats.percentageTakenOnly.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-700 text-xs uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-12">No.</th>
                <th className="py-3 px-4">Maadada</th>
                {allStudentsExamStats.map(({ student }) => (
                  <React.Fragment key={student.id}>
                    <th className="py-3 px-3 text-center bg-slate-50 border-l border-slate-200 text-[#1B365D]">
                      {student.name} (Haysto)
                    </th>
                    <th className="py-3 px-3 text-center text-slate-500">
                      {student.name} (Dhiman)
                    </th>
                  </React.Fragment>
                ))}
                <th className="py-3 px-3 text-center border-l border-slate-200">
                  Buundada Buuxda
                </th>
                {allStudentsExamStats.length === 2 && (
                  <th className="py-3 px-4 text-center border-l border-slate-200">
                    Farqiga & Cidda Sareysa
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentGrade.subjects.map((sub, idx) => {
                const s0 = allStudentsExamStats[0]?.stats.subjectRows[idx];
                const s1 = allStudentsExamStats[1]?.stats.subjectRows[idx];
                const stu0Name = allStudentsExamStats[0]?.student.name;
                const stu1Name = allStudentsExamStats[1]?.student.name;

                let diffLabel = 'Wali lama galin';
                let diffTextColor = 'text-slate-400 font-normal italic';
                if (s0?.hasScore && s1?.hasScore) {
                  const diff = s0.earned - s1.earned;
                  if (diff === 0) {
                    diffLabel = 'Way Siman Yihiin (0)';
                    diffTextColor = 'text-slate-700 font-semibold';
                  } else if (diff > 0) {
                    diffLabel = `${stu0Name} (+${diff})`;
                    diffTextColor = 'text-[#1B365D] font-bold';
                  } else {
                    diffLabel = `${stu1Name} (+${Math.abs(diff)})`;
                    diffTextColor = 'text-teal-700 font-bold';
                  }
                } else if (s0?.hasScore || s1?.hasScore) {
                  diffLabel = 'Mid kaliya ayaa la galay';
                  diffTextColor = 'text-slate-500 font-medium';
                }

                return (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{sub.name}</td>

                    {allStudentsExamStats.map(({ student, stats }) => {
                      const row = stats.subjectRows[idx];
                      const fullRemaining = Math.max(
                        0,
                        sub.maxScore - (row.hasScore ? row.earned : 0)
                      );
                      return (
                        <React.Fragment key={student.id}>
                          <td className="py-3 px-3 text-center font-bold border-l border-slate-100">
                            {row.hasScore ? (
                              <span className="text-[#1B365D]">{row.earned}</span>
                            ) : (
                              <span className="text-slate-400 font-normal italic text-xs">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center text-xs text-slate-600 font-semibold">
                            <span
                              className={
                                row.hasScore && fullRemaining > 0
                                  ? 'text-rose-600'
                                  : 'text-slate-600'
                              }
                            >
                              {fullRemaining}
                            </span>
                          </td>
                        </React.Fragment>
                      );
                    })}

                    <td className="py-3 px-3 text-center font-medium text-slate-600 border-l border-slate-100">
                      {sub.maxScore}
                    </td>

                    {allStudentsExamStats.length === 2 && (
                      <td className="py-3 px-4 text-center border-l border-slate-100">
                        <span className={`text-xs ${diffTextColor}`}>{diffLabel}</span>
                      </td>
                    )}
                  </tr>
                );
              })}

              <tr className="bg-teal-50/70 font-bold border-t-2 border-teal-200 text-slate-900">
                <td className="py-3 px-4" colSpan={2}>
                  WADARTA MAADOOYINKA LA GALAY (HADDA)
                </td>
                {allStudentsExamStats.map(({ student, stats }) => {
                  const takenFullRem = Math.max(0, stats.totalMaxTaken - stats.totalEarned);
                  return (
                    <React.Fragment key={student.id}>
                      <td className="py-3 px-3 text-center text-[#1B365D] border-l border-teal-200">
                        {stats.totalEarned} ({stats.percentageTakenOnly.toFixed(1)}%)
                      </td>
                      <td className="py-3 px-3 text-center text-rose-700">{takenFullRem}</td>
                    </React.Fragment>
                  );
                })}
                <td className="py-3 px-3 text-center border-l border-teal-200">
                  {allStudentsExamStats[0]?.stats.totalMaxTaken || 0}
                </td>
                {allStudentsExamStats.length === 2 && (
                  <td className="py-3 px-4 text-center border-l border-teal-200 text-teal-900">
                    {pointDiff === 0 ? 'Siman' : `${topStudent.student.name} (+${pointDiff})`}
                  </td>
                )}
              </tr>

              <tr className="bg-[#1B365D] text-white font-bold">
                <td className="py-3.5 px-4" colSpan={2}>
                  WADARTA GUUD EE FASALKA ({currentGrade.subjects.length} MAADO)
                </td>
                {allStudentsExamStats.map(({ student, stats }) => {
                  const allFullRem = Math.max(0, stats.totalMaxAll - stats.totalEarned);
                  return (
                    <React.Fragment key={student.id}>
                      <td className="py-3.5 px-3 text-center text-teal-300 border-l border-slate-600">
                        {stats.totalEarned} ({stats.percentageAll.toFixed(1)}%)
                      </td>
                      <td className="py-3.5 px-3 text-center text-amber-300">{allFullRem}</td>
                    </React.Fragment>
                  );
                })}
                <td className="py-3.5 px-3 text-center border-l border-slate-600">
                  {allStudentsExamStats[0]?.stats.totalMaxAll || 0}
                </td>
                {allStudentsExamStats.length === 2 && (
                  <td className="py-3.5 px-4 text-center border-l border-slate-600 text-teal-300">
                    {pointDiff === 0 ? 'Siman' : `${topStudent.student.name} (+${pointDiff})`}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-base font-bold text-[#1B365D]">
              Jaantuska Isbarbardhiga Maadooyinka ({currentExam.name})
            </h3>
            <p className="text-xs text-slate-500">
              Isbarbardhig toos ah maado kasta iyo buundada arday walba keenay
            </p>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
              <YAxis domain={[0, 40]} tick={{ fontSize: 12, fill: '#475569' }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Legend />
              {allStudentsExamStats.map(({ student }, idx) => (
                <Bar
                  key={student.id}
                  dataKey={student.name}
                  fill={STUDENT_COLORS[idx % STUDENT_COLORS.length]}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={36}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: KAARKA NATIIJADA (REPORT CARD - EXCEL FORM STYLE)
// ============================================================================
function ReportCardKaarkaView({
  students,
  currentStudent,
  setSelectedStudentId,
  currentGrade,
  currentExam,
  allStudentsExamStats,
  onDownloadPDF,
}) {
  if (!currentGrade || !currentExam || !currentStudent) return null;

  const activeEntry = allStudentsExamStats.find((item) => item.student.id === currentStudent.id);
  const stats = activeEntry?.stats;
  if (!stats) return null;

  const sortedByScore = [...allStudentsExamStats].sort(
    (a, b) => b.stats.totalEarned - a.stats.totalEarned
  );
  const rank = sortedByScore.findIndex((item) => item.student.id === currentStudent.id) + 1;

  const kaarkaChartData = stats.subjectRows.map((row) => ({
    name: row.name.length > 12 ? row.name.slice(0, 11) + '…' : row.name,
    'Waxa La Haysto': row.hasScore ? row.earned : 0,
    'Waxa Dhiman': row.hasScore ? row.remaining : 0,
    'Wali Lama Galin': !row.hasScore ? row.maxScore : 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5 sm:pb-0">
          <span className="text-xs font-bold uppercase text-slate-500 mr-1 shrink-0">Ardayga:</span>
          {students.map((stu) => (
            <button
              key={stu.id}
              onClick={() => setSelectedStudentId(stu.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
                stu.id === currentStudent.id
                  ? 'bg-[#1B365D] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {stu.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
          <button
            onClick={() =>
              onDownloadPDF(
                'kaarka-pdf-card',
                `Kaarka_${currentStudent.name}_${currentGrade.name.replace(/\s+/g, '_')}_${currentExam.name.replace(/\s+/g, '_')}`
              )
            }
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 text-teal-300 shrink-0" />
            <span>Soo Saar PDF</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4 shrink-0" />
            <span>Daabac (Print)</span>
          </button>
        </div>
      </div>

      <div
        id="kaarka-pdf-card"
        className="bg-white rounded-2xl border-2 border-[#1B365D] shadow-md overflow-hidden print-card"
      >
        <div className="bg-[#1B365D] text-white p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-600/70 pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-teal-300 font-bold mb-1">
                KAARKA NATIIJADA IMTIXAANKA ARDAYGA
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {currentStudent.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-300 mt-1.5">
                <span>
                  Lambarka Ardayga: <strong className="text-white">{currentStudent.rollNo}</strong>
                </span>
                <span>•</span>
                <span>
                  Fasalka & Sanadka: <strong className="text-white">{currentGrade.name}</strong>
                </span>
                <span>•</span>
                <span>
                  Imtixaanka: <strong className="text-teal-300">{currentExam.name}</strong>
                </span>
              </div>
            </div>

            <div className="bg-[#132744] border border-teal-500/40 rounded-xl px-5 py-3 text-center shrink-0">
              <div className="text-[11px] uppercase tracking-wider text-slate-300">
                Kaalinta Fasalka
              </div>
              <div className="text-2xl font-black text-teal-300">
                {rank} <span className="text-sm font-normal text-slate-300">/ {students.length}</span>
              </div>
              <div className="text-xs font-semibold text-white mt-0.5">
                Darajada: {stats.overallGrade}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
              <div className="text-xs text-slate-300">Waxa La Haysto (Guud)</div>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                {stats.totalEarned}{' '}
                <span className="text-sm font-normal text-slate-300">/ {stats.totalMaxAll}</span>
              </div>
              <div className="text-[11px] text-teal-300 mt-0.5">
                Maadooyinka la galay: {stats.totalEarned} / {stats.totalMaxTaken}
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
              <div className="text-xs text-slate-300">Waxa Dhiman</div>
              <div className="text-2xl font-extrabold text-amber-300 mt-0.5">
                {stats.remainingTakenOnly}{' '}
                <span className="text-xs font-normal text-slate-300">(La galay)</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Guud ahaan dhiman: {stats.remainingAll} buundo
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
              <div className="text-xs text-slate-300">Boqolleyda (%)</div>
              <div className="text-2xl font-extrabold text-teal-300 mt-0.5">
                {stats.percentageTakenOnly.toFixed(1)}%
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Boqolleyda guud: {stats.percentageAll.toFixed(1)}%
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
              <div className="text-xs text-slate-300">Maadooyinka La Galay</div>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                {stats.takenCount}{' '}
                <span className="text-sm font-normal text-slate-300">/ {stats.totalSubjects}</span>
              </div>
              <div className="text-[11px] text-amber-300 mt-0.5">
                {stats.unenteredCount} maado ayaa dhiman
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden divide-y divide-slate-200">
          {stats.subjectRows.map((row) => (
            <div
              key={row.id}
              className={`p-3.5 space-y-2 ${row.hasScore ? 'bg-white' : 'bg-slate-50/70'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {row.index}
                  </span>
                  <span className="font-bold text-sm text-slate-900 truncate">{row.name}</span>
                </div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${row.badgeClass}`}
                >
                  {row.status}
                </span>
              </div>

              {row.hasScore ? (
                <>
                  <div className="grid grid-cols-4 gap-1.5 text-center bg-slate-50 rounded-xl p-2 border border-slate-200/80">
                    <div>
                      <div className="text-[10px] text-slate-400">Haysto</div>
                      <div className="text-sm font-extrabold text-[#1B365D]">
                        {row.earned}/{row.maxScore}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Dhiman</div>
                      <div className="text-sm font-bold text-rose-600">{row.remaining}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Boqolley</div>
                      <div className="text-sm font-bold text-slate-700">
                        {row.percentage.toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Darajo</div>
                      <div className="text-sm font-extrabold text-teal-700">{row.grade}</div>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                </>
              ) : (
                <div className="text-xs italic text-slate-400 pl-8">
                  Wali lama galin (Buundada buuxda: {row.maxScore})
                </div>
              )}
            </div>
          ))}

          <div className="p-4 bg-teal-50 border-t-2 border-teal-500 space-y-1 text-xs">
            <div className="font-bold text-slate-900">
              WADARTA LA GALAY ({stats.takenCount} MAADO)
            </div>
            <div className="flex flex-wrap justify-between gap-2 font-bold text-[#1B365D]">
              <span>
                Haysto: {stats.totalEarned} / {stats.totalMaxTaken}
              </span>
              <span className="text-rose-700">Dhiman: {stats.remainingTakenOnly}</span>
              <span className="text-teal-800">
                {stats.percentageTakenOnly.toFixed(1)}% ({stats.overallGrade})
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#1B365D] text-white space-y-1 text-xs">
            <div className="font-bold text-teal-300">
              WADARTA GUUD ({stats.totalSubjects} MAADO)
            </div>
            <div className="flex flex-wrap justify-between gap-2 font-bold">
              <span>
                Haysto: {stats.totalEarned} / {stats.totalMaxAll}
              </span>
              <span className="text-amber-300">Dhiman: {stats.remainingAll}</span>
              <span className="text-teal-300">{stats.percentageAll.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[#1B365D] text-xs uppercase font-bold border-b-2 border-[#1B365D]">
                <th className="py-3 px-4 border-r border-slate-200 w-12 text-center">No.</th>
                <th className="py-3 px-4 border-r border-slate-200">Magaca Maadada</th>
                <th className="py-3 px-3 border-r border-slate-200 text-center">
                  Buundada Buuxda
                </th>
                <th className="py-3 px-4 border-r border-slate-200 text-center">
                  Waxa La Haysto
                </th>
                <th className="py-3 px-3 border-r border-slate-200 text-center">Waxa Dhiman</th>
                <th className="py-3 px-3 border-r border-slate-200 text-center">Boqolley (%)</th>
                <th className="py-3 px-3 border-r border-slate-200 text-center">Darajada</th>
                <th className="py-3 px-4 text-center">Heerka / Qiimeynta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {stats.subjectRows.map((row) => (
                <tr
                  key={row.id}
                  className={row.hasScore ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/70'}
                >
                  <td className="py-3 px-4 border-r border-slate-200 text-center font-semibold text-slate-500">
                    {row.index}
                  </td>
                  <td className="py-3 px-4 border-r border-slate-200 font-bold text-slate-800">
                    {row.name}
                  </td>
                  <td className="py-3 px-3 border-r border-slate-200 text-center font-semibold text-slate-600">
                    {row.maxScore}
                  </td>
                  <td className="py-3 px-4 border-r border-slate-200">
                    {row.hasScore ? (
                      <div className="flex items-center justify-center gap-2.5">
                        <span className="font-extrabold text-base text-[#1B365D] w-7 text-right">
                          {row.earned}
                        </span>
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: `${row.percentage}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-xs italic text-slate-400">Wali lama galin</div>
                    )}
                  </td>
                  <td className="py-3 px-3 border-r border-slate-200 text-center font-semibold">
                    {row.hasScore ? (
                      <span className="text-rose-600">{row.remaining}</span>
                    ) : (
                      <span className="text-slate-400">{row.maxScore}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 border-r border-slate-200 text-center font-semibold text-slate-700">
                    {row.hasScore ? `${row.percentage.toFixed(1)}%` : '—'}
                  </td>
                  <td className="py-3 px-3 border-r border-slate-200 text-center font-extrabold text-[#1B365D]">
                    {row.grade}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${row.badgeClass}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}

              <tr className="bg-teal-50 font-bold border-t-2 border-teal-500 text-slate-900">
                <td className="py-3 px-4 border-r border-teal-200" colSpan={2}>
                  WADARTA MAADOOYINKA LA GALAY ({stats.takenCount} MAADO)
                </td>
                <td className="py-3 px-3 border-r border-teal-200 text-center">
                  {stats.totalMaxTaken}
                </td>
                <td className="py-3 px-4 border-r border-teal-200 text-center text-[#1B365D] text-base">
                  {stats.totalEarned}
                </td>
                <td className="py-3 px-3 border-r border-teal-200 text-center text-rose-700">
                  {stats.remainingTakenOnly}
                </td>
                <td className="py-3 px-3 border-r border-teal-200 text-center text-teal-800">
                  {stats.percentageTakenOnly.toFixed(1)}%
                </td>
                <td className="py-3 px-3 border-r border-teal-200 text-center text-[#1B365D]">
                  {stats.overallGrade}
                </td>
                <td className="py-3 px-4 text-center text-teal-800">{stats.overallStatus}</td>
              </tr>

              <tr className="bg-[#1B365D] text-white font-bold">
                <td className="py-3.5 px-4 border-r border-slate-600" colSpan={2}>
                  WADARTA GUUD EE FASALKA ({stats.totalSubjects} MAADO)
                </td>
                <td className="py-3.5 px-3 border-r border-slate-600 text-center">
                  {stats.totalMaxAll}
                </td>
                <td className="py-3.5 px-4 border-r border-slate-600 text-center text-teal-300 text-base">
                  {stats.totalEarned}
                </td>
                <td className="py-3.5 px-3 border-r border-slate-600 text-center text-amber-300">
                  {stats.remainingAll}
                </td>
                <td className="py-3.5 px-3 border-r border-slate-600 text-center text-teal-300">
                  {stats.percentageAll.toFixed(1)}%
                </td>
                <td className="py-3.5 px-3 border-r border-slate-600 text-center">
                  {calculateGradeInfo(stats.percentageAll, 100).grade}
                </td>
                <td className="py-3.5 px-4 text-center text-xs text-slate-200">
                  {stats.unenteredCount > 0
                    ? `${stats.unenteredCount} maado ayaa wali dhiman`
                    : 'Dhammaan maadooyinka waa la galay'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#1B365D] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
                Tirakoobka & Falanqaynta (Statistics)
              </h4>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Maadada Ugu Sareysa:</span>
                  <span className="font-bold text-emerald-700">
                    {stats.highestSubject
                      ? `${stats.highestSubject.name} (${stats.highestSubject.score}/${stats.highestSubject.max})`
                      : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Maadada Ugu Hooseysa:</span>
                  <span className="font-bold text-rose-600">
                    {stats.lowestSubject
                      ? `${stats.lowestSubject.name} (${stats.lowestSubject.score}/${stats.lowestSubject.max})`
                      : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Celceliska Maadadiiba:</span>
                  <span className="font-bold text-[#1B365D]">
                    {stats.avgPerTakenSubject.toFixed(1)} buundo
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Maadooyinka La Galay:</span>
                  <span className="font-bold text-slate-800">
                    {stats.takenCount} ka mid ah {stats.totalSubjects} maado
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Maadooyinka Dhiman:</span>
                  <span className="font-bold text-amber-600">{stats.unenteredCount} maado</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span>Saxiixa Maamulka: _______________</span>
              <span>Taariikhda: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 shadow-sm no-print pdf-hide">
            <h4 className="text-sm font-bold text-[#1B365D] mb-2">
              Jaantuska Waxa La Haysto & Waxa Dhiman ({currentStudent.name})
            </h4>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={kaarkaChartData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Waxa La Haysto" stackId="a" fill="#0D9488" />
                  <Bar dataKey="Waxa Dhiman" stackId="a" fill="#F43F5E" />
                  <Bar dataKey="Wali Lama Galin" stackId="a" fill="#CBD5E1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: GELI BUUNDOOYINKA & MAAMULKA (DATA ENTRY & MANAGEMENT)
// ============================================================================
function DataEntryAndAdminView({
  data,
  currentGrade,
  currentExam,
  currentStudent,
  setSelectedStudentId,
  setSelectedGradeId,
  setSelectedExamId,
  onUpdateScore,
  onAddStudent,
  onRenameStudent,
  onDeleteStudent,
  onAddGrade,
  onUpdateGrade,
  onDeleteGrade,
  onAddExam,
  onRenameExam,
  onDeleteExam,
  onUpdateSubject,
  onAddSubject,
  onRemoveSubject,
  showToast,
}) {
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGender, setNewStudentGender] = useState('Wiil');
  const [newGradeName, setNewGradeName] = useState('');
  const [newGradeYear, setNewGradeYear] = useState('2027');
  const [newExamName, setNewExamName] = useState('');
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectMax, setNewSubjectMax] = useState(40);

  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editStudentVal, setEditStudentVal] = useState('');
  const [editingGradeId, setEditingGradeId] = useState(null);
  const [editGradeNameVal, setEditGradeNameVal] = useState('');
  const [editGradeYearVal, setEditGradeYearVal] = useState('');
  const [editingExamId, setEditingExamId] = useState(null);
  const [editExamVal, setEditExamVal] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (!currentGrade || !currentExam || !currentStudent) return null;

  const currentStudentScores =
    data.records?.[currentGrade.id]?.[currentExam.id]?.[currentStudent.id] || {};
  const liveStats = computeStudentExamStats(currentGrade.subjects, currentStudentScores);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Gelinta Buundooyinka
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#1B365D]">
                {currentStudent.name} — {currentExam.name}
              </h2>
              <p className="text-xs text-slate-500">
                Fasalka: <strong>{currentGrade.name}</strong> • Waxaa la galay:{' '}
                <strong>
                  {liveStats.takenCount}/{liveStats.totalSubjects}
                </strong>{' '}
                maado
              </p>
            </div>

            <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5 sm:pb-0">
              {data.students.map((stu) => (
                <button
                  key={stu.id}
                  onClick={() => setSelectedStudentId(stu.id)}
                  className={`px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                    stu.id === currentStudent.id
                      ? 'bg-[#1B365D] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {stu.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 my-4 bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200/80">
            <div>
              <div className="text-[11px] text-slate-500">Waxa La Haysto</div>
              <div className="text-lg font-extrabold text-[#1B365D]">
                {liveStats.totalEarned}{' '}
                <span className="text-xs font-normal text-slate-400">
                  / {liveStats.totalMaxTaken > 0 ? liveStats.totalMaxTaken : liveStats.totalMaxAll}
                </span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Waxa Dhiman (La Galay)</div>
              <div className="text-lg font-extrabold text-rose-600">
                {liveStats.remainingTakenOnly}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Boqolleyda (%)</div>
              <div className="text-lg font-extrabold text-teal-600">
                {liveStats.percentageTakenOnly.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {currentGrade.subjects.map((sub, idx) => {
              const rawVal = currentStudentScores[sub.id];
              const displayVal = rawVal === null || rawVal === undefined ? '' : String(rawVal);
              const hasScore =
                rawVal !== null && rawVal !== undefined && rawVal !== '' && !isNaN(Number(rawVal));
              const remaining = hasScore ? Math.max(0, sub.maxScore - Number(rawVal)) : sub.maxScore;

              return (
                <div
                  key={sub.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl border border-slate-200/90 hover:border-teal-400/60 bg-white transition-colors"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) =>
                        onUpdateSubject(currentGrade.id, sub.id, e.target.value, undefined)
                      }
                      className="font-semibold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-teal-500 focus:outline-none px-1 py-0.5 text-sm w-full"
                      title="Guji si aad u beddesho magaca maadada"
                    />
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pl-8 sm:pl-0">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs text-slate-500">Buundada:</label>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        max={sub.maxScore}
                        step="0.5"
                        placeholder="—"
                        value={displayVal}
                        onChange={(e) =>
                          onUpdateScore(
                            currentGrade.id,
                            currentExam.id,
                            currentStudent.id,
                            sub.id,
                            e.target.value
                          )
                        }
                        className="w-20 text-center font-bold text-base rounded-lg border-2 border-slate-300 focus:border-teal-600 focus:outline-none py-1.5 px-2 bg-white text-[#1B365D]"
                      />
                      <span className="text-xs font-semibold text-slate-500">
                        / {sub.maxScore}
                      </span>
                    </div>

                    <div className="w-20 text-right text-xs">
                      {hasScore ? (
                        <span className="text-rose-600 font-semibold">Dhiman: {remaining}</span>
                      ) : (
                        <span className="text-slate-400 italic">Bannaan</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() =>
                  showToast(
                    `Buundooyinka ${currentStudent.name} ee ${currentExam.name} si guul leh ayaa loo kaydiyay!`
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Kaydi & Xaqiiji Buundooyinka</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
          <h3 className="text-base font-bold text-[#1B365D] flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-teal-600" />
            <span>Maamulka Ardayda ({data.students.length})</span>
          </h3>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              placeholder="Magaca ardayga cusub..."
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
            />
            <div className="flex gap-2">
              <select
                value={newStudentGender}
                onChange={(e) => setNewStudentGender(e.target.value)}
                className="flex-1 sm:flex-none rounded-xl border border-slate-300 px-2.5 py-2 text-sm bg-white"
              >
                <option value="Wiil">Wiil</option>
                <option value="Gabar">Gabar</option>
              </select>
              <button
                onClick={() => {
                  if (!newStudentName.trim()) return;
                  onAddStudent(newStudentName, newStudentGender);
                  setNewStudentName('');
                }}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-sm font-semibold flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Dar</span>
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {data.students.map((stu) => {
              const isEditing = editingStudentId === stu.id;
              return (
                <div
                  key={stu.id}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm gap-2"
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 flex-1">
                      <input
                        type="text"
                        value={editStudentVal}
                        onChange={(e) => setEditStudentVal(e.target.value)}
                        className="flex-1 rounded-lg border border-teal-500 px-2 py-1 text-xs font-bold bg-white"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          onRenameStudent(stu.id, editStudentVal);
                          setEditingStudentId(null);
                        }}
                        className="p-1 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                        title="Kaydi"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingStudentId(null)}
                        className="p-1 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300"
                        title="Jooji"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="truncate">
                        <span className="font-bold text-slate-800">{stu.name}</span>
                        <span className="text-xs text-slate-400 ml-2">
                          ({stu.rollNo} • {stu.gender})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingStudentId(stu.id);
                            setEditStudentVal(stu.name);
                          }}
                          className="text-slate-500 hover:text-[#1B365D] p-1 rounded-lg hover:bg-slate-200/70 transition-colors"
                          title="Wax ka beddel magaca ardayga"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {data.students.length > 1 && (
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                type: 'student',
                                id: stu.id,
                                label: `Ardayga "${stu.name}"`,
                              })
                            }
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Tirtir ardayga"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-base font-bold text-[#1B365D] flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-teal-600" />
            <span>Maamulka Fasallada & Sanadaha ({data.grades.length})</span>
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Ku dar fasal cusub ama wax ka beddel / tirtir fasallada jira.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Magaca Fasalka (tusaale: Fasalka 7aad - 2027)"
              value={newGradeName}
              onChange={(e) => setNewGradeName(e.target.value)}
              className="sm:col-span-2 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
            />
            <input
              type="text"
              placeholder="Sanadka (2027)"
              value={newGradeYear}
              onChange={(e) => setNewGradeYear(e.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>
          <button
            onClick={() => {
              if (!newGradeName.trim()) return;
              onAddGrade(newGradeName, newGradeYear, true);
              setNewGradeName('');
            }}
            className="mt-2.5 mb-4 w-full py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Abuur Fasalka Cusub</span>
          </button>

          <div className="space-y-2 max-h-44 overflow-y-auto pt-2 border-t border-slate-100">
            {data.grades.map((g) => {
              const isEditing = editingGradeId === g.id;
              return (
                <div
                  key={g.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs sm:text-sm gap-2 ${
                    g.id === currentGrade.id
                      ? 'bg-teal-50/70 border-teal-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 flex-1">
                      <input
                        type="text"
                        value={editGradeNameVal}
                        onChange={(e) => setEditGradeNameVal(e.target.value)}
                        className="flex-1 rounded-lg border border-teal-500 px-2 py-1 text-xs font-bold bg-white"
                        autoFocus
                      />
                      <input
                        type="text"
                        value={editGradeYearVal}
                        onChange={(e) => setEditGradeYearVal(e.target.value)}
                        className="w-16 rounded-lg border border-teal-500 px-2 py-1 text-xs text-center bg-white"
                      />
                      <button
                        onClick={() => {
                          onUpdateGrade(g.id, editGradeNameVal, editGradeYearVal);
                          setEditingGradeId(null);
                        }}
                        className="p-1 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                        title="Kaydi"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingGradeId(null)}
                        className="p-1 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300"
                        title="Jooji"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedGradeId(g.id)}
                        className="text-left truncate flex-1 font-semibold text-slate-800 hover:text-[#1B365D]"
                      >
                        {g.name}{' '}
                        <span className="text-[11px] font-normal text-slate-400">({g.year})</span>
                      </button>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingGradeId(g.id);
                            setEditGradeNameVal(g.name);
                            setEditGradeYearVal(g.year);
                          }}
                          className="text-slate-500 hover:text-[#1B365D] p-1 rounded-lg hover:bg-slate-200/70"
                          title="Wax ka beddel magaca fasalka"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {data.grades.length > 1 && (
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                type: 'grade',
                                id: g.id,
                                label: `Fasalka "${g.name}" iyo dhammaan buundooyinkiisa`,
                              })
                            }
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50"
                            title="Tirtir fasalkan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-base font-bold text-[#1B365D] flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <span>Imtixaannada ({currentGrade.name})</span>
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Ku dar imtixaan cusub, beddel magaca, ama tirtir imtixaan gaar ah.
          </p>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Magaca imtixaanka cusub..."
              value={newExamName}
              onChange={(e) => setNewExamName(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={() => {
                if (!newExamName.trim()) return;
                onAddExam(currentGrade.id, newExamName);
                setNewExamName('');
              }}
              className="px-4 py-2 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-sm font-semibold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Dar</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-44 overflow-y-auto pt-2 border-t border-slate-100">
            {currentGrade.exams.map((ex) => {
              const isEditing = editingExamId === ex.id;
              return (
                <div
                  key={ex.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs sm:text-sm gap-2 ${
                    ex.id === currentExam.id
                      ? 'bg-blue-50/70 border-blue-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 flex-1">
                      <input
                        type="text"
                        value={editExamVal}
                        onChange={(e) => setEditExamVal(e.target.value)}
                        className="flex-1 rounded-lg border border-teal-500 px-2 py-1 text-xs font-bold bg-white"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          onRenameExam(currentGrade.id, ex.id, editExamVal);
                          setEditingExamId(null);
                        }}
                        className="p-1 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingExamId(null)}
                        className="p-1 rounded-lg bg-slate-200 text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedExamId(ex.id)}
                        className="text-left truncate flex-1 font-medium text-slate-800 hover:text-[#1B365D]"
                      >
                        {ex.name}
                      </button>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingExamId(ex.id);
                            setEditExamVal(ex.name);
                          }}
                          className="text-slate-500 hover:text-[#1B365D] p-1 rounded-lg hover:bg-slate-200/70"
                          title="Wax ka beddel magaca imtixaanka"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {currentGrade.exams.length > 1 && (
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                type: 'exam',
                                id: ex.id,
                                extraId: currentGrade.id,
                                label: `Imtixaanka "${ex.name}"`,
                              })
                            }
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50"
                            title="Tirtir imtixaankan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-base font-bold text-[#1B365D] mb-1">
            Maadooyinka & Buundada Buuxda ({currentGrade.name})
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Wax ka beddel magaca/buundada maadada ama tirtir maado gaar ah.
          </p>

          <div className="space-y-2 max-h-56 overflow-y-auto mb-3 pr-1">
            {currentGrade.subjects.map((sub, idx) => (
              <div key={sub.id} className="flex items-center gap-2 text-sm">
                <span className="text-xs font-bold text-slate-400 w-5">{idx + 1}.</span>
                <input
                  type="text"
                  value={sub.name}
                  onChange={(e) =>
                    onUpdateSubject(currentGrade.id, sub.id, e.target.value, undefined)
                  }
                  className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium focus:border-teal-500 focus:outline-none"
                />
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={sub.maxScore}
                  onChange={(e) =>
                    onUpdateSubject(currentGrade.id, sub.id, undefined, e.target.value)
                  }
                  className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-center font-bold text-[#1B365D]"
                  title="Buundada ugu badan"
                />
                {currentGrade.subjects.length > 1 && (
                  <button
                    onClick={() =>
                      setConfirmDelete({
                        type: 'subject',
                        id: sub.id,
                        extraId: currentGrade.id,
                        label: `Maadada "${sub.name}"`,
                      })
                    }
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50"
                    title="Tirtir maadadan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              placeholder="Magaca maadada cusub..."
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
            />
            <input
              type="number"
              value={newSubjectMax}
              onChange={(e) => setNewSubjectMax(Number(e.target.value))}
              className="w-16 rounded-lg border border-slate-300 px-2 py-1.5 text-xs text-center font-bold"
            />
            <button
              onClick={() => {
                if (!newSubjectName.trim()) return;
                onAddSubject(currentGrade.id, newSubjectName, newSubjectMax);
                setNewSubjectName('');
              }}
              className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700"
            >
              + Maado
            </button>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Xaqiiji Tirtirista</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ma hubtaa inaad rabto inaad tirtirto{' '}
              <strong className="text-slate-900">{confirmDelete.label}</strong>? Tallaabadan dib
              looguma soo celin karo.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
              >
                Maya, Jooji
              </button>
              <button
                onClick={() => {
                  if (confirmDelete.type === 'student') onDeleteStudent(confirmDelete.id);
                  if (confirmDelete.type === 'grade') onDeleteGrade(confirmDelete.id);
                  if (confirmDelete.type === 'exam')
                    onDeleteExam(confirmDelete.extraId, confirmDelete.id);
                  if (confirmDelete.type === 'subject')
                    onRemoveSubject(confirmDelete.extraId, confirmDelete.id);
                  setConfirmDelete(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold"
              >
                Haa, Tirtir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TAB 4: HORUMARKA & ISBARBARDHIGA SANADAHA (DEEP ANNUAL & YEAR-OVER-YEAR ANALYTICS)
// ============================================================================
function ProgressAndCrossYearView({
  data,
  currentGrade,
  currentStudent,
  setSelectedStudentId,
}) {
  const [gradeAId, setGradeAId] = useState(() => {
    const prevGrade = data.grades.find((g) => g.id === 'grade_5_2025');
    return prevGrade ? prevGrade.id : data.grades[data.grades.length - 1]?.id || '';
  });
  const [gradeBId, setGradeBId] = useState(() => {
    const currGrade = data.grades.find((g) => g.id === 'grade_6_2026');
    return currGrade ? currGrade.id : data.grades[0]?.id || '';
  });

  useEffect(() => {
    if (!data.grades.some((g) => g.id === gradeAId) && data.grades[0]) {
      setGradeAId(data.grades[data.grades.length - 1].id);
    }
    if (!data.grades.some((g) => g.id === gradeBId) && data.grades[0]) {
      setGradeBId(data.grades[0].id);
    }
  }, [data.grades, gradeAId, gradeBId]);

  if (!currentGrade || !currentStudent) return null;

  const gradeA = data.grades.find((g) => g.id === gradeAId) || data.grades[0];
  const gradeB = data.grades.find((g) => g.id === gradeBId) || data.grades[0];

  const getGradeSubjectPerformance = (gradeObj, studentId) => {
    if (!gradeObj) {
      return {
        totalEarned: 0,
        totalMaxTaken: 0,
        overallPct: 0,
        examsCount: 0,
        subjectMap: {},
        subjectList: [],
      };
    }
    let totalEarned = 0;
    let totalMaxTaken = 0;
    let examsCount = 0;
    const subAccumulator: Record<string, {
      displayName: string;
      earnedSum: number;
      maxSum: number;
      count: number;
    }> = {};

    gradeObj.subjects.forEach((sub) => {
      subAccumulator[sub.name.trim().toLowerCase()] = {
        displayName: sub.name,
        earnedSum: 0,
        maxSum: 0,
        count: 0,
      };
    });

    gradeObj.exams.forEach((ex) => {
      const scores = data.records?.[gradeObj.id]?.[ex.id]?.[studentId] || {};
      const stats = computeStudentExamStats(gradeObj.subjects, scores);
      if (stats.takenCount > 0) {
        totalEarned += stats.totalEarned;
        totalMaxTaken += stats.totalMaxTaken;
        examsCount += 1;

        stats.subjectRows.forEach((row) => {
          if (row.hasScore) {
            const key = row.name.trim().toLowerCase();
            if (!subAccumulator[key]) {
              subAccumulator[key] = {
                displayName: row.name,
                earnedSum: 0,
                maxSum: 0,
                count: 0,
              };
            }
            subAccumulator[key].earnedSum += row.earned;
            subAccumulator[key].maxSum += row.maxScore;
            subAccumulator[key].count += 1;
          }
        });
      }
    });

    const subjectList = Object.entries(subAccumulator)
      .filter(([, val]) => val.count > 0)
      .map(([key, val]) => {
        const avgEarned = val.earnedSum / val.count;
        const avgMax = val.maxSum / val.count;
        const pct = avgMax > 0 ? (val.earnedSum / val.maxSum) * 100 : 0;
        return {
          key,
          name: val.displayName,
          avgEarned,
          avgMax,
          pct,
        };
      });

    const subjectMap = {};
    subjectList.forEach((item) => {
      subjectMap[item.key] = item;
    });

    const overallPct = totalMaxTaken > 0 ? (totalEarned / totalMaxTaken) * 100 : 0;
    return {
      totalEarned,
      totalMaxTaken,
      overallPct,
      examsCount,
      subjectMap,
      subjectList,
    };
  };

  const perfA = getGradeSubjectPerformance(gradeA, currentStudent.id);
  const perfB = getGradeSubjectPerformance(gradeB, currentStudent.id);
  const yearPctDiff = perfB.overallPct - perfA.overallPct;

  const sortedA = [...perfA.subjectList].sort((a, b) => b.pct - a.pct);
  const strongInYearA = sortedA.filter((s) => s.pct >= 80);
  const weakInYearA = sortedA.filter((s) => s.pct < 75);

  const allKeys = Array.from(
    new Set([...perfA.subjectList.map((s) => s.key), ...perfB.subjectList.map((s) => s.key)])
  );

  const subjectComparisonRows = allKeys.map((key) => {
    const itemA = perfA.subjectMap[key];
    const itemB = perfB.subjectMap[key];
    const displayName = itemB?.name || itemA?.name || key;
    const pctA = itemA ? itemA.pct : null;
    const pctB = itemB ? itemB.pct : null;
    const diffPct = pctA !== null && pctB !== null ? pctB - pctA : null;

    return {
      key,
      name: displayName,
      scoreA: itemA ? `${itemA.avgEarned.toFixed(0)}/${itemA.avgMax.toFixed(0)}` : '—',
      pctA,
      scoreB: itemB ? `${itemB.avgEarned.toFixed(0)}/${itemB.avgMax.toFixed(0)}` : '—',
      pctB,
      diffPct,
    };
  });

  const improvedSubjects = subjectComparisonRows
    .filter((r) => r.diffPct !== null && r.diffPct > 0)
    .sort((a, b) => b.diffPct - a.diffPct);

  const declinedSubjects = subjectComparisonRows
    .filter((r) => r.diffPct !== null && r.diffPct < 0)
    .sort((a, b) => a.diffPct - b.diffPct);

  const yoyChartData = subjectComparisonRows
    .filter((r) => r.pctA !== null || r.pctB !== null)
    .map((r) => ({
      name: r.name.length > 13 ? r.name.slice(0, 12) + '…' : r.name,
      [gradeA?.name || 'Sanadka 1aad']: r.pctA !== null ? Number(r.pctA.toFixed(1)) : 0,
      [gradeB?.name || 'Sanadka 2aad']: r.pctB !== null ? Number(r.pctB.toFixed(1)) : 0,
    }));

  const examProgressionData = currentGrade.exams.map((ex) => {
    const row = {
      examName: ex.name,
    };
    data.students.forEach((stu) => {
      const scores = data.records?.[currentGrade.id]?.[ex.id]?.[stu.id] || {};
      const stats = computeStudentExamStats(currentGrade.subjects, scores);
      row[stu.name] = stats.takenCount > 0 ? Number(stats.percentageTakenOnly.toFixed(1)) : null;
    });
    return row;
  });

  const annualGradeSummary = data.students.map((stu) => {
    let cumulativeEarned = 0;
    let cumulativeMaxTaken = 0;
    let examsParticipated = 0;

    currentGrade.exams.forEach((ex) => {
      const scores = data.records?.[currentGrade.id]?.[ex.id]?.[stu.id] || {};
      const stats = computeStudentExamStats(currentGrade.subjects, scores);
      if (stats.takenCount > 0) {
        cumulativeEarned += stats.totalEarned;
        cumulativeMaxTaken += stats.totalMaxTaken;
        examsParticipated += 1;
      }
    });

    const annualPercentage =
      cumulativeMaxTaken > 0 ? (cumulativeEarned / cumulativeMaxTaken) * 100 : 0;
    const gradeInfo = calculateGradeInfo(
      cumulativeMaxTaken > 0 ? annualPercentage : null,
      100
    );
    const passedYear = cumulativeMaxTaken > 0 && annualPercentage >= 50;

    return {
      student: stu,
      cumulativeEarned,
      cumulativeMaxTaken,
      examsParticipated,
      annualPercentage,
      gradeInfo,
      passedYear,
    };
  });

  const crossGradeChartData = data.grades.map((g) => {
    const item = {
      gradeName: g.name,
    };
    data.students.forEach((stu) => {
      let earned = 0;
      let maxTaken = 0;
      g.exams.forEach((ex) => {
        const scores = data.records?.[g.id]?.[ex.id]?.[stu.id] || {};
        const stats = computeStudentExamStats(g.subjects, scores);
        if (stats.takenCount > 0) {
          earned += stats.totalEarned;
          maxTaken += stats.totalMaxTaken;
        }
      });
      item[stu.name] = maxTaken > 0 ? Number(((earned / maxTaken) * 100).toFixed(1)) : 0;
    });
    return item;
  });

  const LINE_COLORS = ['#1B365D', '#0D9488', '#D97706', '#7C3AED'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Falanqaynta Sanadlaha & Heerarka Waxbarasho
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B365D] mt-0.5">
            Isbarbardhigga Sanadaha & Maadooyinka ({currentStudent.name})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Isbarbardhig laba sano ama laba fasal si aad u ogaato sanadka sareeya iyo maadooyinka
            isbeddelay.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.students.map((stu) => (
            <button
              key={stu.id}
              onClick={() => setSelectedStudentId(stu.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                stu.id === currentStudent.id
                  ? 'bg-[#1B365D] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {stu.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-[#1B365D]/20 shadow-sm overflow-hidden">
        <div className="bg-[#1B365D] text-white p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Isbarbardhigga Laba Sano / Laba Fasal</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                Xogta Isbarbardhigga Sanadlaha ee {currentStudent.name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#132744] p-2.5 rounded-xl border border-slate-600/70">
              <div>
                <label className="block text-[10px] uppercase text-slate-300 font-semibold">
                  Sanadka 1aad (Hore)
                </label>
                <select
                  value={gradeAId}
                  onChange={(e) => setGradeAId(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-bold focus:outline-none cursor-pointer"
                >
                  {data.grades.map((g) => (
                    <option key={g.id} value={g.id} className="bg-white text-slate-900">
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-teal-400 font-extrabold text-xs px-1">VS</span>

              <div>
                <label className="block text-[10px] uppercase text-teal-300 font-semibold">
                  Sanadka 2aad (Hadda)
                </label>
                <select
                  value={gradeBId}
                  onChange={(e) => setGradeBId(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-bold focus:outline-none cursor-pointer"
                >
                  {data.grades.map((g) => (
                    <option key={g.id} value={g.id} className="bg-white text-slate-900">
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white/10 rounded-xl p-4 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-teal-300 font-bold">
                Go’aanka & Natiijada Isbarbardhigga:
              </div>
              {perfA.totalMaxTaken === 0 && perfB.totalMaxTaken === 0 ? (
                <p className="text-sm text-slate-200">
                  Labadan sano wali xog imtixaan lagama galin ardaygan.
                </p>
              ) : (
                <p className="text-sm sm:text-base font-bold text-white leading-snug">
                  {yearPctDiff > 0 ? (
                    <>
                      Sanadkan (<span className="text-teal-300">{gradeB?.name}</span>) ayaa ka
                      sareeya sanadkii hore ({gradeA?.name}) farqi dhan{' '}
                      <span className="text-emerald-300 underline">+{yearPctDiff.toFixed(1)}%</span>!
                    </>
                  ) : yearPctDiff < 0 ? (
                    <>
                      Sanadkii hore (<span className="text-amber-300">{gradeA?.name}</span>) ayaa
                      ka sareeyay sanadkan ({gradeB?.name}) farqi dhan{' '}
                      <span className="text-rose-300 underline">
                        {Math.abs(yearPctDiff).toFixed(1)}%
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Labada sano (<span className="text-teal-300">{gradeA?.name}</span> iyo{' '}
                      <span className="text-teal-300">{gradeB?.name}</span>) way siman yihiin (
                      {perfB.overallPct.toFixed(1)}%).
                    </>
                  )}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-[#132744] px-3.5 py-2 rounded-xl border border-slate-600 text-center">
                <div className="text-[10px] text-slate-300">{gradeA?.name}</div>
                <div className="text-base font-extrabold text-white">
                  {perfA.overallPct.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400">
                  {perfA.totalEarned}/{perfA.totalMaxTaken}
                </div>
              </div>

              <div className="bg-[#132744] px-3.5 py-2 rounded-xl border border-teal-500/50 text-center">
                <div className="text-[10px] text-teal-300">{gradeB?.name}</div>
                <div className="text-base font-extrabold text-teal-300">
                  {perfB.overallPct.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-300">
                  {perfB.totalEarned}/{perfB.totalMaxTaken}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/70">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h4 className="text-sm font-bold text-[#1B365D] border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
              <span>Xogta {gradeA?.name} (Sanadkii Hore)</span>
              <span className="text-xs font-semibold text-slate-500">
                Celcelis: {perfA.overallPct.toFixed(1)}%
              </span>
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <div className="font-bold text-emerald-700 mb-1 flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Maadooyinkii aad ku fiicnayd (&ge;80%):</span>
                </div>
                {strongInYearA.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {strongInYearA.map((s) => (
                      <span
                        key={s.key}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold"
                      >
                        {s.name} ({s.pct.toFixed(0)}%)
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">Ma jirto maado gaartay 80% sanadkaas.</p>
                )}
              </div>

              <div>
                <div className="font-bold text-rose-600 mb-1 flex items-center gap-1">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>Maadooyinkii aad ku liidatay (&lt;75%):</span>
                </div>
                {weakInYearA.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {weakInYearA.map((s) => (
                      <span
                        key={s.key}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-semibold"
                      >
                        {s.name} ({s.pct.toFixed(0)}%)
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">Dhammaan maadooyinka way fiicnaayeen!</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h4 className="text-sm font-bold text-[#1B365D] border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
              <span>
                Isbeddelka {gradeB?.name} vs {gradeA?.name}
              </span>
              <span className="text-xs font-semibold text-teal-600">
                Celcelis: {perfB.overallPct.toFixed(1)}%
              </span>
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <div className="font-bold text-teal-700 mb-1 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Maadooyinka aad sanadkan kaga fiican tahay sanadkii hore:</span>
                </div>
                {improvedSubjects.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {improvedSubjects.map((s) => (
                      <span
                        key={s.key}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold"
                      >
                        {s.name} (+{s.diffPct.toFixed(1)}%)
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">
                    Wali lama hayo maado kor u kacday labada sano.
                  </p>
                )}
              </div>

              <div>
                <div className="font-bold text-amber-700 mb-1 flex items-center gap-1">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>Maadooyinkii aad sanadkan kaga liidato sanadkii hore:</span>
                </div>
                {declinedSubjects.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {declinedSubjects.map((s) => (
                      <span
                        key={s.key}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold"
                      >
                        {s.name} ({s.diffPct.toFixed(1)}%)
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">
                    Ma jirto maado hoos uga dhacday sanadkii hore!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-200 space-y-5">
          {yoyChartData.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-[#1B365D] mb-2">
                Jaantuska Isbarbardhigga Maadooyinka ({gradeA?.name} vs {gradeB?.name})
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={yoyChartData}
                    margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#475569' }} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey={gradeA?.name || 'Sanadka 1aad'}
                      fill="#94A3B8"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={36}
                    />
                    <Bar
                      dataKey={gradeB?.name || 'Sanadka 2aad'}
                      fill="#0D9488"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={36}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-[#1B365D] text-xs uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Maadada</th>
                  <th className="py-3 px-3 text-center">{gradeA?.name}</th>
                  <th className="py-3 px-3 text-center">{gradeB?.name}</th>
                  <th className="py-3 px-3 text-center">Isbeddelka (%)</th>
                  <th className="py-3 px-4 text-center">Qiimeynta Isbarbardhigga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subjectComparisonRows.map((row) => (
                  <tr key={row.key} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-bold text-slate-800">{row.name}</td>
                    <td className="py-2.5 px-3 text-center text-slate-600 font-medium">
                      {row.pctA !== null ? `${row.scoreA} (${row.pctA.toFixed(0)}%)` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center text-[#1B365D] font-bold">
                      {row.pctB !== null ? `${row.scoreB} (${row.pctB.toFixed(0)}%)` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center font-extrabold">
                      {row.diffPct === null ? (
                        <span className="text-slate-400 font-normal text-xs">—</span>
                      ) : row.diffPct > 0 ? (
                        <span className="text-emerald-600">+{row.diffPct.toFixed(1)}%</span>
                      ) : row.diffPct < 0 ? (
                        <span className="text-rose-600">{row.diffPct.toFixed(1)}%</span>
                      ) : (
                        <span className="text-slate-600">0.0%</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {row.diffPct === null ? (
                        <span className="text-xs text-slate-400 italic">Hal sano kaliya</span>
                      ) : row.diffPct > 0 ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Wuu ka fiicnaaday sanadkii hore
                        </span>
                      ) : row.diffPct < 0 ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          Wuu ka hooseeyaa sanadkii hore
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          Waa isku mid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-[#1B365D] text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Natiijada Isu-geynta Sanadka — {currentGrade.name}</h3>
            <p className="text-xs text-slate-300">
              Isu-geynta dhammaan imtixaannada la galay sanadkan si loo ogaado natiijada kama
              dambaysta ah
            </p>
          </div>
          <Award className="w-6 h-6 text-teal-300" />
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {annualGradeSummary.map((item) => (
            <div
              key={item.student.id}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50/70 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-lg font-bold text-[#1B365D]">{item.student.name}</h4>
                  <p className="text-xs text-slate-500">
                    Imtixaannada la galay: {item.examsParticipated} / {currentGrade.exams.length}
                  </p>
                </div>
                {item.cumulativeMaxTaken > 0 ? (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      item.passedYear
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border-rose-200'
                    }`}
                  >
                    {item.passedYear ? 'WUU GUDBAY SANADKAN' : 'DADAAL DHEERAAD AH'}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs bg-slate-200 text-slate-600">
                    Xog lama galin
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200 text-center">
                <div>
                  <div className="text-[11px] text-slate-500">Wadarta Buundooyinka</div>
                  <div className="text-base font-extrabold text-slate-800">
                    {item.cumulativeEarned}{' '}
                    <span className="text-xs font-normal text-slate-400">
                      / {item.cumulativeMaxTaken}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Celceliska Sanadka</div>
                  <div className="text-base font-extrabold text-teal-700">
                    {item.annualPercentage.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Darajada Guud</div>
                  <div className="text-base font-extrabold text-[#1B365D]">
                    {item.gradeInfo.grade}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-base font-bold text-[#1B365D] mb-1">
            Isbarbardhiga Imtixaannada ({currentGrade.name})
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Isbarbardhig Bisha 1aad, Bisha 2aad, Dhexe, iyo Final (%)
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={examProgressionData}
                margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="examName" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip />
                <Legend />
                {data.students.map((stu, idx) => (
                  <Line
                    key={stu.id}
                    type="monotone"
                    dataKey={stu.name}
                    stroke={LINE_COLORS[idx % LINE_COLORS.length]}
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                    connectNulls={true}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-base font-bold text-[#1B365D] mb-1">
            Isbarbardhigga Fasallada & Sanadaha
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Isbarbardhig celceliska boqolleyda (%) ee fasal/sano kasta
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={crossGradeChartData}
                margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="gradeName" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip />
                <Legend />
                {data.students.map((stu, idx) => (
                  <Bar
                    key={stu.id}
                    dataKey={stu.name}
                    fill={LINE_COLORS[idx % LINE_COLORS.length]}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={42}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 5: KAYDINTA XOGTA & VERSEL DEPLOYMENT (BACKUP & SECURITY)
// ============================================================================
function BackupAndDeploymentView({
  onExportJSON,
  onImportJSON,
  onResetDemo,
  supabaseConfig,
  onSaveSupabaseConfig,
  cloudStatus,
  lastSyncedAt,
  onManualSyncNow,
}) {
  const [sbUrlInput, setSbUrlInput] = useState(
    supabaseConfig?.url || DEFAULT_SUPABASE_CONFIG.url
  );
  const [sbKeyInput, setSbKeyInput] = useState(
    supabaseConfig?.anonKey || DEFAULT_SUPABASE_CONFIG.anonKey
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={APP_ICON_SRC}
              alt="Natiijada Icon"
              className="w-10 h-10 rounded-xl border border-slate-200 shrink-0"
            />
            <div>
              <h2 className="text-lg font-bold text-[#1B365D]">
                Supabase Cloud Database (100% Online Sync)
              </h2>
              <p className="text-xs text-slate-500">
                Xogtaada oo dhan (ardayda, buundooyinka, fasallada, iyo password-ka) si otomaatig ah ayay ugu kaydsantaa internet-ka.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onManualSyncNow}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cloudStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>Sync Now</span>
          </button>
        </div>

        <div className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 mb-4">
          <span>
            Xaaladda Cloud:{' '}
            <strong
              className={
                cloudStatus === 'synced'
                  ? 'text-emerald-700'
                  : cloudStatus === 'syncing'
                  ? 'text-amber-700'
                  : 'text-rose-700'
              }
            >
              {cloudStatus === 'synced'
                ? 'Si guul leh ayay ugu xiran tahay (Online)'
                : cloudStatus === 'syncing'
                ? 'Xogta waa la dirayaa...'
                : 'Cilad xiriir (Hubi internet-ka)'}
            </strong>
          </span>
          {lastSyncedAt && (
            <span className="text-slate-500">
              Kaydintii u dambeysay: {new Date(lastSyncedAt).toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <input
            type="text"
            placeholder="Supabase Project URL"
            value={sbUrlInput}
            onChange={(e) => setSbUrlInput(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
          />
          <input
            type="text"
            placeholder="Supabase Publishable / Anon Key"
            value={sbKeyInput}
            onChange={(e) => setSbKeyInput(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
          />
        </div>

        <button
          type="button"
          onClick={() =>
            onSaveSupabaseConfig({
              url: sbUrlInput,
              anonKey: sbKeyInput,
              rowId: supabaseConfig?.rowId || 'main_school_portal',
            })
          }
          className="mt-3 px-4 py-2 rounded-xl bg-[#1B365D] hover:bg-[#142947] text-white text-xs font-bold transition-colors"
        >
          Kaydi Furayaasha Supabase
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1B365D]">
              Kaydinta Xogta & Soo Dejinta (Backup)
            </h2>
            <p className="text-xs text-slate-500">
              Dhammaan xogta aad geliso si otomaatig ah ayay ugu kaydsantaa Browser-kaaga (Local
              Storage) iyo Supabase Cloud.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <button
            onClick={onExportJSON}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-[#1B365D] bg-[#1B365D] text-white hover:bg-[#142947] transition-colors text-center"
          >
            <Download className="w-6 h-6 text-teal-300" />
            <span className="text-sm font-bold">Soo Deji Backup (JSON)</span>
            <span className="text-[11px] text-slate-300">
              Ku kaydi kombiyuutarkaaga ama taleefanka
            </span>
          </button>

          <label className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-teal-500 bg-teal-50/60 hover:bg-teal-50 text-[#1B365D] cursor-pointer transition-colors text-center">
            <Upload className="w-6 h-6 text-teal-600" />
            <span className="text-sm font-bold">Soo Geli Backup (JSON)</span>
            <span className="text-[11px] text-slate-500">Soo celi xog aad hore u kaydisay</span>
            <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
          </label>

          <button
            onClick={onResetDemo}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-300 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 text-slate-700 hover:text-rose-700 transition-colors text-center"
          >
            <RotateCcw className="w-6 h-6" />
            <span className="text-sm font-bold">Soo Celi Xogtii Hore</span>
            <span className="text-[11px] text-slate-500">Ku celi xogtii Ayuub & Ayaan</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;