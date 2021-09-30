/** @jsxImportSource theme-ui **/
import styles from "./styles";

import { Flex } from "theme-ui";

interface Step {
  value: string;
  label: string;
  onClick: () => any; // eslint-disable-line
}
interface Steps {
  stepsData?: Step[];
  activeStep?: string;
}

export const defaultSteps: Step[] = [
  { value: "start", label: "Intro", onClick: () => {} }, // eslint-disable-line
  { value: "upload", label: "Upload", onClick: () => {} }, // eslint-disable-line
  { value: "publish", label: "Publish", onClick: () => {} }, // eslint-disable-line
];

const Steps = ({ stepsData = defaultSteps, activeStep = "" }: Steps) => {
  return (
    <Flex sx={styles.steps}>
      {stepsData.map((step, index) => {
        const isHighlighted =
          index <=
          stepsData.indexOf(
            stepsData.find((step) => step.value === activeStep)
          );
        return (
          <span
            key={step.label}
            sx={{
              cursor: isHighlighted ? "pointer" : "default",
            }}
            className={isHighlighted ? "active" : ""}
            onClick={isHighlighted && stepsData[index].onClick}
          >
            {index + 1}. {step.label}
          </span>
        );
      })}
    </Flex>
  );
};

export default Steps;
