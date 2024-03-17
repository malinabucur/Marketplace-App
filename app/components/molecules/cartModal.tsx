import React, { ReactNode, useEffect } from "react";
import { VolumeInfo } from "../interfaces/IVolumeInfo";
import { SaleInfo } from "../interfaces/ISaleInfo";

const CartModal: React.FC<{
  onClose: () => void;
  children?: ReactNode;
  cart: { id: string; title: string; authors: string | string[]; image: string; amount: string; currencyCode: string; volumeInfo: VolumeInfo; publishedDate: string; saleInfo: SaleInfo }[];
}> = ({ onClose, children, cart }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleOutsidelick = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && !event.target.closest("#CartModal")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsidelick);

    return () => {
      document.removeEventListener("click", handleOutsidelick);

      document.body.style.overflow = "";
    };
  }, [onClose]);

  const totalAmount = cart.reduce((acc, item) => acc + parseFloat(item.amount), 0);

  return (
    <div className="relative z-10" aria-labelledby="CartModal" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center items-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
            <div className="bg-white pl-10 py-5  w-[45rem] overflow-y-scroll">
              <div className="mt-3 text-left h-96">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900">Cart</h3>
                <div className="mt-4">
                  <p className="text-base text-black">{children}</p>
                </div>
              </div>
            </div>
            <hr className="h-px my-2 bg-gray-500 border-0" />
            <div className="flex justify-between text-black text-xl mx-6">
              <div className="font-bold">Total: </div>
              {totalAmount} RON
            </div>
            <div className="px-4">
              <button type="button" className="mt-3 inline-flex w-full justify-end rounded-md p-3 text-sm font-semibold text-black shadow-sm hover:text-red-500">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
