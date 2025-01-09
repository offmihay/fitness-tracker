import React, { useState } from "react";
import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import CustomModal from "../CustomModal";

type Props = {
  name: string;
  renderTrigger: (onPress: () => void) => React.ReactNode;
  modalContent: React.ReactNode;
  bottomSheetProps?: Omit<BottomSheetModalProps, "children">;
};

const ModalTrigger = (props: Props) => {
  const { name, renderTrigger, modalContent, bottomSheetProps } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <CustomModal
        name={name}
        isOpen={isOpen}
        bottomSheetProps={bottomSheetProps}
        onDismiss={handleCloseModal}
      >
        {modalContent}
      </CustomModal>
      {renderTrigger(handleOpenModal)}
    </>
  );
};

export default ModalTrigger;
