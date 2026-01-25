import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.crop': 'Crop Recommendation',
    'nav.disease': 'Disease Prediction',
    'nav.fertilizer': 'Fertilizer',
    'nav.about': 'About',
    
    // Home Page
    'home.title': 'AI-Powered Crop Advisory',
    'home.subtitle': 'Smart farming solutions for better harvests',
    'home.description': 'Get personalized crop recommendations, disease diagnosis, and fertilizer guidance powered by artificial intelligence.',
    'home.getStarted': 'Get Started',
    'home.learnMore': 'Learn More',
    'home.features': 'Our Features',
    'home.cropRecommendation': 'Crop Recommendation',
    'home.cropRecommendationDesc': 'Get the best crop suggestions based on your soil type, season, and location.',
    'home.diseaseDetection': 'Disease Detection',
    'home.diseaseDetectionDesc': 'Upload a leaf image to identify diseases and get treatment recommendations.',
    'home.fertilizerGuide': 'Fertilizer Guide',
    'home.fertilizerGuideDesc': 'Find the right fertilizers and dosage for your crops.',
    'home.whyChoose': 'Why Choose Us?',
    'home.aiPowered': 'AI-Powered Analysis',
    'home.aiPoweredDesc': 'Advanced machine learning models for accurate predictions.',
    'home.localizedAdvice': 'Localized Advice',
    'home.localizedAdviceDesc': 'Recommendations tailored to your region and conditions.',
    'home.easyToUse': 'Easy to Use',
    'home.easyToUseDesc': 'Simple interface designed for farmers of all backgrounds.',
    
    // Crop Recommendation Page
    'crop.title': 'Crop Recommendation',
    'crop.subtitle': 'Find the best crops for your farm',
    'crop.soilType': 'Soil Type',
    'crop.selectSoil': 'Select soil type',
    'crop.season': 'Season',
    'crop.selectSeason': 'Select season',
    'crop.location': 'Location / District',
    'crop.enterLocation': 'Enter your location',
    'crop.submit': 'Get Recommendations',
    'crop.results': 'Recommended Crops',
    'crop.suitability': 'Suitability',
    'crop.reason': 'Why this crop?',
    
    // Soil types
    'soil.clay': 'Clay Soil',
    'soil.sandy': 'Sandy Soil',
    'soil.loamy': 'Loamy Soil',
    'soil.red': 'Red Soil',
    'soil.black': 'Black Soil',
    'soil.alluvial': 'Alluvial Soil',
    
    // Seasons
    'season.monsoon': 'Monsoon (Kharif)',
    'season.winter': 'Winter (Rabi)',
    'season.summer': 'Summer (Zaid)',
    'season.rain': 'Rainy Season',
    
    // Disease Prediction Page
    'disease.title': 'Disease Prediction',
    'disease.subtitle': 'Upload a leaf image to diagnose diseases',
    'disease.upload': 'Upload Leaf Image',
    'disease.dragDrop': 'Drag and drop an image here, or click to select',
    'disease.analyze': 'Analyze Image',
    'disease.results': 'Diagnosis Results',
    'disease.diseaseName': 'Disease Detected',
    'disease.confidence': 'Confidence Level',
    'disease.cause': 'Cause',
    'disease.remedy': 'Recommended Remedy',
    'disease.prevention': 'Prevention',
    'disease.fertilizer': 'Suggested Treatment',
    'disease.healthy': 'Healthy Leaf',
    'disease.healthyDesc': 'No disease detected. Your plant appears healthy!',
    
    // Fertilizer Page
    'fertilizer.title': 'Fertilizer Recommendation',
    'fertilizer.subtitle': 'Get the right fertilizer for your crops',
    'fertilizer.cropName': 'Crop Name',
    'fertilizer.selectCrop': 'Select crop',
    'fertilizer.growthStage': 'Growth Stage',
    'fertilizer.selectStage': 'Select growth stage',
    'fertilizer.submit': 'Get Fertilizer Advice',
    'fertilizer.results': 'Recommended Fertilizers',
    'fertilizer.name': 'Fertilizer',
    'fertilizer.quantity': 'Quantity',
    'fertilizer.instructions': 'Usage Instructions',
    'fertilizer.timing': 'Best Time to Apply',
    
    // Growth stages
    'stage.seedling': 'Seedling Stage',
    'stage.vegetative': 'Vegetative Stage',
    'stage.flowering': 'Flowering Stage',
    'stage.fruiting': 'Fruiting Stage',
    'stage.harvest': 'Pre-Harvest',
    
    // About Page
    'about.title': 'About AI Crop Advisory',
    'about.mission': 'Our Mission',
    'about.missionText': 'To empower farmers with AI-driven insights for sustainable and profitable agriculture.',
    'about.howItWorks': 'How It Works',
    'about.step1': 'Enter Your Details',
    'about.step1Desc': 'Provide information about your soil, location, and crops.',
    'about.step2': 'AI Analysis',
    'about.step2Desc': 'Our AI models analyze your data against thousands of agricultural patterns.',
    'about.step3': 'Get Recommendations',
    'about.step3Desc': 'Receive personalized advice for better farming outcomes.',
    'about.contact': 'Need Help?',
    'about.contactText': 'Contact your local agricultural extension office for additional support.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.tryAgain': 'Try Again',
    'common.back': 'Back',
    'common.next': 'Next',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.crop': 'பயிர் பரிந்துரை',
    'nav.disease': 'நோய் கணிப்பு',
    'nav.fertilizer': 'உரம்',
    'nav.about': 'பற்றி',
    
    // Home Page
    'home.title': 'AI-இயக்கும் பயிர் ஆலோசனை',
    'home.subtitle': 'சிறந்த அறுவடைக்கான ஸ்மார்ட் விவசாய தீர்வுகள்',
    'home.description': 'செயற்கை நுண்ணறிவால் இயக்கப்படும் தனிப்பயனாக்கப்பட்ட பயிர் பரிந்துரைகள், நோய் கண்டறிதல் மற்றும் உர வழிகாட்டுதலைப் பெறுங்கள்.',
    'home.getStarted': 'தொடங்குங்கள்',
    'home.learnMore': 'மேலும் அறிய',
    'home.features': 'எங்கள் அம்சங்கள்',
    'home.cropRecommendation': 'பயிர் பரிந்துரை',
    'home.cropRecommendationDesc': 'உங்கள் மண் வகை, பருவம் மற்றும் இருப்பிடத்தின் அடிப்படையில் சிறந்த பயிர் பரிந்துரைகளைப் பெறுங்கள்.',
    'home.diseaseDetection': 'நோய் கண்டறிதல்',
    'home.diseaseDetectionDesc': 'நோய்களை அடையாளம் காண இலை படத்தை பதிவேற்றி சிகிச்சை பரிந்துரைகளைப் பெறுங்கள்.',
    'home.fertilizerGuide': 'உர வழிகாட்டி',
    'home.fertilizerGuideDesc': 'உங்கள் பயிர்களுக்கு சரியான உரங்கள் மற்றும் அளவை கண்டறியுங்கள்.',
    'home.whyChoose': 'ஏன் எங்களை தேர்வு செய்ய வேண்டும்?',
    'home.aiPowered': 'AI-இயக்கும் பகுப்பாய்வு',
    'home.aiPoweredDesc': 'துல்லியமான கணிப்புகளுக்கு மேம்பட்ட இயந்திர கற்றல் மாதிரிகள்.',
    'home.localizedAdvice': 'உள்ளூர் ஆலோசனை',
    'home.localizedAdviceDesc': 'உங்கள் பிராந்தியம் மற்றும் நிலைமைகளுக்கு ஏற்ப பரிந்துரைகள்.',
    'home.easyToUse': 'பயன்படுத்த எளிதானது',
    'home.easyToUseDesc': 'அனைத்து பின்னணியிலிருந்தும் விவசாயிகளுக்கு எளிய இடைமுகம்.',
    
    // Crop Recommendation Page
    'crop.title': 'பயிர் பரிந்துரை',
    'crop.subtitle': 'உங்கள் பண்ணைக்கு சிறந்த பயிர்களைக் கண்டறியுங்கள்',
    'crop.soilType': 'மண் வகை',
    'crop.selectSoil': 'மண் வகையைத் தேர்ந்தெடுக்கவும்',
    'crop.season': 'பருவம்',
    'crop.selectSeason': 'பருவத்தைத் தேர்ந்தெடுக்கவும்',
    'crop.location': 'இருப்பிடம் / மாவட்டம்',
    'crop.enterLocation': 'உங்கள் இருப்பிடத்தை உள்ளிடவும்',
    'crop.submit': 'பரிந்துரைகளைப் பெறுங்கள்',
    'crop.results': 'பரிந்துரைக்கப்பட்ட பயிர்கள்',
    'crop.suitability': 'பொருத்தம்',
    'crop.reason': 'ஏன் இந்த பயிர்?',
    
    // Soil types
    'soil.clay': 'களிமண்',
    'soil.sandy': 'மணல் மண்',
    'soil.loamy': 'களிமண் கலந்த மண்',
    'soil.red': 'சிவப்பு மண்',
    'soil.black': 'கரு மண்',
    'soil.alluvial': 'வண்டல் மண்',
    
    // Seasons
    'season.monsoon': 'பருவமழை (காரிஃப்)',
    'season.winter': 'குளிர்காலம் (ரபி)',
    'season.summer': 'கோடை (ஸைத்)',
    'season.rain': 'மழைக்காலம்',
    
    // Disease Prediction Page
    'disease.title': 'நோய் கணிப்பு',
    'disease.subtitle': 'நோய்களை கண்டறிய இலை படத்தை பதிவேற்றவும்',
    'disease.upload': 'இலை படத்தை பதிவேற்றவும்',
    'disease.dragDrop': 'படத்தை இங்கே இழுத்து விடவும் அல்லது தேர்ந்தெடுக்க கிளிக் செய்யவும்',
    'disease.analyze': 'படத்தை பகுப்பாய்வு செய்',
    'disease.results': 'கண்டறிதல் முடிவுகள்',
    'disease.diseaseName': 'கண்டறியப்பட்ட நோய்',
    'disease.confidence': 'நம்பகத்தன்மை நிலை',
    'disease.cause': 'காரணம்',
    'disease.remedy': 'பரிந்துரைக்கப்பட்ட தீர்வு',
    'disease.prevention': 'தடுப்பு',
    'disease.fertilizer': 'பரிந்துரைக்கப்பட்ட சிகிச்சை',
    'disease.healthy': 'ஆரோக்கியமான இலை',
    'disease.healthyDesc': 'எந்த நோயும் கண்டறியப்படவில்லை. உங்கள் செடி ஆரோக்கியமாக இருக்கிறது!',
    
    // Fertilizer Page
    'fertilizer.title': 'உர பரிந்துரை',
    'fertilizer.subtitle': 'உங்கள் பயிர்களுக்கு சரியான உரத்தைப் பெறுங்கள்',
    'fertilizer.cropName': 'பயிர் பெயர்',
    'fertilizer.selectCrop': 'பயிரைத் தேர்ந்தெடுக்கவும்',
    'fertilizer.growthStage': 'வளர்ச்சி நிலை',
    'fertilizer.selectStage': 'வளர்ச்சி நிலையைத் தேர்ந்தெடுக்கவும்',
    'fertilizer.submit': 'உர ஆலோசனையைப் பெறுங்கள்',
    'fertilizer.results': 'பரிந்துரைக்கப்பட்ட உரங்கள்',
    'fertilizer.name': 'உரம்',
    'fertilizer.quantity': 'அளவு',
    'fertilizer.instructions': 'பயன்பாட்டு வழிமுறைகள்',
    'fertilizer.timing': 'சிறந்த நேரம்',
    
    // Growth stages
    'stage.seedling': 'நாற்று நிலை',
    'stage.vegetative': 'தாவர நிலை',
    'stage.flowering': 'பூக்கும் நிலை',
    'stage.fruiting': 'காய்க்கும் நிலை',
    'stage.harvest': 'அறுவடைக்கு முன்',
    
    // About Page
    'about.title': 'AI பயிர் ஆலோசனை பற்றி',
    'about.mission': 'எங்கள் நோக்கம்',
    'about.missionText': 'நிலையான மற்றும் லாபகரமான விவசாயத்திற்கு AI-இயக்கும் நுண்ணறிவுகளுடன் விவசாயிகளை மேம்படுத்துவது.',
    'about.howItWorks': 'இது எப்படி வேலை செய்கிறது',
    'about.step1': 'உங்கள் விவரங்களை உள்ளிடவும்',
    'about.step1Desc': 'உங்கள் மண், இருப்பிடம் மற்றும் பயிர்கள் பற்றிய தகவல்களை வழங்கவும்.',
    'about.step2': 'AI பகுப்பாய்வு',
    'about.step2Desc': 'எங்கள் AI மாதிரிகள் ஆயிரக்கணக்கான விவசாய முறைகளுக்கு எதிராக உங்கள் தரவை பகுப்பாய்வு செய்கின்றன.',
    'about.step3': 'பரிந்துரைகளைப் பெறுங்கள்',
    'about.step3Desc': 'சிறந்த விவசாய விளைவுகளுக்கு தனிப்பயனாக்கப்பட்ட ஆலோசனைகளைப் பெறுங்கள்.',
    'about.contact': 'உதவி தேவையா?',
    'about.contactText': 'கூடுதல் ஆதரவுக்கு உங்கள் உள்ளூர் விவசாய விரிவாக்க அலுவலகத்தை தொடர்பு கொள்ளவும்.',
    
    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை ஏற்பட்டது',
    'common.tryAgain': 'மீண்டும் முயற்சிக்கவும்',
    'common.back': 'பின்செல்',
    'common.next': 'அடுத்து',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
