import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, 
  X, 
  Search, 
  Menu, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ChevronDown, 
  CreditCard, 
  Check, 
  Sparkles, 
  Eye, 
  SlidersHorizontal, 
  Instagram, 
  Truck, 
  Smartphone,
  Star,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Filter,
  Play,
  RefreshCw,
  AlertTriangle,
  MessageCircle,
  ExternalLink,
  ShieldAlert,
  Server
} from 'lucide-react';

const DEFAULT_BACKEND_API_BASE_URL = typeof window !== 'undefined' && window.TH3EE_BACKEND_URL 
  ? window.TH3EE_BACKEND_URL 
  : "http://localhost:5000";

const getSavedBackendUrl = () => {
  if (typeof window === 'undefined') return DEFAULT_BACKEND_API_BASE_URL;
  return localStorage.getItem("th3ee_backend_api_url") || DEFAULT_BACKEND_API_BASE_URL;
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const DEFAULT_BUSINESS_WHATSAPP = "919876543210";

const Th3eeBrandLogo = ({ className = "", variant = "default", onClick }) => {
  if (variant === "badge") {
    return (
      <div 
        onClick={onClick} 
        className="bg-[#E51E2B] px-3 py-1.5 inline-flex items-center justify-center tracking-tighter shadow-sm cursor-pointer select-none"
      >
        <span className="text-white font-black text-xl tracking-tighter font-sans flex items-center">
          TH<span className="text-[#E51E2B] bg-white px-0.5 rounded-[1px] ml-0.5 mr-0.5 font-black text-lg">3</span>EE
        </span>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick} 
      className={`flex items-center space-x-2 select-none cursor-pointer group ${className}`}
    >
      <div className="bg-[#E51E2B] text-white font-black px-2.5 py-0.5 text-lg sm:text-xl tracking-tighter flex items-center shadow-sm group-hover:bg-neutral-900 transition-colors">
        <span>TH</span>
        <span className="text-[#E51E2B] bg-white px-0.5 mx-0.5 font-black text-base">3</span>
        <span>EE</span>
      </div>
      <div className="flex flex-col border-l border-neutral-300 pl-2">
        <span className="text-[10px] font-mono tracking-widest text-neutral-900 font-bold uppercase leading-none">
          th3ee.in
        </span>
        <span className="text-[8px] font-mono tracking-wider text-neutral-400 uppercase leading-none mt-0.5">
          STREETWEAR
        </span>
      </div>
    </div>
  );
};

const UNIVERSE_CATEGORIES = [
  {
    id: "anime",
    title: "ANIME",
    subtitle: "SHONEN SAGA",
    bgGradient: "from-rose-950/90 via-red-900/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Anime", code: "ALL", color: "bg-sky-500", text: "text-white" },
      { name: "Demon Slayer", code: "KIM", color: "bg-red-600", text: "text-white" },
      { name: "Naruto", code: "UZU", color: "bg-orange-500", text: "text-white" },
      { name: "Attack On Titan", code: "SHI", color: "bg-amber-800", text: "text-white" },
      { name: "Naruto Shippuden", code: "SHI", color: "bg-orange-600", text: "text-white" },
      { name: "One Piece", code: "STR", color: "bg-sky-600", text: "text-white" },
      { name: "Black Clover", code: "GRL", color: "bg-slate-800", text: "text-white" },
      { name: "Baki Hanma", code: "OGR", color: "bg-red-700", text: "text-white" },
      { name: "Solo Leveling", code: "SHA", color: "bg-indigo-900", text: "text-white" },
      { name: "Dragon Ball Z", code: "SAI", color: "bg-amber-500", text: "text-white" },
      { name: "Jujutsu Kaisen", code: "SOR", color: "bg-purple-600", text: "text-white" }
    ]
  },
  {
    id: "marvel",
    title: "MARVEL",
    subtitle: "CINEMATIC COMICS",
    bgGradient: "from-red-950/90 via-rose-900/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Marvel", code: "MCU", color: "bg-red-600", text: "text-white" },
      { name: "Spider-Man", code: "SPD", color: "bg-red-500", text: "text-white" },
      { name: "Iron Man", code: "ARC", color: "bg-amber-600", text: "text-white" },
      { name: "Wolverine & X-Men", code: "MUT", color: "bg-yellow-500", text: "text-neutral-900" },
      { name: "Deadpool", code: "DDP", color: "bg-rose-700", text: "text-white" },
      { name: "Venom Symbiote", code: "VNM", color: "bg-neutral-900", text: "text-white" }
    ]
  },
  {
    id: "dc",
    title: "DC",
    subtitle: "JUSTICE & GOTHAM",
    bgGradient: "from-blue-950/90 via-sky-950/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All DC", code: "DCU", color: "bg-blue-600", text: "text-white" },
      { name: "The Batman", code: "DKN", color: "bg-neutral-950", text: "text-white" },
      { name: "Joker", code: "HAH", color: "bg-purple-700", text: "text-white" },
      { name: "Superman", code: "KAL", color: "bg-blue-700", text: "text-white" },
      { name: "The Flash", code: "SPD", color: "bg-red-600", text: "text-white" }
    ]
  },
  {
    id: "harry-potter",
    title: "HARRY POTTER",
    subtitle: "WIZARDING WORLD",
    bgGradient: "from-amber-950/90 via-yellow-950/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Wizarding", code: "HP", color: "bg-amber-600", text: "text-white" },
      { name: "Gryffindor", code: "GRY", color: "bg-red-800", text: "text-white" },
      { name: "Slytherin", code: "SLY", color: "bg-emerald-800", text: "text-white" },
      { name: "Ravenclaw", code: "RAV", color: "bg-blue-800", text: "text-white" },
      { name: "Hufflepuff", code: "HUF", color: "bg-yellow-600", text: "text-neutral-900" }
    ]
  },
  {
    id: "nanis-paradise",
    title: "NANI'S PARADISE",
    subtitle: "NATURAL STAR",
    bgGradient: "from-stone-900/90 via-zinc-800/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Nani Drops", code: "NPR", color: "bg-stone-700", text: "text-white" },
      { name: "Jersey Vintage", code: "JRS", color: "bg-blue-800", text: "text-white" },
      { name: "Dasara Raw", code: "DSR", color: "bg-amber-800", text: "text-white" },
      { name: "Hi Nanna Comfort", code: "HNN", color: "bg-rose-700", text: "text-white" },
      { name: "Saripodhaa Sanivaaram", code: "SSV", color: "bg-red-700", text: "text-white" }
    ]
  },
  {
    id: "doomsday",
    title: "DOOMSDAY",
    subtitle: "AVENGERS SAGA",
    bgGradient: "from-emerald-950/90 via-teal-950/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Doomsday", code: "DMD", color: "bg-emerald-700", text: "text-white" },
      { name: "Doctor Doom", code: "VIC", color: "bg-emerald-900", text: "text-white" },
      { name: "Secret Wars", code: "SWR", color: "bg-neutral-900", text: "text-white" }
    ]
  },
  {
    id: "memes",
    title: "MEMES",
    subtitle: "BRAINROT & IRONY",
    bgGradient: "from-purple-950/90 via-pink-950/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Memes", code: "MEM", color: "bg-purple-600", text: "text-white" },
      { name: "Brainrot Gen-Z", code: "ROT", color: "bg-pink-600", text: "text-white" },
      { name: "Irony & Sarcasm", code: "IRO", color: "bg-yellow-600", text: "text-white" }
    ]
  },
  {
    id: "tfi",
    title: "TFI",
    subtitle: "TELUGU CINEMA",
    bgGradient: "from-amber-950/90 via-orange-950/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All TFI Cult", code: "TFI", color: "bg-amber-600", text: "text-white" },
      { name: "Vintage Classics", code: "VNT", color: "bg-yellow-700", text: "text-white" },
      { name: "Mass Dialogues", code: "MSS", color: "bg-red-700", text: "text-white" }
    ]
  },
  {
    id: "game",
    title: "GAME",
    subtitle: "CONSOLE & PC",
    bgGradient: "from-indigo-950/90 via-blue-950/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Gaming", code: "GAM", color: "bg-indigo-600", text: "text-white" },
      { name: "GTA & Rockstar", code: "GTA", color: "bg-emerald-600", text: "text-white" },
      { name: "Cyberpunk 2077", code: "CYB", color: "bg-yellow-400", text: "text-neutral-900" }
    ]
  },
  {
    id: "festival",
    title: "FESTIVAL",
    subtitle: "LIGHTS & KITES",
    bgGradient: "from-rose-950/90 via-amber-950/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Festival", code: "FST", color: "bg-rose-600", text: "text-white" },
      { name: "Diwali Luminary", code: "LUM", color: "bg-amber-500", text: "text-white" },
      { name: "Sankranti Kites", code: "KTE", color: "bg-sky-500", text: "text-white" }
    ]
  },
  {
    id: "customise",
    title: "CUSTOMISE",
    subtitle: "BESPOKE STUDIO",
    bgGradient: "from-neutral-900/90 via-stone-900/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Custom Studio", code: "CST", color: "bg-neutral-700", text: "text-white" },
      { name: "Personalised Backprint", code: "BCK", color: "bg-neutral-800", text: "text-white" }
    ]
  },
  {
    id: "college",
    title: "COLLEGE",
    subtitle: "CAMPUS NOSTALGIA",
    bgGradient: "from-blue-950/90 via-slate-900/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Campus", code: "CMP", color: "bg-blue-700", text: "text-white" },
      { name: "Varsity Letterman", code: "VAR", color: "bg-red-700", text: "text-white" }
    ]
  },
  {
    id: "office",
    title: "OFFICE",
    subtitle: "FRIDAY CODE",
    bgGradient: "from-slate-950/90 via-zinc-900/80 to-neutral-950",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80",
    subcategories: [
      { name: "All Friday Code", code: "OFC", color: "bg-slate-700", text: "text-white" },
      { name: "Smart Heavy Casual", code: "SMT", color: "bg-neutral-700", text: "text-white" }
    ]
  }
];

const MASTER_PRODUCTS = [
  {
    id: "th-01",
    slug: "cyber-ronin-oversized-graphic-tee",
    name: "CYBER-RONIN OVERSIZED GRAPHIC TEE",
    category: "T-Shirts",
    subcategory: "Demon Slayer",
    universeId: "anime",
    price: 1599,
    originalPrice: 2299,
    gsm: "280 GSM",
    fabric: "100% Combed Terry Cotton",
    fit: "Relaxed Boxy Cut",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Black", hex: "#1F1F1F" },
      { name: "Ash Grey", hex: "#7E7E7E" }
    ],
    inStock: true,
    badge: "BESTSELLER",
    reviewsCount: 38,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&auto=format&fit=crop&q=80"
    ],
    description: "Signature TH3EE oversized silhouette. Crafted from dense 280 GSM combed cotton with high-definition discharge graphic screenprint that stays soft wash after wash.",
    specs: [
      "280 GSM Loopback Heavyweight Cotton",
      "Zero Shrinkage Cold-Tumble Pre-Washed",
      "Seamless 1.25\" High-Rib Elasticated Neckline",
      "Drop-Shoulder Boxy Silhouette with Reinforced Seams"
    ]
  },
  {
    id: "th-02",
    slug: "shenron-acid-wash-heavyweight-tee",
    name: "SHENRON ACID-WASH HEAVYWEIGHT TEE",
    category: "T-Shirts",
    subcategory: "Dragon Ball Z",
    universeId: "anime",
    price: 1699,
    originalPrice: 2399,
    gsm: "260 GSM",
    fabric: "Enzyme Distressed Cotton",
    fit: "Loose Streetwear Fit",
    availableSizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Sage Mineral Olive", hex: "#5C6656" },
      { name: "Charcoal Washed", hex: "#2A2A2A" }
    ],
    inStock: true,
    badge: "TRENDING",
    reviewsCount: 24,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop&q=80"
    ],
    description: "Individually enzyme-washed in tumble baths for an authentic vintage streetwear fade. Features high-res anime contour embroidery on sleeve.",
    specs: [
      "260 GSM Single Jersey Combed Cotton",
      "Enzyme Mineral Fade Artisanal Treatment",
      "Raw-edge Blind Stitch Hem Detail"
    ]
  },
  {
    id: "th-03",
    slug: "raw-monolith-280-gsm-boxy-tee",
    name: "RAW MONOLITH 280 GSM BOXY TEE",
    category: "T-Shirts",
    subcategory: "Smart Heavy Casual",
    universeId: "office",
    price: 1499,
    originalPrice: 1999,
    gsm: "280 GSM",
    fabric: "100% Dense Compact Cotton",
    fit: "Square Boxy Silhouette",
    availableSizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Bone White", hex: "#F3EFEA" },
      { name: "Pitch Black", hex: "#0E0E0E" }
    ],
    inStock: true,
    badge: "ESSENTIAL",
    reviewsCount: 42,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80"
    ],
    description: "The quintessential minimalist heavyweight foundation. Features wider structured sleeves, reinforced double-needle construction, and clean front.",
    specs: [
      "280 GSM Heavy Combed Cotton Knit",
      "Structured 1.25\" Ribbed Collar with lycra core",
      "Woven Red TH3EE Hem Tag"
    ]
  },
  {
    id: "th-04",
    slug: "500-gsm-ultimate-french-terry-hoodie",
    name: "500 GSM ULTIMATE FRENCH TERRY HOODIE",
    category: "Hoodies & Sweats",
    subcategory: "Varsity Letterman",
    universeId: "college",
    price: 3499,
    originalPrice: 4799,
    gsm: "500 GSM",
    fabric: "Double-Loop French Terry",
    fit: "Oversized Heavy Drape",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Crimson Red", hex: "#E51E2B" }
    ],
    inStock: true,
    badge: "GRAIL",
    reviewsCount: 51,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80"
    ],
    description: "Our heaviest upper garment. Custom 500 GSM double-loop cotton fleece with self-lined cordless hood layer, deep kangaroo pocket.",
    specs: [
      "Extreme 500 GSM Unbrushed Pure Terry",
      "Cordless Sculpted Double-Ply Hood Layer",
      "Concealed Reinforced Kangaroo Pocket"
    ]
  },
  {
    id: "th-05",
    slug: "gotham-knight-acid-wash-hoodie",
    name: "GOTHAM KNIGHT ACID-WASH HOODIE",
    category: "Hoodies & Sweats",
    subcategory: "The Batman",
    universeId: "dc",
    price: 2999,
    originalPrice: 3899,
    gsm: "440 GSM",
    fabric: "Mineral Washed Cotton",
    fit: "Wide Boxy Cropped",
    availableSizes: ["M", "L", "XL"],
    colors: [
      { name: "Dusty Carbon Grey", hex: "#3A3B3C" }
    ],
    inStock: true,
    badge: "HOT DROP",
    reviewsCount: 19,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=900&auto=format&fit=crop&q=80"
    ],
    description: "Wide relaxed dropped shoulders, raw curled hem, and subtle tonal Batman bat crest on the chest.",
    specs: [
      "440 GSM Fleece Cotton Fabric",
      "Artisanal Raw Unhemmed Waist Silhouette"
    ]
  },
  {
    id: "th-06",
    slug: "technical-ripstop-tactical-windbreaker",
    name: "TECHNICAL RIPSTOP TACTICAL WINDBREAKER",
    category: "Jackets & Outerwear",
    subcategory: "Cyberpunk 2077",
    universeId: "game",
    price: 4499,
    originalPrice: 5999,
    gsm: "DWR Tech Shell",
    fabric: "High-Tenacity Nylon Ripstop",
    fit: "Ergonomic Box Fit",
    availableSizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Matte Olive / Black", hex: "#464E3E" },
      { name: "Tactical Stealth Black", hex: "#1A1A1A" }
    ],
    inStock: true,
    badge: "LIMITED",
    reviewsCount: 16,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=900&auto=format&fit=crop&q=80"
    ],
    description: "Weatherproof lightweight outer shield featuring DWR water-resistant coating, dual multi-angle cargo chest pods.",
    specs: [
      "DWR Water-Repellent Treatment Shell",
      "4 Sealed Waterproof Utility Pockets"
    ]
  },
  {
    id: "th-07",
    slug: "14-5-oz-raw-selvedge-trucker-jacket",
    name: "14.5 OZ RAW SELVEDGE TRUCKER JACKET",
    category: "Jackets & Outerwear",
    subcategory: "Spider-Man",
    universeId: "marvel",
    price: 4299,
    originalPrice: 5499,
    gsm: "14.5 Oz Selvedge",
    fabric: "100% Rigid Ring-Spun Cotton",
    fit: "Relaxed Trucker",
    availableSizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Indigo Raw", hex: "#1E2638" }
    ],
    inStock: true,
    badge: "PREMIUM",
    reviewsCount: 22,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop&q=80"
    ],
    description: "14.5oz raw unwashed selvedge denim built to mould to the wearer over years. Finished with red selvedge ticker lines.",
    specs: [
      "14.5oz Authentic Japanese Selvedge Denim",
      "Custom Gunmetal Shank Buttons"
    ]
  },
  {
    id: "th-08",
    slug: "dasara-raw-ember-boxy-tee",
    name: "DASARA RAW EMBER BOXY TEE",
    category: "T-Shirts",
    subcategory: "Dasara Raw",
    universeId: "nanis-paradise",
    price: 1649,
    originalPrice: 2199,
    gsm: "290 GSM",
    fabric: "100% Coarse Slub Cotton",
    fit: "Raw Boxy Heavy Fit",
    availableSizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Coal", hex: "#222222" }
    ],
    inStock: true,
    badge: "CULT EDIT",
    reviewsCount: 29,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80"
    ],
    description: "Heavy 290 GSM slub cotton with distressed pigment wash and gritty screenprint tribute.",
    specs: [
      "290 GSM Coarse Textured Slub Cotton",
      "Distressed Pigment Garment Wash"
    ]
  }
];

const AVAILABLE_GLOBAL_SIZES = ["S", "M", "L", "XL", "XXL"];
const FREE_SHIPPING_LIMIT = 1999;

function parseCurrentRoute() {
  if (typeof window === "undefined") {
    return { view: "home", slug: null, query: {} };
  }
  
  const rawHash = (window.location.hash || "").replace(/^#\/?/, "").trim();
  const searchParams = new URLSearchParams(window.location.search);
  const query = Object.fromEntries(searchParams.entries());

  if (rawHash) {
    if (rawHash === "shop") return { view: "shop", slug: null, query };
    if (rawHash === "track") return { view: "track", slug: null, query };
    if (rawHash.startsWith("order-result")) {
      const parts = rawHash.split("?");
      const q = new URLSearchParams(parts[1] || "");
      return { view: "order-result", slug: null, query: Object.fromEntries(q.entries()) };
    }
    if (rawHash.startsWith("products/")) {
      const slug = rawHash.replace("products/", "").split("?")[0];
      return { view: "product", slug, query };
    }
    if (rawHash === "" || rawHash === "home") {
      return { view: "home", slug: null, query };
    }
  }

  const rawPath = (window.location.pathname || "").trim();
  if (rawPath === "/shop") return { view: "shop", slug: null, query };
  if (rawPath === "/track") return { view: "track", slug: null, query };
  if (rawPath === "/order-result") return { view: "order-result", slug: null, query };
  if (rawPath.startsWith("/products/")) {
    const slug = rawPath.replace("/products/", "").split("?")[0];
    return { view: "product", slug, query };
  }

  return { view: "home", slug: null, query };
}

export default function App() {
  const [routeState, setRouteState] = useState(() => parseCurrentRoute());
  const [backendBaseUrl, setBackendBaseUrl] = useState(() => getSavedBackendUrl());
  const [isBackendConfigOpen, setIsBackendConfigOpen] = useState(false);
  const [backendConfigInput, setBackendConfigInput] = useState(() => getSavedBackendUrl());
  
  const navigate = (path, extraQuery = {}) => {
    let newView = "home";
    let newSlug = null;

    if (path === "/shop" || path === "shop") {
      newView = "shop";
    } else if (path === "/track" || path === "track") {
      newView = "track";
    } else if (path.startsWith("/order-result") || path.startsWith("order-result")) {
      newView = "order-result";
    } else if (path.startsWith("/products/")) {
      newView = "product";
      newSlug = path.replace("/products/", "").split("?")[0];
    } else {
      newView = "home";
    }

    if (typeof window !== "undefined") {
      const queryStr = Object.keys(extraQuery).length 
        ? "?" + new URLSearchParams(extraQuery).toString() 
        : "";
      const targetHash = newView === "home" 
        ? "#/" 
        : newView === "product" 
          ? `#/products/${newSlug}` 
          : `#/${newView}${queryStr}`;
      try {
        window.history.pushState({}, "", targetHash);
      } catch (err) {
        window.location.hash = targetHash;
      }
    }

    setRouteState({ view: newView, slug: newSlug, query: extraQuery });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleRouteSync = () => setRouteState(parseCurrentRoute());
    window.addEventListener("popstate", handleRouteSync);
    window.addEventListener("hashchange", handleRouteSync);
    return () => {
      window.removeEventListener("popstate", handleRouteSync);
      window.removeEventListener("hashchange", handleRouteSync);
    };
  }, []);

  const saveBackendUrlSetting = (newUrl) => {
    const sanitized = newUrl.trim().replace(/\/+$/, "");
    setBackendBaseUrl(sanitized);
    if (typeof window !== 'undefined') {
      localStorage.setItem("th3ee_backend_api_url", sanitized);
    }
    setIsBackendConfigOpen(false);
    showNotification(`Backend Endpoint configured to ${sanitized}`);
  };

  const [catalogFilters, setCatalogFilters] = useState({
    universeId: null,
    subcategory: null,
    category: "All",
    size: null,
    color: null,
    priceMin: 0,
    priceMax: 6000,
    inStockOnly: false
  });
  const [catalogSort, setCatalogSort] = useState("featured");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogPage, setCatalogPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedUniverseModal, setSelectedUniverseModal] = useState(null);

  const [cart, setCart] = useState([
    {
      ...MASTER_PRODUCTS[0],
      selectedSize: "L",
      selectedColor: "Washed Black",
      quantity: 1
    }
  ]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);

  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState("L");

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const [checkoutForm, setCheckoutForm] = useState({
    name: "Aarav Sharma",
    phone: "9876543210",
    email: "aarav.sharma@example.com",
    address: "Flat 304, Palm Grove Heights, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038"
  });

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [globalSearchInput, setGlobalSearchInput] = useState("");
  const [toastNotification, setToastNotification] = useState(null);

  const showNotification = (text) => {
    setToastNotification(text);
    setTimeout(() => setToastNotification(null), 3200);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - cartSubtotal);
  const hasFreeShipping = cartSubtotal >= FREE_SHIPPING_LIMIT || cartSubtotal === 0;
  const deliveryCharge = hasFreeShipping ? 0 : 149;
  const estimatedCartTotal = Math.max(0, cartSubtotal - appliedDiscount + (cart.length > 0 ? deliveryCharge : 0));

  const addToBag = (product, size, color) => {
    if (!size) {
      showNotification("Please select an available size before adding.");
      return false;
    }
    const colorToUse = color || (product.colors && product.colors[0]?.name) || "Standard";

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === colorToUse
      );
      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx].quantity += 1;
        return nextCart;
      }
      return [
        ...prev,
        {
          ...product,
          selectedSize: size,
          selectedColor: colorToUse,
          quantity: 1
        }
      ];
    });

    showNotification(`Added ${product.name} (${size}) to Bag`);
    return true;
  };

  const adjustBagQuantity = (productId, size, color, change) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId && item.selectedSize === size && item.selectedColor === color) {
            const next = item.quantity + change;
            return next > 0 ? { ...item, quantity: next } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const applyPromo = (codeToApply = couponCode) => {
    if (codeToApply.trim().toUpperCase() === "TH3EE10") {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage({ type: "success", text: "10% TH3EE Streetwear Discount Applied!" });
      showNotification("Coupon TH3EE10 Applied!");
    } else {
      setCouponMessage({ type: "error", text: "Invalid code. Try 'TH3EE10'" });
    }
  };

  const triggerWhatsAppAssistedOrder = (singleProduct = null, size = null, color = null) => {
    const phone = DEFAULT_BUSINESS_WHATSAPP;
    let itemsText = "";
    let totalAmt = 0;

    if (singleProduct) {
      itemsText = `1x ${singleProduct.name} (Size: ${size || "L"}, Color: ${color || singleProduct.colors[0]?.name || "Standard"}) - Rs.${singleProduct.price}`;
      totalAmt = singleProduct.price;
    } else {
      if (cart.length === 0) {
        showNotification("Your bag is empty. Add products first.");
        return;
      }
      itemsText = cart
        .map((item) => `• ${item.quantity}x ${item.name} (${item.selectedSize}, ${item.selectedColor}) - Rs.${item.price * item.quantity}`)
        .join("%0A");
      totalAmt = estimatedCartTotal;
    }

    const inquiryRef = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const text = 
      `Hey TH3EE Atelier 👋%0A%0A` +
      `I'd like to place an order / get assistance with this drop:%0A` +
      `*Inquiry Ref:* ${inquiryRef}%0A` +
      `*Cart Items:*%0A${itemsText}%0A%0A` +
      `*Estimated Amount:* Rs. ${totalAmt}.00%0A%0A` +
      `Could you please confirm fabric availability and share the payment link? Thanks!`;

    const waUrl = `https://wa.me/${phone}?text=${text}`;
    window.open(waUrl, "_blank");
    showNotification("Opening WhatsApp with TH3EE Atelier...");
  };

  const initiateRazorpayPayment = async (e) => {
    e.preventDefault();
    setCheckoutError("");

    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      setCheckoutError("Please enter valid name, phone number, and delivery address.");
      return;
    }

    if (cart.length === 0) {
      setCheckoutError("Cart is empty.");
      return;
    }

    setIsProcessingPayment(true);

    try {
      const orderPayload = {
        customer: {
          name: checkoutForm.name.trim(),
          phone: checkoutForm.phone.trim(),
          email: checkoutForm.email.trim(),
          address: checkoutForm.address.trim(),
          city: checkoutForm.city.trim(),
          state: checkoutForm.state.trim(),
          pincode: checkoutForm.pincode.trim()
        },
        items: cart.map((i) => ({
          productId: i.id,
          selectedSize: i.selectedSize,
          selectedColor: i.selectedColor,
          quantity: i.quantity
        })),
        couponCode: couponCode.trim().toUpperCase() || null
      };

      const createOrderResponse = await fetch(`${backendBaseUrl}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      }).catch((fetchErr) => {
        throw new Error(
          `Unable to reach backend at ${backendBaseUrl}. Ensure your Node.js backend is running. Details: ${fetchErr.message}`
        );
      });

      if (!createOrderResponse.ok) {
        const errorJson = await createOrderResponse.json().catch(() => ({}));
        throw new Error(errorJson.message || `Server returned error status ${createOrderResponse.status}`);
      }

      const orderData = await createOrderResponse.json();
      const { razorpayOrderId, razorpayKeyId, amount, currency, orderReference } = orderData;

      if (!razorpayOrderId || !razorpayKeyId) {
        throw new Error("Backend did not return valid Razorpay Order ID or public Key ID.");
      }

      const isSdkLoaded = await loadRazorpayScript();
      if (!isSdkLoaded) {
        throw new Error("Failed to load Razorpay payment gateway script. Please check your network connection.");
      }

      const options = {
        key: razorpayKeyId,
        amount: amount,
        currency: currency || "INR",
        name: "TH3EE STREETWEAR",
        description: `Order ${orderReference} • Heavyweight Drops`,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80",
        order_id: razorpayOrderId,
        prefill: {
          name: checkoutForm.name,
          email: checkoutForm.email,
          contact: checkoutForm.phone
        },
        theme: {
          color: "#E51E2B"
        },
        handler: async function (response) {
          try {
            const verificationPayload = {
              orderReference: orderReference,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            const verifyResponse = await fetch(`${backendBaseUrl}/api/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(verificationPayload)
            });

            const verifyData = await verifyResponse.json().catch(() => ({}));

            if (verifyResponse.ok && verifyData.success && verifyData.verified) {
              setIsProcessingPayment(false);
              setIsCheckoutOpen(false);
              setCart([]);
              
              navigate("/order-result", {
                orderId: orderReference,
                status: "success",
                paymentId: response.razorpay_payment_id
              });
            } else {
              setIsProcessingPayment(false);
              navigate("/order-result", {
                orderId: orderReference,
                status: "failed",
                reason: verifyData.message || "Payment signature verification failed on backend."
              });
            }
          } catch (verifyErr) {
            setIsProcessingPayment(false);
            navigate("/order-result", {
              orderId: orderReference,
              status: "failed",
              reason: `Failed to confirm verification with backend: ${verifyErr.message}`
            });
          }
        },
        modal: {
          ondismiss: async function () {
            setIsProcessingPayment(false);
            setCheckoutError("Payment was cancelled or closed. Your bag is preserved.");
            showNotification("Payment cancelled. You can retry anytime.");
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", function (failResponse) {
        setIsProcessingPayment(false);
        navigate("/order-result", {
          orderId: orderReference,
          status: "failed",
          reason: failResponse.error?.description || "Payment failed or declined by issuing bank."
        });
      });
      rzpInstance.open();

    } catch (err) {
      setIsProcessingPayment(false);
      setCheckoutError(err.message || "An unexpected error occurred during checkout.");
      showNotification("Checkout Error: " + (err.message || "See details"));
    }
  };

  const openUniverseInShop = (universeId, subcategory = null) => {
    setCatalogFilters({
      universeId: universeId || null,
      subcategory: (subcategory && !subcategory.startsWith("All")) ? subcategory : null,
      category: "All",
      size: null,
      color: null,
      priceMin: 0,
      priceMax: 6000,
      inStockOnly: false
    });
    setCatalogPage(1);
    setSelectedUniverseModal(null);
    navigate("/shop");
  };

  const currentProduct = useMemo(() => {
    if (!routeState.slug) return null;
    return MASTER_PRODUCTS.find((p) => p.slug === routeState.slug) || null;
  }, [routeState.slug]);

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#121212] font-sans selection:bg-[#E51E2B] selection:text-white antialiased flex flex-col justify-between">
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121212] text-white px-4 py-3 rounded-none shadow-2xl flex items-center space-x-2 text-xs font-mono tracking-wide border-l-4 border-[#E51E2B]">
          <Sparkles className="w-4 h-4 text-[#E51E2B]" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Top Banner Notice */}
      <div className="bg-[#111111] text-white text-[11px] font-mono tracking-wider py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-flex items-center gap-1.5 text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E51E2B]" />
            Official TH3EE Storefront • Razorpay 256-Bit SSL • th3ee.in
          </span>
          <p className="w-full md:w-auto text-center font-medium">
            TH3EE HEAVYWEIGHT ARCHIVE • FREE EXPRESS SHIPPING OVER Rs.{FREE_SHIPPING_LIMIT}
          </p>
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigate("/track")}
              className="text-neutral-400 hover:text-white flex items-center gap-1 text-[10px] uppercase font-bold"
            >
              <Truck className="w-3.5 h-3.5 text-[#E51E2B]" />
              <span>Track Order</span>
            </button>
            <a 
              href="https://instagram.com/th3ee.verse" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E51E2B]" />
              <span>@th3ee.verse</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} 
              className="p-2 text-neutral-700 hover:text-black focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <Th3eeBrandLogo onClick={() => navigate("/")} />

          <nav className="hidden lg:flex items-center space-x-7">
            <button
              onClick={() => navigate("/")}
              className={`text-xs uppercase tracking-widest font-semibold py-7 transition-colors relative ${
                routeState.view === "home" ? "text-[#E51E2B] font-bold" : "text-neutral-700 hover:text-black"
              }`}
            >
              Home
              {routeState.view === "home" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E51E2B]" />
              )}
            </button>

            <button
              onClick={() => {
                setCatalogFilters({
                  universeId: null,
                  subcategory: null,
                  category: "All",
                  size: null,
                  color: null,
                  priceMin: 0,
                  priceMax: 6000,
                  inStockOnly: false
                });
                navigate("/shop");
              }}
              className={`text-xs uppercase tracking-widest font-semibold py-7 transition-colors relative ${
                routeState.view === "shop" && catalogFilters.category === "All" && !catalogFilters.universeId
                  ? "text-[#E51E2B] font-bold"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              Shop All
              {routeState.view === "shop" && catalogFilters.category === "All" && !catalogFilters.universeId && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E51E2B]" />
              )}
            </button>

            <button
              onClick={() => {
                setCatalogFilters((prev) => ({ ...prev, category: "T-Shirts", universeId: null, subcategory: null }));
                navigate("/shop");
              }}
              className={`text-xs uppercase tracking-widest font-semibold py-7 transition-colors relative ${
                routeState.view === "shop" && catalogFilters.category === "T-Shirts"
                  ? "text-[#E51E2B] font-bold"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              T-Shirts
              {routeState.view === "shop" && catalogFilters.category === "T-Shirts" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E51E2B]" />
              )}
            </button>

            <button
              onClick={() => {
                setCatalogFilters((prev) => ({ ...prev, category: "Hoodies & Sweats", universeId: null, subcategory: null }));
                navigate("/shop");
              }}
              className={`text-xs uppercase tracking-widest font-semibold py-7 transition-colors relative ${
                routeState.view === "shop" && catalogFilters.category === "Hoodies & Sweats"
                  ? "text-[#E51E2B] font-bold"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              Hoodies & Sweats
              {routeState.view === "shop" && catalogFilters.category === "Hoodies & Sweats" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E51E2B]" />
              )}
            </button>

            <button
              onClick={() => {
                setCatalogFilters((prev) => ({ ...prev, category: "Jackets & Outerwear", universeId: null, subcategory: null }));
                navigate("/shop");
              }}
              className={`text-xs uppercase tracking-widest font-semibold py-7 transition-colors relative ${
                routeState.view === "shop" && catalogFilters.category === "Jackets & Outerwear"
                  ? "text-[#E51E2B] font-bold"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              Jackets & Outerwear
              {routeState.view === "shop" && catalogFilters.category === "Jackets & Outerwear" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E51E2B]" />
              )}
            </button>

            <button
              onClick={() => {
                if (routeState.view !== "home") {
                  navigate("/");
                  setTimeout(() => {
                    const el = document.getElementById("shop-by-universe");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 250);
                } else {
                  const el = document.getElementById("shop-by-universe");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-neutral-900 hover:text-[#E51E2B] py-7 transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-[#E51E2B] rounded-full" />
              <span>Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              onClick={() => navigate("/track")}
              className={`text-xs uppercase tracking-widest font-semibold py-7 transition-colors relative flex items-center gap-1 ${
                routeState.view === "track" ? "text-[#E51E2B] font-bold" : "text-neutral-700 hover:text-black"
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-[#E51E2B]" />
              <span>Track Order</span>
              {routeState.view === "track" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E51E2B]" />
              )}
            </button>
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => {
                setBackendConfigInput(backendBaseUrl);
                setIsBackendConfigOpen(true);
              }}
              className="p-1.5 text-neutral-500 hover:text-[#E51E2B] transition-colors"
              title="Configure Node.js Backend API URL"
              aria-label="Backend Settings"
            >
              <Server className="w-4 h-4" />
            </button>

            <div className="relative">
              {isSearchActive ? (
                <div className="flex items-center bg-neutral-100 border border-neutral-300 px-2.5 py-1">
                  <input
                    type="text"
                    placeholder="Search drops, fabric..."
                    value={globalSearchInput}
                    onChange={(e) => setGlobalSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setCatalogSearch(globalSearchInput);
                        navigate("/shop");
                        setIsSearchActive(false);
                      }
                    }}
                    className="bg-transparent text-xs focus:outline-none w-36 sm:w-48 text-neutral-800 placeholder:text-neutral-400 font-mono"
                    autoFocus
                  />
                  <button onClick={() => { setIsSearchActive(false); setGlobalSearchInput(""); }}>
                    <X className="w-3.5 h-3.5 text-neutral-500 hover:text-black" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchActive(true)}
                  className="p-1 text-neutral-700 hover:text-black transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsBagOpen(true)}
              className="flex items-center space-x-2 bg-neutral-900 text-white hover:bg-[#E51E2B] px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors shadow-sm"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">BAG</span>
              <span className="bg-white text-black font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
                {cart.reduce((count, item) => count + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Backend API Configuration Modal */}
      {isBackendConfigOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsBackendConfigOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#E51E2B] font-bold mb-2">
              <Server className="w-4 h-4" />
              <span>NODE.JS BACKEND INTEGRATION</span>
            </div>

            <h3 className="text-base font-mono font-bold uppercase text-neutral-900 mb-2">
              Backend API Base URL
            </h3>
            
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-sans">
              Connect this storefront to your Node.js backend. All Razorpay key secrets and signature verifications remain exclusively on your server.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                  Target Endpoint URL
                </label>
                <input
                  type="url"
                  value={backendConfigInput}
                  onChange={(e) => setBackendConfigInput(e.target.value)}
                  placeholder="http://localhost:5000"
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-black font-mono"
                />
              </div>

              <div className="bg-neutral-100 p-3 border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
                <div><strong>Current active:</strong> <code>{backendBaseUrl}</code></div>
                <div><strong>Create Order:</strong> <code>POST {backendBaseUrl}/api/payments/create-order</code></div>
                <div><strong>Verify Order:</strong> <code>POST {backendBaseUrl}/api/payments/verify</code></div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBackendConfigOpen(false)}
                  className="flex-1 border border-neutral-300 py-2 text-xs uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveBackendUrlSetting(backendConfigInput)}
                  className="flex-1 bg-[#E51E2B] hover:bg-black text-white py-2 text-xs uppercase font-bold transition-colors"
                >
                  Save URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileNavOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 p-5 space-y-4 shadow-xl z-50">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E51E2B] font-bold">
              TH3EE ARCHIVE NAVIGATION
            </span>
            <button onClick={() => setIsMobileNavOpen(false)}>
              <X className="w-5 h-5 text-neutral-600" />
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs uppercase">
            <button
              onClick={() => { navigate("/"); setIsMobileNavOpen(false); }}
              className="block w-full text-left font-bold text-neutral-800 hover:text-[#E51E2B]"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCatalogFilters({
                  universeId: null,
                  subcategory: null,
                  category: "All",
                  size: null,
                  color: null,
                  priceMin: 0,
                  priceMax: 6000,
                  inStockOnly: false
                });
                navigate("/shop");
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left font-bold text-neutral-800 hover:text-[#E51E2B]"
            >
              Shop All (Full Catalog)
            </button>
            <button
              onClick={() => {
                setCatalogFilters((prev) => ({ ...prev, category: "T-Shirts", universeId: null, subcategory: null }));
                navigate("/shop");
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left font-bold text-neutral-800 hover:text-[#E51E2B]"
            >
              T-Shirts
            </button>
            <button
              onClick={() => {
                setCatalogFilters((prev) => ({ ...prev, category: "Hoodies & Sweats", universeId: null, subcategory: null }));
                navigate("/shop");
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left font-bold text-neutral-800 hover:text-[#E51E2B]"
            >
              Hoodies & Sweats
            </button>
            <button
              onClick={() => {
                setCatalogFilters((prev) => ({ ...prev, category: "Jackets & Outerwear", universeId: null, subcategory: null }));
                navigate("/shop");
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left font-bold text-neutral-800 hover:text-[#E51E2B]"
            >
              Jackets & Outerwear
            </button>
            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                navigate("/track");
              }}
              className="block w-full text-left font-bold text-neutral-800 hover:text-[#E51E2B] flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-[#E51E2B]" />
              <span>Track My Order</span>
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-200">
            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                triggerWhatsAppAssistedOrder();
              }}
              className="w-full bg-[#25D366] text-white py-2 px-3 text-xs font-mono font-bold flex items-center justify-center gap-2 mb-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Atelier on WhatsApp</span>
            </button>
            <a 
              href="https://instagram.com/th3ee.verse" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#E51E2B] text-xs font-mono font-bold flex items-center gap-2 justify-center"
            >
              <Instagram className="w-4 h-4" />
              <span>@th3ee.verse • Follow on Instagram</span>
            </a>
          </div>
        </div>
      )}

      {/* Active Route Main View Container */}
      <main className="flex-1 w-full min-h-[60vh]">
        {routeState.view === "home" && (
          <HomePageView 
            navigate={navigate}
            openUniverseInShop={openUniverseInShop}
            setSelectedUniverseModal={setSelectedUniverseModal}
            addToBag={addToBag}
            setQuickViewItem={setQuickViewItem}
            setQuickViewSize={setQuickViewSize}
            triggerWhatsAppAssistedOrder={triggerWhatsAppAssistedOrder}
          />
        )}

        {routeState.view === "shop" && (
          <ShopAllView 
            navigate={navigate}
            catalogFilters={catalogFilters}
            setCatalogFilters={setCatalogFilters}
            catalogSort={catalogSort}
            setCatalogSort={setCatalogSort}
            catalogSearch={catalogSearch}
            setCatalogSearch={setCatalogSearch}
            catalogPage={catalogPage}
            setCatalogPage={setCatalogPage}
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
            addToBag={addToBag}
            setQuickViewItem={setQuickViewItem}
            setQuickViewSize={setQuickViewSize}
          />
        )}

        {routeState.view === "product" && (
          <ProductDetailPageView 
            product={currentProduct}
            slug={routeState.slug}
            navigate={navigate}
            addToBag={addToBag}
            allProducts={MASTER_PRODUCTS}
            showNotification={showNotification}
            triggerWhatsAppAssistedOrder={triggerWhatsAppAssistedOrder}
          />
        )}

        {routeState.view === "track" && (
          <CustomerOrderTrackingView 
            backendBaseUrl={backendBaseUrl}
            navigate={navigate}
            showNotification={showNotification}
          />
        )}

        {routeState.view === "order-result" && (
          <OrderResultPageView 
            query={routeState.query}
            navigate={navigate}
            backendBaseUrl={backendBaseUrl}
            triggerWhatsAppAssistedOrder={triggerWhatsAppAssistedOrder}
          />
        )}
      </main>

      {/* Subcategory Modal */}
      {selectedUniverseModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-neutral-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-1 bg-sky-500 rounded-full mb-4" />

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900">
                      All {selectedUniverseModal.title}
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mt-1">
                    {selectedUniverseModal.subcategories.length} SAGAS AVAILABLE
                  </p>
                </div>

                <button
                  onClick={() => setSelectedUniverseModal(null)}
                  className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-6 max-h-[50vh] overflow-y-auto pr-1">
                {selectedUniverseModal.subcategories.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => openUniverseInShop(selectedUniverseModal.id, sub.name)}
                    className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 hover:border-neutral-400 rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all group"
                  >
                    <div className={`w-9 h-9 rounded-xl ${sub.color} ${sub.text} font-mono font-bold text-xs flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform`}>
                      {sub.code}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tight text-neutral-800 group-hover:text-[#E51E2B] transition-colors leading-snug">
                      {sub.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500 text-[11px]">Tap any saga to open catalog filter</span>
              <button
                onClick={() => setSelectedUniverseModal(null)}
                className="text-neutral-700 hover:text-black font-bold uppercase text-[11px] hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bag Drawer */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setIsBagOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-neutral-200 flex flex-col justify-between shadow-2xl">
              <div className="p-5 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <ShoppingBag className="w-5 h-5 text-[#E51E2B]" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900">
                      TH3EE BAG ({cart.reduce((t, i) => t + i.quantity, 0)})
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsBagOpen(false)}
                    className="p-1 text-neutral-500 hover:text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200">
                  <div className="flex justify-between items-center text-[11px] font-mono mb-1.5">
                    <span className="text-neutral-700 font-medium">
                      {hasFreeShipping ? (
                        <span className="text-[#E51E2B] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E51E2B]" /> Free Express Shipping Unlocked!
                        </span>
                      ) : (
                        <span>Add <strong className="text-neutral-900">Rs. {amountNeededForFreeShipping}</strong> for Free Shipping</span>
                      )}
                    </span>
                    <span className="text-neutral-500 font-bold">
                      {Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_LIMIT) * 100))}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#E51E2B] h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (cartSubtotal / FREE_SHIPPING_LIMIT) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bag Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-neutral-100">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <p className="font-mono text-xs uppercase text-neutral-500">YOUR BAG IS CURRENTLY EMPTY</p>
                    <button
                      onClick={() => { setIsBagOpen(false); navigate("/shop"); }}
                      className="bg-neutral-900 hover:bg-[#E51E2B] text-white font-mono text-xs uppercase px-5 py-2.5 font-bold transition-colors"
                    >
                      BROWSE TH3EE CATALOG
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="pt-4 first:pt-0 flex space-x-3.5"
                    >
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-20 h-24 object-cover border border-neutral-200 bg-neutral-100 shrink-0 cursor-pointer"
                        onClick={() => { setIsBagOpen(false); navigate(`/products/${item.slug}`); }}
                      />
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 
                              onClick={() => { setIsBagOpen(false); navigate(`/products/${item.slug}`); }}
                              className="text-xs font-bold uppercase tracking-tight text-neutral-900 line-clamp-1 hover:text-[#E51E2B] cursor-pointer"
                            >
                              {item.name}
                            </h4>
                            <button 
                              onClick={() => adjustBagQuantity(item.id, item.selectedSize, item.selectedColor, -item.quantity)}
                              className="text-neutral-400 hover:text-[#E51E2B] text-xs font-mono ml-2"
                              aria-label="Remove item"
                            >
                              x
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 mt-1">
                            <span className="bg-neutral-100 text-neutral-800 px-1.5 py-0.5 font-bold">SIZE: {item.selectedSize}</span>
                            <span>{item.selectedColor}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-neutral-300 bg-white">
                            <button
                              onClick={() => adjustBagQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-mono font-bold text-neutral-900">{item.quantity}</span>
                            <button
                              onClick={() => adjustBagQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:bg-neutral-100"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <span className="font-mono font-extrabold text-sm text-neutral-900">
                              Rs. {item.price * item.quantity}.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bag Summary and Checkout Actions */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3.5">
                  <div className="space-y-1.5">
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        placeholder="ENTER COUPON CODE"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full bg-white border border-neutral-300 px-3 py-1.5 text-xs font-mono uppercase text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-black"
                      />
                      <button
                        onClick={() => applyPromo(couponCode)}
                        className="bg-neutral-900 hover:bg-[#E51E2B] text-white px-4 py-1.5 text-xs font-mono uppercase font-bold transition-colors"
                      >
                        APPLY
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>Available:</span>
                      <button 
                        onClick={() => { setCouponCode("TH3EE10"); applyPromo("TH3EE10"); }}
                        className="text-[#E51E2B] font-bold underline cursor-pointer"
                      >
                        USE 'TH3EE10' FOR 10% OFF
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`text-[10px] font-mono ${couponMessage.type === "success" ? "text-green-600 font-bold" : "text-red-500"}`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs font-mono border-t border-neutral-200 pt-3">
                    <div className="flex justify-between text-neutral-600">
                      <span>Estimated Subtotal</span>
                      <span className="font-semibold text-neutral-900">Rs. {cartSubtotal}.00</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-[#E51E2B]">
                        <span>Promo Discount (TH3EE10)</span>
                        <span>- Rs. {appliedDiscount}.00</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-600">
                      <span>Shipping</span>
                      <span className={hasFreeShipping ? "text-green-600 font-bold" : "text-neutral-900"}>
                        {hasFreeShipping ? "FREE" : `Rs. ${deliveryCharge}.00`}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                      <span>Estimated Total</span>
                      <span className="text-[#E51E2B]">Rs. {estimatedCartTotal}.00</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsBagOpen(false);
                      setIsCheckoutOpen(true);
                      setCheckoutError("");
                    }}
                    className="w-full bg-[#E51E2B] hover:bg-black text-white font-extrabold font-mono uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center space-x-2 text-xs shadow-sm"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>PROCEED TO PAY • RS. {estimatedCartTotal}.00</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => triggerWhatsAppAssistedOrder()}
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold font-mono uppercase py-2.5 tracking-wider transition-colors flex items-center justify-center space-x-2 text-[11px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>ORDER VIA WHATSAPP (DIRECT ATELIER CHAT)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={initiateRazorpayPayment} className="space-y-5">
              <div className="border-b border-neutral-200 pb-3">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#E51E2B] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AUTHORITATIVE NODE.JS + RAZORPAY CHECKOUT</span>
                </div>
                <h3 className="text-base font-mono font-black uppercase text-neutral-900 mt-1">
                  PAYMENT GATEWAY HANDOFF • TOTAL RS. {estimatedCartTotal}.00
                </h3>
                <p className="text-[11px] font-mono text-neutral-500 mt-1">
                  Verified server backend: <code className="text-neutral-700 font-bold">{backendBaseUrl}</code>
                </p>
              </div>

              {checkoutError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 text-xs font-mono flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{checkoutError}</span>
                </div>
              )}

              <div className="space-y-3 text-xs font-mono">
                <div className="text-neutral-500 uppercase text-[10px] font-bold">CONTACT & SHIPPING DESTINATION</div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] uppercase text-neutral-400 block mb-0.5">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-neutral-400 block mb-0.5">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase text-neutral-400 block mb-0.5">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase text-neutral-400 block mb-0.5">Street Address & Landmark</label>
                  <input 
                    type="text" 
                    required 
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[9px] uppercase text-neutral-400 block mb-0.5">City</label>
                    <input 
                      type="text" 
                      required 
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 px-2.5 py-2 text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-neutral-400 block mb-0.5">State</label>
                    <input 
                      type="text" 
                      required 
                      value={checkoutForm.state}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 px-2.5 py-2 text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase text-neutral-400 block mb-0.5">PIN Code</label>
                    <input 
                      type="text" 
                      required 
                      value={checkoutForm.pincode}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 px-2.5 py-2 text-neutral-900 focus:outline-none focus:border-black font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1.5">
                  Available in Razorpay Session:
                </span>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-neutral-700">
                  <span className="bg-neutral-100 px-2 py-1 border border-neutral-200 flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-[#E51E2B]" /> UPI (GPay, PhonePe, Paytm)
                  </span>
                  <span className="bg-neutral-100 px-2 py-1 border border-neutral-200 flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-neutral-700" /> Credit / Debit Cards
                  </span>
                  <span className="bg-neutral-100 px-2 py-1 border border-neutral-200">
                    Net Banking (50+ Banks)
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full bg-[#E51E2B] hover:bg-black text-white font-extrabold uppercase font-mono py-3.5 tracking-wider transition-colors flex items-center justify-center space-x-2 text-xs shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isProcessingPayment 
                    ? "CREATING ORDER ON BACKEND..." 
                    : `PROCEED TO PAY RS. ${estimatedCartTotal}.00`}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Quick View Item Overlay */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 max-w-3xl w-full relative grid grid-cols-1 md:grid-cols-2 shadow-2xl">
            <button
              onClick={() => setQuickViewItem(null)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-black hover:text-white text-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[3/4] bg-neutral-100 relative">
              <img 
                src={quickViewItem.images[0]} 
                alt={quickViewItem.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-3 left-3 bg-[#E51E2B] text-white text-[10px] font-mono font-bold px-2 py-0.5">
                {quickViewItem.gsm}
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#E51E2B] uppercase tracking-wider font-bold">
                  {quickViewItem.category} • {quickViewItem.subcategory}
                </span>
                <h3 className="text-base font-bold text-neutral-900 uppercase">{quickViewItem.name}</h3>

                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-bold font-mono text-neutral-900">Rs. {quickViewItem.price}.00</span>
                  <span className="text-xs font-mono text-neutral-400 line-through">Rs. {quickViewItem.originalPrice}.00</span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed pt-2 border-t border-neutral-100">
                  {quickViewItem.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-neutral-100">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-500">SELECT SIZE:</span>
                  <span className="text-[#E51E2B] font-semibold">{quickViewItem.fit}</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {quickViewItem.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setQuickViewSize(size)}
                      className={`py-1.5 text-xs font-mono font-bold border transition-colors ${
                        quickViewSize === size
                          ? "bg-[#E51E2B] border-[#E51E2B] text-white"
                          : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToBag(quickViewItem, quickViewSize);
                      setQuickViewItem(null);
                      setIsBagOpen(true);
                    }}
                    className="flex-1 bg-neutral-900 hover:bg-[#E51E2B] text-white font-extrabold uppercase font-mono py-3 text-xs tracking-wider transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </button>

                  <button
                    onClick={() => {
                      setQuickViewItem(null);
                      navigate(`/products/${quickViewItem.slug}`);
                    }}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-mono text-xs font-bold px-3 py-3 uppercase flex items-center gap-1 transition-colors"
                  >
                    <span>Full Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-200">
            <div className="space-y-3">
              <Th3eeBrandLogo onClick={() => navigate("/")} />
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                TH3EE is an independent Indian streetwear atelier crafting 280-500 GSM loopback cotton heavyweight silhouettes across comic, anime, cinema, and pop-culture universes.
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#E51E2B]">
                <Instagram className="w-4 h-4" />
                <a href="https://instagram.com/th3ee.verse" target="_blank" rel="noreferrer" className="hover:underline font-bold">
                  @th3ee.verse
                </a>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <h5 className="text-neutral-900 font-bold uppercase tracking-wider">POPULAR UNIVERSES</h5>
              <ul className="space-y-1.5 text-neutral-600">
                <li className="hover:text-black cursor-pointer" onClick={() => openUniverseInShop("anime")}>
                  Anime Shonen Saga (11 Sagas)
                </li>
                <li className="hover:text-black cursor-pointer" onClick={() => openUniverseInShop("marvel")}>
                  Marvel Cinematic Drops
                </li>
                <li className="hover:text-black cursor-pointer" onClick={() => openUniverseInShop("dc")}>
                  DC Gotham & Justice
                </li>
                <li className="hover:text-black cursor-pointer" onClick={() => openUniverseInShop("tfi")}>
                  TFI Telugu Cult Cinema
                </li>
                <li className="hover:text-black cursor-pointer" onClick={() => openUniverseInShop("game")}>
                  Console & PC Gaming
                </li>
              </ul>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <h5 className="text-neutral-900 font-bold uppercase tracking-wider">ORDER SERVICE & SUPPORT</h5>
              <ul className="space-y-1.5 text-neutral-600">
                <li className="hover:text-[#E51E2B] cursor-pointer font-bold text-neutral-900 flex items-center gap-1" onClick={() => navigate("/track")}>
                  <Truck className="w-3.5 h-3.5 text-[#E51E2B]" />
                  <span>Track My Order (Live Status)</span>
                </li>
                <li className="hover:text-black cursor-pointer" onClick={() => triggerWhatsAppAssistedOrder()}>
                  WhatsApp Order Help Desk
                </li>
                <li className="hover:text-black cursor-pointer" onClick={() => showNotification("7-day doorstep size swap available")}>
                  7-Day Doorstep Returns & Exchanges
                </li>
              </ul>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <h5 className="text-neutral-900 font-bold uppercase tracking-wider">BACKEND & PAYMENT ARCHITECTURE</h5>
              <div className="bg-neutral-50 p-3.5 border border-neutral-200 space-y-1.5">
                <div className="text-neutral-500 text-[10px]">INTEGRATION MODE:</div>
                <div className="text-neutral-900 font-bold text-xs tracking-wider">NODE.JS + RAZORPAY TEST API</div>
                <div className="text-neutral-500 text-[10px] pt-1">ACTIVE ENDPOINT:</div>
                <div className="text-neutral-700 font-mono text-[10px] truncate" title={backendBaseUrl}>{backendBaseUrl}</div>
                <div className="pt-1">
                  <button 
                    onClick={() => setIsBackendConfigOpen(true)}
                    className="text-[10px] font-mono text-[#E51E2B] hover:underline font-bold"
                  >
                    Configure Endpoint ⚙
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-3">
            <div>© {new Date().getFullYear()} TH3EE (th3ee.in). ALL RIGHTS RESERVED.</div>
            <div className="flex items-center space-x-4">
              <span>PRIVACY POLICY</span>
              <span>•</span>
              <span>TERMS OF SERVICE</span>
              <span>•</span>
              <span>PCI-DSS LEVEL 1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CustomerOrderTrackingView({ backendBaseUrl, navigate, showNotification }) {
  const [searchOrderId, setSearchOrderId] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [matchedOrder, setMatchedOrder] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    setLookupError("");
    setMatchedOrder(null);

    const cleanId = searchOrderId.trim().toUpperCase();
    const cleanPhone = searchPhone.trim().replace(/\D/g, "");

    if (!cleanId || !cleanPhone) {
      setLookupError("Please enter both your Order ID and registered Phone Number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${backendBaseUrl}/api/orders/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: cleanId, phone: cleanPhone })
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.message || "No verified order record found matching this Order ID and Phone Number.");
      }

      const orderData = await response.json();
      setMatchedOrder(orderData.order);
    } catch (err) {
      setLookupError(err.message || "Unable to reach tracking server. Ensure backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const TIMELINE_STEPS = [
    { key: "confirmed", label: "Order Placed & Confirmed" },
    { key: "processing", label: "Atelier Processing" },
    { key: "packed", label: "Quality Inspection & Packed" },
    { key: "shipped", label: "Handed over to Courier" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered to Customer" }
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    const orderFlow = ["pending_payment", "confirmed", "processing", "packed", "shipped", "out_for_delivery", "delivered"];
    const currentIndex = orderFlow.indexOf(currentStatus);
    const stepIndex = orderFlow.indexOf(stepKey);

    if (currentStatus === "cancelled") return "cancelled";
    if (currentIndex >= stepIndex) return "completed";
    return "upcoming";
  };

  return (
    <div className="bg-[#FBFBFB] min-h-[75vh] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-white border border-neutral-200 px-3 py-1 text-[11px] font-mono text-[#E51E2B] uppercase tracking-wider font-bold mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>AUTHORITATIVE ORDER DISPATCH TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900">
            Track Your TH3EE Order
          </h1>
          <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
            Enter your Order ID (from your confirmation screen/email) and registered 10-digit mobile number for secure server-side lookup.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-sm mb-8">
          <form onSubmit={handleLookup} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-5">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-600 block mb-1">
                Order ID (e.g. TH3-20261009-8812)
              </label>
              <input
                type="text"
                required
                placeholder="TH3-..."
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-black"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-[11px] font-mono uppercase font-bold text-neutral-600 block mb-1">
                Registered Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="10-digit number"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-neutral-900 hover:bg-[#E51E2B] text-white font-mono text-xs font-bold uppercase py-2.5 transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isLoading ? "QUERYING..." : "TRACK ORDER"}</span>
              </button>
            </div>
          </form>

          {lookupError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{lookupError}</span>
            </div>
          )}
        </div>

        {matchedOrder && (
          <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
            <div className="bg-neutral-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  ORDER REFERENCE
                </span>
                <h3 className="text-base sm:text-lg font-mono font-black text-white">
                  {matchedOrder.orderId}
                </h3>
                <span className="text-[11px] font-mono text-neutral-400">
                  Placed on {new Date(matchedOrder.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-none border ${
                  matchedOrder.payment?.status === "paid" 
                    ? "bg-green-600/20 text-green-400 border-green-500/40" 
                    : "bg-amber-600/20 text-amber-400 border-amber-500/40"
                }`}>
                  Payment: {matchedOrder.payment?.status}
                </span>

                <span className="px-3 py-1 text-xs font-mono font-bold uppercase bg-[#E51E2B] text-white">
                  Status: {matchedOrder.fulfillment?.status?.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-b border-neutral-200 bg-neutral-50">
              <h4 className="text-xs font-mono uppercase font-bold text-neutral-500 mb-6">
                DISPATCH TELEMETRY TIMELINE
              </h4>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-neutral-200">
                {TIMELINE_STEPS.map((step, idx) => {
                  const status = getStepStatus(step.key, matchedOrder.fulfillment?.status);
                  const isDone = status === "completed";
                  return (
                    <div key={step.key} className="relative flex items-center space-x-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold z-10 ${
                        isDone 
                          ? "bg-neutral-900 text-white" 
                          : "bg-white border-2 border-neutral-300 text-neutral-400"
                      }`}>
                        {isDone ? <Check className="w-3.5 h-3.5 text-white" /> : idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-mono uppercase font-bold ${
                          isDone ? "text-neutral-900" : "text-neutral-400"
                        }`}>
                          {step.label}
                        </p>
                        {step.key === "shipped" && matchedOrder.fulfillment?.awbNumber && (
                          <div className="text-[11px] font-mono text-[#E51E2B] flex items-center gap-2 mt-0.5">
                            <span>Carrier: {matchedOrder.fulfillment.courierPartner} (AWB: {matchedOrder.fulfillment.awbNumber})</span>
                            {matchedOrder.fulfillment.trackingUrl && (
                              <a 
                                href={matchedOrder.fulfillment.trackingUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="underline flex items-center gap-0.5 font-bold"
                              >
                                <span>Track on Carrier</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-mono uppercase font-bold text-neutral-500 mb-3">
                  PACKED GARMENTS ({matchedOrder.items?.length || 0})
                </h4>
                <div className="space-y-3">
                  {matchedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex space-x-3 items-center border border-neutral-200 p-2.5 bg-white">
                      <div className="flex-1 text-xs font-mono">
                        <div className="font-bold uppercase text-neutral-900 line-clamp-1">{item.name || item.productId}</div>
                        <div className="text-neutral-500 text-[10px]">
                          SIZE: {item.selectedSize} | {item.selectedColor} | QTY: {item.quantity}
                        </div>
                        <div className="font-bold text-[#E51E2B] mt-0.5">Rs. {item.price * item.quantity}.00</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase font-bold text-neutral-500 mb-2">
                    SHIPPING DESTINATION
                  </h4>
                  <div className="text-xs font-mono text-neutral-700 bg-neutral-50 p-3 border border-neutral-200">
                    <p className="font-bold text-neutral-900">{matchedOrder.customer?.name}</p>
                    <p>{matchedOrder.customer?.address}</p>
                    <p>{matchedOrder.customer?.city}, {matchedOrder.customer?.state} - {matchedOrder.customer?.pincode}</p>
                    <p className="mt-1 text-neutral-500">Phone: {matchedOrder.customer?.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase font-bold text-neutral-500 mb-2">
                    PAYMENT AUDIT
                  </h4>
                  <div className="text-xs font-mono text-neutral-700 bg-neutral-50 p-3 border border-neutral-200 space-y-1">
                    <div className="flex justify-between">
                      <span>Gateway:</span>
                      <strong className="text-neutral-900">{matchedOrder.payment?.provider || "Razorpay"}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Ref:</span>
                      <span className="font-mono text-neutral-600">{matchedOrder.payment?.paymentId || "Pending"}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-neutral-200 font-bold text-neutral-900">
                      <span>Total Paid:</span>
                      <span className="text-[#E51E2B]">Rs. {matchedOrder.pricing?.total || 0}.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderResultPageView({ query, navigate, backendBaseUrl, triggerWhatsAppAssistedOrder }) {
  const orderId = query.orderId;
  const status = query.status;
  const paymentId = query.paymentId;

  return (
    <div className="bg-[#FBFBFB] min-h-[75vh] py-12 sm:py-20">
      <div className="max-w-2xl mx-auto px-4">
        {status === "success" && (
          <div className="bg-white border border-neutral-200 p-6 sm:p-10 shadow-sm text-center space-y-5">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-green-600 uppercase font-bold tracking-widest block">
                PAYMENT AUTHORITATIVELY VERIFIED BY BACKEND
              </span>
              <h1 className="text-2xl font-mono font-black uppercase text-neutral-900">
                ORDER CONFIRMED & QUEUED
              </h1>
              <p className="text-xs font-mono text-neutral-600">
                Order Reference: <strong className="text-neutral-900">{orderId}</strong>
              </p>
              {paymentId && (
                <p className="text-[11px] font-mono text-neutral-500">
                  Razorpay Payment ID: <code>{paymentId}</code>
                </p>
              )}
            </div>

            <div className="bg-neutral-50 p-4 border border-neutral-200 text-left text-xs font-mono space-y-2">
              <p className="text-neutral-600">
                • Razorpay signature verified via cryptographic HMAC-SHA256 on your backend.
              </p>
              <p className="text-neutral-600">
                • Confirmation dispatch triggered to your atelier queue.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/track")}
                className="bg-neutral-900 hover:bg-[#E51E2B] text-white font-mono text-xs font-bold uppercase px-6 py-3 transition-colors flex items-center justify-center gap-1.5"
              >
                <Truck className="w-4 h-4" />
                <span>Track My Order Now</span>
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="border border-neutral-300 hover:border-black text-neutral-900 font-mono text-xs font-bold uppercase px-6 py-3 transition-colors"
              >
                Continue Browsing Drops
              </button>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div className="bg-white border border-red-200 p-6 sm:p-10 shadow-sm text-center space-y-5">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-red-600 uppercase font-bold tracking-widest block">
                PAYMENT TRANSACTION COULD NOT BE VERIFIED
              </span>
              <h1 className="text-2xl font-mono font-black uppercase text-neutral-900">
                PAYMENT VERIFICATION FAILED
              </h1>
              <p className="text-xs font-mono text-neutral-600">
                Reason: {query.reason || "Payment declined, cancelled, or backend verification signature rejected."}
              </p>
              <p className="text-[11px] font-mono text-neutral-500 mt-2">
                <strong>Notice:</strong> Your order has NOT been marked as paid. No fake confirmation was created.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/shop")}
                className="bg-[#E51E2B] hover:bg-black text-white font-mono text-xs font-bold uppercase px-6 py-3 transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Checkout / Browse Bag</span>
              </button>

              <button
                onClick={() => triggerWhatsAppAssistedOrder()}
                className="bg-[#25D366] text-white font-mono text-xs font-bold uppercase px-6 py-3 flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp Instead</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePageView({ 
  navigate, 
  openUniverseInShop, 
  setSelectedUniverseModal, 
  addToBag, 
  setQuickViewItem, 
  setQuickViewSize,
  triggerWhatsAppAssistedOrder
}) {
  return (
    <div>
      {/* 5-Image Fashion Editorial Hero Section */}
      <section className="bg-white border-b border-neutral-200 py-10 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            <div className="hidden lg:flex absolute -left-12 top-0 items-center justify-center w-16 h-16 rounded-full border border-neutral-200 text-neutral-800 text-[9px] font-mono uppercase tracking-widest text-center">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-100 text-neutral-900">
                <Play className="w-3 h-3 fill-neutral-900 ml-0.5" />
              </span>
            </div>

            <div className="hidden lg:flex absolute -right-6 top-1 items-center space-x-1">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Avatar" className="w-7 h-7 rounded-full border border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Avatar" className="w-7 h-7 rounded-full border border-white object-cover -ml-2" />
              <span className="w-7 h-7 rounded-full bg-[#E51E2B] text-white text-[10px] font-mono flex items-center justify-center -ml-2 font-bold">+</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-[1.08]">
              DEFINE YOUR STYLE. <br />
              <span className="text-[#E51E2B]">WEAR YOUR WORLD.</span>
            </h1>

            <p className="mt-3 text-neutral-600 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
              Discover statement pieces, explore new drops, and find the designs that match your identity. Engineered with 280 to 500 GSM loopback cottons.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate("/shop")}
                className="bg-[#E51E2B] hover:bg-black text-white font-mono font-bold text-xs uppercase px-7 py-3.5 tracking-wider transition-colors shadow-sm flex items-center gap-2"
              >
                <span>SHOP NEW DROPS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("shop-by-universe");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono font-bold text-xs uppercase px-7 py-3.5 tracking-wider transition-colors shadow-sm flex items-center gap-2"
              >
                <span>EXPLORE CATEGORIES</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 items-end max-w-6xl mx-auto">
            <div className="space-y-3">
              <div className="bg-[#FF6F3C] rounded-3xl overflow-hidden aspect-[3/4.2] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&auto=format&fit=crop&q=80" 
                  alt="Streetwear Outfit" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply opacity-95" 
                />
                <span className="absolute top-3 left-3 bg-black/60 text-white text-[9px] font-mono px-2 py-0.5 rounded-full">
                  DROP 01
                </span>
              </div>
              <div className="bg-amber-400 rounded-2xl overflow-hidden h-28 hidden md:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&auto=format&fit=crop&q=80" 
                  alt="Mini Look" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90" 
                />
              </div>
            </div>

            <div className="bg-[#2EB872] rounded-3xl overflow-hidden aspect-[3/5] relative group">
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop&q=80" 
                alt="Green Silhouette" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply opacity-95" 
              />
              <span className="absolute bottom-3 left-3 bg-white/90 text-neutral-900 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                280 GSM BOXY
              </span>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-3 flex flex-col items-center">
              <div className="w-full bg-[#E5B824] rounded-3xl overflow-hidden aspect-[3/4] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&auto=format&fit=crop&q=80" 
                  alt="Center Portrait" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply opacity-90" 
                />
              </div>
              <button 
                onClick={() => navigate("/shop")}
                className="w-full bg-neutral-950 hover:bg-[#E51E2B] text-white py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#4895EF] rounded-3xl overflow-hidden aspect-[3/5] relative group hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&auto=format&fit=crop&q=80" 
                alt="Blue Streetwear" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply opacity-95" 
              />
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                500 GSM FLEECE
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-[#9BF6FF] rounded-3xl overflow-hidden aspect-[3/4] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=80" 
                  alt="Editorial Look" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply opacity-90" 
                />
              </div>
              <div className="bg-[#007F5F] rounded-2xl overflow-hidden h-28 hidden md:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" 
                  alt="Mini Look Emerald" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-85" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Universe Directory */}
      <section id="shop-by-universe" className="bg-[#F8F8F8] border-b border-neutral-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white border border-neutral-200 px-3 py-1 text-[11px] font-mono text-[#E51E2B] uppercase tracking-wider font-bold mb-2">
                <span className="w-2 h-2 bg-[#E51E2B] rounded-full animate-pulse" />
                <span>FRANCHISE & REALM FOLIOS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900">
                Explore by Universe
              </h2>
              <p className="text-xs sm:text-sm font-sans text-neutral-600 mt-1">
                Explore your interests. Tap any franchise card to open the subcategories directory modal.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate("/shop")}
                className="bg-white hover:bg-neutral-100 border border-neutral-300 text-xs font-mono font-bold px-3.5 py-1.5 uppercase transition-colors"
              >
                Browse All
              </button>
              <span className="bg-neutral-900 text-white text-xs font-mono font-bold px-3.5 py-1.5 uppercase">
                13 UNIVERSES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {UNIVERSE_CATEGORIES.map((univ) => (
              <div
                key={univ.id}
                onClick={() => setSelectedUniverseModal(univ)}
                className="group relative h-28 sm:h-32 rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md border border-neutral-200/80 hover:border-neutral-400 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <img 
                  src={univ.image} 
                  alt={univ.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${univ.bgGradient} opacity-85 group-hover:opacity-75 transition-opacity`} />
                <div className="absolute inset-0 p-3 flex flex-col justify-end text-white">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-300 font-semibold leading-none">
                    {univ.subtitle}
                  </span>
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white mt-1 group-hover:text-[#E51E2B] transition-colors leading-tight">
                    {univ.title}
                  </h3>
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 mt-1 pt-1 border-t border-white/10">
                    <span>{univ.subcategories.length} Sagas</span>
                    <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E51E2B] font-bold block mb-1">
              CURATED ATELIER SELECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900">
              Featured Heavyweight Drops
            </h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-neutral-900 hover:text-[#E51E2B] transition-colors"
          >
            <span>View All ({MASTER_PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {MASTER_PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              navigate={navigate}
              addToBag={addToBag}
              setQuickViewItem={setQuickViewItem}
              setQuickViewSize={setQuickViewSize}
            />
          ))}
        </div>
      </section>

      <EditorialTriFoldSection navigate={navigate} />
    </div>
  );
}

function ShopAllView({
  navigate,
  catalogFilters,
  setCatalogFilters,
  catalogSort,
  setCatalogSort,
  catalogSearch,
  setCatalogSearch,
  catalogPage,
  setCatalogPage,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
  addToBag,
  setQuickViewItem,
  setQuickViewSize
}) {
  const ITEMS_PER_PAGE = 6;

  const filteredProducts = useMemo(() => {
    return MASTER_PRODUCTS.filter((product) => {
      if (catalogFilters.category !== "All" && product.category !== catalogFilters.category) return false;
      if (catalogFilters.universeId && product.universeId !== catalogFilters.universeId) return false;
      if (catalogFilters.subcategory && product.subcategory !== catalogFilters.subcategory) return false;
      if (catalogFilters.size && !product.availableSizes.includes(catalogFilters.size)) return false;
      if (catalogFilters.color && !product.colors.some((c) => c.name.toLowerCase() === catalogFilters.color.toLowerCase())) return false;
      if (product.price < catalogFilters.priceMin || product.price > catalogFilters.priceMax) return false;
      if (catalogFilters.inStockOnly && !product.inStock) return false;
      if (catalogSearch.trim()) {
        const query = catalogSearch.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query) ||
          product.fabric.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (catalogSort === "price-asc") return a.price - b.price;
      if (catalogSort === "price-desc") return b.price - a.price;
      if (catalogSort === "rating") return b.rating - a.rating;
      if (catalogSort === "alpha") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [catalogFilters, catalogSort, catalogSearch]);

  const paginatedProducts = useMemo(() => {
    const start = (catalogPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(0, start + ITEMS_PER_PAGE);
  }, [filteredProducts, catalogPage]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (catalogFilters.category !== "All") count++;
    if (catalogFilters.universeId) count++;
    if (catalogFilters.subcategory) count++;
    if (catalogFilters.size) count++;
    if (catalogFilters.color) count++;
    if (catalogFilters.priceMax < 6000) count++;
    if (catalogFilters.inStockOnly) count++;
    if (catalogSearch.trim()) count++;
    return count;
  }, [catalogFilters, catalogSearch]);

  const resetFilters = () => {
    setCatalogFilters({
      universeId: null,
      subcategory: null,
      category: "All",
      size: null,
      color: null,
      priceMin: 0,
      priceMax: 6000,
      inStockOnly: false
    });
    setCatalogSearch("");
    setCatalogPage(1);
  };

  return (
    <div className="bg-[#FBFBFB] min-h-screen">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500 mb-3">
            <span className="cursor-pointer hover:text-black" onClick={() => navigate("/")}>Home</span>
            <span>/</span>
            <span className="text-[#E51E2B] font-bold">Shop All</span>
            {catalogFilters.universeId && (
              <>
                <span>/</span>
                <span className="uppercase text-neutral-800">{catalogFilters.universeId}</span>
              </>
            )}
            {catalogFilters.subcategory && (
              <>
                <span>/</span>
                <span className="uppercase text-neutral-800">{catalogFilters.subcategory}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900">
                Shop All Upperwear
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1">
                Browse our complete collection of 280 to 500 GSM loopback cottons, heavyweight tees, and technical outerwear.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-neutral-500 bg-neutral-100 px-3 py-1.5 self-start md:self-auto">
              SHOWING {filteredProducts.length} OF {MASTER_PRODUCTS.length} TOTAL DROPS
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 text-xs font-mono uppercase font-bold"
          >
            <Filter className="w-4 h-4" />
            <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-500 uppercase">Sort:</span>
            <select
              value={catalogSort}
              onChange={(e) => setCatalogSort(e.target.value)}
              className="bg-white border border-neutral-300 text-xs font-mono px-2 py-1.5 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="alpha">A to Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="hidden lg:block space-y-6 bg-white p-6 border border-neutral-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <span className="text-xs font-mono uppercase font-bold text-neutral-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#E51E2B]" /> Filter Catalog
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-mono text-[#E51E2B] hover:underline uppercase font-bold"
                >
                  Clear All ({activeFiltersCount})
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold uppercase text-neutral-500 block">
                Upper Garment Type
              </label>
              <div className="space-y-1 text-xs font-mono">
                {["All", "T-Shirts", "Hoodies & Sweats", "Jackets & Outerwear"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCatalogFilters((prev) => ({ ...prev, category: cat }));
                      setCatalogPage(1);
                    }}
                    className={`w-full text-left px-2 py-1.5 flex justify-between items-center transition-colors ${
                      catalogFilters.category === cat
                        ? "bg-neutral-900 text-white font-bold"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-75">
                      {cat === "All" ? MASTER_PRODUCTS.length : MASTER_PRODUCTS.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <label className="text-[11px] font-mono font-bold uppercase text-neutral-500 block">
                Universe / Franchise
              </label>
              <select
                value={catalogFilters.universeId || ""}
                onChange={(e) => {
                  const val = e.target.value || null;
                  setCatalogFilters((prev) => ({ ...prev, universeId: val, subcategory: null }));
                  setCatalogPage(1);
                }}
                className="w-full bg-neutral-50 border border-neutral-300 text-xs font-mono p-2 focus:outline-none focus:border-black uppercase"
              >
                <option value="">All Universes (13)</option>
                {UNIVERSE_CATEGORIES.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.title} ({u.subtitle})
                  </option>
                ))}
              </select>
            </div>

            {catalogFilters.universeId && (
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <label className="text-[11px] font-mono font-bold uppercase text-neutral-500 block">
                  Specific Saga / Subcategory
                </label>
                <div className="max-h-36 overflow-y-auto space-y-1 text-xs font-mono pr-1">
                  <button
                    onClick={() => {
                      setCatalogFilters((prev) => ({ ...prev, subcategory: null }));
                      setCatalogPage(1);
                    }}
                    className={`w-full text-left px-2 py-1 text-xs ${
                      !catalogFilters.subcategory ? "text-[#E51E2B] font-bold" : "text-neutral-700 hover:text-black"
                    }`}
                  >
                    • All Sagas in Universe
                  </button>
                  {UNIVERSE_CATEGORIES.find((u) => u.id === catalogFilters.universeId)?.subcategories.map((sub) => (
                    <button
                      key={sub.name}
                      onClick={() => {
                        setCatalogFilters((prev) => ({ ...prev, subcategory: sub.name }));
                        setCatalogPage(1);
                      }}
                      className={`w-full text-left px-2 py-1 text-xs flex justify-between ${
                        catalogFilters.subcategory === sub.name ? "text-[#E51E2B] font-bold" : "text-neutral-700 hover:text-black"
                      }`}
                    >
                      <span>• {sub.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <div className="flex justify-between items-center text-[11px] font-mono font-bold uppercase text-neutral-500">
                <span>Size Filter</span>
                {catalogFilters.size && (
                  <button 
                    onClick={() => setCatalogFilters(p => ({ ...p, size: null }))}
                    className="text-[#E51E2B] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-5 gap-1 text-xs font-mono">
                {AVAILABLE_GLOBAL_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setCatalogFilters((prev) => ({
                        ...prev,
                        size: prev.size === size ? null : size
                      }));
                      setCatalogPage(1);
                    }}
                    className={`py-1.5 text-center font-bold border transition-colors ${
                      catalogFilters.size === size
                        ? "bg-[#E51E2B] border-[#E51E2B] text-white"
                        : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-100">
              <div className="flex justify-between items-center text-[11px] font-mono font-bold uppercase text-neutral-500">
                <span>Max Price:</span>
                <span className="text-neutral-900 font-bold">Rs. {catalogFilters.priceMax}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="200"
                value={catalogFilters.priceMax}
                onChange={(e) => {
                  setCatalogFilters((prev) => ({ ...prev, priceMax: Number(e.target.value) }));
                  setCatalogPage(1);
                }}
                className="w-full accent-[#E51E2B] cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStockCheck"
                checked={catalogFilters.inStockOnly}
                onChange={(e) => {
                  setCatalogFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }));
                  setCatalogPage(1);
                }}
                className="accent-[#E51E2B] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="inStockCheck" className="text-xs font-mono text-neutral-700 cursor-pointer select-none">
                In-Stock Items Only
              </label>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <div className="hidden lg:flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex flex-wrap items-center gap-2">
                {activeFiltersCount === 0 ? (
                  <span className="text-xs font-mono text-neutral-500">Showing all curated drops</span>
                ) : (
                  <>
                    <span className="text-xs font-mono text-neutral-500 uppercase">Active:</span>
                    {catalogFilters.category !== "All" && (
                      <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 text-[11px] font-mono px-2 py-0.5 border border-neutral-300">
                        {catalogFilters.category}
                        <button onClick={() => setCatalogFilters(p => ({ ...p, category: "All" }))}>x</button>
                      </span>
                    )}
                    {catalogFilters.universeId && (
                      <span className="inline-flex items-center gap-1 bg-[#E51E2B]/10 text-[#E51E2B] text-[11px] font-mono px-2 py-0.5 border border-[#E51E2B]/30 font-bold uppercase">
                        Universe: {catalogFilters.universeId}
                        <button onClick={() => setCatalogFilters(p => ({ ...p, universeId: null, subcategory: null }))}>x</button>
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-neutral-500 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> SORT:
                </span>
                <select
                  value={catalogSort}
                  onChange={(e) => setCatalogSort(e.target.value)}
                  className="bg-white border border-neutral-300 px-2.5 py-1 text-xs font-mono uppercase focus:outline-none"
                >
                  <option value="featured">Featured Drops</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                  <option value="alpha">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-neutral-200 space-y-4">
                <p className="font-mono text-sm uppercase text-neutral-500">
                  NO STREETWEAR PRODUCTS MATCH YOUR FILTER CRITERIA
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#E51E2B] text-white font-mono font-bold text-xs uppercase px-5 py-2.5 hover:bg-black transition-colors"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    navigate={navigate}
                    addToBag={addToBag}
                    setQuickViewItem={setQuickViewItem}
                    setQuickViewSize={setQuickViewSize}
                  />
                ))}
              </div>
            )}

            {paginatedProducts.length < filteredProducts.length && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => setCatalogPage((prev) => prev + 1)}
                  className="bg-neutral-900 hover:bg-[#E51E2B] text-white text-xs font-mono uppercase font-bold px-8 py-3.5 transition-colors shadow-sm"
                >
                  LOAD MORE DROPS ({paginatedProducts.length} OF {filteredProducts.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white p-5 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <h3 className="font-mono text-sm font-bold uppercase text-neutral-900">
                    Filter Drops ({activeFiltersCount})
                  </h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>

                <div className="py-4 space-y-6 max-h-[75vh] overflow-y-auto">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-neutral-500">Category</label>
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                      {["All", "T-Shirts", "Hoodies & Sweats", "Jackets & Outerwear"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCatalogFilters(p => ({ ...p, category: cat }))}
                          className={`p-2 text-center border text-[11px] uppercase font-bold ${
                            catalogFilters.category === cat ? "bg-neutral-900 text-white border-neutral-900" : "bg-neutral-50 border-neutral-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 border border-neutral-300 text-neutral-800 font-mono text-xs font-bold py-3 uppercase"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 bg-[#E51E2B] text-white font-mono text-xs font-bold py-3 uppercase"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductDetailPageView({ 
  product, 
  slug, 
  navigate, 
  addToBag, 
  allProducts,
  showNotification,
  triggerWhatsAppAssistedOrder
}) {
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-black font-mono uppercase text-neutral-900">
          PRODUCT DROP NOT FOUND
        </h2>
        <p className="text-xs font-mono text-neutral-600">
          The requested product slug <code className="text-[#E51E2B]">/products/{slug}</code> does not exist in the active atelier inventory.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-neutral-900 hover:bg-[#E51E2B] text-white font-mono text-xs font-bold px-6 py-3 uppercase transition-colors"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [chosenSize, setChosenSize] = useState("");
  const [chosenColor, setChosenColor] = useState(product.colors[0]?.name || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState("");
  const [expandedSection, setExpandedSection] = useState("fabric");

  const toggleAccordion = (name) => {
    setExpandedSection(prev => prev === name ? null : name);
  };

  const handlePurchase = () => {
    if (!chosenSize) {
      setValidationError("Please select your size to continue.");
      showNotification("Please select a size first");
      return;
    }
    setValidationError("");
    for (let i = 0; i < quantity; i++) {
      addToBag(product, chosenSize, chosenColor);
    }
  };

  return (
    <div className="bg-[#FBFBFB] min-h-screen">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center space-x-2 text-xs font-mono text-neutral-500 overflow-x-auto whitespace-nowrap">
          <span className="cursor-pointer hover:text-black" onClick={() => navigate("/")}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-black" onClick={() => navigate("/shop")}>Shop All</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-black uppercase" onClick={() => navigate("/shop")}>{product.category}</span>
          <span>/</span>
          <span className="text-[#E51E2B] font-bold uppercase truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-col-reverse md:flex-row gap-4 items-start">
              {product.images.length > 1 && (
                <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-visible shrink-0 w-full md:w-20">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 md:w-20 md:h-24 rounded-none overflow-hidden border transition-all ${
                        selectedImageIndex === idx ? "border-[#E51E2B] ring-1 ring-[#E51E2B]" : "border-neutral-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex-1 w-full bg-white border border-neutral-200 relative aspect-[3/4] overflow-hidden group">
                <img 
                  src={product.images[selectedImageIndex] || product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="bg-[#E51E2B] text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 tracking-wider shadow-sm">
                    {product.badge}
                  </span>
                  <span className="bg-black/90 text-white text-[10px] font-mono uppercase px-2.5 py-1 tracking-wider">
                    {product.gsm}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-neutral-200 pb-5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#E51E2B] font-bold uppercase tracking-wider">
                  {product.category} // {product.subcategory}
                </span>
                <div className="flex items-center space-x-1 text-neutral-600">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-neutral-900">{product.rating}</span>
                  <span>({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 leading-snug">
                {product.name}
              </h1>

              <div className="flex items-baseline space-x-3 pt-1">
                <span className="text-2xl font-black font-mono text-neutral-900">
                  Rs. {product.price}.00
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm font-mono text-neutral-400 line-through">
                      Rs. {product.originalPrice}.00
                    </span>
                    <span className="text-xs font-mono font-bold text-green-600 bg-green-50 px-2 py-0.5 border border-green-200">
                      SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] font-mono text-neutral-500">Tax included. Free shipping on orders over Rs.1,999.</p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
              {product.description}
            </p>

            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-500 uppercase font-bold">SELECT COLOR:</span>
                  <span className="text-neutral-900 font-bold">{chosenColor}</span>
                </div>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setChosenColor(color.name)}
                      className={`flex items-center space-x-2 px-3 py-1.5 border text-xs font-mono transition-all ${
                        chosenColor === color.name ? "border-neutral-900 bg-neutral-50 font-bold shadow-xs" : "border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-500 uppercase font-bold">SELECT SIZE:</span>
                <button 
                  type="button"
                  onClick={() => showNotification("Size Guide: Boxy streetwear fit. True to size.")}
                  className="text-neutral-600 hover:text-black underline text-[11px]"
                >
                  Size Guide & Fit (Fit: {product.fit})
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setChosenSize(size);
                      setValidationError("");
                    }}
                    className={`py-3 text-xs font-mono font-bold border transition-colors ${
                      chosenSize === size
                        ? "bg-[#E51E2B] border-[#E51E2B] text-white"
                        : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {validationError && (
                <p className="text-xs font-mono text-[#E51E2B] font-bold">
                  ⚠ {validationError}
                </p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <div className="flex items-center border border-neutral-300 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-12 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 text-sm font-mono"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-12 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 text-sm font-mono"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handlePurchase}
                  className="flex-1 bg-[#E51E2B] hover:bg-black text-white font-mono font-extrabold text-xs uppercase tracking-wider py-3.5 transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG • RS. {product.price * quantity}</span>
                </button>
              </div>

              <button
                onClick={() => triggerWhatsAppAssistedOrder(product, chosenSize, chosenColor)}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono text-xs font-bold py-3 uppercase flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>INQUIRE / ORDER DROP ON WHATSAPP</span>
              </button>
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <div className="border border-neutral-200 bg-white">
                <button
                  onClick={() => toggleAccordion("fabric")}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs font-mono font-bold uppercase text-neutral-900 text-left"
                >
                  <span>FABRIC & ARCHITECTURAL SPECS</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === "fabric" ? "rotate-180" : ""}`} />
                </button>
                {expandedSection === "fabric" && (
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-neutral-600 space-y-2 border-t border-neutral-100">
                    <p><strong>Density:</strong> {product.gsm}</p>
                    <p><strong>Composition:</strong> {product.fabric}</p>
                    <ul className="space-y-1 pt-1 list-disc list-inside">
                      {product.specs.map((sp, i) => (
                        <li key={i}>{sp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="border border-neutral-200 bg-white">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs font-mono font-bold uppercase text-neutral-900 text-left"
                >
                  <span>SHIPPING & DELIVERY</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === "shipping" ? "rotate-180" : ""}`} />
                </button>
                {expandedSection === "shipping" && (
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-neutral-600 space-y-2 border-t border-neutral-100">
                    <p>• Dispatched within 24 to 48 business hours from the TH3EE atelier.</p>
                    <p>• Free Express Air shipping on orders above Rs.1,999.</p>
                    <p>• Standard metro transit: 2-4 business days via Bluedart / Delhivery.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ 
  product, 
  navigate, 
  addToBag, 
  setQuickViewItem, 
  setQuickViewSize 
}) {
  return (
    <div className="group flex flex-col justify-between bg-white border border-neutral-200 hover:border-neutral-400 transition-all duration-200">
      <div>
        <div 
          className="relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer"
          onClick={() => navigate(`/products/${product.slug}`)}
        >
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />

          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span className="bg-[#E51E2B] text-white text-[9px] font-mono font-bold uppercase px-2 py-0.5 tracking-wider">
              {product.badge}
            </span>
            <span className="bg-black/80 text-white text-[9px] font-mono uppercase px-2 py-0.5">
              {product.gsm}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewItem(product);
              setQuickViewSize("L");
            }}
            className="absolute bottom-2.5 right-2.5 bg-white/95 hover:bg-[#E51E2B] hover:text-white text-neutral-800 p-2 shadow-sm transition-colors"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-1.5">
          <div className="flex items-center space-x-1 text-[11px] font-mono text-neutral-500">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="font-bold text-neutral-700">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>

          <h3 
            onClick={() => navigate(`/products/${product.slug}`)}
            className="text-xs font-bold uppercase tracking-tight text-neutral-900 group-hover:text-[#E51E2B] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <div className="text-[11px] font-mono text-neutral-500">
            {product.colors[0]?.name} • {product.fit}
          </div>

          <div className="flex items-baseline space-x-2 pt-1">
            <span className="text-sm font-extrabold font-mono text-neutral-900">Rs. {product.price}.00</span>
            <span className="text-xs font-mono text-neutral-400 line-through">Rs. {product.originalPrice}.00</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 space-y-2">
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500">
          <span>QUICK SIZE ADD:</span>
          <span className="text-[#E51E2B] font-semibold">{product.category}</span>
        </div>

        <div className="grid grid-cols-5 gap-1">
          {product.availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => addToBag(product, size)}
              className="bg-neutral-50 hover:bg-[#E51E2B] hover:text-white border border-neutral-200 text-neutral-700 py-1 text-[10px] font-mono font-bold transition-colors uppercase"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorialTriFoldSection({ navigate }) {
  return (
    <section className="bg-[#121212] text-white py-12 sm:py-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-8 border-b border-neutral-800 gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E51E2B] font-bold">
              TH3EE ATELIER CURATIONS
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
              ELEVATED EVERYDAY HEAVYWEIGHT SILHOUETTES
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
              NEW COLLECTION
            </span>
            <span className="text-sm font-mono font-bold text-white">2026 EDITION</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex space-x-4 items-center bg-neutral-900/60 p-4 border border-neutral-800 hover:border-neutral-600 transition-colors group">
            <div className="w-24 h-28 sm:w-28 sm:h-32 bg-neutral-800 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80" 
                alt="Men's Edit" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-base font-black uppercase tracking-wider text-white">MEN</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Elevated everyday heavyweight essentials with structured boxy lines.
              </p>
              <button 
                onClick={() => navigate("/shop")}
                className="text-xs font-mono uppercase font-bold text-[#E51E2B] hover:text-white flex items-center gap-1.5 pt-1 transition-colors"
              >
                <span>SHOP MEN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 items-center bg-neutral-900/60 p-4 border border-neutral-800 hover:border-neutral-600 transition-colors group">
            <div className="w-24 h-28 sm:w-28 sm:h-32 bg-neutral-800 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" 
                alt="Women's Edit" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-base font-black uppercase tracking-wider text-white">WOMEN</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Effortless oversized streetwear style cut for comfort and movement.
              </p>
              <button 
                onClick={() => navigate("/shop")}
                className="text-xs font-mono uppercase font-bold text-[#E51E2B] hover:text-white flex items-center gap-1.5 pt-1 transition-colors"
              >
                <span>SHOP WOMEN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 items-center bg-neutral-900/60 p-4 border border-neutral-800 hover:border-neutral-600 transition-colors group">
            <div className="w-24 h-28 sm:w-28 sm:h-32 bg-neutral-800 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&auto=format&fit=crop&q=80" 
                alt="Unisex Edit" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-base font-black uppercase tracking-wider text-white">UNISEX</h4>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Comfort meets cool everyday unisex draping across 280-500 GSM loopback cottons.
              </p>
              <button 
                onClick={() => navigate("/shop")}
                className="text-xs font-mono uppercase font-bold text-[#E51E2B] hover:text-white flex items-center gap-1.5 pt-1 transition-colors"
              >
                <span>SHOP ARCHIVE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}