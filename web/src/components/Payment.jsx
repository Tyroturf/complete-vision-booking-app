import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";
import AddPaymentForm from "../forms/AddPaymentForm";
import Modal from "./Modal";
import { addBankAccount } from "../api";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Card = ({ children, className }) => (
  <div
    className={`w-full flex flex-col justify-between max-w-sm bg-[#f7b735] shadow-lg rounded-2xl p-6 h-52 ${className}`}
  >
    {children}
  </div>
);

const getCardBrandIcon = (brand) => {
  switch (brand?.toLowerCase()) {
    case "visa":
      return faCcVisa;
    case "mastercard":
      return faCcMastercard;
    case "amex":
      return faCcAmex;
    default:
      return faCcVisa;
  }
};

const Payment = ({ p_user_id, fetchUserDetails, user }) => {
  const { bank_name, bank_type, bank_account_number } = user;
  const [card, setCard] = useState({
    last4: bank_account_number ? bank_account_number.slice(-4) : "----",
    brand: bank_name || "Visa",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const { p_bank_account_num, p_bank_type, p_bank_name } = values;
      setIsLoading(true);

      const res = await addBankAccount({
        p_bank_account_num,
        p_bank_type,
        p_bank_name,
        p_user_id,
      });

      if (
        res.data.status === "success" ||
        res.data.success === "User credentials updated successfully."
      ) {
        showSuccessToast("Bank account added successfully");
        fetchUserDetails();
      } else {
        showErrorToast("Bank account could not be added. Please try again");
      }
    } catch (error) {
      showErrorToast(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-10 p-4">
        {bank_account_number ? (
          <Card>
            <div className="flex justify-between items-center">
              <div className="flex flex-col font-bold">
                <p className="text-white">**** **** ****</p>
                <p className="text-white text-2xl">{card.last4}</p>
              </div>
              {/* <FontAwesomeIcon
                className="text-white size-5 hover:cursor-pointer hover:transition hover:scale-105"
                icon={faTrash}
                onClick={() =>
                  showErrorToast(
                    "Cannot delete or edit bank account. Contact Customer Service"
                  )
                }
              /> */}
            </div>
            <div className="flex justify-between text-white">
              <div className="flex flex-col">
                <p className="text-xs">Bank</p>
                <p className="font-bold">{bank_name}</p>
              </div>
              <FontAwesomeIcon
                className="size-10"
                icon={getCardBrandIcon(card.brand)}
              />
            </div>
            <div className="flex justify-between text-white">
              <div className="flex flex-col">
                <p className="text-xs">Account Type</p>
                <p className="font-bold">{bank_type}</p>
              </div>
            </div>
          </Card>
        ) : (
          <button
            className="w-full flex flex-col gap-5 items-center justify-center max-w-sm border-2 border-dashed border-[#f7b735] shadow-lg rounded-2xl p-4 h-52"
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon
              className="size-10 text-[#f7b735]"
              icon={faPlusCircle}
            />
            <p className="text-brand text-xs">Add Bank Account</p>
          </button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddPaymentForm handleSubmit={handleSubmit} isLoading={isLoading} />
      </Modal>
    </>
  );
};

export default Payment;
