import React, { useEffect, useState } from "react";
import BookOverview from "../organisms/bookOverview";
import { Book } from "../interfaces/IBook";

const Modal: React.FC<{ book: Book; onClose: () => void; show: boolean }> = ({ book, onClose, show }) => {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";

    const handleOutsidelick = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && !event.target.closest("#BookModal")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsidelick);

    return () => {
      document.removeEventListener("click", handleOutsidelick);

      document.body.style.overflow = "";
    };
  }, [show, onClose]);

  return (
    <>
      {show && (
        <div
          aria-disabled="true"
          data-twe-modal-init
          tabIndex={-1}
          id="BookModal"
          aria-labelledby="BookModal"
          aria-modal="true"
          role="dialog"
          className="flex items-start justify-start fixed inset-0 bg-white border-2 border-black drop-shadow-lg rounded-lg m-12 overflow-y-auto z-[9999]">
          <div data-twe-modal-dialog-ref>
            <div>
              <div>
                <BookOverview books={[book]} />
              </div>

              <div>
                <button type="button" data-twe-modal-dismiss data-twe-ripple-init data-twe-ripple-color="light" className="absolute top-4 right-4 text-black" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
