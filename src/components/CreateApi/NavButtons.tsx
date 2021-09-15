/** @jsxImportSource theme-ui **/

import { createApiSteps } from "../../utils/createWrapper";

import { useRouter } from "next/router";
import { Button, Flex } from "theme-ui";

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
    <Flex
      sx={{
        justifyContent: "space-between",
        mt: "2.5rem",
        flexWrap: "wrap",
        button: {
          textAlign: "center",
          width: [null, "100%"],
          py: [null, "20px"],
          borderRadius: [null, "100px"],
        },
        flexDirection: [null, "column-reverse"],
      }}
    >
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
          nextBtn?.onClick() ||
            router.push(router.pathname + `?activeTab=${createApiSteps[2]}`);
        }}
      >
        {nextBtn?.label || "Next"}
      </Button>
    </Flex>
  );
};

export default NavButtons;
