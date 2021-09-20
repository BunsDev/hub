/** @jsxImportSource theme-ui **/
import { Flex } from "theme-ui";

import styles from "./styles";

interface Step {
  value: string;
  label: string;
  onClick: () => any;
}
interface Steps {
  stepsData?: Step[];
  activeStep?: string;
}

export const defaultSteps: Step[] = [
  { value: "start", label: "Intro", onClick: () => {} },
  { value: "upload", label: "Upload", onClick: () => {} },
  { value: "publish", label: "Publish", onClick: () => {} },
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
