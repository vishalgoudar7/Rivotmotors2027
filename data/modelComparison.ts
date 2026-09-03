export type ModelComparisonColumn = {
  id: "sport" | "pro";
  badge: string;
  name: string;
  subtitle: string;
  href: string;
  bookHref: string;
  testRideHref: string;
  values: Record<string, string>;
};

export type ModelComparisonRow = {
  id: string;
  label: string;
};

export const modelComparisonRows: ModelComparisonRow[] = [
  { id: "battery", label: "Battery Capacity" },
  { id: "range", label: "Range (IDC)" },
  { id: "topSpeed", label: "Top Speed (kmph)" },
  { id: "charge", label: "Charging" },
  { id: "ride", label: "Ride Setup" },
  { id: "safety", label: "Safety" },
  { id: "utility", label: "Utility" },
  { id: "startingFrom", label: "Starting From" },
];

export const modelComparisonModels: ModelComparisonColumn[] = [
  {
    id: "sport",
    badge: "Sport Mode",
    name: "RIVOT NX100 Sport",
    subtitle: "Sharper, faster, more expressive electric ride.",
    href: "/products/nx100-sport",
    bookHref: "/book-now",
    testRideHref: "/test-ride",
    values: {
      battery: "4.4 kWh LiMFP",
      range: "200 km",
      topSpeed: "100 km/h",
      charge: "35 min FlashCharge / 4 hr home",
      ride: "Sharp throttle response tuned for city gaps",
      safety: "CBS + dual disc brakes",
      utility: "55 L boot, 162 mm clearance",
      startingFrom: "Rs 1,39,000*",
    },
  },
  {
    id: "pro",
    badge: "Rider's Favourite",
    name: "RIVOT NX100 Pro",
    subtitle: "Extended range, refined comfort, and control.",
    href: "/products/nx100-pro",
    bookHref: "/book-now",
    testRideHref: "/test-ride",
    values: {
      battery: "4.4 kWh LiMFP",
      range: "200 km",
      topSpeed: "100 km/h",
      charge: "35 min FlashCharge / 4 hr home",
      ride: "Progressive rear monoshock with telescopic front suspension",
      safety: "CBS, dual disc brakes, IP67 motor and controller",
      utility: "Front charge port, 50 cm water wading, 162 mm clearance",
      startingFrom: "Rs 1,29,000*",
    },
  },
];
