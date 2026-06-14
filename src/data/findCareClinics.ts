/** Mock listings for UI demonstration - verify hours, fees, and eligibility before visiting. */
export type CareCategoryId = 'dental-school' | 'low-cost' | 'community' | 'urgent'

export type LowCostClinic = {
  id: string
  name: string
  location: string
  phone: string
  tags: string[]
  category: CareCategoryId
  directionsQuery: string
}

export const CARE_CATEGORIES: {
  id: CareCategoryId
  label: string
  icon: 'school' | 'clinic' | 'community' | 'urgent'
  tint: string
}[] = [
  { id: 'dental-school', label: 'Dental schools', icon: 'school', tint: 'bg-[#D8E2F8] text-[#5E89ED]' },
  { id: 'low-cost', label: 'Low-cost clinics', icon: 'clinic', tint: 'bg-[#52C470]/40 text-[#2A7A42]' },
  { id: 'community', label: 'Community health centers', icon: 'community', tint: 'bg-[#D8E2F8] text-[#4A75D9]' },
  { id: 'urgent', label: 'Urgent dental care', icon: 'urgent', tint: 'bg-[#F7D1C3] text-[#FF7A1A]' },
]

export const MOCK_LOW_COST_CLINICS: LowCostClinic[] = [
  {
    id: '1',
    name: 'Community Smile Dental Center',
    location: 'Downtown · 1.8 miles away',
    phone: '(555) 010-4200',
    tags: ['Sliding scale', 'Uninsured welcome', 'Same-week urgent slots'],
    category: 'low-cost',
    directionsQuery: 'Community Smile Dental Center Downtown',
  },
  {
    id: '2',
    name: 'Harbor Health Mobile Dental Clinic',
    location: 'Rotating schedule · 3.2 miles away',
    phone: '(555) 010-8811',
    tags: ['Preventive cleanings', 'Reduced cost', 'ID may be required'],
    category: 'community',
    directionsQuery: 'Harbor Health Mobile Dental Clinic',
  },
  {
    id: '3',
    name: 'University Dental Hygiene Clinic',
    location: 'Near campus · 2.4 miles away',
    phone: '(555) 010-3399',
    tags: ['Student supervised', 'Reduced rates', 'Appointments required'],
    category: 'dental-school',
    directionsQuery: 'University Dental Hygiene Clinic',
  },
  {
    id: '4',
    name: 'Neighborhood Family Health (Dental)',
    location: 'Eastside · 4.1 miles away',
    phone: '(555) 010-7720',
    tags: ['Medicaid accepted', 'Payment plans', 'FQHC partner'],
    category: 'community',
    directionsQuery: 'Neighborhood Family Health Dental Eastside',
  },
  {
    id: '5',
    name: 'Metro Urgent Dental Access',
    location: 'Central · 2.0 miles away',
    phone: '(555) 010-9900',
    tags: ['Same-day visits', 'Pain and swelling', 'Call before arriving'],
    category: 'urgent',
    directionsQuery: 'Metro Urgent Dental Access',
  },
]

export const CARE_CONCERN_CHIPS = [
  { id: 'insurance', label: 'No insurance', prefill: "I don't have insurance. Where should I start?" },
  { id: 'anxiety', label: 'Dental anxiety', prefill: "I'm nervous about going to the dentist." },
  { id: 'cost', label: 'Low-cost care', prefill: 'What should I ask about cost?' },
  { id: 'urgent', label: 'Urgent help', prefill: 'When should I seek urgent care?' },
] as const
