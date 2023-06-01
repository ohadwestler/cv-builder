"use client";
import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "react-responsive";
import { Button } from "@mui/material";

interface Props {
  steps: string[];
  handleStep: (step: number) => () => void;
  activeStep: number;
  completed: { [k: number]: boolean };
}

const HorizontalNonLinearStepper: React.FC<Props> = ({
  steps,
  handleStep,
  activeStep,
  completed,
}) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  if (isSmallScreen) {
    return (
      <Box sx={{ width: "100%" }}>
        <Carousel
          showStatus={false}
          renderIndicator={(onClickHandler, isSelected, index, label) => (
            <li
              style={{
                backgroundColor: completed?.[index]
                  ? "#6495ED"
                  : isSelected
                  ? "#595959"
                  : "#BFBFBF",
                width: "10px",
                height: "10px",
                display: "inline-block",
                margin: "0 8px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={label}
              aria-label={`${label} ${index + 1}`}
            />
          )}
          className="myCarousel"
          showArrows={true}
          selectedItem={activeStep}
          onChange={handleStep}
          showThumbs={false}
          autoPlay={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <Button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: "absolute",
                  left: 15,
                  top: "calc(50% - 15px)",
                  backgroundColor: "transparent",
                  color: "#595959",
                  zIndex: 1,
                }}
              >
                {"<"}
              </Button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <Button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: "absolute",
                  right: 15,
                  top: "calc(50% - 15px)",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#595959",
                  zIndex: 1,
                }}
              >
                {">"}
              </Button>
            )
          }
        >
          {steps.map((label, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                backgroundColor: "transparent",
              }}
            >
              <StepButton
                style={{
                  color: completed[index] ? "blue" : "lightgrey",
                  backgroundColor: "transparent",
                }}
                onClick={handleStep(index)}
              >
                {label}
              </StepButton>
            </div>
          ))}
        </Carousel>
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                color={completed[index] ? "primary" : "inherit"}
                onClick={handleStep(index)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }
};

export default HorizontalNonLinearStepper;
