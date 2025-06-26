"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Globe, Search, Maximize, X } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Locale, Translations } from "@/locales";

interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  country: string;
}

interface WorldClockClientProps {
  locale: Locale;
  t: Translations;
}

export default function WorldClockClient({ locale, t }: WorldClockClientProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezones, setSelectedTimezones] = useState<TimeZone[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // より多くのタイムゾーンを追加し、各言語でローカライズされた都市名を使用
  const getPopularTimezones = () => {
    const timezones = [
      // アメリカ
      { key: "new_york", timezone: "America/New_York", region: "americas" },
      {
        key: "los_angeles",
        timezone: "America/Los_Angeles",
        region: "americas",
      },
      { key: "chicago", timezone: "America/Chicago", region: "americas" },
      { key: "denver", timezone: "America/Denver", region: "americas" },
      {
        key: "mexico_city",
        timezone: "America/Mexico_City",
        region: "americas",
      },
      { key: "sao_paulo", timezone: "America/Sao_Paulo", region: "americas" },
      { key: "toronto", timezone: "America/Toronto", region: "americas" },
      { key: "vancouver", timezone: "America/Vancouver", region: "americas" },
      { key: "phoenix", timezone: "America/Phoenix", region: "americas" },
      { key: "las_vegas", timezone: "America/Los_Angeles", region: "americas" },
      { key: "miami", timezone: "America/New_York", region: "americas" },
      { key: "atlanta", timezone: "America/New_York", region: "americas" },
      { key: "boston", timezone: "America/New_York", region: "americas" },
      { key: "seattle", timezone: "America/Los_Angeles", region: "americas" },
      { key: "houston", timezone: "America/Chicago", region: "americas" },
      { key: "detroit", timezone: "America/Detroit", region: "americas" },
      { key: "monterrey", timezone: "America/Monterrey", region: "americas" },
      {
        key: "guadalajara",
        timezone: "America/Mexico_City",
        region: "americas",
      },
      {
        key: "buenos_aires",
        timezone: "America/Argentina/Buenos_Aires",
        region: "americas",
      },
      {
        key: "rio_de_janeiro",
        timezone: "America/Sao_Paulo",
        region: "americas",
      },
      { key: "brasilia", timezone: "America/Sao_Paulo", region: "americas" },
      { key: "caracas", timezone: "America/Caracas", region: "americas" },
      { key: "lima", timezone: "America/Lima", region: "americas" },
      { key: "santiago", timezone: "America/Santiago", region: "americas" },
      { key: "bogota", timezone: "America/Bogota", region: "americas" },
      { key: "quito", timezone: "America/Guayaquil", region: "americas" },
      { key: "panama_city", timezone: "America/Panama", region: "americas" },
      { key: "san_jose", timezone: "America/Costa_Rica", region: "americas" },
      {
        key: "guatemala_city",
        timezone: "America/Guatemala",
        region: "americas",
      },
      { key: "havana", timezone: "America/Havana", region: "americas" },
      { key: "kingston", timezone: "America/Jamaica", region: "americas" },
      {
        key: "port_au_prince",
        timezone: "America/Port-au-Prince",
        region: "americas",
      },
      {
        key: "santo_domingo",
        timezone: "America/Santo_Domingo",
        region: "americas",
      },
      { key: "san_juan", timezone: "America/Puerto_Rico", region: "americas" },

      // ヨーロッパ
      { key: "london", timezone: "Europe/London", region: "europe" },
      { key: "paris", timezone: "Europe/Paris", region: "europe" },
      { key: "berlin", timezone: "Europe/Berlin", region: "europe" },
      { key: "rome", timezone: "Europe/Rome", region: "europe" },
      { key: "madrid", timezone: "Europe/Madrid", region: "europe" },
      { key: "amsterdam", timezone: "Europe/Amsterdam", region: "europe" },
      { key: "stockholm", timezone: "Europe/Stockholm", region: "europe" },
      { key: "moscow", timezone: "Europe/Moscow", region: "europe" },
      { key: "istanbul", timezone: "Europe/Istanbul", region: "europe" },
      { key: "vienna", timezone: "Europe/Vienna", region: "europe" },
      { key: "zurich", timezone: "Europe/Zurich", region: "europe" },
      { key: "prague", timezone: "Europe/Prague", region: "europe" },
      { key: "budapest", timezone: "Europe/Budapest", region: "europe" },
      { key: "warsaw", timezone: "Europe/Warsaw", region: "europe" },
      { key: "athens", timezone: "Europe/Athens", region: "europe" },
      { key: "lisbon", timezone: "Europe/Lisbon", region: "europe" },
      { key: "dublin", timezone: "Europe/Dublin", region: "europe" },
      { key: "oslo", timezone: "Europe/Oslo", region: "europe" },
      { key: "copenhagen", timezone: "Europe/Copenhagen", region: "europe" },
      { key: "helsinki", timezone: "Europe/Helsinki", region: "europe" },
      { key: "brussels", timezone: "Europe/Brussels", region: "europe" },
      { key: "luxembourg", timezone: "Europe/Luxembourg", region: "europe" },
      { key: "milan", timezone: "Europe/Rome", region: "europe" },
      { key: "barcelona", timezone: "Europe/Madrid", region: "europe" },
      { key: "munich", timezone: "Europe/Berlin", region: "europe" },
      { key: "hamburg", timezone: "Europe/Berlin", region: "europe" },
      { key: "cologne", timezone: "Europe/Berlin", region: "europe" },
      { key: "frankfurt", timezone: "Europe/Berlin", region: "europe" },
      { key: "lyon", timezone: "Europe/Paris", region: "europe" },
      { key: "marseille", timezone: "Europe/Paris", region: "europe" },
      { key: "geneva", timezone: "Europe/Zurich", region: "europe" },
      { key: "manchester", timezone: "Europe/London", region: "europe" },
      { key: "birmingham", timezone: "Europe/London", region: "europe" },
      { key: "glasgow", timezone: "Europe/London", region: "europe" },
      { key: "edinburgh", timezone: "Europe/London", region: "europe" },
      { key: "cardiff", timezone: "Europe/London", region: "europe" },
      { key: "belfast", timezone: "Europe/London", region: "europe" },
      { key: "kyiv", timezone: "Europe/Kiev", region: "europe" },
      { key: "minsk", timezone: "Europe/Minsk", region: "europe" },
      { key: "riga", timezone: "Europe/Riga", region: "europe" },
      { key: "tallinn", timezone: "Europe/Tallinn", region: "europe" },
      { key: "vilnius", timezone: "Europe/Vilnius", region: "europe" },
      { key: "bucharest", timezone: "Europe/Bucharest", region: "europe" },
      { key: "sofia", timezone: "Europe/Sofia", region: "europe" },
      { key: "belgrade", timezone: "Europe/Belgrade", region: "europe" },
      { key: "zagreb", timezone: "Europe/Zagreb", region: "europe" },
      { key: "sarajevo", timezone: "Europe/Sarajevo", region: "europe" },
      { key: "skopje", timezone: "Europe/Skopje", region: "europe" },
      { key: "podgorica", timezone: "Europe/Podgorica", region: "europe" },
      { key: "tirana", timezone: "Europe/Tirane", region: "europe" },
      { key: "reykjavik", timezone: "Atlantic/Reykjavik", region: "europe" },

      // アジア太平洋
      { key: "tokyo", timezone: "Asia/Tokyo", region: "asia_pacific" },
      { key: "seoul", timezone: "Asia/Seoul", region: "asia_pacific" },
      { key: "beijing", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "hong_kong", timezone: "Asia/Hong_Kong", region: "asia_pacific" },
      { key: "singapore", timezone: "Asia/Singapore", region: "asia_pacific" },
      { key: "mumbai", timezone: "Asia/Kolkata", region: "asia_pacific" },
      { key: "dubai", timezone: "Asia/Dubai", region: "asia_pacific" },
      { key: "bangkok", timezone: "Asia/Bangkok", region: "asia_pacific" },
      { key: "jakarta", timezone: "Asia/Jakarta", region: "asia_pacific" },
      { key: "manila", timezone: "Asia/Manila", region: "asia_pacific" },
      { key: "sydney", timezone: "Australia/Sydney", region: "asia_pacific" },
      {
        key: "melbourne",
        timezone: "Australia/Melbourne",
        region: "asia_pacific",
      },
      { key: "osaka", timezone: "Asia/Tokyo", region: "asia_pacific" },
      { key: "kyoto", timezone: "Asia/Tokyo", region: "asia_pacific" },
      { key: "nagoya", timezone: "Asia/Tokyo", region: "asia_pacific" },
      { key: "busan", timezone: "Asia/Seoul", region: "asia_pacific" },
      { key: "incheon", timezone: "Asia/Seoul", region: "asia_pacific" },
      { key: "shanghai", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "guangzhou", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "shenzhen", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "chengdu", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "wuhan", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "xian", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "nanjing", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "tianjin", timezone: "Asia/Shanghai", region: "asia_pacific" },
      { key: "taipei", timezone: "Asia/Taipei", region: "asia_pacific" },
      { key: "kaohsiung", timezone: "Asia/Taipei", region: "asia_pacific" },
      { key: "macau", timezone: "Asia/Macau", region: "asia_pacific" },
      {
        key: "kuala_lumpur",
        timezone: "Asia/Kuala_Lumpur",
        region: "asia_pacific",
      },
      { key: "hanoi", timezone: "Asia/Ho_Chi_Minh", region: "asia_pacific" },
      {
        key: "ho_chi_minh",
        timezone: "Asia/Ho_Chi_Minh",
        region: "asia_pacific",
      },
      {
        key: "phnom_penh",
        timezone: "Asia/Phnom_Penh",
        region: "asia_pacific",
      },
      { key: "vientiane", timezone: "Asia/Vientiane", region: "asia_pacific" },
      { key: "yangon", timezone: "Asia/Yangon", region: "asia_pacific" },
      { key: "dhaka", timezone: "Asia/Dhaka", region: "asia_pacific" },
      { key: "kolkata", timezone: "Asia/Kolkata", region: "asia_pacific" },
      { key: "delhi", timezone: "Asia/Kolkata", region: "asia_pacific" },
      { key: "chennai", timezone: "Asia/Kolkata", region: "asia_pacific" },
      { key: "bangalore", timezone: "Asia/Kolkata", region: "asia_pacific" },
      { key: "hyderabad", timezone: "Asia/Kolkata", region: "asia_pacific" },
      { key: "pune", timezone: "Asia/Kolkata", region: "asia_pacific" },
      { key: "ahmedabad", timezone: "Asia/Kolkata", region: "asia_pacific" },
      { key: "karachi", timezone: "Asia/Karachi", region: "asia_pacific" },
      { key: "lahore", timezone: "Asia/Karachi", region: "asia_pacific" },
      { key: "islamabad", timezone: "Asia/Karachi", region: "asia_pacific" },
      { key: "kabul", timezone: "Asia/Kabul", region: "asia_pacific" },
      { key: "tashkent", timezone: "Asia/Tashkent", region: "asia_pacific" },
      { key: "almaty", timezone: "Asia/Almaty", region: "asia_pacific" },
      { key: "bishkek", timezone: "Asia/Bishkek", region: "asia_pacific" },
      { key: "dushanbe", timezone: "Asia/Dushanbe", region: "asia_pacific" },
      { key: "ashgabat", timezone: "Asia/Ashgabat", region: "asia_pacific" },
      { key: "tbilisi", timezone: "Asia/Tbilisi", region: "asia_pacific" },
      { key: "yerevan", timezone: "Asia/Yerevan", region: "asia_pacific" },
      { key: "baku", timezone: "Asia/Baku", region: "asia_pacific" },
      { key: "tehran", timezone: "Asia/Tehran", region: "asia_pacific" },
      { key: "baghdad", timezone: "Asia/Baghdad", region: "asia_pacific" },
      { key: "kuwait_city", timezone: "Asia/Kuwait", region: "asia_pacific" },
      { key: "riyadh", timezone: "Asia/Riyadh", region: "asia_pacific" },
      { key: "doha", timezone: "Asia/Qatar", region: "asia_pacific" },
      { key: "manama", timezone: "Asia/Bahrain", region: "asia_pacific" },
      { key: "muscat", timezone: "Asia/Muscat", region: "asia_pacific" },
      { key: "abu_dhabi", timezone: "Asia/Dubai", region: "asia_pacific" },
      {
        key: "ulaanbaatar",
        timezone: "Asia/Ulaanbaatar",
        region: "asia_pacific",
      },
      { key: "perth", timezone: "Australia/Perth", region: "asia_pacific" },
      {
        key: "adelaide",
        timezone: "Australia/Adelaide",
        region: "asia_pacific",
      },
      {
        key: "brisbane",
        timezone: "Australia/Brisbane",
        region: "asia_pacific",
      },
      { key: "darwin", timezone: "Australia/Darwin", region: "asia_pacific" },
      { key: "hobart", timezone: "Australia/Hobart", region: "asia_pacific" },
      { key: "canberra", timezone: "Australia/Sydney", region: "asia_pacific" },
      { key: "auckland", timezone: "Pacific/Auckland", region: "asia_pacific" },
      {
        key: "wellington",
        timezone: "Pacific/Auckland",
        region: "asia_pacific",
      },
      {
        key: "christchurch",
        timezone: "Pacific/Auckland",
        region: "asia_pacific",
      },
      { key: "suva", timezone: "Pacific/Fiji", region: "asia_pacific" },
      {
        key: "port_moresby",
        timezone: "Pacific/Port_Moresby",
        region: "asia_pacific",
      },
      { key: "noumeea", timezone: "Pacific/Noumea", region: "asia_pacific" },

      // アフリカ・中東
      { key: "cairo", timezone: "Africa/Cairo", region: "africa_middle_east" },
      {
        key: "cape_town",
        timezone: "Africa/Johannesburg",
        region: "africa_middle_east",
      },
      { key: "lagos", timezone: "Africa/Lagos", region: "africa_middle_east" },
      {
        key: "tel_aviv",
        timezone: "Asia/Jerusalem",
        region: "africa_middle_east",
      },
      {
        key: "casablanca",
        timezone: "Africa/Casablanca",
        region: "africa_middle_east",
      },
      {
        key: "algiers",
        timezone: "Africa/Algiers",
        region: "africa_middle_east",
      },
      { key: "tunis", timezone: "Africa/Tunis", region: "africa_middle_east" },
      {
        key: "tripoli",
        timezone: "Africa/Tripoli",
        region: "africa_middle_east",
      },
      {
        key: "addis_ababa",
        timezone: "Africa/Addis_Ababa",
        region: "africa_middle_east",
      },
      {
        key: "nairobi",
        timezone: "Africa/Nairobi",
        region: "africa_middle_east",
      },
      {
        key: "kampala",
        timezone: "Africa/Kampala",
        region: "africa_middle_east",
      },
      {
        key: "dar_es_salaam",
        timezone: "Africa/Dar_es_Salaam",
        region: "africa_middle_east",
      },
      {
        key: "kigali",
        timezone: "Africa/Kigali",
        region: "africa_middle_east",
      },
      {
        key: "bujumbura",
        timezone: "Africa/Bujumbura",
        region: "africa_middle_east",
      },
      {
        key: "kinshasa",
        timezone: "Africa/Kinshasa",
        region: "africa_middle_east",
      },
      {
        key: "luanda",
        timezone: "Africa/Luanda",
        region: "africa_middle_east",
      },
      {
        key: "windhoek",
        timezone: "Africa/Windhoek",
        region: "africa_middle_east",
      },
      {
        key: "gaborone",
        timezone: "Africa/Gaborone",
        region: "africa_middle_east",
      },
      {
        key: "lusaka",
        timezone: "Africa/Lusaka",
        region: "africa_middle_east",
      },
      {
        key: "harare",
        timezone: "Africa/Harare",
        region: "africa_middle_east",
      },
      {
        key: "maputo",
        timezone: "Africa/Maputo",
        region: "africa_middle_east",
      },
      {
        key: "antananarivo",
        timezone: "Indian/Antananarivo",
        region: "africa_middle_east",
      },
      {
        key: "port_louis",
        timezone: "Indian/Mauritius",
        region: "africa_middle_east",
      },
      { key: "accra", timezone: "Africa/Accra", region: "africa_middle_east" },
      {
        key: "abidjan",
        timezone: "Africa/Abidjan",
        region: "africa_middle_east",
      },
      { key: "dakar", timezone: "Africa/Dakar", region: "africa_middle_east" },
      {
        key: "bamako",
        timezone: "Africa/Bamako",
        region: "africa_middle_east",
      },
      {
        key: "ouagadougou",
        timezone: "Africa/Ouagadougou",
        region: "africa_middle_east",
      },
      {
        key: "niamey",
        timezone: "Africa/Niamey",
        region: "africa_middle_east",
      },
      {
        key: "ndjamena",
        timezone: "Africa/Ndjamena",
        region: "africa_middle_east",
      },
      {
        key: "bangui",
        timezone: "Africa/Bangui",
        region: "africa_middle_east",
      },
      {
        key: "libreville",
        timezone: "Africa/Libreville",
        region: "africa_middle_east",
      },
      {
        key: "malabo",
        timezone: "Africa/Malabo",
        region: "africa_middle_east",
      },
      {
        key: "douala",
        timezone: "Africa/Douala",
        region: "africa_middle_east",
      },
      {
        key: "yaounde",
        timezone: "Africa/Douala",
        region: "africa_middle_east",
      },
      {
        key: "jerusalem",
        timezone: "Asia/Jerusalem",
        region: "africa_middle_east",
      },
      { key: "beirut", timezone: "Asia/Beirut", region: "africa_middle_east" },
      {
        key: "damascus",
        timezone: "Asia/Damascus",
        region: "africa_middle_east",
      },
      { key: "amman", timezone: "Asia/Amman", region: "africa_middle_east" },
      {
        key: "nicosia",
        timezone: "Asia/Nicosia",
        region: "africa_middle_east",
      },
      {
        key: "ankara",
        timezone: "Europe/Istanbul",
        region: "africa_middle_east",
      },
      {
        key: "izmir",
        timezone: "Europe/Istanbul",
        region: "africa_middle_east",
      },
      {
        key: "antalya",
        timezone: "Europe/Istanbul",
        region: "africa_middle_east",
      },
      {
        key: "bursa",
        timezone: "Europe/Istanbul",
        region: "africa_middle_east",
      },
      {
        key: "adana",
        timezone: "Europe/Istanbul",
        region: "africa_middle_east",
      },
      {
        key: "gaziantep",
        timezone: "Europe/Istanbul",
        region: "africa_middle_east",
      },
      {
        key: "konya",
        timezone: "Europe/Istanbul",
        region: "africa_middle_east",
      },
      {
        key: "kayseri",
        timezone: "Europe/Istanbul",
        region: "africa_middle_east",
      },
    ];

    return timezones
      .filter((tz) => {
        // 翻訳が存在する都市のみをフィルタリング
        return (
          t.worldClock.cities[tz.key as keyof typeof t.worldClock.cities] &&
          t.worldClock.countries[tz.key as keyof typeof t.worldClock.countries]
        );
      })
      .map((tz) => ({
        ...tz,
        name: t.worldClock.cities[tz.key as keyof typeof t.worldClock.cities],
        country:
          t.worldClock.countries[tz.key as keyof typeof t.worldClock.countries],
      }));
  };

  const availableTimezones = getPopularTimezones();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(`world-clock-${locale}`);
    if (saved) {
      setSelectedTimezones(JSON.parse(saved));
    } else {
      // デフォルトタイムゾーンをより多く追加
      const defaults = [
        {
          id: "1",
          name: t.worldClock.cities.tokyo,
          timezone: "Asia/Tokyo",
          country: t.worldClock.countries.tokyo,
        },
        {
          id: "2",
          name: t.worldClock.cities.new_york,
          timezone: "America/New_York",
          country: t.worldClock.countries.new_york,
        },
        {
          id: "3",
          name: t.worldClock.cities.london,
          timezone: "Europe/London",
          country: t.worldClock.countries.london,
        },
        {
          id: "4",
          name: t.worldClock.cities.paris,
          timezone: "Europe/Paris",
          country: t.worldClock.countries.paris,
        },
        {
          id: "5",
          name: t.worldClock.cities.sydney,
          timezone: "Australia/Sydney",
          country: t.worldClock.countries.sydney,
        },
        {
          id: "6",
          name: t.worldClock.cities.seoul,
          timezone: "Asia/Seoul",
          country: t.worldClock.countries.seoul,
        },
        {
          id: "7",
          name: t.worldClock.cities.los_angeles,
          timezone: "America/Los_Angeles",
          country: t.worldClock.countries.los_angeles,
        },
        {
          id: "8",
          name: t.worldClock.cities.dubai,
          timezone: "Asia/Dubai",
          country: t.worldClock.countries.dubai,
        },
      ];
      setSelectedTimezones(defaults);
    }
  }, [locale, t]);

  useEffect(() => {
    localStorage.setItem(
      `world-clock-${locale}`,
      JSON.stringify(selectedTimezones)
    );
  }, [selectedTimezones, locale]);

  // フルスクリーンモード時のbodyスクロール制御
  useEffect(() => {
    if (isFullscreen) {
      // フルスクリーンモード時はbodyのスクロールを無効化
      document.body.style.overflow = "hidden";
      // iOSでのスクロール問題を防ぐ
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
    } else {
      // フルスクリーンモード終了時は元に戻す
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    }

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isFullscreen]);

  // コンポーネントのアンマウント時にbodyスタイルをリセット
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, []);

  const addTimezone = (timezone: ReturnType<typeof getPopularTimezones>[0]) => {
    if (selectedTimezones.find((tz) => tz.timezone === timezone.timezone))
      return;

    const newTimezone: TimeZone = {
      id: Date.now().toString(),
      name: timezone.name,
      timezone: timezone.timezone,
      country: timezone.country,
    };
    setSelectedTimezones([...selectedTimezones, newTimezone]);
  };

  const removeTimezone = (id: string) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz.id !== id));
  };

  const formatTime = (
    date: Date,
    timezone: string,
    includeSeconds: boolean = true
  ) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: locale === "en",
    };

    if (includeSeconds) {
      options.second = "2-digit";
    }

    return date.toLocaleTimeString(locale, options);
  };

  const formatDate = (date: Date, timezone: string) => {
    return date.toLocaleDateString(locale, {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeDifference = (timezone: string) => {
    const now = new Date();
    const localOffset = now.getTimezoneOffset();
    const targetTime = new Date(
      now.toLocaleString("en-US", { timeZone: timezone })
    );
    const targetOffset = (now.getTime() - targetTime.getTime()) / (1000 * 60);
    const diff = (targetOffset - localOffset) / 60;

    if (diff === 0) return t.worldClock.local;
    const sign = diff > 0 ? "+" : "";
    return `UTC${sign}${diff}`;
  };

  // 全画面表示関連の関数
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFullscreenClose = () => {
    setIsFullscreen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleFullscreenClose();
    }
  };

  // スマホでのタッチ操作を改善するためのハンドラー
  const handleTouchStart = (event: React.TouchEvent) => {
    // タッチの開始位置を記録（タッチエンドで判定に使用）
    const touch = event.touches[0];
    (event.currentTarget as HTMLElement).dataset.touchStartX =
      touch.clientX.toString();
    (event.currentTarget as HTMLElement).dataset.touchStartY =
      touch.clientY.toString();
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    // タッチの終了位置と開始位置を比較して、意図的なタップかどうかを判定
    const touch = event.changedTouches[0];
    const startX = parseFloat(
      (event.currentTarget as HTMLElement).dataset.touchStartX || "0"
    );
    const startY = parseFloat(
      (event.currentTarget as HTMLElement).dataset.touchStartY || "0"
    );
    const deltaX = Math.abs(touch.clientX - startX);
    const deltaY = Math.abs(touch.clientY - startY);

    // 10px以内の移動であれば、タップとして扱う
    if (deltaX < 10 && deltaY < 10) {
      handleFullscreenClose();
    }
  };

  // タイムゾーンリストをフィルタリングする関数
  const getFilteredTimezones = () => {
    if (!searchQuery.trim()) {
      return availableTimezones;
    }

    const query = searchQuery.toLowerCase().trim();
    return availableTimezones.filter((timezone) => {
      const cityName = timezone.name.toLowerCase();
      const countryName = timezone.country.toLowerCase();

      // 都市名または国名の前方一致でフィルタリング
      return cityName.startsWith(query) || countryName.startsWith(query);
    });
  };

  return (
    <>
      {/* メインコンテンツ */}
      <div className={isFullscreen ? "overflow-hidden h-screen" : ""}>
        <ToolLayout
          locale={locale}
          t={t}
          title={t.worldClock.title}
          description={t.worldClock.description}
          icon={Globe}
        >
          {/* How To Use セクション */}
          <ToolSection>
            <ToolHowToUse
              title={t.worldClock.howToUse.title}
              steps={t.worldClock.howToUse.steps}
              features={{
                title: t.worldClock.features.title,
                items: t.worldClock.features.items,
              }}
            />
          </ToolSection>

          {/* Time Zones Grid */}
          <ToolSection>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedTimezones.length} {t.worldClock.addTimezone}
              </h3>
              {selectedTimezones.length > 0 && (
                <Button
                  onClick={handleFullscreenToggle}
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100"
                >
                  <Maximize className="w-4 h-4 mr-2" />
                  {t.worldClock.fullscreen}
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {selectedTimezones.map((timezone) => (
                <div
                  key={timezone.id}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 relative hover:shadow-md transition-shadow min-w-0 overflow-hidden"
                >
                  <button
                    onClick={() => removeTimezone(timezone.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                    aria-label={`Remove ${timezone.name} timezone`}
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="text-center pr-5">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 truncate">
                      {timezone.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 truncate">
                      {timezone.country}
                    </p>

                    <div className="text-base sm:text-lg md:text-xl font-mono font-bold text-blue-600 mb-1 break-all overflow-hidden">
                      <span className="sm:hidden">
                        {formatTime(currentTime, timezone.timezone, false)}
                      </span>
                      <span className="hidden sm:inline">
                        {formatTime(currentTime, timezone.timezone, true)}
                      </span>
                    </div>

                    <div className="text-xs text-gray-600 mb-2 truncate">
                      {formatDate(currentTime, timezone.timezone)}
                    </div>

                    <div className="text-xs text-gray-500 bg-white rounded-full px-2 py-1 inline-block truncate max-w-full">
                      {getTimeDifference(timezone.timezone)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ToolSection>

          {/* Add Timezone */}
          <ToolSection title={t.worldClock.addTimezone} icon={Plus}>
            <div className="bg-gray-50 rounded-xl p-6">
              {/* 検索フィールド */}
              <div className="mb-6">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder={t.worldClock.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full max-w-md"
                  />
                </div>
                {searchQuery && (
                  <p className="text-sm text-gray-600 mt-2">
                    {getFilteredTimezones().length} {t.worldClock.resultsFound}
                  </p>
                )}
              </div>

              {/* 地域別にタイムゾーンをグループ化して表示 */}
              {Object.entries(
                getFilteredTimezones()
                  .filter(
                    (tz) =>
                      !selectedTimezones.find(
                        (selected) => selected.timezone === tz.timezone
                      )
                  )
                  .reduce((acc, tz) => {
                    if (!acc[tz.region]) acc[tz.region] = [];
                    acc[tz.region].push(tz);
                    return acc;
                  }, {} as Record<string, typeof availableTimezones>)
              ).map(([region, timezones]) => (
                <div key={region} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {(t.worldClock.regions as any)[region] || region}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {timezones.map((timezone) => (
                      <button
                        key={`${timezone.key}-${timezone.timezone}`}
                        onClick={() => addTimezone(timezone)}
                        className="p-3 bg-white rounded-lg border hover:border-primary-300 hover:bg-primary-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        <div className="font-medium text-gray-900 text-sm truncate">
                          {timezone.name}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {timezone.country}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ToolSection>

          {/* FAQ セクション */}
          <ToolSection>
            <ToolFaq faqList={t.worldClock.faqList} t={t} />
          </ToolSection>
        </ToolLayout>
      </div>

      {/* 全画面表示モーダル */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black cursor-pointer overflow-hidden touch-none select-none"
          onClick={handleFullscreenClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-label={t.worldClock.fullscreenMode}
        >
          <div
            className="w-full h-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 select-none overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <div className="min-h-full py-4 sm:py-6 md:py-8 flex flex-col justify-center">
              <div className="w-full">
                {/* スマホ用のスクロール可能なレイアウト */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                  {selectedTimezones.map((timezone) => (
                    <div
                      key={timezone.id}
                      className="bg-gray-900/80 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-gray-700 min-w-0 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                    >
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1 truncate">
                        {timezone.name}
                      </h3>
                      <p className="text-xs text-gray-300 mb-1 sm:mb-2 truncate">
                        {timezone.country}
                      </p>

                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-mono font-bold text-green-400 mb-1 tracking-tight break-all overflow-hidden leading-tight">
                        <span className="sm:hidden">
                          {formatTime(currentTime, timezone.timezone, false)}
                        </span>
                        <span className="hidden sm:inline">
                          {formatTime(currentTime, timezone.timezone, true)}
                        </span>
                      </div>

                      <div className="text-xs text-gray-300 mb-1 sm:mb-2 truncate">
                        {formatDate(currentTime, timezone.timezone)}
                      </div>

                      <div className="text-xs text-gray-400 bg-gray-800 rounded-full px-2 py-1 inline-block truncate max-w-full">
                        {getTimeDifference(timezone.timezone)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 閉じるボタン - スマホ対応 */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleFullscreenClose();
            }}
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/40 border-green-400/50 text-green-400 hover:bg-green-400/20 z-10"
          >
            <X className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">
              {t.worldClock.exitFullscreen}
            </span>
          </Button>

          {/* ESCキーのヒント - デスクトップのみ表示 */}
          <div className="hidden sm:block absolute bottom-4 left-1/2 transform -translate-x-1/2 text-green-300/70 text-sm">
            ESC {t.worldClock.exitFullscreen}
          </div>
        </div>
      )}
    </>
  );
}
