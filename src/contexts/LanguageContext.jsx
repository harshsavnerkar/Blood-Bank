import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

// Language translations
const translations = {
  en: {
    // Common
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    login: "Login",
    signup: "Sign Up",
    getStarted: "Get Started",
    back: "Back",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    // Landing Page
    welcome: "Welcome to LifeShare",
    saveLives: "Save Lives with Smart Blood Banking",
    joinHospital: "Join as Hospital/Blood Bank",
    registerDonor: "Register as Donor",
    landingDescription:
      "Connect blood donors with patients in need through our intelligent matching system. Save lives with technology.",
    powerfulFeatures: "Powerful Features",
    readyToMakeADifference: "Ready to Make a Difference?",
    joinThousands:
      "Join thousands of healthcare professionals and donors making a difference every day.",
    startSavingLives: "Start Saving Lives",
    // Auth
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    signInToContinue: "Sign in to continue to your dashboard",
    joinOurCommunity: "Join our community of life savers",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    enterFullName: "Enter your full name",
    enterEmail: "Enter your email address",
    enterPassword: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    backToHome: "Back to Home",
    // Role Selection
    selectYourRole: "Select Your Role",
    chooseRoleDescription: "Choose how you want to contribute to saving lives",
    hospitalBloodBank: "Hospital/Blood Bank",
    bloodDonor: "Blood Donor",
    patientEmergency: "Patient/Emergency",
    hospitalManageInventory: "Manage blood inventory and coordinate donations",
    donorSaveLives: "Donate blood and help save lives in your community",
    patientFindSupport: "Find blood support and emergency assistance",
    keyFeatures: "Key Features",
    selectRole: "Select Role",
    inventoryManagement: "Inventory Management",
    emergencyRequests: "Emergency Requests",
    donorCoordination: "Donor Coordination",
    donorHistory: "Donation History",
    donorAvailability: "Availability Status",
    healthTracking: "Health Tracking",
    hospitalMatching: "Hospital Matching",
    realtimeUpdates: "Real-time Updates",
    securePlatform: "Secure Platform",
    platformSecurityInfo:
      "Your data is protected with enterprise-grade security and HIPAA compliance",
    // Hospital Dashboard
    hospitalDashboard: "Hospital Dashboard",
    bloodInventory: "Blood Inventory",
    hospitalExchange: "Hospital Exchange",
    hospitalManageBlood: "Manage your blood inventory and requests",
    totalUnits: "Total Units",
    activeDonors: "Active Donors",
    criticalTypes: "Critical Types",
    searchBloodTypes: "Search blood types...",
    addUnits: "Add Units",
    // Donor Dashboard
    donorDashboard: "Donor Dashboard",
    helpSaveLives: "Help save lives through blood donation",
    myProfile: "My Profile",
    donorHistoryFull: "Donation History",
    donationOpportunities: "Donation Opportunities",
    personalInformation: "Personal Information",
    availableForDonation: "Available for donation",
    currentlyUnavailable: "Currently unavailable",
    donorAvailabilityFull: "Availability Status",
    upcomingOpportunities: "Upcoming Opportunities",
    // Patient Dashboard
    patientDashboard: "Patient Dashboard",
    myRequests: "My Requests",
    nearbyHospitals: "Nearby Hospitals",
    newRequest: "New Request",
    myEmergencyRequests: "My Emergency Requests",
    newBloodRequest: "New Blood Request",
    patientInformation: "Patient Information",
    hospitalInformation: "Hospital Information",
    reviewAndSubmit: "Review and Submit",
  },
  mr: {
    // Common
    dashboard: "डॅशबोर्ड",
    profile: "प्रोफाइल",
    settings: "सेटिंग्ज",
    logout: "लॉगआउट",
    save: "जतन करा",
    cancel: "रद्द करा",
    login: "लॉगिन",
    signup: "साइन अप",
    getStarted: "प्रारंभ करा",
    back: "मागे",
    next: "पुढे",
    previous: "मागील",
    submit: "सबमिट करा",
    // Landing Page
    welcome: "लाइफशेअरमध्ये आपले स्वागत आहे",
    saveLives: "स्मार्ट ब्लड बँकिंगसह जीवन वाचवा",
    joinHospital: "रुग्णालय/ब्लड बँक म्हणून सामील व्हा",
    registerDonor: "डोनर म्हणून नोंदणी करा",
    landingDescription:
      "आमच्या बुद्धिमान जुळवणी प्रणालीद्वारे रक्तदाते आणि गरजू रुग्णांशी कनेक्ट करा. तंत्रज्ञानासह जीवन वाचवा.",
    powerfulFeatures: "शक्तिशाली वैशिष्ट्ये",
    readyToMakeADifference: "फरक करण्यासाठी तयार?",
    joinThousands:
      "दररोज फरक करणारे हजारो आरोग्य सेवा व्यावसायिक आणि डोनर्स यांच्यासह सामील व्हा.",
    startSavingLives: "जीवन वाचवणे सुरू करा",
    // Auth
    welcomeBack: "परत येण्याबद्दल स्वागत आहे",
    createAccount: "खाते तयार करा",
    signInToContinue: "आपल्या डॅशबोर्डवर सुरू ठेवण्यासाठी साइन इन करा",
    joinOurCommunity: "जीवन वाचवणाऱ्यांच्या आमच्या समुदायात सामील व्हा",
    email: "ईमेल पत्ता",
    password: "पासवर्ड",
    confirmPassword: "पासवर्डची पुष्टी करा",
    fullName: "पूर्ण नाव",
    enterFullName: "आपले पूर्ण नाव प्रविष्ट करा",
    enterEmail: "आपला ईमेल पत्ता प्रविष्ट करा",
    enterPassword: "आपला पासवर्ड प्रविष्ट करा",
    rememberMe: "मला लक्षात ठेवा",
    forgotPassword: "पासवर्ड विसरलात?",
    dontHaveAccount: "खाते नाही?",
    alreadyHaveAccount: "आधीपासून खाते आहे?",
    backToHome: "मुख्यपृष्ठावर परत जा",
    // Role Selection
    selectYourRole: "आपली भूमिका निवडा",
    chooseRoleDescription: "जीवन वाचवण्यात कसे योगदान द्यायचे ते निवडा",
    hospitalBloodBank: "रुग्णालय/ब्लड बँक",
    bloodDonor: "रक्त दाता",
    patientEmergency: "रुग्ण/आणीबाणी",
    hospitalManageInventory: "रक्त साठा व्यवस्थापित करा आणि दान समन्वयित करा",
    donorSaveLives: "रक्त द्या आणि आपल्या समुदायातील जीवन वाचवा",
    patientFindSupport: "रक्त समर्थन आणि आणीबाणी सहाय्य शोधा",
    keyFeatures: "मुख्य वैशिष्ट्ये",
    selectRole: "भूमिका निवडा",
    inventoryManagement: "साठा व्यवस्थापन",
    emergencyRequests: "आणीबाणी विनंत्या",
    donorCoordination: "दाता समन्वय",
    donorHistory: "दान इतिहास",
    donorAvailability: "उपलब्धता स्थिती",
    healthTracking: "आरोग्य ट्रॅकिंग",
    hospitalMatching: "रुग्णालय जुळवणी",
    realtimeUpdates: "वास्तविक-वेळ अद्यतने",
    securePlatform: "सुरक्षित प्लॅटफॉर्म",
    platformSecurityInfo:
      "आपला डेटा एंटरप्राइज-ग्रेड सुरक्षितता आणि HIPAA पालनासह सुरक्षित केला जातो",
    // Hospital Dashboard
    hospitalDashboard: "रुग्णालय डॅशबोर्ड",
    bloodInventory: "ब्लड इन्व्हेंटरी",
    hospitalExchange: "रुग्णालय विनिमय",
    hospitalManageBlood: "आपला रक्त साठा आणि विनंत्या व्यवस्थापित करा",
    totalUnits: "एकूण युनिट्स",
    activeDonors: "सक्रिय दाते",
    criticalTypes: "गंभीर प्रकार",
    searchBloodTypes: "रक्त प्रकार शोधा...",
    addUnits: "युनिट्स जोडा",
    // Donor Dashboard
    donorDashboard: "डोनर डॅशबोर्ड",
    helpSaveLives: "रक्त दानाद्वारे जीवन वाचवण्यात मदत करा",
    myProfile: "माझी प्रोफाइल",
    donorHistoryFull: "दान इतिहास",
    donationOpportunities: "दान संधी",
    personalInformation: "वैयक्तिक माहिती",
    availableForDonation: "दानासाठी उपलब्ध",
    currentlyUnavailable: "सध्या अनुपलब्ध",
    donorAvailabilityFull: "उपलब्धता स्थिती",
    upcomingOpportunities: "आगामी संधी",
    // Patient Dashboard
    patientDashboard: "रुग्ण डॅशबोर्ड",
    myRequests: "माझ्या विनंत्या",
    nearbyHospitals: "जवळचे रुग्णालय",
    newRequest: "नवीन विनंती",
    myEmergencyRequests: "माझ्या आणीबाणी विनंत्या",
    newBloodRequest: "नवीन रक्त विनंती",
    patientInformation: "रुग्ण माहिती",
    hospitalInformation: "रुग्णालय माहिती",
    reviewAndSubmit: "पुनरावलोकन आणि सबमिट करा",
  },
  hi: {
    // Common
    dashboard: "डैशबोर्ड",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    save: "सहेजें",
    cancel: "रद्द करें",
    login: "लॉगिन",
    signup: "साइन अप",
    getStarted: "शुरू करें",
    back: "वापस",
    next: "अगला",
    previous: "पिछला",
    submit: "जमा करें",
    // Landing Page
    welcome: "लाइफशेयर में आपका स्वागत है",
    saveLives: "स्मार्ट ब्लड बैंकिंग के साथ जीवन बचाएं",
    joinHospital: "अस्पताल/ब्लड बैंक के रूप में शामिल हों",
    registerDonor: "दाता के रूप में पंजीकरण करें",
    landingDescription:
      "हमारी बुद्धिमान मैचिंग प्रणाली के माध्यम से रक्तदाता और आवश्यक रोगियों को जोड़ें। प्रौद्योगिकी के साथ जीवन बचाएं।",
    powerfulFeatures: "शक्तिशाली सुविधाएं",
    readyToMakeADifference: "अंतर बनाने के लिए तैयार हैं?",
    joinThousands:
      "हर दिन अंतर बनाने वाले हजारों स्वास्थ्य सेवा पेशेवर और दाताओं के साथ जुड़ें।",
    startSavingLives: "जीवन बचाना शुरू करें",
    // Auth
    welcomeBack: "वापसी पर स्वागत है",
    createAccount: "खाता बनाएं",
    signInToContinue: "अपने डैशबोर्ड पर जारी रखने के लिए साइन इन करें",
    joinOurCommunity: "जीवन बचाने वाले हमारे समुदाय में शामिल हों",
    email: "ईमेल पता",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    fullName: "पूरा नाम",
    enterFullName: "अपना पूरा नाम दर्ज करें",
    enterEmail: "अपना ईमेल पता दर्ज करें",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    dontHaveAccount: "खाता नहीं है?",
    alreadyHaveAccount: "पहले से खाता है?",
    backToHome: "मुख्य पृष्ठ पर वापस जाएं",
    // Role Selection
    selectYourRole: "अपनी भूमिका चुनें",
    chooseRoleDescription: "जीवन बचाने में कैसे योगदान देना है चुनें",
    hospitalBloodBank: "अस्पताल/ब्लड बैंक",
    bloodDonor: "रक्त दाता",
    patientEmergency: "रोगी/आपातकाल",
    hospitalManageInventory: "रक्त सूची प्रबंधित करें और दान समन्वयित करें",
    donorSaveLives: "रक्त दें और अपने समुदाय में जीवन बचाएं",
    patientFindSupport: "रक्त समर्थन और आपातकालीन सहायता ढूंढें",
    keyFeatures: "मुख्य सुविधाएं",
    selectRole: "भूमिका चुनें",
    inventoryManagement: "सूची प्रबंधन",
    emergencyRequests: "आपातकालीन अनुरोध",
    donorCoordination: "दाता समन्वय",
    donorHistory: "दान इतिहास",
    donorAvailability: "उपलब्धता स्थिति",
    healthTracking: "स्वास्थ्य ट्रैकिंग",
    hospitalMatching: "अस्पताल मैचिंग",
    realtimeUpdates: "वास्तविक समय अपडेट",
    securePlatform: "सुरक्षित प्लेटफॉर्म",
    platformSecurityInfo:
      "आपका डेटा एंटरप्राइज-ग्रेड सुरक्षा और HIPAA अनुपालन के साथ सुरक्षित है",
    // Hospital Dashboard
    hospitalDashboard: "अस्पताल डैशबोर्ड",
    bloodInventory: "रक्त सूची",
    hospitalExchange: "अस्पताल विनिमय",
    hospitalManageBlood: "अपनी रक्त सूची और अनुरोध प्रबंधित करें",
    totalUnits: "कुल इकाइयाँ",
    activeDonors: "सक्रिय दाता",
    criticalTypes: "गंभीर प्रकार",
    searchBloodTypes: "रक्त प्रकार खोजें...",
    addUnits: "इकाइयाँ जोड़ें",
    // Donor Dashboard
    donorDashboard: "दाता डैशबोर्ड",
    helpSaveLives: "रक्त दान के माध्यम से जीवन बचाने में मदत करें",
    myProfile: "मेरी प्रोफ़ाइल",
    donorHistoryFull: "दान इतिहास",
    donationOpportunities: "दान के अवसर",
    personalInformation: "व्यक्तिगत जानकारी",
    availableForDonation: "दान के लिए उपलब्ध",
    currentlyUnavailable: "वर्तमान में अनुपलब्ध",
    donorAvailabilityFull: "उपलब्धता स्थिति",
    upcomingOpportunities: "आगामी अवसर",
    // Patient Dashboard
    patientDashboard: "रोगी डैशबोर्ड",
    myRequests: "मेरे अनुरोध",
    nearbyHospitals: "आसपास के अस्पताल",
    newRequest: "नया अनुरोध",
    myEmergencyRequests: "मेरे आपातकालीन अनुरोध",
    newBloodRequest: "नया रक्त अनुरोध",
    patientInformation: "रोगी की जानकारी",
    hospitalInformation: "अस्पताल की जानकारी",
    reviewAndSubmit: "समीक्षा और जमा करें",
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
