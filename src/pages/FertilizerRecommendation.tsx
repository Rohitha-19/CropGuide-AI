import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Droplets, Package, Clock, FileText, CheckCircle } from 'lucide-react';

interface FertilizerResult {
  name: string;
  nameTamil: string;
  quantity: string;
  quantityTamil: string;
  instructions: string;
  instructionsTamil: string;
  timing: string;
  timingTamil: string;
  icon: string;
}

const fertilizerDatabase: Record<string, FertilizerResult[]> = {
  'rice_seedling': [
    { name: 'DAP (Diammonium Phosphate)', nameTamil: 'டிஏபி (டைஅமோனியம் பாஸ்பேட்)', quantity: '50 kg/acre', quantityTamil: '50 கிலோ/ஏக்கர்', instructions: 'Apply as basal dose before transplanting. Mix well with soil.', instructionsTamil: 'நடவு செய்வதற்கு முன் அடி உரமாக இடவும். மண்ணுடன் நன்கு கலக்கவும்.', timing: 'Before transplanting', timingTamil: 'நடவுக்கு முன்', icon: '🧪' },
  ],
  'rice_vegetative': [
    { name: 'Urea', nameTamil: 'யூரியா', quantity: '30 kg/acre', quantityTamil: '30 கிலோ/ஏக்கர்', instructions: 'Apply in standing water. Ensure 2-3 cm water level in field.', instructionsTamil: 'நிற்கும் நீரில் இடவும். வயலில் 2-3 செமீ நீர் மட்டம் உறுதி செய்யவும்.', timing: '21 days after transplanting', timingTamil: 'நடவு செய்த 21 நாட்களுக்குப் பிறகு', icon: '💧' },
    { name: 'Zinc Sulfate', nameTamil: 'ஜிங்க் சல்பேட்', quantity: '10 kg/acre', quantityTamil: '10 கிலோ/ஏக்கர்', instructions: 'Mix with sand and broadcast evenly.', instructionsTamil: 'மணலுடன் கலந்து சீராக தூவுங்கள்.', timing: '15-20 days after transplanting', timingTamil: 'நடவு செய்த 15-20 நாட்களுக்குப் பிறகு', icon: '⚗️' },
  ],
  'rice_flowering': [
    { name: 'MOP (Muriate of Potash)', nameTamil: 'எம்ஓபி (மியூரியேட் ஆஃப் பொட்டாஷ்)', quantity: '25 kg/acre', quantityTamil: '25 கிலோ/ஏக்கர்', instructions: 'Apply during panicle initiation stage.', instructionsTamil: 'கதிர் துவக்க நிலையில் இடவும்.', timing: 'At panicle initiation', timingTamil: 'கதிர் துவக்கத்தில்', icon: '🌾' },
  ],
  'cotton_seedling': [
    { name: 'NPK 19:19:19', nameTamil: 'என்பிகே 19:19:19', quantity: '25 kg/acre', quantityTamil: '25 கிலோ/ஏக்கர்', instructions: 'Apply as starter fertilizer near root zone.', instructionsTamil: 'வேர் மண்டலத்தின் அருகில் தொடக்க உரமாக இடவும்.', timing: '15-20 days after sowing', timingTamil: 'விதைப்பு செய்த 15-20 நாட்களுக்குப் பிறகு', icon: '🧪' },
  ],
  'cotton_vegetative': [
    { name: 'Urea', nameTamil: 'யூரியா', quantity: '45 kg/acre', quantityTamil: '45 கிலோ/ஏக்கர்', instructions: 'Apply in two splits. First at 30 days, second at 60 days.', instructionsTamil: 'இரண்டு முறை பிரித்து இடவும். முதல் 30 நாட்களில், இரண்டாவது 60 நாட்களில்.', timing: '30 and 60 days after sowing', timingTamil: 'விதைப்பு செய்த 30 மற்றும் 60 நாட்களுக்குப் பிறகு', icon: '💧' },
  ],
  'cotton_flowering': [
    { name: 'MOP', nameTamil: 'எம்ஓபி', quantity: '30 kg/acre', quantityTamil: '30 கிலோ/ஏக்கர்', instructions: 'Apply before irrigation for better absorption.', instructionsTamil: 'சிறந்த உறிஞ்சுதலுக்கு நீர்ப்பாசனத்திற்கு முன் இடவும்.', timing: 'At flowering stage', timingTamil: 'பூக்கும் நிலையில்', icon: '🌸' },
  ],
  'maize_seedling': [
    { name: 'DAP', nameTamil: 'டிஏபி', quantity: '55 kg/acre', quantityTamil: '55 கிலோ/ஏக்கர்', instructions: 'Apply at sowing time as basal dose.', instructionsTamil: 'விதைப்பு நேரத்தில் அடி உரமாக இடவும்.', timing: 'At sowing', timingTamil: 'விதைப்பின் போது', icon: '🧪' },
  ],
  'maize_vegetative': [
    { name: 'Urea', nameTamil: 'யூரியா', quantity: '55 kg/acre', quantityTamil: '55 கிலோ/ஏக்கர்', instructions: 'Apply in two equal splits at 25 and 45 days.', instructionsTamil: '25 மற்றும் 45 நாட்களில் இரண்டு சம பிரிவுகளாக இடவும்.', timing: '25 and 45 days after sowing', timingTamil: 'விதைப்பு செய்த 25 மற்றும் 45 நாட்களுக்குப் பிறகு', icon: '💧' },
  ],
  'groundnut_seedling': [
    { name: 'Single Super Phosphate', nameTamil: 'சிங்கிள் சூப்பர் பாஸ்பேட்', quantity: '100 kg/acre', quantityTamil: '100 கிலோ/ஏக்கர்', instructions: 'Apply as basal fertilizer at sowing.', instructionsTamil: 'விதைப்பின் போது அடி உரமாக இடவும்.', timing: 'At sowing', timingTamil: 'விதைப்பின் போது', icon: '🧪' },
  ],
  'groundnut_flowering': [
    { name: 'Gypsum', nameTamil: 'ஜிப்சம்', quantity: '200 kg/acre', quantityTamil: '200 கிலோ/ஏக்கர்', instructions: 'Apply at flowering for better pod development.', instructionsTamil: 'சிறந்த காய் வளர்ச்சிக்கு பூக்கும் போது இடவும்.', timing: 'At flowering (45 days)', timingTamil: 'பூக்கும் போது (45 நாட்கள்)', icon: '🥜' },
  ],
  'default': [
    { name: 'NPK 10:26:26', nameTamil: 'என்பிகே 10:26:26', quantity: '50 kg/acre', quantityTamil: '50 கிலோ/ஏக்கர்', instructions: 'General purpose fertilizer suitable for most crops.', instructionsTamil: 'பெரும்பாலான பயிர்களுக்கு ஏற்ற பொது நோக்க உரம்.', timing: 'As per crop stage', timingTamil: 'பயிர் நிலைக்கேற்ப', icon: '🧪' },
    { name: 'Vermicompost', nameTamil: 'மண்புழு உரம்', quantity: '2 tons/acre', quantityTamil: '2 டன்/ஏக்கர்', instructions: 'Apply as organic manure for soil health.', instructionsTamil: 'மண் ஆரோக்கியத்திற்கு இயற்கை உரமாக இடவும்.', timing: 'Before sowing', timingTamil: 'விதைப்பதற்கு முன்', icon: '🌱' },
  ],
};

const crops = [
  { value: 'rice', label: 'Rice / நெல்' },
  { value: 'cotton', label: 'Cotton / பருத்தி' },
  { value: 'maize', label: 'Maize / மக்காச்சோளம்' },
  { value: 'groundnut', label: 'Groundnut / நிலக்கடலை' },
  { value: 'sugarcane', label: 'Sugarcane / கரும்பு' },
  { value: 'wheat', label: 'Wheat / கோதுமை' },
];

export default function FertilizerRecommendation() {
  const { language, t } = useLanguage();
  const [crop, setCrop] = useState('');
  const [stage, setStage] = useState('');
  const [results, setResults] = useState<FertilizerResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const stages = [
    { value: 'seedling', label: t('stage.seedling') },
    { value: 'vegetative', label: t('stage.vegetative') },
    { value: 'flowering', label: t('stage.flowering') },
    { value: 'fruiting', label: t('stage.fruiting') },
    { value: 'harvest', label: t('stage.harvest') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = `${crop}_${stage}`;
    const fertilizers = fertilizerDatabase[key] || fertilizerDatabase['default'];
    setResults(fertilizers);
    setShowResults(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ta' ? 'tamil-text' : ''}`}>
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-blue to-accent mb-6">
              <Droplets className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('fertilizer.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t('fertilizer.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="card-agriculture rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Crop */}
                <div className="space-y-2">
                  <Label htmlFor="crop" className="text-base font-medium">
                    {t('fertilizer.cropName')}
                  </Label>
                  <Select value={crop} onValueChange={setCrop}>
                    <SelectTrigger id="crop" className="h-12 text-base">
                      <SelectValue placeholder={t('fertilizer.selectCrop')} />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Growth Stage */}
                <div className="space-y-2">
                  <Label htmlFor="stage" className="text-base font-medium">
                    {t('fertilizer.growthStage')}
                  </Label>
                  <Select value={stage} onValueChange={setStage}>
                    <SelectTrigger id="stage" className="h-12 text-base">
                      <SelectValue placeholder={t('fertilizer.selectStage')} />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  variant="agriculture" 
                  size="lg" 
                  className="w-full"
                  disabled={!crop || !stage}
                >
                  {t('fertilizer.submit')}
                </Button>
              </form>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {showResults ? (
                <>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {t('fertilizer.results')}
                  </h2>
                  <div className="space-y-4">
                    {results.map((fertilizer, index) => (
                      <div
                        key={index}
                        className="result-card rounded-xl p-6 animate-grow-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{fertilizer.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground mb-3">
                              {language === 'en' ? fertilizer.name : fertilizer.nameTamil}
                            </h3>
                            
                            {/* Quantity */}
                            <div className="p-3 bg-primary/10 rounded-lg mb-3">
                              <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                                <Package className="h-4 w-4 text-primary" />
                                {t('fertilizer.quantity')}
                              </p>
                              <p className="text-base font-bold text-primary">
                                {language === 'en' ? fertilizer.quantity : fertilizer.quantityTamil}
                              </p>
                            </div>

                            {/* Instructions */}
                            <div className="p-3 bg-muted/50 rounded-lg mb-3">
                              <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                {t('fertilizer.instructions')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' ? fertilizer.instructions : fertilizer.instructionsTamil}
                              </p>
                            </div>

                            {/* Timing */}
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                {t('fertilizer.timing')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' ? fertilizer.timing : fertilizer.timingTamil}
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
                  <Droplets className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? 'Select crop and growth stage to get fertilizer recommendations' 
                      : 'உர பரிந்துரைகளைப் பெற பயிர் மற்றும் வளர்ச்சி நிலையைத் தேர்ந்தெடுக்கவும்'}
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
