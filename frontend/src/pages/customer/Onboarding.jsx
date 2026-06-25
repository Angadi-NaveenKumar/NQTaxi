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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-lg space-y-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 animate-in slide-in-from-top duration-700">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground">
            <Car size={32} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">NQTaxi</h1>
        </div>

        {/* Card Content */}
        <Card className="p-8 md:p-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
          <div className={`flex justify-center ${item.color} transform transition-all duration-500 scale-110`}>
            <item.icon size={80} strokeWidth={1.5} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{item.title}</h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              {item.text}
            </p>
          </div>
        </Card>

        {/* Progress & Actions */}
        <div className="space-y-8">
          <div className="flex justify-center gap-2">
            {slides.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dotIndex === index ? 'w-8 bg-primary' : 'w-2 bg-surface-elevated'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Button className="w-full py-4 text-lg" onClick={handleNext}>
              {index === slides.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={20} />
            </Button>
            
            <button 
              onClick={() => { setOnboarded(true); navigate('/login'); }}
              className="text-text-secondary hover:text-text-primary transition-colors font-medium text-center"
            >
              Skip Introduction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
