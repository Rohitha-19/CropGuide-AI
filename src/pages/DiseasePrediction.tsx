import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Bug, Upload, AlertTriangle, CheckCircle2, Shield, Pill, Droplets, X } from 'lucide-react';

interface DiseaseResult {
  name: string;
  nameTamil: string;
  confidence: number;
  cause: string;
  causeTamil: string;
  remedy: string;
  remedyTamil: string;
  prevention: string;
  preventionTamil: string;
  treatment: string;
  treatmentTamil: string;
  isHealthy: boolean;
}

const diseaseDatabase: DiseaseResult[] = [
  {
    name: 'Bacterial Leaf Blight',
    nameTamil: 'பாக்டீரியா இலை கருகல்',
    confidence: 87,
    cause: 'Caused by Xanthomonas oryzae bacteria, spread through infected seeds and water.',
    causeTamil: 'Xanthomonas oryzae பாக்டீரியாவால் ஏற்படுகிறது, பாதிக்கப்பட்ட விதைகள் மற்றும் நீர் மூலம் பரவுகிறது.',
    remedy: 'Apply copper-based bactericides. Remove and destroy infected plant parts.',
    remedyTamil: 'செப்பு அடிப்படையிலான பாக்டீரியநாசினிகளைப் பயன்படுத்துங்கள். பாதிக்கப்பட்ட தாவர பாகங்களை அகற்றி அழிக்கவும்.',
    prevention: 'Use certified disease-free seeds. Avoid excess nitrogen fertilization.',
    preventionTamil: 'சான்றளிக்கப்பட்ட நோயில்லா விதைகளைப் பயன்படுத்துங்கள். அதிக நைட்ரஜன் உரமிடலைத் தவிர்க்கவும்.',
    treatment: 'Streptocycline 0.01% + Copper oxychloride 0.25%',
    treatmentTamil: 'ஸ்ட்ரெப்டோசைக்ளின் 0.01% + காப்பர் ஆக்சிகுளோரைடு 0.25%',
    isHealthy: false,
  },
  {
    name: 'Powdery Mildew',
    nameTamil: 'வெள்ளை பூஞ்சான்',
    confidence: 92,
    cause: 'Fungal disease caused by Erysiphe species, favored by dry conditions with high humidity.',
    causeTamil: 'Erysiphe இனங்களால் ஏற்படும் பூஞ்சை நோய், உயர் ஈரப்பதத்துடன் வறண்ட நிலைமைகளால் ஊக்குவிக்கப்படுகிறது.',
    remedy: 'Spray sulfur-based fungicides. Improve air circulation around plants.',
    remedyTamil: 'கந்தக அடிப்படையிலான பூஞ்சைக்கொல்லிகளைத் தெளிக்கவும். செடிகளைச் சுற்றி காற்று சுழற்சியை மேம்படுத்துங்கள்.',
    prevention: 'Plant resistant varieties. Avoid overcrowding of plants.',
    preventionTamil: 'எதிர்ப்பு சக்தி கொண்ட ரகங்களை நடுங்கள். செடிகளை நெருக்கமாக நடுவதைத் தவிர்க்கவும்.',
    treatment: 'Wettable Sulfur 80% WP @ 3g/L or Carbendazim 50% WP @ 1g/L',
    treatmentTamil: 'வெட்டபிள் சல்பர் 80% WP @ 3g/L அல்லது கார்பெண்டாசிம் 50% WP @ 1g/L',
    isHealthy: false,
  },
  {
    name: 'Late Blight',
    nameTamil: 'தாமத கருகல்',
    confidence: 85,
    cause: 'Caused by Phytophthora infestans, spreads rapidly in cool, wet conditions.',
    causeTamil: 'Phytophthora infestans ஆல் ஏற்படுகிறது, குளிர்ந்த, ஈரமான நிலைகளில் வேகமாக பரவுகிறது.',
    remedy: 'Apply Mancozeb or Metalaxyl-based fungicides immediately upon detection.',
    remedyTamil: 'கண்டறிந்தவுடன் மான்கோசெப் அல்லது மெட்டாலாக்சில் அடிப்படையிலான பூஞ்சைக்கொல்லிகளைப் பயன்படுத்துங்கள்.',
    prevention: 'Use disease-resistant varieties. Ensure proper drainage and avoid waterlogging.',
    preventionTamil: 'நோய் எதிர்ப்பு ரகங்களைப் பயன்படுத்துங்கள். சரியான வடிகால் உறுதி செய்து நீர் தேங்குவதைத் தவிர்க்கவும்.',
    treatment: 'Mancozeb 75% WP @ 2.5g/L or Metalaxyl + Mancozeb @ 2.5g/L',
    treatmentTamil: 'மான்கோசெப் 75% WP @ 2.5g/L அல்லது மெட்டாலாக்சில் + மான்கோசெப் @ 2.5g/L',
    isHealthy: false,
  },
];

export default function DiseasePrediction() {
  const { language, t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate ML analysis
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * diseaseDatabase.length);
      // 30% chance of healthy leaf
      if (Math.random() > 0.7) {
        setResult({
          name: 'Healthy Leaf',
          nameTamil: 'ஆரோக்கியமான இலை',
          confidence: 95,
          cause: 'No disease detected.',
          causeTamil: 'எந்த நோயும் கண்டறியப்படவில்லை.',
          remedy: 'Continue regular care and monitoring.',
          remedyTamil: 'வழக்கமான பராமரிப்பு மற்றும் கண்காணிப்பைத் தொடருங்கள்.',
          prevention: 'Maintain good agricultural practices.',
          preventionTamil: 'நல்ல விவசாய நடைமுறைகளை பராமரிக்கவும்.',
          treatment: 'No treatment needed.',
          treatmentTamil: 'சிகிச்சை தேவையில்லை.',
          isHealthy: true,
        });
      } else {
        setResult(diseaseDatabase[randomIndex]);
      }
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearImage = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ta' ? 'tamil-text' : ''}`}>
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-warning-orange to-harvest-gold mb-6">
              <Bug className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('disease.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t('disease.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div
                className={`upload-zone rounded-2xl p-8 text-center cursor-pointer min-h-[300px] flex flex-col items-center justify-center ${isDragging ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                {image ? (
                  <div className="relative w-full">
                    <img 
                      src={image} 
                      alt="Uploaded leaf" 
                      className="max-h-64 mx-auto rounded-xl object-contain"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearImage();
                      }}
                      className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-16 w-16 text-primary/50 mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      {t('disease.upload')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('disease.dragDrop')}
                    </p>
                  </>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              {image && (
                <Button
                  onClick={analyzeImage}
                  variant="agriculture"
                  size="lg"
                  className="w-full"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      {language === 'en' ? 'Analyzing...' : 'பகுப்பாய்வு செய்கிறது...'}
                    </>
                  ) : (
                    t('disease.analyze')
                  )}
                </Button>
              )}
            </div>

            {/* Results Section */}
            <div>
              {result ? (
                <div className="space-y-4 animate-grow-in">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    {result.isHealthy ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-warning-orange" />
                    )}
                    {t('disease.results')}
                  </h2>

                  <div className={`result-card rounded-xl p-6 ${result.isHealthy ? 'border-2 border-accent' : 'border-2 border-warning-orange'}`}>
                    {/* Disease Name */}
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">{t('disease.diseaseName')}</p>
                      <p className={`text-2xl font-bold ${result.isHealthy ? 'text-accent' : 'text-warning-orange'}`}>
                        {language === 'en' ? result.name : result.nameTamil}
                      </p>
                    </div>

                    {/* Confidence */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{t('disease.confidence')}</span>
                        <span className="font-bold text-foreground">{result.confidence}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${result.isHealthy ? 'bg-accent' : 'confidence-meter'}`}
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 mt-6">
                      {/* Cause */}
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-warning-orange" />
                          {t('disease.cause')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? result.cause : result.causeTamil}
                        </p>
                      </div>

                      {/* Remedy */}
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                          <Pill className="h-4 w-4 text-primary" />
                          {t('disease.remedy')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? result.remedy : result.remedyTamil}
                        </p>
                      </div>

                      {/* Prevention */}
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                          <Shield className="h-4 w-4 text-accent" />
                          {t('disease.prevention')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? result.prevention : result.preventionTamil}
                        </p>
                      </div>

                      {/* Treatment */}
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                          <Droplets className="h-4 w-4 text-primary" />
                          {t('disease.fertilizer')}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {language === 'en' ? result.treatment : result.treatmentTamil}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed border-border rounded-2xl">
                  <Bug className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? 'Upload a leaf image to detect diseases' 
                      : 'நோய்களைக் கண்டறிய இலை படத்தை பதிவேற்றவும்'}
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
