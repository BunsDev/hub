/** @jsxImportSource theme-ui **/
import { Modal } from "components";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "components/common/styles";
import { ModalProps } from "components/common/Modal";

type ModalContextValue = {
  _initModal: (screen: ModalScreen, props?: Partial<ModalProps>) => void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

interface ModalProvider {
  children: React.ReactNode;
}
export const ModalContext = createContext<ModalContextValue>(
  {} as ModalContextValue
);

type ModalScreen = "connect" | "disconnect" | "signin" | "success" | "switch" | "changeNetwork";

export const ModalProvider = ({ children }: ModalProvider) => {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(null);

  const _initModal = useCallback(
    (screen: ModalScreen, props?: Partial<ModalProps>) => {
      setModal(<Modal screen={screen} {...props} />);
    },
    []
  );

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    }
    if (!visible) {
      document.body.style.overflow = "unset";
      setModal(null);
    }
  }, [visible]);

  return (
    <ModalContext.Provider value={{ _initModal, visible, setVisible }}>
      {children}
      <div
        className={`overlay ${visible ? "active" : ""}`}
        sx={styles.modalOverlay}
      >
        {visible && modal}
      </div>
    </ModalContext.Provider>
  );
};

const useModal = (screen: ModalScreen, props?: Partial<ModalProps>) => {
  const modalContext = useContext(ModalContext);
  const { visible, setVisible, _initModal } = modalContext;

  const openModal = useCallback(
    (visible: boolean = true) => {
      _initModal(screen, props);
      setVisible(visible);
    },
    [screen, props]
  );

  return { openModal, visible };
};

export const useModalContext = () => useContext(ModalContext);

export default useModal;
