import React, { MouseEventHandler } from "react";
import Link from "next/link";
import { Button, Image, Flex } from "@theme-ui/components";
import { Spinner } from "components";
import { domain } from "src/constants";
import styles from "../styles";

export function ErrorDuplicateApi({ uri }: { uri: string }) {
  return (
    <>
      Package already published. Please visit{" "}
      <Link href={`${domain}/info?uri=${uri}`}>
        <a>package details page</a>
      </Link>
    </>
  );
}

type InputState = "none" | "success" | "loading" | "error";

export const getInputSuffix = ({
  applyButtonHandler,
}: {
  applyButtonHandler: MouseEventHandler<HTMLButtonElement>;
}): { [key in InputState]: React.ReactNode } => ({
  none: (
    <Button
      variant="suffixSmall"
      sx={styles.suffixButton}
      onClick={applyButtonHandler}
    >
      Apply
    </Button>
  ),
  success: (
    <Flex sx={{ width: "65px", justifyContent: "center" }}>
      <Image src="/images/success.svg" alt="success" sx={{}} />
    </Flex>
  ),
  loading: (
    <Flex sx={{ width: "65px", height: "100%", justifyContent: "center" }}>
      <Spinner />
    </Flex>
  ),
  error: (
    <Flex sx={styles.successIcon}>
      <Image src="/images/fail.svg" alt="error" />
    </Flex>
  ),
});
