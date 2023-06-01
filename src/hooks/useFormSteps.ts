import { useState } from "react";
import {useRouter} from 'next/navigation'


interface StepsProps {
  initialStep: number;
  totalSteps: number;
}

export const useSteps = ({ initialStep, totalSteps }: StepsProps) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const completedSteps = Object.keys(completed).length;
  const allStepsCompleted = completedSteps === totalSteps;
  const isLastStep = () => activeStep === totalSteps - 1;
  const router = useRouter()
  const handleNext = () => {
    if (activeStep === totalSteps - 2) {
      setConfirmOpen(true);
    } else if (activeStep < totalSteps - 1) {
      setCompleted((prevCompleted) => ({ ...prevCompleted, [activeStep]: true }));
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep !== totalSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStep = (step: number) => () => {
    if (step === totalSteps - 1 && activeStep !== totalSteps - 1) {
      setConfirmOpen(true);
    } else if (activeStep !== totalSteps - 1) {
      setActiveStep(step);
    }
  };

  const handleComplete = () => {
    setCompleted((prevCompleted) => ({ ...prevCompleted, [activeStep]: true }));
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleDone = () => {
    router.push('/my-ready-cv')
  }

  return {
    activeStep,
    completed,
    confirmOpen,
    allStepsCompleted,
    isLastStep,
    handleStep,
    handleComplete,
    handleReset,
    handleBack,
    setConfirmOpen,
    setActiveStep,
    setCompleted,
    handleDone,
  };
};
