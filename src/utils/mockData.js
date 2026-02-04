// Mock data for the LifeShare application

// Blood inventory data
export const mockBloodInventory = [
  {
    type: "A+",
    quantity: 15,
    status: "available",
    expiry: "2024-03-15",
    units: 15,
  },
  { type: "A-", quantity: 8, status: "low", expiry: "2024-03-10", units: 8 },
  {
    type: "B+",
    quantity: 12,
    status: "available",
    expiry: "2024-03-18",
    units: 12,
  },
  {
    type: "B-",
    quantity: 3,
    status: "critical",
    expiry: "2024-03-05",
    units: 3,
  },
  {
    type: "AB+",
    quantity: 7,
    status: "available",
    expiry: "2024-03-12",
    units: 7,
  },
  {
    type: "AB-",
    quantity: 2,
    status: "critical",
    expiry: "2024-03-03",
    units: 2,
  },
  {
    type: "O+",
    quantity: 20,
    status: "available",
    expiry: "2024-03-20",
    units: 20,
  },
  {
    type: "O-",
    quantity: 18,
    status: "available",
    expiry: "2024-03-19",
    units: 18,
  },
];

// Emergency requests data
export const mockEmergencyRequests = [
  {
    id: 1,
    patient: "John Doe",
    bloodType: "B-",
    quantity: 2,
    status: "new",
    priority: "high",
    time: "2 min ago",
  },
  {
    id: 2,
    patient: "Jane Smith",
    bloodType: "O+",
    quantity: 1,
    status: "matching",
    priority: "medium",
    time: "15 min ago",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    bloodType: "AB+",
    quantity: 3,
    status: "fulfilled",
    priority: "low",
    time: "1 hour ago",
  },
];

// Nearby hospitals data
export const mockNearbyHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    distance: "2.5 km",
    bloodTypes: ["O+", "B+"],
    status: "available",
  },
  {
    id: 2,
    name: "St. Mary Medical Center",
    distance: "4.2 km",
    bloodTypes: ["A+", "O-"],
    status: "limited",
  },
  {
    id: 3,
    name: "Regional Blood Bank",
    distance: "6.8 km",
    bloodTypes: ["A-", "B-", "AB+"],
    status: "available",
  },
];

// Donor profile data
export const mockDonorProfile = {
  name: "Sarah Johnson",
  bloodType: "O+",
  lastDonation: "2024-01-15",
  nextEligible: "2024-04-15",
  donationsCount: 12,
  status: "eligible",
  location: "Manhattan, NY",
  contact: "+1 (555) 123-4567",
};

// Donation history data
export const mockDonationHistory = [
  {
    id: 1,
    date: "2024-01-15",
    location: "City General Hospital",
    volume: "450ml",
    status: "completed",
  },
  {
    id: 2,
    date: "2023-10-22",
    location: "St. Mary Medical Center",
    volume: "450ml",
    status: "completed",
  },
  {
    id: 3,
    date: "2023-07-30",
    location: "Regional Blood Bank",
    volume: "450ml",
    status: "completed",
  },
  {
    id: 4,
    date: "2023-04-18",
    location: "City General Hospital",
    volume: "450ml",
    status: "completed",
  },
];

// Nearby requests data
export const mockNearbyRequests = [
  {
    id: 1,
    patient: "John Doe",
    bloodType: "O+",
    hospital: "City General Hospital",
    distance: "2.5 km",
    urgency: "high",
    time: "2 min ago",
  },
  {
    id: 2,
    patient: "Jane Smith",
    bloodType: "O+",
    hospital: "St. Mary Medical Center",
    distance: "4.2 km",
    urgency: "medium",
    time: "15 min ago",
  },
];

// Nearby options for patient dashboard
export const mockNearbyOptions = [
  {
    id: 1,
    name: "City General Hospital",
    type: "hospital",
    distance: "2.5 km",
    bloodAvailable: ["O+", "B+", "A+"],
    contact: "+1 (555) 123-4567",
    availability: "high",
  },
  {
    id: 2,
    name: "John Smith",
    type: "donor",
    distance: "1.8 km",
    bloodType: "O+",
    contact: "+1 (555) 234-5678",
    availability: "available",
  },
  {
    id: 3,
    name: "St. Mary Medical Center",
    type: "hospital",
    distance: "4.2 km",
    bloodAvailable: ["O-", "A-", "B-"],
    contact: "+1 (555) 345-6789",
    availability: "limited",
  },
  {
    id: 4,
    name: "Emily Davis",
    type: "donor",
    distance: "3.1 km",
    bloodType: "O+",
    contact: "+1 (555) 456-7890",
    availability: "available",
  },
];

// Notification data
export const mockNotifications = [
  {
    id: 1,
    type: "emergency",
    message: "Emergency request for O+ blood near you",
    time: "5 min ago",
    urgent: true,
  },
  {
    id: 2,
    type: "reminder",
    message: "Your next donation is due in 2 weeks",
    time: "1 hour ago",
    urgent: false,
  },
];

// All blood types
export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Roles data
export const roles = [
  {
    id: "hospital",
    title: "Hospital / Blood Bank",
    description:
      "Manage blood inventory, handle requests, and coordinate with donors",
    icon: "🏢",
    color: "from-blue-500 to-blue-700",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-700",
  },
  {
    id: "donor",
    title: "Blood Donor",
    description:
      "Donate blood, manage availability, and respond to emergency requests",
    icon: "💉",
    color: "from-green-500 to-green-700",
    gradient: "bg-gradient-to-r from-green-500 to-green-700",
  },
  {
    id: "patient",
    title: "Patient / Emergency User",
    description:
      "Request blood donations and connect with nearby hospitals/donors",
    icon: "❤️",
    color: "from-red-500 to-red-700",
    gradient: "bg-gradient-to-r from-red-500 to-red-700",
  },
];

// Stats data for hospital dashboard
export const mockHospitalStats = {
  totalUnits: 87,
  lowStock: 2,
  criticalLevels: 2,
  activeRequests: 3,
};

// Stats data for donor dashboard
export const mockDonorStats = {
  totalDonations: 12,
  bloodDonated: "12L+",
  livesSaved: 48,
};
