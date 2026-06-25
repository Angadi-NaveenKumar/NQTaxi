import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Shield, Wallet, Car, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Button, Card } from '../../components/ui';

const slides = [
  {
    icon: Navigation,
    title: 'Instant Booking',
    text: 'Book cabs in seconds with intelligent pickup suggestions and transparent fare estimates.',
    color: 'text-primary'
  },
  {
    icon: Shield,
    title: 'Trusted Drivers',
    text: 'Every driver is verified with ratings, profile details, and live location tracking.',
    color: 'text-success'
  },
  {
    icon: Wallet,
    title: 'Smart Wallet',
    text: 'Save cards, use rewards, and pay securely with one tap across every ride.',
    color: 'text-info'
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const setOnboarded = useAppStore((s) => s.setOnboarded);
  const item = slides[index];

  const handleNext = () => {
    if (index < slides.length - 1) return setIndex(index + 1);
    setOnboarded(true);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-6 px-4 md:p-12 overflow-y-auto">
      <div className="w-full max-w-lg space-y-6 md:space-y-10 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 animate-in slide-in-from-top duration-700">
          <div className="p-1.5 bg-primary rounded-lg text-primary-foreground">
            <Car size={24} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">NQTaxi</h1>
        </div>

        {/* Card Content */}
        <Card className="p-6 md:p-10 text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className={`flex justify-center ${item.color} transform transition-all duration-500 scale-110 mx-auto w-16 h-16 md:w-20 md:h-20`}>
            <item.icon className="w-full h-full" strokeWidth={1.5} />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">{item.title}</h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              {item.text}
            </p>
          </div>
        </Card>

        {/* Progress & Actions */}
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {slides.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIndex === index ? 'w-6 bg-primary' : 'w-1.5 bg-surface-elevated'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button className="w-full py-3 md:py-4 text-base md:text-lg" onClick={handleNext}>
              {index === slides.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={18} />
            </Button>
            
            <button 
              onClick={() => { setOnboarded(true); navigate('/login'); }}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium text-center"
            >
              Skip Introduction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
