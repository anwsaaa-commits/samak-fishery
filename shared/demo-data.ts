export type BoatStatus = "جاهز للإبحار" | "في البحر" | "يحتاج صيانة";

export type Boat = {
  id: string;
  name: string;
  code: string;
  captain: string;
  status: BoatStatus;
  lastTrip: string;
  crew: number;
  fuel: number;
  color: string;
};

export type Fisher = {
  id: string;
  name: string;
  role: string;
  phone: string;
  address: string;
  balance: number;
  initials: string;
  tone: string;
};

export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  icon: string;
};

export const boats: Boat[] = [
  { id: "1", name: "البحر الواسع", code: "قارب ٠١", captain: "سالم العتيبي", status: "في البحر", lastTrip: "اليوم، ٠٥:٤٠ ص", crew: 6, fuel: 78, color: "#0F9D9A" },
  { id: "2", name: "رزق البحر", code: "قارب ٠٢", captain: "مبارك القحطاني", status: "جاهز للإبحار", lastTrip: "أمس، ٠٦:١٠ ص", crew: 5, fuel: 92, color: "#315C9B" },
  { id: "3", name: "نسمة الساحل", code: "قارب ٠٣", captain: "علي الغامدي", status: "يحتاج صيانة", lastTrip: "٢٨ أكتوبر، ٠٧:٠٠ ص", crew: 4, fuel: 34, color: "#D68B36" },
];

export const fishers: Fisher[] = [
  { id: "1", name: "سالم العتيبي", role: "ربان القارب", phone: "050 231 8841", address: "حي الميناء، الجبيل", balance: 4850, initials: "سع", tone: "#DDF5F1" },
  { id: "2", name: "مبارك القحطاني", role: "صياد", phone: "055 640 1298", address: "الواجهة البحرية، الدمام", balance: 3275, initials: "مق", tone: "#E7EEFF" },
  { id: "3", name: "علي الغامدي", role: "صياد", phone: "053 918 4420", address: "حي الشاطئ، القطيف", balance: -850, initials: "عغ", tone: "#FFF0D7" },
  { id: "4", name: "حسن الشهري", role: "صياد", phone: "054 702 6615", address: "الميناء القديم، رأس تنورة", balance: 2140, initials: "حش", tone: "#F0E7FF" },
];

export const transactions: Transaction[] = [
  { id: "1", title: "مبيعات رحلة البحر الواسع", subtitle: "إيراد صيد · اليوم ١١:٢٠ ص", amount: 12800, type: "income", date: "اليوم", icon: "trending-up" },
  { id: "2", title: "وقود ومحروقات", subtitle: "تجهيزات · اليوم ٠٤:٥٥ ص", amount: 1850, type: "expense", date: "اليوم", icon: "local-gas-station" },
  { id: "3", title: "حصة سالم العتيبي", subtitle: "مستحقات صياد · أمس", amount: 4850, type: "expense", date: "أمس", icon: "person" },
  { id: "4", title: "بيع حمولة رزق البحر", subtitle: "إيراد صيد · ٣١ أكتوبر", amount: 9600, type: "income", date: "٣١ أكتوبر", icon: "payments" },
];

export const dashboardStats = [
  { label: "الرصيد الكلي", value: "٤٢٬٨٥٠", suffix: "ر.س", icon: "account-balance-wallet", color: "#0F9D9A", bg: "#DDF5F1" },
  { label: "رحلات هذا الشهر", value: "١٢", suffix: "رحلة", icon: "directions-boat", color: "#315C9B", bg: "#E7EEFF" },
  { label: "إجمالي المصروفات", value: "١٨٬٤٢٠", suffix: "ر.س", icon: "receipt-long", color: "#C77725", bg: "#FFF0D7" },
];

export const formatMoney = (value: number) => `${Math.abs(value).toLocaleString("ar-SA")} ر.س`;
