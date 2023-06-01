"use client";
import React from "react";
import HorizontalNonLinearStepper from "@/components/UserCvForm/Setpper";
import { steps } from "@/components/UserCvForm/stpes";
import { Button, Typography, Box } from "@mui/material";
import Chat from "@/components/Chat";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSteps } from "@/hooks/useFormSteps";
import FieldsForm from "@/components/UserCvForm/FieldsForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProtectedRoute from "@/hocs/AuthenticatedRoute";
const BuildCv: React.FC = () => {
  const {
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
  } = useSteps({ initialStep: 0, totalSteps: steps.length });

  const stepsTitle = steps.map((step) => step.title);
  const totalSteps = steps.length;

  const fields = steps[activeStep]?.fields;
  return (
    <ProtectedRoute>
      <Box sx={{flexDirection: "column"}}>
      <HorizontalNonLinearStepper
        handleStep={handleStep}
        steps={stepsTitle}
        completed={completed}
        activeStep={activeStep}
      />
      {fields && <FieldsForm fields={fields} />}
      {isLastStep() && <Chat />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        {allStepsCompleted ? (
          <AllStepsCompleted handleReset={handleReset} />
        ) : (
          <ActiveStep
            activeStep={activeStep}
            isLastStep={isLastStep()}
            completed={completed}
            totalSteps={totalSteps}
            handleBack={handleBack}
            handleComplete={handleComplete}
            confirmOpen={confirmOpen}
            setConfirmOpen={setConfirmOpen}
            setCompleted={setCompleted}
            setActiveStep={setActiveStep}
            handleDone={handleDone}
          />
        )}
      </Box>
      </Box>
    </ProtectedRoute>

  );
};
const AllStepsCompleted: React.FC<{ handleReset: () => void }> = ({
  handleReset,
}) => (
  <>
    <Typography sx={{ mt: 2, mb: 1 }}>
      All steps completed - you&apos;re finished
    </Typography>
    <Button onClick={handleReset} variant="contained" color="secondary">
      Reset
    </Button>
  </>
);

const ActiveStep: React.FC<{
  activeStep: number;
  isLastStep: boolean;
  completed: { [k: number]: boolean };
  totalSteps: number;
  handleBack: () => void;
  handleComplete: () => void;
  handleDone: () => void;
  confirmOpen: boolean;
  setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleted: React.Dispatch<React.SetStateAction<{ [k: number]: boolean }>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  activeStep,
  isLastStep,
  totalSteps,
  handleBack,
  handleComplete,
  confirmOpen,
  setConfirmOpen,
  setCompleted,
  setActiveStep,
  handleDone
}) => {
  const { codeBlocks } = useSelector((state: RootState) => state.messages);
  return(<>
    <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          You are about to proceed to the last step. You will not be able to go
          back after this step.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            setConfirmOpen(false);
            setCompleted((prevCompleted) => ({
              ...prevCompleted,
              [activeStep]: true,
            }));
            setActiveStep(steps.length-1);
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        mt: 2,
        width: "100%",
      }}
    >
      {(activeStep !== 0 && activeStep !== totalSteps - 1)&&
      <Button
        onClick={handleBack}
        variant="contained"
        color="primary"
      >
        Back
      </Button>}
      {isLastStep  ? (
        <Button disabled = {!codeBlocks?.length} onClick={handleDone} variant="contained" color="secondary">
          Done
        </Button>
      ) : (
        <>
          <Button onClick={handleComplete} variant="contained" color="primary">
            {activeStep === totalSteps - 1 ? "Next" : "Complete Step"}
          </Button>
        </>
      )}
    </Box>
    </>
);
}

export default BuildCv;
