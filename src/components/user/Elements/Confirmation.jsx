import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Confirmation({
  visible,
  setVisible,
  header,
  message,
  accept,
  reject,
}) {
  const handleAccept = () => {
    setVisible(false);
    accept();
  };
  const handleReject = () => {
    setVisible(false);
    reject();
  };

  return (
    <>
      <Modal show={visible} size="md" onClose={() => setVisible(false)}>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleAccept}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={handleReject}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Confirmation;
