/** @jsxImportSource theme-ui **/
import { cloudFlareGateway } from "../../constants";

import styles from './styles'

type BadgeProps = {
  label: string;
  ipfsHash?: string;
  onDark?: boolean;
};


const Badge = ({ label, onDark, ipfsHash }: BadgeProps) => {
  return (
    <div
      sx={{
        ...styles.badge,
        color: onDark ? "#CAD9F3" : "white",
        cursor: ipfsHash ? "pointer" : "default",
      }}
      onClick={() => {
        if (ipfsHash) {
          window.open(cloudFlareGateway + ipfsHash);
        }
      }}
    >
      {label}
    </div>
  );
};

export default Badge;
