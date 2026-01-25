import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, CheckCircle, Percent, Info } from 'lucide-react';

interface CropResult {
  name: string;
  nameTamil: string;
  suitability: number;
  reason: string;
  reasonTamil: string;
  icon: string;
}

const cropDatabase: Record<string, CropResult[]> = {
  'clay_monsoon': [
    { name: 'Rice (Paddy)', nameTamil: 'நெல்', suitability: 95, reason: 'Clay soil retains water well, ideal for paddy cultivation during monsoon.', reasonTamil: 'களிமண் நீரை நன்கு தக்க வைக்கும், பருவமழையில் நெல் சாகுபடிக்கு ஏற்றது.', icon: '🌾' },
    { name: 'Sugarcane', nameTamil: 'கரும்பு', suitability: 85, reason: 'Heavy soil provides good anchorage and moisture retention for sugarcane.', reasonTamil: 'கனமான மண் கரும்புக்கு நல்ல ஆதரவு மற்றும் ஈரப்பதத்தை வழங்குகிறது.', icon: '🎋' },
  ],
  'clay_winter': [
    { name: 'Wheat', nameTamil: 'கோதுமை', suitability: 88, reason: 'Clay soil provides nutrients and moisture for winter wheat.', reasonTamil: 'களிமண் குளிர்கால கோதுமைக்கு ஊட்டச்சத்துக்களையும் ஈரப்பதத்தையும் வழங்குகிறது.', icon: '🌾' },
    { name: 'Mustard', nameTamil: 'கடுகு', suitability: 82, reason: 'Suitable for rabi season in clay-rich soils.', reasonTamil: 'களிமண் நிறைந்த மண்ணில் ரபி பருவத்திற்கு ஏற்றது.', icon: '🌿' },
  ],
  'sandy_monsoon': [
    { name: 'Groundnut', nameTamil: 'நிலக்கடலை', suitability: 92, reason: 'Sandy soil provides good drainage essential for groundnut.', reasonTamil: 'மணல் மண் நிலக்கடலைக்கு அவசியமான நல்ல வடிகால் வழங்குகிறது.', icon: '🥜' },
    { name: 'Watermelon', nameTamil: 'தர்பூசணி', suitability: 88, reason: 'Well-drained sandy soil is perfect for watermelon cultivation.', reasonTamil: 'நல்ல வடிகால் கொண்ட மணல் மண் தர்பூசணி சாகுபடிக்கு ஏற்றது.', icon: '🍉' },
  ],
  'sandy_summer': [
    { name: 'Muskmelon', nameTamil: 'முலாம்பழம்', suitability: 90, reason: 'Hot weather and sandy soil are ideal for muskmelon.', reasonTamil: 'வெப்பமான காலநிலை மற்றும் மணல் மண் முலாம்பழத்திற்கு ஏற்றது.', icon: '🍈' },
    { name: 'Cucumber', nameTamil: 'வெள்ளரிக்காய்', suitability: 85, reason: 'Quick-growing summer vegetable suited for sandy soil.', reasonTamil: 'மணல் மண்ணுக்கு ஏற்ற விரைவாக வளரும் கோடைகால காய்கறி.', icon: '🥒' },
  ],
  'loamy_monsoon': [
    { name: 'Cotton', nameTamil: 'பருத்தி', suitability: 94, reason: 'Loamy soil with good drainage is perfect for cotton during monsoon.', reasonTamil: 'நல்ல வடிகால் கொண்ட களிமண் கலந்த மண் பருவமழையில் பருத்திக்கு ஏற்றது.', icon: '☁️' },
    { name: 'Maize', nameTamil: 'மக்காச்சோளம்', suitability: 90, reason: 'Loamy soil provides balanced nutrients for maize growth.', reasonTamil: 'களிமண் கலந்த மண் மக்காச்சோள வளர்ச்சிக்கு சீரான ஊட்டச்சத்துக்களை வழங்குகிறது.', icon: '🌽' },
  ],
  'loamy_winter': [
    { name: 'Chickpea', nameTamil: 'கொண்டைக்கடலை', suitability: 91, reason: 'Excellent pulse crop for loamy soil in winter season.', reasonTamil: 'குளிர்காலத்தில் களிமண் கலந்த மண்ணுக்கு சிறந்த பருப்பு வகை பயிர்.', icon: '🫘' },
    { name: 'Lentils', nameTamil: 'பருப்பு', suitability: 87, reason: 'Winter legume that thrives in nutrient-rich loamy soil.', reasonTamil: 'ஊட்டச்சத்து நிறைந்த களிமண் கலந்த மண்ணில் செழிக்கும் குளிர்கால பருப்பு வகை.', icon: '🥣' },
  ],
  'red_monsoon': [
    { name: 'Millets', nameTamil: 'தினை', suitability: 93, reason: 'Red soil with moderate water retention is ideal for millets.', reasonTamil: 'மிதமான நீர் தக்க வைப்பு கொண்ட சிவப்பு மண் தினைக்கு ஏற்றது.', icon: '🌾' },
    { name: 'Pulses', nameTamil: 'பருப்பு வகைகள்', suitability: 86, reason: 'Drought-tolerant pulses grow well in red soil.', reasonTamil: 'வறட்சியை தாங்கும் பருப்பு வகைகள் சிவப்பு மண்ணில் நன்கு வளரும்.', icon: '🫘' },
  ],
  'black_monsoon': [
    { name: 'Cotton', nameTamil: 'பருத்தி', suitability: 96, reason: 'Black soil (regur) is known as cotton soil due to its moisture retention.', reasonTamil: 'கரு மண் (ரேகர்) அதன் ஈரப்பத தக்க வைப்பு காரணமாக பருத்தி மண் என்று அழைக்கப்படுகிறது.', icon: '☁️' },
    { name: 'Soybean', nameTamil: 'சோயாபீன்', suitability: 89, reason: 'Nutrient-rich black soil supports soybean growth excellently.', reasonTamil: 'ஊட்டச்சத்து நிறைந்த கரு மண் சோயாபீன் வளர்ச்சியை சிறப்பாக ஆதரிக்கிறது.', icon: '🫘' },
  ],
  'alluvial_monsoon': [
    { name: 'Rice', nameTamil: 'நெல்', suitability: 97, reason: 'Alluvial soil is highly fertile and ideal for rice cultivation.', reasonTamil: 'வண்டல் மண் மிகவும் வளமானது மற்றும் நெல் சாகுபடிக்கு ஏற்றது.', icon: '🌾' },
    { name: 'Sugarcane', nameTamil: 'கரும்பு', suitability: 94, reason: 'Rich alluvial deposits provide excellent nutrients for sugarcane.', reasonTamil: 'வளமான வண்டல் படிவுகள் கரும்புக்கு சிறந்த ஊட்டச்சத்துக்களை வழங்குகின்றன.', icon: '🎋' },
  ],
  'default': [
    { name: 'Millets', nameTamil: 'தினை', suitability: 80, reason: 'Versatile crop suitable for various soil and weather conditions.', reasonTamil: 'பல்வேறு மண் மற்றும் காலநிலைக்கு ஏற்ற பல்துறை பயிர்.', icon: '🌾' },
    { name: 'Pulses', nameTamil: 'பருப்பு வகைகள்', suitability: 75, reason: 'Hardy crops that can adapt to different conditions.', reasonTamil: 'வெவ்வேறு நிலைமைகளுக்கு ஏற்றுக்கொள்ளக்கூடிய கடினமான பயிர்கள்.', icon: '🫘' },
  ],
};

export default function CropRecommendation() {
  const { language, t } = useLanguage();
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<CropResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = `${soilType}_${season}`;
    const crops = cropDatabase[key] || cropDatabase['default'];
    setResults(crops);
    setShowResults(true);
  };

  const soilTypes = [
    { value: 'clay', label: t('soil.clay') },
    { value: 'sandy', label: t('soil.sandy') },
    { value: 'loamy', label: t('soil.loamy') },
    { value: 'red', label: t('soil.red') },
    { value: 'black', label: t('soil.black') },
    { value: 'alluvial', label: t('soil.alluvial') },
  ];

  const seasons = [
    { value: 'monsoon', label: t('season.monsoon') },
    { value: 'winter', label: t('season.winter') },
    { value: 'summer', label: t('season.summer') },
    { value: 'rain', label: t('season.rain') },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ta' ? 'tamil-text' : ''}`}>
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
              <Leaf className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('crop.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t('crop.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="card-agriculture rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Soil Type */}
                <div className="space-y-2">
                  <Label htmlFor="soil" className="text-base font-medium">
                    {t('crop.soilType')}
                  </Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger id="soil" className="h-12 text-base">
                      <SelectValue placeholder={t('crop.selectSoil')} />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil.value} value={soil.value}>
                          {soil.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Season */}
                <div className="space-y-2">
                  <Label htmlFor="season" className="text-base font-medium">
                    {t('crop.season')}
                  </Label>
                  <Select value={season} onValueChange={setSeason}>
                    <SelectTrigger id="season" className="h-12 text-base">
                      <SelectValue placeholder={t('crop.selectSeason')} />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-medium">
                    {t('crop.location')}
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t('crop.enterLocation')}
                    className="h-12 text-base"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="agriculture" 
                  size="lg" 
                  className="w-full"
                  disabled={!soilType || !season}
                >
                  {t('crop.submit')}
                </Button>
              </form>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {showResults ? (
                <>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {t('crop.results')}
                  </h2>
                  <div className="space-y-4">
                    {results.map((crop, index) => (
                      <div
                        key={index}
                        className="result-card rounded-xl p-6 animate-grow-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{crop.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground">
                              {language === 'en' ? crop.name : crop.nameTamil}
                            </h3>
                            
                            {/* Suitability Bar */}
                            <div className="mt-3 space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Percent className="h-3 w-3" />
                                  {t('crop.suitability')}
                                </span>
                                <span className="font-bold text-primary">{crop.suitability}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                                  style={{ width: `${crop.suitability}%` }}
                                />
                              </div>
                            </div>

                            {/* Reason */}
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground flex items-start gap-2">
                                <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                                <span>
                                  <strong className="text-foreground">{t('crop.reason')}</strong>
                                  <br />
                                  {language === 'en' ? crop.reason : crop.reasonTamil}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed border-border rounded-2xl">
                  <Leaf className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? 'Fill in the form to get crop recommendations' 
                      : 'பயிர் பரிந்துரைகளைப் பெற படிவத்தை நிரப்பவும்'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
