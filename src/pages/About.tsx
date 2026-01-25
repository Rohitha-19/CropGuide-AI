import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Info, FileInput, Cpu, Gift, Phone, Mail, MapPin } from 'lucide-react';

export default function About() {
  const { language, t } = useLanguage();

  const steps = [
    {
      icon: FileInput,
      title: t('about.step1'),
      description: t('about.step1Desc'),
      number: '01',
    },
    {
      icon: Cpu,
      title: t('about.step2'),
      description: t('about.step2Desc'),
      number: '02',
    },
    {
      icon: Gift,
      title: t('about.step3'),
      description: t('about.step3Desc'),
      number: '03',
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ta' ? 'tamil-text' : ''}`}>
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
              <Info className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('about.title')}
            </h1>
          </div>

          {/* Mission Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="card-agriculture rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('about.mission')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t('about.missionText')}
              </p>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              {t('about.howItWorks')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative text-center p-6"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-6xl font-bold text-primary/10">
                    {step.number}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Connector Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary/30">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Impact Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="hero-gradient rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {language === 'en' ? 'Our Impact' : 'எங்கள் தாக்கம்'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-4xl font-bold mb-1">1000+</p>
                  <p className="text-sm opacity-90">
                    {language === 'en' ? 'Farmers Helped' : 'உதவி பெற்ற விவசாயிகள்'}
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-1">50+</p>
                  <p className="text-sm opacity-90">
                    {language === 'en' ? 'Crop Types' : 'பயிர் வகைகள்'}
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-1">95%</p>
                  <p className="text-sm opacity-90">
                    {language === 'en' ? 'Accuracy Rate' : 'துல்லியம்'}
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-1">24/7</p>
                  <p className="text-sm opacity-90">
                    {language === 'en' ? 'Available' : 'கிடைக்கும்'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="max-w-4xl mx-auto">
            <div className="card-agriculture rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
                {t('about.contact')}
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                {t('about.contactText')}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Phone' : 'தொலைபேசி'}
                    </p>
                    <p className="font-medium text-foreground">1800-123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Email' : 'மின்னஞ்சல்'}
                    </p>
                    <p className="font-medium text-foreground">help@cropai.in</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Location' : 'இடம்'}
                    </p>
                    <p className="font-medium text-foreground">Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
