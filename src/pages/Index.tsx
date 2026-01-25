import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Leaf, Bug, Droplets, ChevronRight, Sparkles, MapPin, Users } from 'lucide-react';
import heroImage from '@/assets/hero-farm.jpg';

const Index = () => {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: Leaf,
      title: t('home.cropRecommendation'),
      description: t('home.cropRecommendationDesc'),
      link: '/crop-recommendation',
      color: 'from-primary to-primary/80',
    },
    {
      icon: Bug,
      title: t('home.diseaseDetection'),
      description: t('home.diseaseDetectionDesc'),
      link: '/disease-prediction',
      color: 'from-warning-orange to-harvest-gold',
    },
    {
      icon: Droplets,
      title: t('home.fertilizerGuide'),
      description: t('home.fertilizerGuideDesc'),
      link: '/fertilizer',
      color: 'from-sky-blue to-accent',
    },
  ];

  const benefits = [
    {
      icon: Sparkles,
      title: t('home.aiPowered'),
      description: t('home.aiPoweredDesc'),
    },
    {
      icon: MapPin,
      title: t('home.localizedAdvice'),
      description: t('home.localizedAdviceDesc'),
    },
    {
      icon: Users,
      title: t('home.easyToUse'),
      description: t('home.easyToUseDesc'),
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ta' ? 'tamil-text' : ''}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient opacity-75" />
        <div className="absolute inset-0 hero-pattern" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto stagger-children">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                {language === 'en' ? 'AI-Powered Agriculture' : 'AI-இயக்கும் விவசாயம்'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              {t('home.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('home.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/crop-recommendation">
                  {t('home.getStarted')}
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/about">
                  {t('home.learnMore')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 fill-background" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.features')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card-agriculture group rounded-2xl p-8 text-center"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  {language === 'en' ? 'Explore' : 'ஆராயுங்கள்'}
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.whyChoose')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {language === 'en' ? 'Ready to Transform Your Farming?' : 'உங்கள் விவசாயத்தை மாற்ற தயாரா?'}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Start using AI-powered recommendations today and increase your crop yield.' 
              : 'இன்றே AI-இயக்கும் பரிந்துரைகளை பயன்படுத்தி உங்கள் பயிர் மகசூலை அதிகரியுங்கள்.'}
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/crop-recommendation">
              {t('home.getStarted')}
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
