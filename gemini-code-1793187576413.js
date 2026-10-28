import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Car,
  Zap,
  Shield,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  QrCode,
  TrendingUp,
  Calendar,
  Settings,
  User,
  ChevronRight,
  ChevronLeft,
  Power,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Lock,
  Building2,
  IndianRupee,
  Sliders,
  Plus,
  Eye,
  Check,
  X,
  Navigation,
  Sparkles,
  FileText,
  CreditCard,
  Smartphone,
  Wallet,
  Info,
  Play,
  FastForward,
  RotateCcw,
  Award,
  Camera
} from 'lucide-react';

// ============================================================================
// ORDERED PRESENTATION STEPS FOR BACK / NEXT BUTTONS
// ============================================================================
const PRESENTATION_STEPS = [
  { id: 'step-1', label: '1. Landing Hero', role: 'landing', subTab: null },
  { id: 'step-2', label: '2. Role Login', role: 'login', subTab: null },
  { id: 'step-3', label: '3. Customer Home', role: 'customer', subTab: 'dashboard' },
  { id: 'step-4', label: '4. Map Discovery', role: 'customer', subTab: 'explore' },
  { id: 'step-5', label: '5. ₹220 Spot & Checkout', role: 'customer', subTab: 'spot-detail' },
  { id: 'step-6', label: '6. QR Pass & Session Clock', role: 'customer', subTab: 'active-session' },
  { id: 'step-7', label: '7. My Bookings', role: 'customer', subTab: 'bookings' },
  { id: 'step-8', label: '8. Guard 3-Sec Verdict', role: 'guard', subTab: 'verify' },
  { id: 'step-9', label: '9. Provider ₹24,680 Dashboard', role: 'provider', subTab: 'dashboard' },
  { id: 'step-10', label: '10. Provider My Spaces', role: 'provider', subTab: 'spaces' },
  { id: 'step-11', label: '11. Availability Calendar', role: 'provider', subTab: 'calendar' },
  { id: 'step-12', label: '12. Judge & Fee Ledger', role: 'admin', subTab: null }
];

// ============================================================================
// SEED DATA — PUNE MARKETPLACE (INCLUDING EXACT ₹220 PRICING FIXTURE)
// ============================================================================
const INITIAL_SPOTS = [
  {
    id: 'spot-grand-hotel',
    title: 'The Grand Hotel',
    area: 'Koregaon Park',
    address: 'Lane 7, Koregaon Park, Pune',
    propertyType: 'hotel',
    rebateEligible: true, // Demonstrates the 5% (₹11) rebate out of ₹44 platform fee
    lat: 18.5362,
    lng: 73.8940,
    mapX: 52,
    mapY: 42,
    distanceKm: 2.4,
    walkMins: 8,
    rating: 4.6,
    reviews: 124,
    pricePerHour: 50, // 2 hrs = ₹100 (or 4 hrs @ ₹25/hr fixture = ₹100)
    fixtureParkingFlat: 100, // Exact ₹100 parking for the ₹220 benchmark fixture
    chargingAvailable: true,
    plugTypes: ['CCS2', 'Type 2', '15A'],
    primaryPlug: 'CCS2',
    chargerKw: 18,
    kwhRate: 12, // 10 kWh * ₹12 = ₹120
    isActive: true,
    status: 'available', // available | limited | booked | paused
    bayLabel: 'Bay A1',
    totalBays: 8,
    activeBays: 5,
    amenities: ['CCTV', 'Covered', 'Security', 'Wi-Fi', 'Restaurant', 'Lounge'],
    vehicleTypes: 'Sedan, SUV, EV',
    heightLimit: '2.1 m',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    windows: ['08:00 AM – 10:00 AM', '10:00 AM – 12:00 PM', '12:00 PM – 02:00 PM', '02:00 PM – 04:00 PM', '04:00 PM – 06:00 PM']
  },
  {
    id: 'spot-phoenix-mall',
    title: 'Phoenix Marketcity East Court',
    area: 'Viman Nagar',
    address: 'Nagar Road, Viman Nagar, Pune',
    propertyType: 'hotel',
    rebateEligible: false,
    lat: 18.5621,
    lng: 73.9167,
    mapX: 74,
    mapY: 28,
    distanceKm: 3.1,
    walkMins: 10,
    rating: 4.8,
    reviews: 210,
    pricePerHour: 60,
    chargingAvailable: true,
    plugTypes: ['CCS2', 'Type 2'],
    primaryPlug: 'CCS2',
    chargerKw: 22,
    kwhRate: 14,
    isActive: true,
    status: 'available',
    bayLabel: 'Bay B2',
    totalBays: 12,
    activeBays: 9,
    amenities: ['CCTV', 'Covered', 'Security', 'Wi-Fi'],
    vehicleTypes: 'Hatchback, Sedan, SUV, EV',
    heightLimit: '2.4 m',
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
    windows: ['10:00 AM – 12:00 PM', '12:00 PM – 02:00 PM', '02:00 PM – 04:00 PM']
  },
  {
    id: 'spot-baner-society',
    title: 'Emerald Greens Co-op Society',
    area: 'Baner High Street',
    address: 'Baner Balewadi High Street, Pune',
    propertyType: 'society',
    rebateEligible: true,
    lat: 18.5590,
    lng: 73.7868,
    mapX: 25,
    mapY: 36,
    distanceKm: 1.4,
    walkMins: 3,
    rating: 4.7,
    reviews: 89,
    pricePerHour: 40,
    chargingAvailable: true,
    plugTypes: ['Type 2', '15A'],
    primaryPlug: 'Type 2',
    chargerKw: 7.4,
    kwhRate: 12,
    isActive: true,
    status: 'available',
    bayLabel: 'Society Visitor Bay 04',
    totalBays: 6,
    activeBays: 4,
    amenities: ['CCTV', 'Covered', 'Security'],
    vehicleTypes: 'Sedan, Compact SUV, EV',
    heightLimit: '2.0 m',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    windows: ['09:00 AM – 11:00 AM', '11:00 AM – 01:00 PM', '02:00 PM – 04:00 PM']
  },
  {
    id: 'spot-business-tower',
    title: 'Business Tower West',
    area: 'Aundh',
    address: 'ITI Road, Aundh, Pune',
    propertyType: 'society',
    rebateEligible: true,
    lat: 18.5580,
    lng: 73.8075,
    mapX: 38,
    mapY: 56,
    distanceKm: 3.8,
    walkMins: 12,
    rating: 4.3,
    reviews: 54,
    pricePerHour: 80,
    chargingAvailable: false,
    plugTypes: [],
    primaryPlug: 'None',
    chargerKw: 0,
    kwhRate: 0,
    isActive: true,
    status: 'limited',
    bayLabel: 'Basement P1-14',
    totalBays: 4,
    activeBays: 1,
    amenities: ['CCTV', 'Covered', 'Security'],
    vehicleTypes: 'Sedan, SUV',
    heightLimit: '2.2 m',
    image: 'https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&w=800&q=80',
    windows: ['10:00 AM – 12:00 PM', '04:00 PM – 06:00 PM']
  },
  {
    id: 'spot-green-valley',
    title: 'Green Valley Residency',
    area: 'Hinjawadi Phase 1',
    address: 'Near Rajiv Gandhi Infotech Park, Hinjawadi, Pune',
    propertyType: 'society',
    rebateEligible: true,
    lat: 18.5913,
    lng: 73.7389,
    mapX: 16,
    mapY: 68,
    distanceKm: 4.2,
    walkMins: 14,
    rating: 4.5,
    reviews: 67,
    pricePerHour: 55,
    chargingAvailable: true,
    plugTypes: ['Type 2', '15A'],
    primaryPlug: 'Type 2',
    chargerKw: 11,
    kwhRate: 13,
    isActive: true,
    status: 'available',
    bayLabel: 'Bay C2',
    totalBays: 5,
    activeBays: 4,
    amenities: ['CCTV', 'Security', 'Wi-Fi'],
    vehicleTypes: 'All EVs & Sedans',
    heightLimit: '2.1 m',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    windows: ['09:00 AM – 11:00 AM', '11:00 AM – 01:00 PM', '01:00 PM – 03:00 PM']
  },
  {
    id: 'spot-deccan-plaza',
    title: 'Deccan Plaza OYO Townhouse',
    area: 'Deccan Gymkhana',
    address: 'FC Road Junction, Pune',
    propertyType: 'hotel',
    rebateEligible: false,
    lat: 18.5195,
    lng: 73.8415,
    mapX: 62,
    mapY: 72,
    distanceKm: 1.9,
    walkMins: 5,
    rating: 4.2,
    reviews: 41,
    pricePerHour: 70,
    chargingAvailable: true,
    plugTypes: ['15A'],
    primaryPlug: '15A',
    chargerKw: 3.3,
    kwhRate: 12,
    isActive: true,
    status: 'booked',
    bayLabel: 'Front Court 02',
    totalBays: 3,
    activeBays: 0,
    amenities: ['CCTV', 'Security'],
    vehicleTypes: '2W, Hatchback, Sedan',
    heightLimit: 'Open Sky',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    windows: ['12:00 PM – 02:00 PM']
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'PVK123456789',
    spotId: 'spot-grand-hotel',
    spotTitle: 'The Grand Hotel',
    area: 'Koregaon Park, Pune',
    bayLabel: 'Bay A1',
    date: 'Sat, 24 May 2026',
    timeSlot: '10:00 AM – 12:00 PM',
    durationHours: 2,
    vehiclePlate: 'MH12AB1234',
    vehicleModel: 'Tesla Model 3 / Tata Nexon EV',
    connectorType: 'CCS2',
    estKwh: 10,
    kwhRate: 12,
    hourlyRate: 50,
    parkingFee: 100, // Exact ₹220 fixture
    electricityCost: 120, // 10 kWh * ₹12
    totalPrice: 220,
    platformCommission: 44, // 20%
    hostShare: 176, // 80%
    communityRebate: 11, // 5% of 220 funded from platform 44
    platformNet: 33, // 44 - 11
    preAuthHold: 1200, // 4 overstay blocks hold
    holdCaptured: 0,
    status: 'active', // confirmed | active | completed | cancelled | overstay
    qrSignature: 'HMAC-SHA256-PVK123456789-VALID',
    qrUsed: false,
    enteredAt: '10:02 AM',
    powerState: 'ON',
    paymentMethod: 'UPI'
  },
  {
    id: 'PVK987654321',
    spotId: 'spot-baner-society',
    spotTitle: 'Emerald Greens Co-op Society',
    area: 'Baner High Street, Pune',
    bayLabel: 'Bay A3',
    date: 'Fri, 23 May 2026',
    timeSlot: '02:00 PM – 03:00 PM',
    durationHours: 1,
    vehiclePlate: 'MH14CD5678',
    vehicleModel: 'MG ZS EV',
    connectorType: 'Type 2',
    estKwh: 5,
    kwhRate: 12,
    hourlyRate: 40,
    parkingFee: 40,
    electricityCost: 60,
    totalPrice: 100,
    platformCommission: 20,
    hostShare: 80,
    communityRebate: 5,
    platformNet: 15,
    preAuthHold: 480,
    holdCaptured: 0,
    status: 'completed',
    qrSignature: 'HMAC-SHA256-PVK987654321-USED',
    qrUsed: true,
    enteredAt: '02:01 PM',
    powerState: 'OFF',
    paymentMethod: 'Wallet'
  }
];

const INITIAL_SCANS = [
  {
    id: 'scan-1',
    time: '10:24 AM',
    plate: 'MH12AB1234',
    vehicle: 'Tesla Model 3',
    bay: 'Bay A1',
    verdict: 'VALID',
    reason: 'Entry recorded',
    bookingId: 'PVK123456789'
  },
  {
    id: 'scan-2',
    time: '10:18 AM',
    plate: 'KA05MN6789',
    vehicle: 'Hyundai Kona EV',
    bay: 'Bay C2',
    verdict: 'INVALID',
    reason: 'Expired pass (Window ended 10:00 AM)',
    bookingId: 'PVK555111222'
  },
  {
    id: 'scan-3',
    time: '10:12 AM',
    plate: 'DL08PQ3456',
    vehicle: 'Tata Tiago EV',
    bay: 'Bay B1',
    verdict: 'VALID',
    reason: 'Entry recorded',
    bookingId: 'PVK444333111'
  },
  {
    id: 'scan-4',
    time: '10:03 AM',
    plate: 'BR01XY9876',
    vehicle: 'Mahindra XUV400',
    bay: 'Bay A4',
    verdict: 'CAUTION',
    reason: 'Vehicle plate mismatch at gate',
    bookingId: 'PVK777888999'
  }
];

// ============================================================================
// SHARED PRICING & OVERSTAY ENGINE (MATCHING SECTION 12 & 16 OF DOCS)
// ============================================================================
function calculateSessionPricing({
  parkingFee,
  estKwh,
  kwhRate,
  chargingEnabled,
  rebateEligible,
  overstayMinutes = 0,
  hourlyParkingRateForOverstay = 100, // Documented example: ₹100/hr rate -> 20 min = 2 blocks = ₹600
  preAuthHold = 1200
}) {
  const cleanParking = Math.round(parkingFee);
  const cleanEnergy = chargingEnabled ? Math.round(estKwh * kwhRate) : 0;
  const sessionTotal = cleanParking + cleanEnergy;

  // 20% Platform commission, 80% Host share
  const platformCommission = Math.round(sessionTotal * 0.20);
  const hostShare = sessionTotal - platformCommission;

  // 5% Community rebate funded out of the platform's 20% commission
  const communityRebate = rebateEligible ? Math.round(sessionTotal * 0.05) : 0;
  const platformNet = platformCommission - communityRebate;

  // Overstay rule: 3x full hourly parking fee per started 15-minute block
  const overstayBlocks = overstayMinutes > 0 ? Math.ceil(overstayMinutes / 15) : 0;
  const penaltyPerBlock = hourlyParkingRateForOverstay * 3;
  const rawPenalty = overstayBlocks * penaltyPerBlock;
  const holdDrawn = Math.min(rawPenalty, preAuthHold);
  const holdRemaining = Math.max(0, preAuthHold - holdDrawn);
  const isEscalated = rawPenalty >= preAuthHold && preAuthHold > 0;

  // Overstay split (80/20 per Section 1.7 / F4)
  const penaltyPlatformCut = Math.round(holdDrawn * 0.20);
  const penaltyHostCut = holdDrawn - penaltyPlatformCut;

  return {
    parkingFee: cleanParking,
    electricityCost: cleanEnergy,
    sessionTotal,
    platformCommission,
    hostShare,
    communityRebate,
    platformNet,
    overstayBlocks,
    penaltyPerBlock,
    rawPenalty,
    holdDrawn,
    holdRemaining,
    isEscalated,
    penaltyHostCut,
    penaltyPlatformCut,
    grandTotalWithPenalty: sessionTotal + holdDrawn
  };
}

// ============================================================================
// CUSTOM SVG QR CODE COMPONENT (HIGH CONTRAST QUIET ZONE)
// ============================================================================
function DynamicQRCode({ value = 'PVK123456789', size = 180, dimmed = false }) {
  const cells = useMemo(() => {
    const grid = [];
    let seed = 0;
    for (let i = 0; i < value.length; i++) {
      seed = (seed * 31 + value.charCodeAt(i)) % 100000;
    }
    for (let r = 0; r < 15; r++) {
      const row = [];
      for (let c = 0; c < 15; c++) {
        const isFinderTL = r < 4 && c < 4;
        const isFinderTR = r < 4 && c > 10;
        const isFinderBL = r > 10 && c < 4;
        if (isFinderTL || isFinderTR || isFinderBL) {
          const isOuter =
            r === 0 || r === 3 || c === 0 || c === 3 ||
            r === 11 || r === 14 || c === 11 || c === 14;
          const isCenter =
            (r >= 1 && r <= 2 && c >= 1 && c <= 2) ||
            (r >= 1 && r <= 2 && c >= 12 && c <= 13) ||
            (r >= 12 && r <= 13 && c >= 1 && c <= 2);
          row.push(isOuter || isCenter);
        } else {
          const v = (r * 19 + c * 37 + seed) % 7;
          row.push(v < 3);
        }
      }
      grid.push(row);
    }
    return grid;
  }, [value]);

  return (
    <div
      className={`bg-white p-3.5 rounded-2xl shadow-md inline-block border-2 border-slate-200 transition-opacity ${
        dimmed ? 'opacity-40 grayscale' : 'opacity-100'
      }`}
    >
      <svg width={size} height={size} viewBox="0 0 15 15" shapeRendering="crispEdges">
        {cells.map((row, rIdx) =>
          row.map((filled, cIdx) =>
            filled ? (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx}
                y={rIdx}
                width={1}
                height={1}
                fill="#0F172A"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION
// ============================================================================
export default function App() {
  // Navigation & Role State
  const [role, setRole] = useState('customer'); // 'landing' | 'login' | 'customer' | 'provider' | 'guard' | 'admin'
  const [customerTab, setCustomerTab] = useState('explore'); // 'dashboard' | 'explore' | 'spot-detail' | 'checkout' | 'active-session' | 'bookings'
  const [providerTab, setProviderTab] = useState('dashboard'); // 'dashboard' | 'spaces' | 'calendar' | 'earnings'
  const [guardTab, setGuardTab] = useState('verify'); // 'verify' | 'history'

  // Determine current index in PRESENTATION_STEPS for Back & Next buttons
  const currentStepIndex = useMemo(() => {
    const idx = PRESENTATION_STEPS.findIndex((s) => {
      if (s.role !== role) return false;
      if (role === 'customer') {
        if (customerTab === 'checkout' && s.subTab === 'spot-detail') return true;
        return s.subTab === customerTab;
      }
      if (role === 'provider') {
        if (providerTab === 'earnings' && s.subTab === 'calendar') return true;
        return s.subTab === providerTab;
      }
      if (role === 'guard') return true;
      return true;
    });
    return idx === -1 ? 0 : idx;
  }, [role, customerTab, providerTab]);

  const applyStep = useCallback((step) => {
    setRole(step.role);
    if (step.role === 'customer' && step.subTab) {
      setCustomerTab(step.subTab);
    } else if (step.role === 'provider' && step.subTab) {
      setProviderTab(step.subTab);
    } else if (step.role === 'guard' && step.subTab) {
      setGuardTab(step.subTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goPrevTab = useCallback(() => {
    const prevIdx =
      (currentStepIndex - 1 + PRESENTATION_STEPS.length) % PRESENTATION_STEPS.length;
    applyStep(PRESENTATION_STEPS[prevIdx]);
  }, [currentStepIndex, applyStep]);

  const goNextTab = useCallback(() => {
    const nextIdx = (currentStepIndex + 1) % PRESENTATION_STEPS.length;
    applyStep(PRESENTATION_STEPS[nextIdx]);
  }, [currentStepIndex, applyStep]);

  // Support Left / Right keyboard arrows (when not typing in an input)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
      if (e.key === 'ArrowLeft') {
        goPrevTab();
      } else if (e.key === 'ArrowRight') {
        goNextTab();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrevTab, goNextTab]);

  // Persistent Data State (localStorage backed for refresh resilience)
  const [spots, setSpots] = useState(() => {
    try {
      const saved = localStorage.getItem('parkvolt_spots_v1');
      return saved ? JSON.parse(saved) : INITIAL_SPOTS;
    } catch {
      return INITIAL_SPOTS;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('parkvolt_bookings_v1');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [scans, setScans] = useState(() => {
    try {
      const saved = localStorage.getItem('parkvolt_scans_v1');
      return saved ? JSON.parse(saved) : INITIAL_SCANS;
    } catch {
      return INITIAL_SCANS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('parkvolt_spots_v1', JSON.stringify(spots));
      localStorage.setItem('parkvolt_bookings_v1', JSON.stringify(bookings));
      localStorage.setItem('parkvolt_scans_v1', JSON.stringify(scans));
    } catch {
      // Ignore storage quota errors in sandboxed iframes
    }
  }, [spots, bookings, scans]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('both'); // 'charging' | 'parking' | 'both'
  const [selectedPlugs, setSelectedPlugs] = useState(['CCS2', 'Type 2', '15A']);
  const [maxPriceFilter, setMaxPriceFilter] = useState(500);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'price'

  // Active Spot & Booking Draft State
  const [selectedSpotId, setSelectedSpotId] = useState('spot-grand-hotel');
  const [bookingDate, setBookingDate] = useState('Sat, 24 May 2026');
  const [selectedSlot, setSelectedSlot] = useState('12:00 PM – 02:00 PM');
  const [vehiclePlate, setVehiclePlate] = useState('MH12AB1234');
  const [vehicleModel, setVehicleModel] = useState('Tesla Model 3');
  const [selectedConnector, setSelectedConnector] = useState('CCS2');
  const [wantCharging, setWantCharging] = useState(true);
  const [targetKwh, setTargetKwh] = useState(10); // 10 kWh * ₹12 = ₹120
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [useFixture220Mode, setUseFixture220Mode] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Active Session & Demo Clock State
  const [activeBookingId, setActiveBookingId] = useState('PVK123456789');
  const [demoClockMode, setDemoClockMode] = useState('normal');
  const [simulatedKwhProgress, setSimulatedKwhProgress] = useState(10);

  // Guard Verification State
  const [guardScanPreset, setGuardScanPreset] = useState('valid'); // 'valid' | 'already_used' | 'expired' | 'mismatch'
  const [manualPlateInput, setManualPlateInput] = useState('');

  // New Space Modal State (Provider)
  const [showNewSpaceModal, setShowNewSpaceModal] = useState(false);
  const [newSpaceTitle, setNewSpaceTitle] = useState('');
  const [newSpaceArea, setNewSpaceArea] = useState('Baner High Street');
  const [newSpacePrice, setNewSpacePrice] = useState(60);
  const [newSpaceKwhRate, setNewSpaceKwhRate] = useState(12);
  const [newSpacePlug, setNewSpacePlug] = useState('CCS2');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const resetDemoData = () => {
    setSpots(INITIAL_SPOTS);
    setBookings(INITIAL_BOOKINGS);
    setScans(INITIAL_SCANS);
    setSelectedSpotId('spot-grand-hotel');
    setActiveBookingId('PVK123456789');
    setDemoClockMode('normal');
    setGuardScanPreset('valid');
    triggerToast('Demo data reset to clean Pune seed state (₹220 fixture ready)');
  };

  // Current Selected Spot
  const selectedSpot = useMemo(
    () => spots.find((s) => s.id === selectedSpotId) || spots[0],
    [spots, selectedSpotId]
  );

  // Current Active Booking
  const activeBooking = useMemo(
    () => bookings.find((b) => b.id === activeBookingId) || bookings[0],
    [bookings, activeBookingId]
  );

  // Filtered Spots for Discovery
  const filteredSpots = useMemo(() => {
    return spots
      .filter((s) => {
        if (!s.isActive) return false;
        if (
          searchQuery.trim() &&
          !`${s.title} ${s.area} ${s.address}`.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        if (filterMode === 'charging' && !s.chargingAvailable) return false;
        if (filterMode === 'parking' && s.chargingAvailable) return false;
        if (s.pricePerHour > maxPriceFilter) return false;
        if (s.chargingAvailable && selectedPlugs.length > 0) {
          const matchesPlug = s.plugTypes.some((p) => selectedPlugs.includes(p));
          if (!matchesPlug && filterMode === 'charging') return false;
        }
        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every((a) => s.amenities.includes(a));
          if (!hasAll) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price') return a.pricePerHour - b.pricePerHour;
        return a.distanceKm - b.distanceKm;
      });
  }, [spots, searchQuery, filterMode, selectedPlugs, maxPriceFilter, selectedAmenities, sortBy]);

  // Upfront Price Calculation for Current Checkout Draft
  const draftPricing = useMemo(() => {
    const isGrandHotelFixture =
      selectedSpot.id === 'spot-grand-hotel' && useFixture220Mode;
    const parkingFee = isGrandHotelFixture
      ? 100
      : selectedSpot.pricePerHour * 2;
    const chargingEnabled = selectedSpot.chargingAvailable && wantCharging;
    const kwhRate = selectedSpot.kwhRate || 12;
    const estKwh = isGrandHotelFixture ? 10 : targetKwh;

    return calculateSessionPricing({
      parkingFee,
      estKwh,
      kwhRate,
      chargingEnabled,
      rebateEligible: selectedSpot.rebateEligible,
      overstayMinutes: 0,
      hourlyParkingRateForOverstay: isGrandHotelFixture ? 100 : selectedSpot.pricePerHour,
      preAuthHold: isGrandHotelFixture ? 1200 : selectedSpot.pricePerHour * 12
    });
  }, [selectedSpot, wantCharging, targetKwh, useFixture220Mode]);

  // Active Session Live Pricing + Overstay Calculation
  const activeSessionMetrics = useMemo(() => {
    const overstayMins =
      demoClockMode === 'overstay20'
        ? 20
        : demoClockMode === 'overstay65'
        ? 65
        : 0;
    const calc = calculateSessionPricing({
      parkingFee: activeBooking.parkingFee,
      estKwh: simulatedKwhProgress,
      kwhRate: activeBooking.kwhRate,
      chargingEnabled: activeBooking.electricityCost > 0,
      rebateEligible: true,
      overstayMinutes: overstayMins,
      hourlyParkingRateForOverstay: 100,
      preAuthHold: activeBooking.preAuthHold || 1200
    });

    let timerDisplay = '01:45:32';
    let alertBanner = null;

    if (demoClockMode === 't30') {
      timerDisplay = '00:29:45';
      alertBanner = {
        tier: 'T-30',
        bg: 'bg-amber-100 border-amber-400 text-amber-900',
        title: '30 min remaining',
        desc: 'Reminder: Session expires soon. Please wrap up or extend if free.'
      };
    } else if (demoClockMode === 't15') {
      timerDisplay = '00:14:20';
      alertBanner = {
        tier: 'T-15',
        bg: 'bg-orange-100 border-orange-500 text-orange-950',
        title: '15 min remaining — Urgent',
        desc: 'Overstay penalty (3× hourly rate / 15 min) begins automatically at expiry.'
      };
    } else if (demoClockMode === 't5') {
      timerDisplay = '00:04:50';
      alertBanner = {
        tier: 'T-5',
        bg: 'bg-red-100 border-red-600 text-red-950 animate-pulse',
        title: '5 min remaining — Final Alert',
        desc: 'Power socket interlock will turn OFF at booking end.'
      };
    } else if (demoClockMode === 'overstay20') {
      timerDisplay = '+00:20:14';
      alertBanner = {
        tier: 'OVERSTAY',
        bg: 'bg-[#991B1B] border-red-950 text-white',
        title: `OVERSTAY ACTIVE • ${calc.overstayBlocks} Blocks Started (20 mins late)`,
        desc: `3× ₹100/hr = ₹300 per 15-min block. ₹${calc.holdDrawn} drawn from your ₹${activeBooking.preAuthHold} pre-auth hold.`
      };
    } else if (demoClockMode === 'overstay65') {
      timerDisplay = '+01:05:00';
      alertBanner = {
        tier: 'ESCALATED',
        bg: 'bg-[#7F1D1D] border-black text-white',
        title: `HOLD EXHAUSTED & ESCALATED • ${calc.overstayBlocks} Blocks Started`,
        desc: `Max pre-auth hold (₹${activeBooking.preAuthHold}) exhausted. Session flagged ESCALATED for Host & Society Security review.`
      };
    }

    return {
      ...calc,
      timerDisplay,
      alertBanner,
      isOverstay: overstayMins > 0
    };
  }, [activeBooking, demoClockMode, simulatedKwhProgress]);

  // Provider Aggregate Metrics
  const providerMetrics = useMemo(() => {
    const baseRevenue = 24460;
    const dynamicGross = bookings.reduce((acc, b) => acc + b.totalPrice, 0);
    const dynamicHostShare = bookings.reduce((acc, b) => acc + b.hostShare, 0);
    const dynamicCommission = bookings.reduce((acc, b) => acc + b.platformCommission, 0);
    const dynamicRebate = bookings.reduce((acc, b) => acc + b.communityRebate, 0);
    const activeCount = spots.filter((s) => s.isActive).length;

    return {
      displayTotalEarnings: baseRevenue + (dynamicGross - 100),
      dynamicGross,
      dynamicHostShare,
      dynamicCommission,
      dynamicRebate,
      completedSessions: 46 + bookings.length,
      activeSpacesCount: activeCount,
      totalSpacesCount: spots.length
    };
  }, [bookings, spots]);

  // Complete Simulated Checkout Handler
  const handleCompleteCheckout = () => {
    if (!vehiclePlate.trim()) {
      triggerToast('Please enter a valid vehicle registration plate (e.g. MH12AB1234)');
      return;
    }
    const conflict = bookings.find(
      (b) =>
        b.spotId === selectedSpot.id &&
        b.date === bookingDate &&
        b.timeSlot === selectedSlot &&
        b.status !== 'cancelled'
    );
    if (conflict) {
      triggerToast('Double-Booking Blocked: This slot is already reserved! Pick another window.');
      return;
    }

    const newId = `PVK${Math.floor(100000000 + Math.random() * 900000000)}`;
    const newBooking = {
      id: newId,
      spotId: selectedSpot.id,
      spotTitle: selectedSpot.title,
      area: `${selectedSpot.area}, Pune`,
      bayLabel: selectedSpot.bayLabel,
      date: bookingDate,
      timeSlot: selectedSlot,
      durationHours: 2,
      vehiclePlate: vehiclePlate.toUpperCase().replace(/\s+/g, ''),
      vehicleModel: vehicleModel || 'EV / Sedan',
      connectorType: selectedSpot.chargingAvailable && wantCharging ? selectedConnector : 'None',
      estKwh: selectedSpot.chargingAvailable && wantCharging ? (useFixture220Mode && selectedSpot.id === 'spot-grand-hotel' ? 10 : targetKwh) : 0,
      kwhRate: selectedSpot.kwhRate || 12,
      hourlyRate: selectedSpot.pricePerHour,
      parkingFee: draftPricing.parkingFee,
      electricityCost: draftPricing.electricityCost,
      totalPrice: draftPricing.sessionTotal,
      platformCommission: draftPricing.platformCommission,
      hostShare: draftPricing.hostShare,
      communityRebate: draftPricing.communityRebate,
      platformNet: draftPricing.platformNet,
      preAuthHold: 1200,
      holdCaptured: 0,
      status: 'active',
      qrSignature: `HMAC-SHA256-${newId}-SIGNED`,
      qrUsed: false,
      enteredAt: null,
      powerState: selectedSpot.chargingAvailable && wantCharging ? 'ON' : 'OFF',
      paymentMethod
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newId);
    setSimulatedKwhProgress(newBooking.estKwh || 0);
    setDemoClockMode('normal');
    setCustomerTab('active-session');
    triggerToast(`Booking ${newId} confirmed! ₹${newBooking.totalPrice} paid (Simulated) + QR Pass generated.`);
  };

  // Host Toggle Spot Availability
  const handleToggleSpotAvailability = (spotId) => {
    setSpots((prev) =>
      prev.map((s) => {
        if (s.id !== spotId) return s;
        const nextState = !s.isActive;
        triggerToast(
          `${s.title} is now ${nextState ? 'Published & Visible on Map' : 'Paused (Hidden from new bookings)'}`
        );
        return { ...s, isActive: nextState, status: nextState ? 'available' : 'paused' };
      })
    );
  };

  // Host Add New Listing
  const handleCreateNewSpace = (e) => {
    e.preventDefault();
    if (!newSpaceTitle.trim()) return;
    const created = {
      id: `spot-${Date.now()}`,
      title: newSpaceTitle,
      area: newSpaceArea,
      address: `${newSpaceArea}, Pune`,
      propertyType: 'society',
      rebateEligible: true,
      lat: 18.55,
      lng: 73.85,
      mapX: Math.floor(20 + Math.random() * 60),
      mapY: Math.floor(25 + Math.random() * 50),
      distanceKm: 2.1,
      walkMins: 6,
      rating: 4.9,
      reviews: 1,
      pricePerHour: Number(newSpacePrice) || 60,
      chargingAvailable: newSpacePlug !== 'None',
      plugTypes: newSpacePlug !== 'None' ? [newSpacePlug] : [],
      primaryPlug: newSpacePlug,
      chargerKw: 7.4,
      kwhRate: Number(newSpaceKwhRate) || 12,
      isActive: true,
      status: 'available',
      bayLabel: 'Bay N1',
      totalBays: 2,
      activeBays: 2,
      amenities: ['CCTV', 'Covered', 'Security'],
      vehicleTypes: 'Sedan, SUV, EV',
      heightLimit: '2.1 m',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
      windows: ['10:00 AM – 12:00 PM', '12:00 PM – 02:00 PM', '02:00 PM – 04:00 PM']
    };
    setSpots((prev) => [created, ...prev]);
    setShowNewSpaceModal(false);
    setNewSpaceTitle('');
    triggerToast(`New listing "${created.title}" published to the Pune Marketplace!`);
  };

  // Guard Allow / Deny Action
  const handleGuardDecision = (decision) => {
    const currentPass = activeBooking;
    let verdict = 'VALID';
    let reason = 'Entry recorded • Plate verified';
    let plate = currentPass.vehiclePlate;

    if (guardScanPreset === 'already_used' || currentPass.qrUsed) {
      verdict = 'CAUTION';
      reason = 'Single-entry pass already used';
    } else if (guardScanPreset === 'expired') {
      verdict = 'INVALID';
      reason = 'Expired pass window';
      plate = 'KA05MN6789';
    } else if (guardScanPreset === 'mismatch') {
      verdict = 'CAUTION';
      reason = 'Vehicle plate mismatch';
      plate = 'BR01XY9876';
    }

    if (decision === 'deny') {
      verdict = 'INVALID';
      reason = 'Denied at gate by Guard';
    }

    const scanRecord = {
      id: `scan-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      plate,
      vehicle: currentPass.vehicleModel,
      bay: currentPass.bayLabel,
      verdict,
      reason,
      bookingId: currentPass.id
    };

    setScans((prev) => [scanRecord, ...prev]);

    if (decision === 'allow' && verdict === 'VALID') {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === currentPass.id
            ? { ...b, qrUsed: true, enteredAt: scanRecord.time, powerState: 'ON' }
            : b
        )
      );
      triggerToast(`Gate Approved for ${plate}! Pass marked single-entry USED & Charger Power ON.`);
    } else {
      triggerToast(`Gate Scan Logged: ${verdict} (${reason})`);
    }
  };

  // Manual Plate Lookup for Guard
  const handleManualLookup = (e) => {
    e.preventDefault();
    if (!manualPlateInput.trim()) return;
    const clean = manualPlateInput.toUpperCase().replace(/\s+/g, '');
    const match = bookings.find((b) => b.vehiclePlate.toUpperCase() === clean);
    if (match) {
      setActiveBookingId(match.id);
      setGuardScanPreset(match.qrUsed ? 'already_used' : 'valid');
      setGuardTab('verify');
      triggerToast(`Found booking ${match.id} for plate ${clean}`);
    } else {
      setGuardScanPreset('expired');
      setGuardTab('verify');
      triggerToast(`No active booking found for ${clean} — Showing Invalid Verdict`);
    }
  };

  const currentStepObj = PRESENTATION_STEPS[currentStepIndex] || PRESENTATION_STEPS[0];
  const prevStepObj =
    PRESENTATION_STEPS[
      (currentStepIndex - 1 + PRESENTATION_STEPS.length) % PRESENTATION_STEPS.length
    ];
  const nextStepObj =
    PRESENTATION_STEPS[(currentStepIndex + 1) % PRESENTATION_STEPS.length];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#0E7490] selection:text-white pb-16">
      {/* ====================================================================
          TOP BRAND HEADER + JUDGE ROLE SWITCHER BAR (EXACT UI BOARD HEADER)
      ==================================================================== */}
      <header className="bg-[#0A252A] text-white sticky top-0 z-50 shadow-lg border-b border-teal-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRole('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#0E7490] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="font-black text-xl tracking-tighter text-white">P</span>
                <Zap className="w-4 h-4 text-emerald-200 -ml-1 -mt-2 fill-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-white">ParkVolt</span>
                  <span className="hidden md:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Pune MVP Prototype
                  </span>
                </div>
                <p className="text-[11px] text-teal-200/80 hidden sm:block">
                  Private Parking. EV Charging. Real People.
                </p>
              </div>
            </button>
          </div>

          {/* Public Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-teal-100/90">
            <button
              onClick={() => setRole('landing')}
              className={`hover:text-white transition ${role === 'landing' ? 'text-emerald-400 font-semibold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setRole('customer');
                setCustomerTab('explore');
              }}
              className="hover:text-white transition"
            >
              Explore Map
            </button>
            <button
              onClick={() => {
                setRole('customer');
                setSelectedSpotId('spot-grand-hotel');
                setCustomerTab('checkout');
              }}
              className="hover:text-white transition"
            >
              ₹220 Pricing Demo
            </button>
            <button
              onClick={() => setRole('login')}
              className={`px-3 py-1.5 rounded-lg border border-teal-700 hover:bg-teal-900/60 transition ${
                role === 'login' ? 'bg-teal-900 text-white' : ''
              }`}
            >
              Login / Sign Up
            </button>
          </nav>

          {/* One Platform, Three Experiences Pill Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#071B1F] p-1.5 rounded-xl border border-teal-800/80">
            <div className="hidden lg:block px-2 text-right leading-tight">
              <div className="text-[10px] text-teal-300/80 font-medium">One platform.</div>
              <div className="text-[11px] text-white font-bold">Three experiences.</div>
            </div>

            <button
              onClick={() => {
                setRole('customer');
                setCustomerTab('explore');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'customer'
                  ? 'bg-[#087443] text-white shadow-sm ring-1 ring-emerald-400/50'
                  : 'text-teal-100 hover:bg-teal-900/50'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-emerald-300" />
              <div className="text-left">
                <div>Customer</div>
                <div className="text-[9px] opacity-80 hidden sm:block">Find & Book</div>
              </div>
            </button>

            <button
              onClick={() => {
                setRole('provider');
                setProviderTab('dashboard');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'provider'
                  ? 'bg-[#0E7490] text-white shadow-sm ring-1 ring-cyan-400/50'
                  : 'text-teal-100 hover:bg-teal-900/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-cyan-300" />
              <div className="text-left">
                <div>Provider</div>
                <div className="text-[9px] opacity-80 hidden sm:block">List & Earn</div>
              </div>
            </button>

            <button
              onClick={() => {
                setRole('guard');
                setGuardTab('verify');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'guard'
                  ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-300/50'
                  : 'text-teal-100 hover:bg-teal-900/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-200" />
              <div className="text-left">
                <div>Guard</div>
                <div className="text-[9px] opacity-80 hidden sm:block">Verify & Allow</div>
              </div>
            </button>

            <button
              onClick={() => setRole('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'admin'
                  ? 'bg-slate-700 text-white ring-1 ring-slate-400'
                  : 'text-teal-200 hover:bg-teal-900/50'
              }`}
              title="Admin & Fee Split Ledger"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Judge Ledger</span>
            </button>
          </div>
        </div>

        {/* JUDGE FAST-TRACK BAR + BACK & NEXT TAB BUTTONS */}
        <div className="bg-[#0D3138] border-t border-teal-800/60 px-4 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            {/* LEFT: Back / Next Buttons + Current Step Indicator */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={goPrevTab}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#087443] hover:bg-emerald-600 text-white font-bold shadow-sm transition active:scale-95"
                title={`Previous: ${prevStepObj.label}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <div className="px-2.5 py-1 rounded-lg bg-teal-950/90 border border-teal-700 text-emerald-300 font-bold text-[11px] font-variant-numeric tabular-nums">
                Step {currentStepIndex + 1}/{PRESENTATION_STEPS.length}: {currentStepObj.label}
              </div>

              <button
                onClick={goNextTab}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0E7490] hover:bg-[#155E75] text-white font-bold shadow-sm transition active:scale-95"
                title={`Next: ${nextStepObj.label}`}
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* CENTER: Quick-Jump Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              <button
                onClick={() => {
                  setRole('customer');
                  setCustomerTab('dashboard');
                }}
                className="px-2 py-0.5 rounded bg-teal-950/80 hover:bg-teal-800 text-teal-100 border border-teal-700/60 shrink-0"
              >
                Customer Home
              </button>
              <button
                onClick={() => {
                  setRole('customer');
                  setCustomerTab('explore');
                }}
                className="px-2 py-0.5 rounded bg-teal-950/80 hover:bg-teal-800 text-teal-100 border border-teal-700/60 shrink-0"
              >
                Map & Filters
              </button>
              <button
                onClick={() => {
                  setRole('customer');
                  setSelectedSpotId('spot-grand-hotel');
                  setUseFixture220Mode(true);
                  setCustomerTab('spot-detail');
                }}
                className="px-2 py-0.5 rounded bg-teal-950/80 hover:bg-teal-800 text-emerald-300 font-semibold border border-emerald-700/60 shrink-0"
              >
                ₹220 Checkout
              </button>
              <button
                onClick={() => {
                  setRole('customer');
                  setCustomerTab('active-session');
                }}
                className="px-2 py-0.5 rounded bg-teal-950/80 hover:bg-teal-800 text-teal-100 border border-teal-700/60 shrink-0"
              >
                QR & Clock
              </button>
              <button
                onClick={() => {
                  setRole('guard');
                  setGuardTab('verify');
                }}
                className="px-2 py-0.5 rounded bg-teal-950/80 hover:bg-teal-800 text-amber-200 border border-amber-700/60 shrink-0"
              >
                Guard Scan
              </button>
              <button
                onClick={() => {
                  setRole('provider');
                  setProviderTab('dashboard');
                }}
                className="px-2 py-0.5 rounded bg-teal-950/80 hover:bg-teal-800 text-cyan-200 border border-cyan-700/60 shrink-0"
              >
                Provider ₹24,680
              </button>
            </div>

            {/* RIGHT: Reset Button */}
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1 text-[11px] text-teal-200 hover:text-white bg-teal-900/60 px-2.5 py-0.5 rounded border border-teal-700 shrink-0"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </header>

      {/* FLOATING BOTTOM-CENTER BACK / NEXT PRESENTATION NAVIGATOR */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#0A252A]/95 backdrop-blur-md text-white px-3 py-2 rounded-2xl shadow-2xl border border-teal-600/60 flex items-center gap-3">
        <button
          onClick={goPrevTab}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-900/90 hover:bg-teal-700 text-xs font-bold border border-teal-700 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back</span>
        </button>

        <div className="text-center px-2 hidden sm:block">
          <div className="text-[10px] uppercase tracking-wider text-teal-300 font-semibold">
            Screen {currentStepIndex + 1} of {PRESENTATION_STEPS.length}
          </div>
          <div className="text-xs font-extrabold text-white">{currentStepObj.label}</div>
        </div>

        <button
          onClick={goNextTab}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#087443] hover:bg-emerald-600 text-xs font-bold shadow transition active:scale-95"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* TOAST NOTIFICATION BANNER */}
      {toastMessage && (
        <div className="fixed bottom-20 right-5 z-50 max-w-md bg-[#0A252A] text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          VIEW 1: PUBLIC LANDING PAGE (TOP-LEFT OF UI REFERENCE BOARD)
      ==================================================================== */}
      {role === 'landing' && (
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-[#092226] text-white overflow-hidden">
            <div
              className="absolute inset-0 opacity-35 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1800&q=80)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#092226] via-[#092226]/90 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" /> Peer-to-Peer Micro-Parking & Destination AC Charging
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  Private Parking.
                  <br />
                  <span className="text-emerald-400">EV Charging.</span>
                  <br />
                  Real People.
                </h1>

                <p className="text-lg text-teal-100/90 max-w-xl leading-relaxed">
                  Find, book and access secure gated parking and charging spaces near your destination within a 3-minute walk — or earn ₹2,500–₹5,000/month from your unused society or hotel bay.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => {
                      setRole('customer');
                      setCustomerTab('explore');
                    }}
                    className="flex items-center gap-3 bg-[#087443] hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-lg shadow-emerald-950/50 transition group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-base">I'm a Customer</div>
                      <div className="text-xs text-emerald-100">Find parking & charging</div>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      setRole('provider');
                      setProviderTab('dashboard');
                    }}
                    className="flex items-center gap-3 bg-[#15394B]/90 hover:bg-[#0E7490] text-white px-6 py-4 rounded-2xl border border-teal-500/40 shadow-lg transition group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-base">I'm a Provider</div>
                      <div className="text-xs text-teal-200">List your space & earn</div>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-teal-800/70 text-xs text-teal-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Verified Locations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Secure QR Entry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Transparent Pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>5% Society Rebate</span>
                  </div>
                </div>
              </div>

              {/* Interactive Quick-Preview Card on Hero */}
              <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0E7490]">
                      Live Pune Fixture Preview
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">The Grand Hotel • Bay A1</h3>
                    <p className="text-xs text-slate-500">Koregaon Park • 2.4 km (8 min walk)</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" /> Available
                  </span>
                </div>

                {/* Exact ₹220 Reference Breakdown */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5 text-sm font-variant-numeric tabular-nums">
                  <div className="flex justify-between text-slate-600">
                    <span>Parking Fee (2 hrs flat)</span>
                    <span className="font-semibold text-slate-900">₹100</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Electricity (10 kWh × ₹12/kWh)</span>
                    <span className="font-semibold text-slate-900">₹120</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-extrabold text-slate-900">
                    <span>Session Total Billed</span>
                    <span className="text-[#087443]">₹220</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-slate-300 text-xs space-y-1 text-slate-500">
                    <div className="flex justify-between">
                      <span>→ Host Payout (80%)</span>
                      <span className="font-bold text-emerald-700">₹176</span>
                    </div>
                    <div className="flex justify-between">
                      <span>→ Platform Commission (20%)</span>
                      <span className="font-semibold text-slate-700">₹44</span>
                    </div>
                    <div className="flex justify-between pl-3 text-[11px] text-teal-700">
                      <span>• 5% Society Maintenance Rebate (from ₹44)</span>
                      <span className="font-semibold">₹11</span>
                    </div>
                    <div className="flex justify-between pl-3 text-[11px]">
                      <span>• Platform Net Remainder</span>
                      <span className="font-semibold">₹33</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setRole('customer');
                      setSelectedSpotId('spot-grand-hotel');
                      setUseFixture220Mode(true);
                      setCustomerTab('spot-detail');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#0E7490] hover:bg-[#155E75] text-white font-bold text-sm transition shadow"
                  >
                    Book ₹220 Fixture
                  </button>
                  <button
                    onClick={() => {
                      setRole('guard');
                      setGuardTab('verify');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Shield className="w-4 h-4 text-emerald-400" /> Test Gate Scan
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features Strip */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0E7490] flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Smart Booking (Park + Charge)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Filter by CCS2, Type 2, or 15A sockets. Upfront hourly parking + kWh pricing.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#087443] flex items-center justify-center shrink-0">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Signed QR & Guard Verdict</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Single-entry HMAC-signed Visitor Pass with 3-second AAA high-contrast plate check.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Overstay Engine & Hold</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    30/15/5m alerts + automated 3× hourly fee per started 15-min block from pre-auth hold.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 text-[#15394B] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">80% Host Share + 5% Rebate</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Hosts keep 80%. Societies earn a 5% maintenance fund rebate paid out of ParkVolt's 20%.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ====================================================================
          VIEW 2: LOGIN & ROLE SELECTION (TOP-MIDDLE OF UI BOARD)
      ==================================================================== */}
      {role === 'login' && (
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-100">
          <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 grid md:grid-cols-12">
            {/* Left Dark Teal Role Switcher */}
            <div className="md:col-span-5 bg-[#0A252A] text-white p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#16A34A] flex items-center justify-center font-black">
                    P
                  </div>
                  <span className="font-extrabold text-xl">ParkVolt</span>
                </div>
                <h2 className="text-2xl font-bold pt-2">Welcome back!</h2>
                <p className="text-xs text-teal-200">Choose how you want to continue in the demo:</p>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      setRole('customer');
                      setCustomerTab('dashboard');
                      triggerToast('Logged in as Kartik (Customer Role)');
                    }}
                    className="w-full p-4 rounded-2xl bg-[#0F383F] hover:bg-[#144952] border-2 border-emerald-400/70 text-left transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Customer</div>
                        <div className="text-[11px] text-teal-200">Find parking & charging</div>
                        <div className="text-[10px] text-emerald-300 mt-1">
                          Explore • Book • Pay • Charge
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition" />
                  </button>

                  <button
                    onClick={() => {
                      setRole('provider');
                      setProviderTab('dashboard');
                      triggerToast('Logged in as The Grand Hotel (Provider Role)');
                    }}
                    className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-teal-700 text-left transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Provider (Host)</div>
                        <div className="text-[11px] text-teal-200">List your space & earn</div>
                        <div className="text-[10px] text-cyan-300 mt-1">
                          List • Manage • Earn • Withdraw
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition" />
                  </button>

                  <button
                    onClick={() => {
                      setRole('guard');
                      setGuardTab('verify');
                      triggerToast('Logged in as Gate 1 Security (Guard Role)');
                    }}
                    className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-teal-700 text-left transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">Security Guard</div>
                        <div className="text-[11px] text-teal-200">Gate QR & Plate Verification</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-teal-300/70">
                Demo Seeded Accounts • Role-Based Access Control Enabled
              </div>
            </div>

            {/* Right Login Form */}
            <div className="md:col-span-7 p-8 flex flex-col justify-center space-y-5">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Customer Login</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Welcome back! Please sign in to continue (Pre-filled for Judge Demo).
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email or Phone Number
                  </label>
                  <input
                    type="text"
                    defaultValue="kartik.sharma@parkvolt.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7490]"
                  />
                </div>

                <button
                  onClick={() => {
                    setRole('customer');
                    setCustomerTab('dashboard');
                    triggerToast('Signed in as Kartik Sharma');
                  }}
                  className="w-full py-3 rounded-xl bg-[#0E7490] hover:bg-[#155E75] text-white font-bold text-sm shadow transition"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          VIEW 3: CUSTOMER EXPERIENCE
      ==================================================================== */}
      {role === 'customer' && (
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
          {/* Left Customer Sidebar */}
          <aside className="lg:w-60 bg-[#0A252A] text-white p-4 flex lg:flex-col justify-between gap-2 overflow-x-auto lg:overflow-visible shrink-0">
            <div className="flex lg:flex-col gap-1.5 w-full">
              <button
                onClick={() => setCustomerTab('dashboard')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  customerTab === 'dashboard'
                    ? 'bg-[#0E7490] text-white shadow'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <CompassIcon />
                <span>Home Dashboard</span>
              </button>

              <button
                onClick={() => setCustomerTab('explore')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  customerTab === 'explore'
                    ? 'bg-[#0E7490] text-white shadow'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Explore Map</span>
              </button>

              <button
                onClick={() => setCustomerTab('spot-detail')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  customerTab === 'spot-detail' || customerTab === 'checkout'
                    ? 'bg-[#0E7490] text-white shadow'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Spot & Checkout</span>
              </button>

              <button
                onClick={() => setCustomerTab('active-session')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  customerTab === 'active-session'
                    ? 'bg-[#087443] text-white shadow ring-1 ring-emerald-400'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-300" />
                <span>QR Pass & Session</span>
              </button>

              <button
                onClick={() => setCustomerTab('bookings')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  customerTab === 'bookings'
                    ? 'bg-[#0E7490] text-white shadow'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>My Bookings ({bookings.length})</span>
              </button>
            </div>

            <div className="hidden lg:block p-3.5 rounded-xl bg-[#0F353C] border border-teal-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-teal-200">
                <span>Logged in Driver</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  KYC Verified
                </span>
              </div>
              <div className="font-bold text-white">Kartik Sharma</div>
              <div className="text-[11px] text-teal-300 font-mono">Plate: MH12AB1234</div>
            </div>
          </aside>

          {/* Main Customer Content Area */}
          <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
            {/* SUBVIEW 3A: CUSTOMER DASHBOARD */}
            {customerTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Good morning, Kartik!</h1>
                    <p className="text-xs text-slate-500">
                      Find the best private parking and slow AC charging spots near your destination in Pune.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-80 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Koregaon Park, Baner..."
                      className="bg-transparent text-sm w-full focus:outline-none"
                    />
                  </div>
                </div>

                {/* Dual Action Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setFilterMode('charging');
                      setCustomerTab('explore');
                    }}
                    className="bg-white hover:border-[#087443] p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between transition group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#087443] text-white flex items-center justify-center shadow">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Find Charging Station</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Near you • CCS2 / Type 2 / 15A • ₹12–₹14/kWh
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#087443] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      setFilterMode('parking');
                      setCustomerTab('explore');
                    }}
                    className="bg-white hover:border-[#0E7490] p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between transition group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#15394B] text-white flex items-center justify-center shadow font-extrabold text-lg">
                        P
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Find Parking Near Me</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Gated societies & hotels • 3-min walk • ₹40–₹80/hr
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#0E7490] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Dashboard Map + Quick Filter Panel */}
                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="relative h-80 bg-[#E6EEF0] overflow-hidden">
                      <InteractivePuneMap
                        spots={filteredSpots}
                        selectedSpotId={selectedSpotId}
                        onSelectSpot={(s) => {
                          setSelectedSpotId(s.id);
                        }}
                      />
                    </div>
                    <div className="p-4 bg-white flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedSpot.image}
                          alt={selectedSpot.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <div className="text-[11px] text-slate-500">Your selected destination</div>
                          <div className="font-bold text-slate-900 text-sm">
                            {selectedSpot.title} ({selectedSpot.area})
                          </div>
                          <div className="text-xs text-emerald-700 font-medium">
                            {selectedSpot.distanceKm} km • {selectedSpot.walkMins} min walk • ₹{selectedSpot.pricePerHour}/hr
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setCustomerTab('spot-detail')}
                        className="px-4 py-2.5 rounded-xl bg-[#0E7490] hover:bg-[#155E75] text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        View Spot & Book <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Filters Card */}
                  <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
                    <h3 className="font-bold text-slate-900 text-base">Quick Filters</h3>

                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={filterMode === 'charging'}
                          onChange={() => setFilterMode('charging')}
                          className="accent-[#087443]"
                        />
                        <span className="font-medium">Charging Available Only</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={filterMode === 'parking'}
                          onChange={() => setFilterMode('parking')}
                          className="accent-[#0E7490]"
                        />
                        <span className="font-medium">Parking Only</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={filterMode === 'both'}
                          onChange={() => setFilterMode('both')}
                          className="accent-[#0E7490]"
                        />
                        <span className="font-medium">Both (All Spaces)</span>
                      </label>
                    </div>

                    <div className="border-t border-slate-100 pt-4 space-y-2">
                      <div className="text-xs font-bold text-slate-700">Plug Type</div>
                      <div className="flex flex-wrap gap-2">
                        {['CCS2', 'Type 2', '15A'].map((plug) => {
                          const active = selectedPlugs.includes(plug);
                          return (
                            <button
                              key={plug}
                              onClick={() =>
                                setSelectedPlugs((prev) =>
                                  prev.includes(plug)
                                    ? prev.filter((p) => p !== plug)
                                    : [...prev, plug]
                                )
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                                active
                                  ? 'bg-[#0E7490] text-white border-[#0E7490]'
                                  : 'bg-slate-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              {plug}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={() => setCustomerTab('explore')}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                    >
                      Open Full Discovery Map ({filteredSpots.length} Spots)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUBVIEW 3B: MAP DISCOVERY & SEARCH RESULTS */}
            {customerTab === 'explore' && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-[240px] bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search destination, area or landmark (e.g., Koregaon Park, Baner)..."
                      className="bg-transparent text-sm w-full focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-medium">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800"
                    >
                      <option value="distance">Walking Distance (5 km/h est.)</option>
                      <option value="price">Hourly Rate (Low to High)</option>
                    </select>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-4 items-start">
                  {/* Left Filters Column */}
                  <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900">Filters</h3>
                      <button
                        onClick={() => {
                          setFilterMode('both');
                          setSelectedPlugs(['CCS2', 'Type 2', '15A']);
                          setMaxPriceFilter(500);
                          setSelectedAmenities([]);
                          setSearchQuery('');
                        }}
                        className="text-xs text-[#0E7490] font-semibold hover:underline"
                      >
                        Reset
                      </button>
                    </div>

                    <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        onClick={() => setFilterMode('charging')}
                        className={`py-1.5 rounded-lg transition ${
                          filterMode === 'charging' ? 'bg-[#087443] text-white shadow' : 'text-slate-600'
                        }`}
                      >
                        Charging
                      </button>
                      <button
                        onClick={() => setFilterMode('parking')}
                        className={`py-1.5 rounded-lg transition ${
                          filterMode === 'parking' ? 'bg-[#0E7490] text-white shadow' : 'text-slate-600'
                        }`}
                      >
                        Parking
                      </button>
                      <button
                        onClick={() => setFilterMode('both')}
                        className={`py-1.5 rounded-lg transition ${
                          filterMode === 'both' ? 'bg-[#0E7490] text-white shadow' : 'text-slate-600'
                        }`}
                      >
                        Both
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-700">Plug type</div>
                      <div className="flex flex-wrap gap-2">
                        {['CCS2', 'Type 2', '15A'].map((plug) => (
                          <label
                            key={plug}
                            className="flex items-center gap-1.5 text-xs bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPlugs.includes(plug)}
                              onChange={() =>
                                setSelectedPlugs((prev) =>
                                  prev.includes(plug)
                                    ? prev.filter((p) => p !== plug)
                                    : [...prev, plug]
                                )
                              }
                              className="accent-[#0E7490]"
                            />
                            <span>{plug}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-700">Max Hourly Rate</span>
                        <span className="font-bold text-[#0E7490] tabular-nums">₹{maxPriceFilter}/hr</span>
                      </div>
                      <input
                        type="range"
                        min={40}
                        max={200}
                        step={10}
                        value={maxPriceFilter}
                        onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                        className="w-full accent-[#0E7490]"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-700">Amenities</div>
                      {['Covered', 'Security', 'CCTV', 'Wi-Fi'].map((item) => (
                        <label key={item} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAmenities.includes(item)}
                            onChange={() =>
                              setSelectedAmenities((prev) =>
                                prev.includes(item)
                                  ? prev.filter((i) => i !== item)
                                  : [...prev, item]
                              )
                            }
                            className="accent-[#0E7490]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Center Interactive Map */}
                  <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="h-[460px] relative">
                      <InteractivePuneMap
                        spots={filteredSpots}
                        selectedSpotId={selectedSpotId}
                        onSelectSpot={(s) => setSelectedSpotId(s.id)}
                      />
                    </div>
                  </div>

                  {/* Right Search Results List */}
                  <div className="lg:col-span-4 space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    <div className="text-xs font-bold text-slate-600 px-1">
                      {filteredSpots.length} results in Pune (Demo Seeded Data)
                    </div>

                    {filteredSpots.map((spot) => {
                      const isSelected = spot.id === selectedSpotId;
                      return (
                        <div
                          key={spot.id}
                          onClick={() => setSelectedSpotId(spot.id)}
                          className={`bg-white p-3.5 rounded-2xl border transition cursor-pointer flex gap-3.5 ${
                            isSelected
                              ? 'border-[#0E7490] ring-2 ring-[#0E7490]/20 shadow-md'
                              : 'border-slate-200 hover:border-slate-300 shadow-sm'
                          }`}
                        >
                          <img
                            src={spot.image}
                            alt={spot.title}
                            className="w-24 h-24 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-sm text-slate-900 truncate">
                                  {spot.title}
                                </h4>
                                <StatusBadge status={spot.status} />
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {spot.distanceKm} km • {spot.walkMins} min walk ({spot.area})
                              </p>
                              <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-medium text-slate-700">
                                {spot.chargingAvailable ? (
                                  <span className="inline-flex items-center gap-1 text-[#087443] font-semibold">
                                    <Zap className="w-3.5 h-3.5" /> Charging ({spot.plugTypes.join(', ')})
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-indigo-700 font-semibold">
                                    <Car className="w-3.5 h-3.5" /> Parking Only
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                              <div className="font-variant-numeric tabular-nums">
                                <span className="font-extrabold text-sm text-slate-900">
                                  ₹{spot.pricePerHour}/hr
                                </span>
                                {spot.chargingAvailable && (
                                  <span className="text-[11px] text-slate-500 ml-1.5">
                                    + ₹{spot.kwhRate}/kWh
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSpotId(spot.id);
                                  setCustomerTab('spot-detail');
                                }}
                                className="px-3 py-1 rounded-lg bg-[#0E7490] hover:bg-[#155E75] text-white text-xs font-bold"
                              >
                                Select
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SUBVIEW 3C: SPOT DETAILS & BOOKING CHECKOUT */}
            {(customerTab === 'spot-detail' || customerTab === 'checkout') && (
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                {/* Left Spot Overview Card */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src={selectedSpot.image}
                      alt={selectedSpot.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setCustomerTab('explore')}
                      className="absolute top-4 left-4 bg-white/90 hover:bg-white text-slate-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow"
                    >
                      ← Back to Map
                    </button>
                    <div className="absolute top-4 right-4">
                      <StatusBadge status={selectedSpot.status} />
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-2xl font-extrabold text-slate-900">
                            {selectedSpot.title}
                          </h1>
                          {selectedSpot.rebateEligible && (
                            <span className="px-2 py-0.5 rounded-md bg-teal-50 text-[#0E7490] border border-teal-200 text-[11px] font-bold">
                              5% Society Rebate Eligible
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          ⭐ {selectedSpot.rating} ({selectedSpot.reviews} reviews) • {selectedSpot.address} • {selectedSpot.walkMins} min straight-line walk (at 5 km/h)
                        </p>
                      </div>

                      <div className="text-right font-variant-numeric tabular-nums">
                        <div className="text-2xl font-extrabold text-slate-900">
                          ₹{selectedSpot.id === 'spot-grand-hotel' && useFixture220Mode ? '100 (2h flat)' : `${selectedSpot.pricePerHour}/hr`}
                        </div>
                        {selectedSpot.chargingAvailable && (
                          <div className="text-xs text-[#087443] font-bold">
                            Electricity: ₹{selectedSpot.kwhRate}/kWh ({selectedSpot.chargerKw} kW)
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedSpot.chargingAvailable && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Supported Connectors (Select Yours)
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {selectedSpot.plugTypes.map((plug) => (
                            <button
                              key={plug}
                              onClick={() => setSelectedConnector(plug)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition ${
                                selectedConnector === plug
                                  ? 'bg-[#0E7490] text-white border-[#0E7490] shadow-sm'
                                  : 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              <Zap className="w-3.5 h-3.5" /> {plug}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Property Amenities & Access Control
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {selectedSpot.amenities.map((am) => (
                          <div
                            key={am}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center text-xs font-semibold text-slate-700"
                          >
                            {am}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                      <div>
                        <span className="font-bold text-slate-800">Supported Vehicles:</span> {selectedSpot.vehicleTypes} •{' '}
                        <span className="font-bold text-slate-800">Height Limit:</span> {selectedSpot.heightLimit}
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${selectedSpot.lat},${selectedSpot.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#0E7490] font-bold hover:underline"
                      >
                        <Navigation className="w-3.5 h-3.5" /> Open External Maps Route
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Availability, Vehicle Input & Simulated Checkout Panel */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Availability & Simulated Checkout
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Double-booking prevented • Upfront transparent split
                      </p>
                    </div>
                    {selectedSpot.id === 'spot-grand-hotel' && (
                      <label className="flex items-center gap-1.5 text-[11px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useFixture220Mode}
                          onChange={(e) => setUseFixture220Mode(e.target.checked)}
                          className="accent-[#087443]"
                        />
                        ₹220 Doc Fixture
                      </label>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Booking Date</label>
                      <select
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white"
                      >
                        <option value="Sat, 24 May 2026">Sat, 24 May 2026 (Today)</option>
                        <option value="Sun, 25 May 2026">Sun, 25 May 2026</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Available 2-Hour Windows (Booked slots blocked)
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedSpot.windows.map((win) => {
                          const isTaken = bookings.some(
                            (b) =>
                              b.spotId === selectedSpot.id &&
                              b.date === bookingDate &&
                              b.timeSlot === win &&
                              b.status !== 'cancelled'
                          );
                          const isSelected = selectedSlot === win;
                          return (
                            <button
                              key={win}
                              disabled={isTaken}
                              onClick={() => setSelectedSlot(win)}
                              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-between transition ${
                                isTaken
                                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-[#087443] text-white border-[#087443] shadow-sm'
                                  : 'bg-white text-slate-800 border-slate-200 hover:border-[#0E7490]'
                              }`}
                            >
                              <span>{win}</span>
                              {isTaken ? (
                                <span className="text-[10px] uppercase bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                                  Already Reserved
                                </span>
                              ) : isSelected ? (
                                <span className="flex items-center gap-1 text-[11px]">
                                  Selected <Check className="w-3.5 h-3.5" />
                                </span>
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Vehicle Plate (Normalized)
                      </label>
                      <input
                        type="text"
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value.toUpperCase())}
                        placeholder="MH12AB1234"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono font-bold uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Make / Model
                      </label>
                      <input
                        type="text"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        placeholder="Tesla Model 3"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                  </div>

                  {selectedSpot.chargingAvailable && (
                    <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs font-bold text-emerald-950 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={wantCharging}
                            onChange={(e) => setWantCharging(e.target.checked)}
                            className="accent-[#087443]"
                          />
                          <span>Include EV Charging ({selectedConnector})</span>
                        </label>
                        <span className="text-xs font-extrabold text-[#087443] tabular-nums">
                          {useFixture220Mode && selectedSpot.id === 'spot-grand-hotel' ? 10 : targetKwh} kWh × ₹{selectedSpot.kwhRate}/kWh
                        </span>
                      </div>
                      {!useFixture220Mode && wantCharging && (
                        <input
                          type="range"
                          min={2}
                          max={30}
                          value={targetKwh}
                          onChange={(e) => setTargetKwh(Number(e.target.value))}
                          className="w-full accent-[#087443]"
                        />
                      )}
                    </div>
                  )}

                  {/* Price Breakdown Box */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs font-variant-numeric tabular-nums">
                    <div className="font-bold text-slate-800 text-sm pb-1">Price Breakdown</div>
                    <div className="flex justify-between text-slate-600">
                      <span>Parking (2 hrs)</span>
                      <span className="font-semibold text-slate-900">₹{draftPricing.parkingFee}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Electricity (est. {useFixture220Mode && selectedSpot.id === 'spot-grand-hotel' ? 10 : targetKwh} kWh)</span>
                      <span className="font-semibold text-slate-900">₹{draftPricing.electricityCost}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Platform Fee (20% included in total)</span>
                      <span>₹{draftPricing.platformCommission}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-extrabold text-slate-900">
                      <span>Total Payable Now</span>
                      <span className="text-[#0E7490]">₹{draftPricing.sessionTotal}</span>
                    </div>

                    <div className="pt-2 border-t border-dashed border-slate-300 space-y-1 text-[11px] text-slate-500">
                      <div className="flex justify-between">
                        <span>Host Payout Share (80%)</span>
                        <span className="font-bold text-emerald-700">₹{draftPricing.hostShare}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Society Maintenance Rebate (5% from Platform 20%)</span>
                        <span className="font-bold text-[#0E7490]">₹{draftPricing.communityRebate}</span>
                      </div>
                      <div className="flex justify-between text-amber-800 bg-amber-50 px-2 py-1 rounded mt-1">
                        <span>Simulated Pre-Auth Overstay Hold (Refundable)</span>
                        <span className="font-bold">₹1,200</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Payment Method</span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        SIMULATED PAYMENT — NO REAL MONEY CHARGED
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                      {['UPI', 'Card', 'Wallet'].map((method) => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 ${
                            paymentMethod === method
                              ? 'bg-teal-50 border-[#0E7490] text-[#0E7490] font-bold'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {method === 'UPI' && <Smartphone className="w-3.5 h-3.5" />}
                          {method === 'Card' && <CreditCard className="w-3.5 h-3.5" />}
                          {method === 'Wallet' && <Wallet className="w-3.5 h-3.5" />}
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 accent-[#0E7490]"
                    />
                    <span>
                      I accept the permissive private parking license agreement and authorize the simulated pre-auth hold for overstay penalties (3× hourly rate / 15 mins).
                    </span>
                  </label>

                  <button
                    disabled={!termsAccepted || selectedSpot.status === 'booked'}
                    onClick={handleCompleteCheckout}
                    className="w-full py-3.5 rounded-xl bg-[#0E7490] hover:bg-[#155E75] disabled:bg-slate-300 text-white font-extrabold text-sm shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <span>Pay ₹{draftPricing.sessionTotal} & Generate QR Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* SUBVIEW 3D: DYNAMIC QR PASS & ACTIVE SESSION + DEMO CLOCK */}
            {customerTab === 'active-session' && (
              <div className="space-y-6">
                <div className="bg-[#0A252A] text-white p-4 rounded-2xl shadow-md border border-teal-700 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                      <FastForward className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                        Judge Demo Clock (Fast-Forward Session Time)
                      </div>
                      <p className="text-xs text-teal-100">
                        Test the 30/15/5-minute warnings and the 3× hourly overstay penalty engine without waiting 2 hours:
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                    {[
                      { id: 'normal', label: 'Normal (01:45:32)' },
                      { id: 't30', label: 'T-30m Alert' },
                      { id: 't15', label: 'T-15m Urgent' },
                      { id: 't5', label: 'T-5m Critical' },
                      { id: 'overstay20', label: '+20m Overstay (₹600)' },
                      { id: 'overstay65', label: '+65m Escalated' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setDemoClockMode(btn.id)}
                        className={`px-3 py-1.5 rounded-lg transition ${
                          demoClockMode === btn.id
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'bg-teal-900/80 text-teal-100 hover:bg-teal-800'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Left Phone Frame: Active Session & Charger Power Interlock */}
                  <div className="bg-[#0A252A] text-white rounded-[32px] p-6 shadow-2xl border-4 border-slate-800 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-teal-200">
                        <span className="font-bold">9:41 IST</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                          Booking Summary
                        </span>
                      </div>

                      <div className="text-center py-2">
                        <div
                          className={`text-4xl font-extrabold font-variant-numeric tabular-nums tracking-tight ${
                            activeSessionMetrics.isOverstay ? 'text-red-400' : 'text-white'
                          }`}
                        >
                          {activeSessionMetrics.timerDisplay}
                        </div>
                        <div className="text-xs text-teal-200 mt-1">
                          {activeSessionMetrics.isOverstay ? 'Overstay Time Elapsed' : 'Time remaining'}
                        </div>
                      </div>

                      {activeSessionMetrics.alertBanner ? (
                        <div
                          className={`p-3.5 rounded-2xl border-2 text-xs space-y-1 ${activeSessionMetrics.alertBanner.bg}`}
                        >
                          <div className="font-extrabold flex items-center gap-1.5 text-sm">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>{activeSessionMetrics.alertBanner.title}</span>
                          </div>
                          <p className="opacity-90 leading-relaxed">
                            {activeSessionMetrics.alertBanner.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                          <div>
                            <div className="font-bold">In-App Session Monitor Active</div>
                            <div className="text-[11px] text-amber-800">
                              Alerts fire automatically at 30, 15, and 5 minutes prior to expiry.
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="bg-white text-slate-900 rounded-2xl p-4 space-y-4 shadow">
                        <div className="text-center border-b border-slate-100 pb-3">
                          <div className="text-xs text-slate-500 font-semibold">
                            {activeBooking.spotTitle} • {activeBooking.bayLabel}
                          </div>
                          <div className="text-xl font-extrabold font-mono tracking-wider text-slate-900 mt-0.5">
                            {activeBooking.vehiclePlate}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {activeBooking.vehicleModel} • {activeBooking.timeSlot}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              {activeBooking.powerState === 'ON' ? 'Charging (Simulated)' : 'Charger Idle'}
                            </span>
                            <span className="font-bold text-slate-700 tabular-nums">
                              {simulatedKwhProgress} kWh • 18 kW
                            </span>
                          </div>

                          <button
                            onClick={() =>
                              setBookings((prev) =>
                                prev.map((b) =>
                                  b.id === activeBooking.id
                                    ? { ...b, powerState: b.powerState === 'ON' ? 'OFF' : 'ON' }
                                    : b
                                )
                              )
                            }
                            className={`w-full py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition shadow ${
                              activeBooking.powerState === 'ON'
                                ? 'bg-[#087443] text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            <Power className="w-4 h-4" />
                            <span>Power {activeBooking.powerState} (Simulated Socket Interlock)</span>
                          </button>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 font-variant-numeric tabular-nums">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Base Session (Parking + kWh):</span>
                            <span className="font-bold">₹{activeSessionMetrics.sessionTotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Overstay Penalty Accrued:</span>
                            <span
                              className={`font-bold ${
                                activeSessionMetrics.holdDrawn > 0 ? 'text-red-600' : 'text-slate-700'
                              }`}
                            >
                              ₹{activeSessionMetrics.holdDrawn} ({activeSessionMetrics.overstayBlocks} blocks)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Remaining Pre-Auth Hold:</span>
                            <span className="font-semibold text-teal-800">
                              ₹{activeSessionMetrics.holdRemaining} / ₹{activeBooking.preAuthHold}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <button
                        onClick={() => triggerToast('Session extended by 30 minutes (Simulated)')}
                        className="py-2.5 rounded-xl bg-[#0E7490] hover:bg-[#155E75] text-white text-xs font-bold"
                      >
                        Extend Session
                      </button>
                      <button
                        onClick={() => {
                          setRole('guard');
                          setGuardTab('verify');
                        }}
                        className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                      >
                        Verify as Guard →
                      </button>
                    </div>
                  </div>

                  {/* Right Phone Frame: Dynamic Visitor QR Access Pass */}
                  <div className="bg-[#0A252A] text-white rounded-[32px] p-6 shadow-2xl border-4 border-slate-800 flex flex-col justify-between space-y-5">
                    <div className="space-y-4 text-center">
                      <div className="flex items-center justify-between text-xs text-teal-200">
                        <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                          <Zap className="w-4 h-4" /> Active Session QR Pass
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            activeBooking.qrUsed
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                          }`}
                        >
                          {activeBooking.qrUsed ? 'Entry Used (Single-Use)' : 'Valid For Gate Entry'}
                        </span>
                      </div>

                      <div>
                        <div className="text-3xl font-extrabold font-variant-numeric tabular-nums">
                          {activeSessionMetrics.timerDisplay}
                        </div>
                        <div className="text-[11px] text-teal-200">
                          Entry Window: Opens 10m before start • Single-Entry Token
                        </div>
                      </div>

                      <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-lg space-y-3">
                        <DynamicQRCode
                          value={`${activeBooking.id}-${activeBooking.vehiclePlate}-${activeBooking.qrSignature}`}
                          size={175}
                          dimmed={activeBooking.qrUsed}
                        />
                        <div className="font-mono font-extrabold text-base tracking-wider text-slate-900">
                          {activeBooking.id}
                        </div>
                        <div className="text-xs text-slate-600 space-y-0.5">
                          <div className="font-bold text-slate-800">
                            {activeBooking.spotTitle} • {activeBooking.bayLabel}
                          </div>
                          <div className="font-mono font-bold text-sm text-[#0E7490]">
                            {activeBooking.vehiclePlate}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Valid: {activeBooking.timeSlot} ({activeBooking.date})
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 bg-slate-50 py-1 px-2 rounded">
                          Simulated Access Control Pass • Signed Token: {activeBooking.qrSignature.slice(0, 22)}...
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setRole('guard');
                          setGuardScanPreset(activeBooking.qrUsed ? 'already_used' : 'valid');
                          setGuardTab('verify');
                        }}
                        className="w-full py-3 rounded-xl bg-[#087443] hover:bg-emerald-600 text-white font-bold text-xs shadow flex items-center justify-center gap-2"
                      >
                        <Shield className="w-4 h-4" /> Scan This Pass in Guard Portal
                      </button>
                      <button
                        onClick={() => {
                          setBookings((prev) =>
                            prev.map((b) =>
                              b.id === activeBooking.id ? { ...b, qrUsed: false } : b
                            )
                          );
                          triggerToast('QR Pass reset to UNUSED so you can demo a fresh gate scan.');
                        }}
                        className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-teal-200 text-xs font-semibold"
                      >
                        Reset Single-Use Flag for Re-Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUBVIEW 3E: DRIVER BOOKINGS LIST */}
            {customerTab === 'bookings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">My Bookings & Passes</h2>
                    <p className="text-xs text-slate-500">
                      Persisted in local database • Click any booking to open its QR pass or test cancellation rules.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                            {b.id}
                          </span>
                          <span className="font-bold text-base text-slate-900">{b.spotTitle}</span>
                          <span className="text-xs text-slate-500">({b.bayLabel})</span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              b.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          {b.date} • {b.timeSlot} • Plate:{' '}
                          <span className="font-mono font-bold text-slate-900">{b.vehiclePlate}</span> ({b.vehicleModel})
                        </div>
                        <div className="text-xs text-slate-500 font-variant-numeric tabular-nums">
                          Parking: ₹{b.parkingFee} + Energy: ₹{b.electricityCost} ={' '}
                          <span className="font-bold text-slate-900">Total ₹{b.totalPrice}</span> (Host 80%: ₹{b.hostShare} | Platform 20%: ₹{b.platformCommission} | Society 5% Rebate: ₹{b.communityRebate})
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveBookingId(b.id);
                            setCustomerTab('active-session');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-[#0E7490] text-white text-xs font-bold flex items-center gap-1.5"
                        >
                          <QrCode className="w-3.5 h-3.5" /> Open Pass
                        </button>
                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => {
                              setBookings((prev) =>
                                prev.map((item) =>
                                  item.id === b.id ? { ...item, status: 'cancelled' } : item
                                )
                              );
                              triggerToast(
                                `Booking ${b.id} cancelled. Time slot freed & ₹${b.preAuthHold} pre-auth hold released.`
                              );
                            }}
                            className="px-3 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ====================================================================
          VIEW 4: PROVIDER / HOST PORTAL
      ==================================================================== */}
      {role === 'provider' && (
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
          <aside className="lg:w-60 bg-[#0A252A] text-white p-4 flex lg:flex-col justify-between gap-2 overflow-x-auto shrink-0">
            <div className="flex lg:flex-col gap-1.5 w-full">
              <button
                onClick={() => setProviderTab('dashboard')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  providerTab === 'dashboard'
                    ? 'bg-[#0E7490] text-white shadow'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setProviderTab('spaces')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  providerTab === 'spaces'
                    ? 'bg-[#0E7490] text-white shadow'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>My Spaces ({spots.length})</span>
              </button>

              <button
                onClick={() => setProviderTab('calendar')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  providerTab === 'calendar'
                    ? 'bg-[#0E7490] text-white shadow'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Availability Calendar</span>
              </button>

              <button
                onClick={() => setProviderTab('earnings')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  providerTab === 'earnings'
                    ? 'bg-[#0E7490] text-white shadow'
                    : 'text-teal-100/80 hover:bg-teal-900/50'
                }`}
              >
                <IndianRupee className="w-4 h-4" />
                <span>Earnings & Rebates</span>
              </button>
            </div>

            <div className="hidden lg:block p-3.5 rounded-xl bg-[#0F353C] border border-teal-800 text-xs space-y-1">
              <div className="text-teal-300 font-semibold">Property Account</div>
              <div className="font-bold text-white">The Grand Hotel & Society</div>
              <div className="text-[11px] text-emerald-300">✓ Society RWA Approved</div>
            </div>
          </aside>

          <main className="flex-1 p-4 sm:p-6 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E7490]">
                  Provider Workspace
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  The Grand Hotel (Koregaon Park)
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowNewSpaceModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#0E7490] hover:bg-[#155E75] text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" /> Add New Space
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 font-variant-numeric tabular-nums">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs text-slate-500 font-semibold">Total Earnings (Host Share)</div>
                <div className="text-3xl font-extrabold text-slate-900">
                  ₹{providerMetrics.displayTotalEarnings.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +12% from last month (Live updates on booking)
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs text-slate-500 font-semibold">Completed Sessions</div>
                <div className="text-3xl font-extrabold text-slate-900">
                  {providerMetrics.completedSessions}
                </div>
                <div className="text-xs text-emerald-700 font-semibold">
                  +8% vs last week • 80% Host Payout Ratio
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs text-slate-500 font-semibold">Active Spaces</div>
                <div className="text-3xl font-extrabold text-slate-900">
                  5 / 8 <span className="text-sm font-normal text-slate-500">({providerMetrics.activeSpacesCount} Listings On Map)</span>
                </div>
                <div className="text-xs text-[#087443] font-semibold">
                  ⚡ 2 charging • 3 parking active now
                </div>
              </div>
            </div>

            {providerTab === 'dashboard' && (
              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">Earnings Overview (May 2026)</h3>
                    <span className="text-xs text-slate-500">80% Host Net after 20% Commission</span>
                  </div>
                  <div className="h-52 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-100">
                    {[
                      { day: 'May 17', h: 35, val: '₹2,100' },
                      { day: 'May 18', h: 52, val: '₹3,200' },
                      { day: 'May 19', h: 44, val: '₹2,750' },
                      { day: 'May 20', h: 68, val: '₹4,100' },
                      { day: 'May 21', h: 58, val: '₹3,600' },
                      { day: 'May 22', h: 80, val: '₹4,900' },
                      { day: 'May 24', h: 95, val: `₹${3850 + providerMetrics.dynamicHostShare}` }
                    ].map((bar, i) => (
                      <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-[10px] font-bold text-slate-600 tabular-nums">{bar.val}</div>
                        <div
                          style={{ height: `${bar.h * 1.4}px` }}
                          className={`w-full max-w-[34px] rounded-t-lg transition-all ${
                            i === 6 ? 'bg-[#087443]' : 'bg-[#0E7490]'
                          }`}
                        />
                        <div className="text-[10px] text-slate-400 font-medium">{bar.day}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">Recent Sessions</h3>
                    <button
                      onClick={() => setProviderTab('earnings')}
                      className="text-xs text-[#0E7490] font-bold hover:underline"
                    >
                      View full fee-split ledger →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-variant-numeric tabular-nums">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400">
                          <th className="pb-2 font-semibold">Vehicle</th>
                          <th className="pb-2 font-semibold">Space</th>
                          <th className="pb-2 font-semibold">Gross</th>
                          <th className="pb-2 font-semibold">Host 80%</th>
                          <th className="pb-2 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bookings.map((b) => (
                          <tr key={b.id}>
                            <td className="py-3 font-mono font-bold text-slate-900">
                              {b.vehiclePlate}
                            </td>
                            <td className="py-3 text-slate-600">{b.bayLabel}</td>
                            <td className="py-3 font-semibold text-slate-800">₹{b.totalPrice}</td>
                            <td className="py-3 font-bold text-emerald-700">₹{b.hostShare}</td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  b.status === 'active'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="py-3 font-mono font-bold text-slate-900">KA01EF9012</td>
                          <td className="py-3 text-slate-600">Bay C2</td>
                          <td className="py-3 font-semibold text-slate-800">₹300</td>
                          <td className="py-3 font-bold text-emerald-700">₹240</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {(providerTab === 'spaces' || providerTab === 'dashboard') && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      My Spaces (Live Map Availability Toggle)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Toggling a listing OFF immediately removes it from Customer Map Discovery while preserving existing confirmed bookings.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {spots.map((s) => (
                    <div
                      key={s.id}
                      className="p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-20 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                s.isActive
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {s.isActive ? 'Published' : 'Paused / Draft'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {s.area} • {s.totalBays} bays •{' '}
                            {s.chargingAvailable
                              ? `Charging (${s.plugTypes.join(', ')} • ${s.chargerKw}kW)`
                              : 'Parking Only'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-5 font-variant-numeric tabular-nums">
                        <div className="text-right">
                          <div className="font-extrabold text-sm text-slate-900">
                            ₹{s.pricePerHour}/hr
                          </div>
                          {s.chargingAvailable && (
                            <div className="text-[11px] text-emerald-700 font-semibold">
                              ₹{s.kwhRate}/kWh
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleToggleSpotAvailability(s.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                            s.isActive
                              ? 'bg-[#087443] text-white hover:bg-emerald-700'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          {s.isActive ? 'Active on Map (Click to Pause)' : 'Paused (Click to Enable)'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {providerTab === 'calendar' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Grand Hotel Parking — Bay Availability Calendar (Sat, 24 May 2026)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Recurring weekday/weekend windows minus confirmed bookings.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Available
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#0E7490] inline-block" /> Reserved
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-300 inline-block" /> Blocked
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="text-slate-500 border-b border-slate-200">
                        <th className="py-2.5 px-3 text-left">Bay</th>
                        <th className="py-2.5 px-3">08 AM – 10 AM</th>
                        <th className="py-2.5 px-3">10 AM – 12 PM</th>
                        <th className="py-2.5 px-3">12 PM – 02 PM</th>
                        <th className="py-2.5 px-3">02 PM – 04 PM</th>
                        <th className="py-2.5 px-3">04 PM – 06 PM</th>
                        <th className="py-2.5 px-3">06 PM – 08 PM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ['Bay 1 (A1)', 'avail', 'reserved', 'avail', 'avail', 'reserved', 'avail'],
                        ['Bay 2 (A2)', 'avail', 'avail', 'reserved', 'reserved', 'avail', 'avail'],
                        ['Bay 3 (B1)', 'blocked', 'avail', 'avail', 'avail', 'avail', 'blocked'],
                        ['Bay 4 (B2)', 'avail', 'reserved', 'reserved', 'avail', 'avail', 'avail'],
                        ['Bay 5 (C1)', 'avail', 'avail', 'avail', 'reserved', 'reserved', 'avail'],
                        ['Bay 6 (C2)', 'avail', 'avail', 'blocked', 'blocked', 'avail', 'avail']
                      ].map(([bay, ...slots]) => (
                        <tr key={bay}>
                          <td className="py-3 px-3 font-bold text-slate-800">{bay}</td>
                          {slots.map((st, idx) => (
                            <td key={idx} className="p-1.5">
                              <div
                                className={`h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                                  st === 'avail'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : st === 'reserved'
                                    ? 'bg-[#0E7490] text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }`}
                              >
                                {st === 'avail' ? 'Open' : st === 'reserved' ? 'Booked' : 'Blocked'}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {providerTab === 'earnings' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base">
                  Auditable Fee-Split & Society Community Rebate Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Every settled session splits 80% to Host and 20% to ParkVolt. On eligible properties, 5% of the gross session total is allocated to the Society Maintenance Fund out of ParkVolt's 20% commission (so the Host's 80% is never reduced).
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-variant-numeric tabular-nums">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2.5">Booking ID</th>
                        <th className="py-2.5">Parking + Energy</th>
                        <th className="py-2.5">Gross Total</th>
                        <th className="py-2.5 text-emerald-700">Host Share (80%)</th>
                        <th className="py-2.5">Platform Commission (20%)</th>
                        <th className="py-2.5 text-[#0E7490]">5% Society Rebate</th>
                        <th className="py-2.5">Platform Net (15%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.map((b) => (
                        <tr key={b.id}>
                          <td className="py-3 font-mono font-bold">{b.id}</td>
                          <td className="py-3">
                            ₹{b.parkingFee} + ₹{b.electricityCost}
                          </td>
                          <td className="py-3 font-extrabold text-slate-900">₹{b.totalPrice}</td>
                          <td className="py-3 font-extrabold text-emerald-700">₹{b.hostShare}</td>
                          <td className="py-3 font-semibold">₹{b.platformCommission}</td>
                          <td className="py-3 font-bold text-[#0E7490]">₹{b.communityRebate}</td>
                          <td className="py-3 font-semibold text-slate-600">₹{b.platformNet}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>

          {showNewSpaceModal && (
            <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4">
              <form
                onSubmit={handleCreateNewSpace}
                className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-slate-900">List a New Parking / EV Bay</h3>
                  <button
                    type="button"
                    onClick={() => setShowNewSpaceModal(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Property / Society Name</label>
                    <input
                      type="text"
                      required
                      value={newSpaceTitle}
                      onChange={(e) => setNewSpaceTitle(e.target.value)}
                      placeholder="e.g., Balewadi High Street Residency"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Pune Area</label>
                      <input
                        type="text"
                        value={newSpaceArea}
                        onChange={(e) => setNewSpaceArea(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Connector Type</label>
                      <select
                        value={newSpacePlug}
                        onChange={(e) => setNewSpacePlug(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                      >
                        <option value="CCS2">CCS2</option>
                        <option value="Type 2">Type 2</option>
                        <option value="15A">15A Socket</option>
                        <option value="None">Parking Only</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Parking Rate (₹40–₹80/hr)
                      </label>
                      <input
                        type="number"
                        value={newSpacePrice}
                        onChange={(e) => setNewSpacePrice(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Charging Rate (₹12–₹14/kWh)
                      </label>
                      <input
                        type="number"
                        value={newSpaceKwhRate}
                        onChange={(e) => setNewSpaceKwhRate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewSpaceModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#087443] text-white text-xs font-bold"
                  >
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================
          VIEW 5: SECURITY GUARD PORTAL
      ==================================================================== */}
      {role === 'guard' && (
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
          <div className="bg-[#0A252A] text-white p-4 rounded-2xl shadow-md border border-teal-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                Guard Gate Verification Simulator (Under 3 Seconds Verdict)
              </div>
              <p className="text-xs text-teal-100">
                Switch scan scenarios to show Judges how ParkVolt handles Valid, Replay (Already Used), Expired, and Plate Mismatch cases:
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <button
                onClick={() => setGuardScanPreset('valid')}
                className={`px-3 py-1.5 rounded-lg ${
                  guardScanPreset === 'valid'
                    ? 'bg-[#0A5C2E] text-white ring-2 ring-emerald-300'
                    : 'bg-teal-900 text-teal-100'
                }`}
              >
                ✓ Valid Entry
              </button>
              <button
                onClick={() => setGuardScanPreset('already_used')}
                className={`px-3 py-1.5 rounded-lg ${
                  guardScanPreset === 'already_used'
                    ? 'bg-[#FFC107] text-slate-950 ring-2 ring-amber-200'
                    : 'bg-teal-900 text-teal-100'
                }`}
              >
                ⚠ Duplicate Scan (Already Used)
              </button>
              <button
                onClick={() => setGuardScanPreset('mismatch')}
                className={`px-3 py-1.5 rounded-lg ${
                  guardScanPreset === 'mismatch'
                    ? 'bg-[#FFC107] text-slate-950 ring-2 ring-amber-200'
                    : 'bg-teal-900 text-teal-100'
                }`}
              >
                ⚠ Plate Mismatch
              </button>
              <button
                onClick={() => setGuardScanPreset('expired')}
                className={`px-3 py-1.5 rounded-lg ${
                  guardScanPreset === 'expired'
                    ? 'bg-[#A4141B] text-white ring-2 ring-red-300'
                    : 'bg-teal-900 text-teal-100'
                }`}
              >
                ✕ Expired Pass
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Left Phone Frame: Guard Verification Verdict Screen */}
            <div className="bg-[#0A252A] text-white rounded-[32px] p-6 shadow-2xl border-4 border-slate-800 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm font-extrabold text-white">Guard Verification</div>
                  <div className="text-xs text-teal-200">The Grand Hotel • Gate 1 • Security</div>
                </div>

                <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  {guardScanPreset === 'valid' && !activeBooking.qrUsed && (
                    <div className="bg-[#0A5C2E] text-white p-5 text-center space-y-2">
                      <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-300" />
                      <div className="text-2xl font-black tracking-wider uppercase">
                        VALID ENTRY
                      </div>
                      <div className="text-xs text-emerald-100">
                        HMAC Signature Verified • Inside Entry Window
                      </div>
                    </div>
                  )}

                  {(guardScanPreset === 'already_used' ||
                    (guardScanPreset === 'valid' && activeBooking.qrUsed)) && (
                    <div className="bg-[#FFC107] text-[#111111] p-5 text-center space-y-2">
                      <AlertTriangle className="w-12 h-12 mx-auto text-[#111111]" />
                      <div className="text-2xl font-black tracking-wider uppercase">
                        CAUTION: ALREADY USED
                      </div>
                      <div className="text-xs font-bold">
                        Single-Entry Pass already scanned at {activeBooking.enteredAt || '10:02 AM'}
                      </div>
                    </div>
                  )}

                  {guardScanPreset === 'mismatch' && (
                    <div className="bg-[#FFC107] text-[#111111] p-5 text-center space-y-2">
                      <AlertTriangle className="w-12 h-12 mx-auto text-[#111111]" />
                      <div className="text-2xl font-black tracking-wider uppercase">
                        CAUTION: PLATE MISMATCH
                      </div>
                      <div className="text-xs font-bold">
                        Verify physical number plate before allowing entry
                      </div>
                    </div>
                  )}

                  {guardScanPreset === 'expired' && (
                    <div className="bg-[#A4141B] text-white p-5 text-center space-y-2">
                      <XCircle className="w-12 h-12 mx-auto text-red-200" />
                      <div className="text-2xl font-black tracking-wider uppercase">
                        INVALID / EXPIRED PASS
                      </div>
                      <div className="text-xs text-red-100">
                        Booking window ended • Do not admit vehicle
                      </div>
                    </div>
                  )}

                  <div className="p-5 text-center space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Compare Physical Vehicle Plate
                    </div>
                    <div className="text-3xl font-black font-mono tracking-widest text-slate-900 font-variant-numeric tabular-nums">
                      {guardScanPreset === 'expired'
                        ? 'KA05MN6789'
                        : guardScanPreset === 'mismatch'
                        ? 'BR01XY9876'
                        : activeBooking.vehiclePlate}
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      {activeBooking.vehicleModel}
                    </div>
                    <div className="text-xs text-[#0E7490] font-bold pt-1">
                      {activeBooking.bayLabel} • {activeBooking.timeSlot}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleGuardDecision('allow')}
                  className="w-full py-4 rounded-2xl bg-[#087443] hover:bg-emerald-600 text-white font-black text-base shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" /> Plate Matches — Allow Entry
                </button>
                <button
                  onClick={() => handleGuardDecision('deny')}
                  className="w-full py-3.5 rounded-2xl bg-[#A4141B] hover:bg-red-800 text-white font-extrabold text-sm shadow transition flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> Deny Entry
                </button>
              </div>
            </div>

            {/* Right Phone Frame: Guard Scan History & Manual Plate Lookup */}
            <div className="bg-white text-slate-900 rounded-[32px] p-6 shadow-2xl border-4 border-slate-200 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="bg-[#0A252A] text-white -mx-6 -mt-6 p-5 rounded-t-[28px] space-y-3">
                  <div className="flex items-center justify-between text-xs text-teal-200">
                    <span>9:41 IST</span>
                    <span className="font-bold">Gate Audit Log</span>
                  </div>
                  <div className="grid grid-cols-2 bg-[#0F353C] p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setGuardTab('verify')}
                      className={`py-2 rounded-lg ${
                        guardTab === 'verify' ? 'bg-[#0E7490] text-white' : 'text-teal-200'
                      }`}
                    >
                      Recent Scans ({scans.length})
                    </button>
                    <button
                      onClick={() => setGuardTab('history')}
                      className={`py-2 rounded-lg ${
                        guardTab === 'history' ? 'bg-[#0E7490] text-white' : 'text-teal-200'
                      }`}
                    >
                      Manual Plate Lookup
                    </button>
                  </div>
                </div>

                <form onSubmit={handleManualLookup} className="flex gap-2">
                  <input
                    type="text"
                    value={manualPlateInput}
                    onChange={(e) => setManualPlateInput(e.target.value.toUpperCase())}
                    placeholder="Enter plate (e.g. MH12AB1234)"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0E7490] text-white text-xs font-bold"
                  >
                    Lookup
                  </button>
                </form>

                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {scans.map((sc) => (
                    <div
                      key={sc.id}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        {sc.verdict === 'VALID' && (
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                            <Check className="w-5 h-5" />
                          </div>
                        )}
                        {sc.verdict === 'INVALID' && (
                          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-bold">
                            <X className="w-5 h-5" />
                          </div>
                        )}
                        {sc.verdict === 'CAUTION' && (
                          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <div className="text-[11px] text-slate-400 font-semibold">{sc.time}</div>
                          <div
                            className={`text-xs font-extrabold ${
                              sc.verdict === 'VALID'
                                ? 'text-emerald-700'
                                : sc.verdict === 'INVALID'
                                ? 'text-red-700'
                                : 'text-amber-700'
                            }`}
                          >
                            {sc.verdict === 'VALID'
                              ? 'Valid'
                              : sc.verdict === 'INVALID'
                              ? 'Invalid'
                              : 'Caution'}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-extrabold text-sm text-slate-900">
                          {sc.plate}
                        </div>
                        <div className="text-[11px] text-slate-500">{sc.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-center text-slate-400">
                Append-Only Gate Scan Audit Trail • DPDP Act 2023 Minimal PII
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ====================================================================
          VIEW 6: ADMIN & JUDGE ACCEPTANCE LEDGER
      ==================================================================== */}
      {role === 'admin' && (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7490]">
              Admin & Judge Verification Console
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              ParkVolt MVP Acceptance Criteria & Pricing Fixture Verification
            </h1>
            <p className="text-xs text-slate-500">
              Live inspection of the ₹220 reference fixture, overstay math (3× hourly rate / 15-min block), and role-based state persistence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Documented ₹220 Pricing Fixture Verification</span>
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-variant-numeric tabular-nums">
                <div className="flex justify-between">
                  <span>Parking Fee (Fixture Base):</span>
                  <span className="font-bold">₹100</span>
                </div>
                <div className="flex justify-between">
                  <span>Electricity (10 kWh × ₹12/kWh):</span>
                  <span className="font-bold">₹120</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 text-sm font-extrabold">
                  <span>Session Total Billed to Driver:</span>
                  <span className="text-[#087443]">₹220</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Host Payout Share (80%):</span>
                  <span className="font-bold text-emerald-700">₹176</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Commission (20%):</span>
                  <span className="font-bold">₹44</span>
                </div>
                <div className="flex justify-between text-[#0E7490]">
                  <span>Community Rebate (5% of ₹220 funded from ₹44):</span>
                  <span className="font-bold">₹11</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Net Remainder after Rebate:</span>
                  <span className="font-bold">₹33</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>Overstay Engine Boundary Unit Checks (₹100/hr base)</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left font-variant-numeric tabular-nums">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2">Minutes Late</th>
                      <th className="py-2">Started 15m Blocks</th>
                      <th className="py-2">Penalty (3× ₹100/block)</th>
                      <th className="py-2">Hold Status (₹1,200 cap)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2">0 min (On Time)</td>
                      <td className="py-2">0 blocks</td>
                      <td className="py-2 font-bold">₹0</td>
                      <td className="py-2 text-emerald-700 font-semibold">Released</td>
                    </tr>
                    <tr>
                      <td className="py-2">1 min late</td>
                      <td className="py-2">1 block</td>
                      <td className="py-2 font-bold">₹300</td>
                      <td className="py-2">₹900 hold left</td>
                    </tr>
                    <tr>
                      <td className="py-2">15 mins late</td>
                      <td className="py-2">1 block</td>
                      <td className="py-2 font-bold">₹300</td>
                      <td className="py-2">₹900 hold left</td>
                    </tr>
                    <tr className="bg-amber-50/70">
                      <td className="py-2 font-bold">20 mins late (Doc Example)</td>
                      <td className="py-2 font-bold">2 blocks</td>
                      <td className="py-2 font-extrabold text-red-700">₹600</td>
                      <td className="py-2 font-semibold">₹600 hold left</td>
                    </tr>
                    <tr className="bg-red-50/70">
                      <td className="py-2 font-bold">65 mins late</td>
                      <td className="py-2 font-bold">5 blocks (₹1,500 raw)</td>
                      <td className="py-2 font-extrabold text-red-800">₹1,200 (Capped)</td>
                      <td className="py-2 font-extrabold text-red-800">ESCALATED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">ParkVolt</span>
            <span>• Smarter Parking. Greener Tomorrow.</span>
          </div>
          <div>
            Hackathon Prototype • Use Back / Next buttons or Left / Right Arrow keys to switch screens
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// INTERACTIVE PUNE MAP COMPONENT
// ============================================================================
function InteractivePuneMap({ spots, selectedSpotId, onSelectSpot }) {
  return (
    <div className="relative w-full h-full bg-[#E5ECEE] select-none overflow-hidden">
      <svg className="w-full h-full object-cover" viewBox="0 0 800 500" preserveAspectRatio="none">
        <rect width="800" height="500" fill="#E8F0F2" />
        <path d="M0,0 L240,0 L180,180 L0,140 Z" fill="#D5E8DC" />
        <path d="M550,280 L800,240 L800,500 L510,500 Z" fill="#D5E8DC" />
        <path
          d="M-20,320 Q220,250 420,290 T820,180"
          fill="none"
          stroke="#B3D9E6"
          strokeWidth="28"
        />
        <path d="M120,0 L480,500" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M0,210 L800,230" stroke="#FFFFFF" strokeWidth="12" />
        <path d="M280,0 L680,500" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M520,0 L210,500" stroke="#F8FAFC" strokeWidth="7" />
        <g stroke="#F1F5F9" strokeWidth="3">
          <line x1="0" y1="90" x2="800" y2="90" />
          <line x1="0" y1="380" x2="800" y2="380" />
          <line x1="200" y1="0" x2="200" y2="500" />
          <line x1="420" y1="0" x2="420" y2="500" />
          <line x1="640" y1="0" x2="640" y2="500" />
        </g>
      </svg>

      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm border border-slate-200">
        Pune Live Map • Straight-Line Walking Est. (5 km/h)
      </div>
      <div className="absolute top-12 left-10 text-[10px] font-bold uppercase tracking-wider text-slate-400 pointer-events-none">
        Baner High Street
      </div>
      <div className="absolute top-1/3 right-12 text-[10px] font-bold uppercase tracking-wider text-slate-400 pointer-events-none">
        Viman Nagar / Phoenix Mall
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider text-slate-400 pointer-events-none">
        Koregaon Park
      </div>

      {spots.map((spot) => {
        const isSelected = spot.id === selectedSpotId;
        let bgClass = 'bg-[#16A34A] text-white';
        if (!spot.chargingAvailable) {
          bgClass = 'bg-[#4F46E5] text-white';
        }
        if (spot.status === 'limited') {
          bgClass = 'bg-[#F59E0B] text-slate-950';
        }
        if (spot.status === 'booked') {
          bgClass = 'bg-[#94A3B8] text-white opacity-75';
        }

        return (
          <button
            key={spot.id}
            onClick={() => onSelectSpot(spot)}
            style={{ left: `${spot.mapX}%`, top: `${spot.mapY}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform focus:outline-none ${
              isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
            }`}
          >
            <div className="flex flex-col items-center">
              {isSelected && (
                <div className="mb-1 px-2.5 py-1 rounded-lg bg-[#0F172A] text-white text-[10px] font-bold whitespace-nowrap shadow-lg flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>
                    {spot.title} • ₹{spot.pricePerHour}/hr
                  </span>
                </div>
              )}

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg font-extrabold text-xs ${bgClass} ${
                  isSelected ? 'ring-4 ring-[#0F172A]' : 'ring-2 ring-white'
                }`}
              >
                {spot.chargingAvailable ? <Zap className="w-4 h-4 fill-current" /> : 'P'}
              </div>
              <div className="w-2 h-2 rotate-45 bg-[#0F172A] -mt-1" />
            </div>
          </button>
        );
      })}

      <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur px-3 py-2 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold text-slate-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" /> Charging Available
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" /> Parking Only
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Limited
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" /> Booked
          </span>
        </div>
        <span className="text-slate-400">Click any pin to inspect</span>
      </div>
    </div>
  );
}

// ============================================================================
// HELPER STATUS BADGE & ICONS
// ============================================================================
function StatusBadge({ status }) {
  if (status === 'available') {
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Available
      </span>
    );
  }
  if (status === 'limited') {
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 shrink-0">
        ▲ Limited
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600 shrink-0">
      Booked
    </span>
  );
}

function CompassIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}