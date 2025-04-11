import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AddPaymentForm from "../forms/AddPaymentForm";
import Modal from "./Modal";
import { addBankAccount, fetchPayouts } from "../api";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Card = ({ children, className }) => (
  <div
    className={`w-full flex flex-col justify-between max-w-sm bg-[#f7b735] shadow-lg rounded-2xl p-6 h-44 md:h-52 ${className}`}
  >
    {children}
  </div>
);

const Payment = ({ p_user_id, fetchUserDetails, user }) => {
  const { bank_name, bank_type, bank_account_number } = user;
  const [card, setCard] = useState({
    last4: bank_account_number ? bank_account_number.slice(-4) : "----",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payouts, setPayouts] = useState([]);

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

  const getPayouts = async () => {
    try {
      const res = await fetchPayouts(p_user_id);
      if (res.data?.["Payouts: "]) {
        setPayouts(res.data["Payouts: "]);
      }
    } catch (error) {
      showErrorToast("Failed to fetch payouts");
    }
  };

  useEffect(() => {
    getPayouts();
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-10 p-4">
        {bank_account_number ? (
          <Card>
            <div className="flex justify-between items-center">
              <div className="flex flex-col font-bold">
                <p className="text-white">**** **** ****</p>
                <p className="text-white text-lg md:text-2xl">{card.last4}</p>
              </div>
            </div>
            <div className="flex justify-between text-white">
              <div className="flex flex-col text-xs md:text-sm">
                <p>Bank</p>
                <p className="font-bold">{bank_name}</p>
              </div>
              <FontAwesomeIcon className="size-8 md:size-10" icon={faBank} />
            </div>
            <div className="flex justify-between text-white">
              <div className="flex flex-col text-xs md:text-sm">
                <p>Account Type</p>
                <p className="font-bold">{bank_type}</p>
              </div>
            </div>
          </Card>
        ) : (
          <button
            className="w-full flex flex-col gap-5 items-center justify-center max-w-sm border-2 border-dashed border-[#f7b735] shadow-lg rounded-2xl p-4 h-44 md:h-52"
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

      {payouts.length > 0 ? (
        <div className="max-w-3xl mx-auto px-4 mt-10">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
            Payout History
          </h2>
          <div className="space-y-4">
            {payouts.map((payout) => (
              <div
                key={payout.PAYOUT_ID}
                className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(payout.PAYOUT_DATE).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Amount:</span>{" "}
                    <span className="text-green-600 font-semibold">
                      GH₵ {payout.AMOUNT.toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 flex flex-col md:flex-row">
                    <span className="font-semibold">Balance:</span>{" "}
                    <span className="text-brand font-semibold">
                      GH₵ {payout.BALANCE.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span className=" text-xs md:text-sm">No payouts available</span>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddPaymentForm handleSubmit={handleSubmit} isLoading={isLoading} />
      </Modal>
    </>
  );
};

export default Payment;
