import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const ONBOARDING_STEPS = [
  { id: 'otp', label: 'OTP Verification' },
  { id: 'profile', label: 'Profile Setup' },
  { id: 'documents', label: 'Document Verification' },
  { id: 'dashboard', label: 'Dashboard Access' },
];

export default function DriverOnboardingProgress() {
  const { driver } = useAppStore();

  const getStepStatus = (stepId) => {
    if (stepId === 'otp') return driver.isOtpVerified ? 'completed' : 'current';
    if (stepId === 'profile') {
      if (driver.profileCompleted) return 'completed';
      if (driver.isOtpVerified) return 'current';
      return 'pending';
    }
    if (stepId === 'documents') {
      if (driver.documentsCompleted) return 'completed';
      if (driver.profileCompleted) return 'current';
      return 'pending';
    }
    if (stepId === 'dashboard') {
      return driver.documentsCompleted ? 'completed' : 'pending';
    }
    return 'pending';
  };

  const currentStepIndex = ONBOARDING_STEPS.findIndex(
    (step) => getStepStatus(step.id) === 'current'
  );

  const completedSteps = ONBOARDING_STEPS.filter(
    (step) => getStepStatus(step.id) === 'completed'
  ).length;
  const progressPercent = (completedSteps / ONBOARDING_STEPS.length) * 100;

  return (
    <div className="w-full px-4 py-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-text">
            {completedSteps}/{ONBOARDING_STEPS.length} Steps Completed
          </span>
          <span className="text-sm font-bold text-primary">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-start justify-between">
        {ONBOARDING_STEPS.map((step, index) => {
          const status = getStepStatus(step.id);
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';
          const isLast = index === ONBOARDING_STEPS.length - 1;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative z-10 flex items-center justify-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-primary border-primary'
                      : isCurrent
                      ? 'bg-primary/20 border-primary'
                      : 'bg-surface border-border'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-background" />
                  ) : (
                    <Circle
                      className={`w-6 h-6 ${isCurrent ? 'text-primary' : 'text-text-secondary'}`}
                    />
                  )}
                </div>
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center ${
                  isCompleted || isCurrent ? 'text-text' : 'text-text-secondary'
                }`}
              >
                {step.label}
              </span>

              {/* Connector */}
              {!isLast && (
                <div className="absolute top-5 w-full h-0.5 bg-border -z-10">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: getStepStatus(ONBOARDING_STEPS[index + 1].id) === 'completed' ? '100%' : '0%',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
