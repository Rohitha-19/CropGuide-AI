import { Leaf, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="feature-icon p-2 rounded-lg">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">CropAdvisor AI</span>
          </div>
          
          <p className={`text-sm text-muted-foreground flex items-center gap-1 ${language === 'ta' ? 'tamil-text' : ''}`}>
            {language === 'en' ? 'Made with' : 'உருவாக்கப்பட்டது'}
            <Heart className="h-4 w-4 text-destructive fill-destructive" />
            {language === 'en' ? 'for farmers' : 'விவசாயிகளுக்காக'}
          </p>
          
          <p className="text-sm text-muted-foreground">
            © 2024 CropAdvisor AI
          </p>
        </div>
      </div>
    </footer>
  );
}
