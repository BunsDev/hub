/** @jsxImportSource theme-ui **/
import { Button, Flex } from "theme-ui";
import { useRouter } from "hooks";
import { createApiSteps } from "utils/createWrapper";

import styles from "./styles";

interface NavButtonProps {
  label: string;
  onClick?: () => unknown;
  disabled?: boolean;
}
interface Props {
  backBtn?: NavButtonProps;
  nextBtn?: NavButtonProps;
  continueEnabled?: boolean;
}

const NavButtons = ({ backBtn, nextBtn, continueEnabled }: Props) => {
  const router = useRouter();

  return (
    <Flex sx={styles.navButtons}>
      <Button
        variant="secondaryMedium"
        onClick={(e) => {
          e.preventDefault();
          backBtn?.onClick() ||
            router.push(router.pathname + `?activeTab=${createApiSteps[0]}`);
        }}
      >
        {backBtn?.label || "Back"}
      </Button>
      <Button
        variant="primaryMedium"
        disabled={!continueEnabled}
        sx={{
          mb: [null, "1.25rem"],
        }}
        onClick={(e) => {
          e.preventDefault();
          (nextBtn && "onClick" in nextBtn && nextBtn.onClick()) ||
            router.push(router.pathname + `?activeTab=${createApiSteps[2]}`);
        }}
      >
        {nextBtn?.label || "Next"}
      </Button>
    </Flex>
  );
};

export default NavButtons;
