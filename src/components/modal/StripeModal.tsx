import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";
import type { StripeElementChangeEvent } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Modal from ".";
import { usePayment } from "@/hooks/useSubscription";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

interface Props {
    open: any;
    setOpen?: Function;
    onClose: Function;
    onConfirm: Function;
}

const StripeModal = ({ open = false, setOpen = () => { }, onClose = () => { }, onConfirm }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardNumberError, setCardNumberError] = useState("");
    const [csvError, setCsvError] = useState("");
    const [expiryError, setExpiryError] = useState("");
    const [isCardComplete, setIsCardComplete] = useState(false);
    const [isExpiryComplete, setIsExpiryComplete] = useState(false);
    const [isCvcComplete, setIsCvcComplete] = useState(false);
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const { mutateAsync: createPyament } = usePayment();
    const navigate = useNavigate()

    const [isSubmitting, seIsSubmitting] = useState(false)
    const stripeInputStyle = {
        base: {
            fontSize: "16px",
            color: "#808080",
            "::placeholder": {
                color: "#808080",
            },
        },
        invalid: {
            color: "#EF4444",
        },
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        seIsSubmitting(true)
        if (name.length < 3) {
            toast.error("Please fill card holder field")
            return false
        }
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error("Payment couldn't be initiated, Try Again!");
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
            toast.error("Card details not found.");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            seIsSubmitting(false)
            toast.error(error.message || "Payment failed.");
        } else {
            if (open?.id) {
                const PAYLOAD = {
                    payment_method_id: paymentMethod?.id,
                    card_holder_name: name,
                    plan_id: open?.id
                };
                createPyament(PAYLOAD, {
                    onSuccess: () => {
                        toast.success("Payment successful");
                        seIsSubmitting(false)
                        onConfirm();
                        setName("")
                    },
                    onError: (err) => {
                        navigate("/dashboard")
                        seIsSubmitting(false)
                        toast.error("Something went wrong. Please try again later.")
                    }
                })
            }
        }
    };

    const handleCardNumberChange = (event: StripeElementChangeEvent) => {
        setCardNumberError(event.error ? event.error.message ?? "" : "");
        setIsCardComplete(event.complete);
    };

    const handleExpiryChange = (event: StripeElementChangeEvent) => {
        setExpiryError(event.error ? event.error.message ?? "" : "");
        setIsExpiryComplete(event.complete);
    };

    const handleCvcChange = (event: StripeElementChangeEvent) => {
        setCsvError(event.error ? event.error.message ?? "" : "");
        setIsCvcComplete(event.complete);
    };

    const resetAll = () => {
        setError(false)
        setCardNumberError('')
        setCsvError('')
        setExpiryError('')
        setIsCardComplete(false)
        setIsExpiryComplete(false)
        setIsCvcComplete(false)
        setName("")
        setOpen(false);
        onClose()
    }

    const cardNumberOptions = useMemo(
        () => ({
            style: stripeInputStyle,
            showIcon: true,
            disableLink: true,
        }),
        [stripeInputStyle]
    );

    return (
        <Modal isOpen={Boolean(open)} onClose={() => resetAll()}>
            <form onSubmit={handleSubmit} className="stripe-modal">
                <div className="text-[#1D2530] font-medium text-xl mb-4 dark:text-white">Payment Method</div>
                <label className="block text-sm font-medium text-[#1D2530] mb-1" htmlFor="name">Name On Card</label>
                <div className="rounded-lg border border-gray-180 px-3 flex items-center gap-3 h-11">
                    <input
                        className="!bg-transparent w-full text-[#808080] placeholder:text-[#808080] outline-none"
                        required
                        id="name"
                        placeholder="Card holder name"
                        value={name}
                        onChange={(e) => {
                            const value = e.target.value;
                            const onlyLetters = value.replace(/[^a-zA-Z\s]/g, '');
                            setName(onlyLetters);
                            setError(onlyLetters.length < 3);
                        }}
                    />

                </div>
                {error ? <p className="text-red-500 text-sm !mt-0">Card holder name must be at least 3 characters only alphabets allowed</p> : null}
                {/* Card Number */}
                <div className="py-4">
                    <label className="block text-sm font-medium text-[#1D2530] mb-1" htmlFor="name">Name On Card</label>
                    <div className="rounded-lg border border-gray-180 px-3 flex items-center gap-3 h-11">
                        <CardNumberElement
                            onChange={handleCardNumberChange}
                            options={cardNumberOptions}
                            id="cardNumber"
                            className="w-full"


                        />
                    </div>
                    {cardNumberError && <div className="text-red-500 text-xs">{cardNumberError}</div>}
                </div>

                <div className=" grid md:grid-cols-2 md:gap-8 gap-4">
                    <div >
                        <label className="block text-sm font-medium text-[#1D2530] mb-1" htmlFor="name">Expiry</label>
                        <div className="rounded-lg border border-gray-180 px-3 flex items-center gap-3 h-11">
                            {/* <span><Icon name="calender" /></span> */}
                            <CardExpiryElement
                                onChange={handleExpiryChange}
                                options={{ style: stripeInputStyle, placeholder: "MM / YY" }}
                                id="cardExpiry"
                                className="w-full"
                            />
                        </div>
                        {expiryError && <div className="text-red-500 text-xs">{expiryError}</div>}
                    </div>

                    {/* CVC */}
                    <div>
                        <label className="block text-sm font-medium text-[#1D2530] mb-1" htmlFor="name">CVV</label>
                        <div className="rounded-lg border border-gray-180 px-3 flex items-center gap-3 h-11">
                            <CardCvcElement
                                onChange={handleCvcChange}
                                options={{ style: stripeInputStyle, placeholder: "CVV" }}
                                id="cardCvc"
                                className="w-full"

                            />
                        </div>
                        {csvError && <div className="text-red-500 text-xs">{csvError}</div>}
                    </div>
                </div>

                <div className="flex items-center justify-end mt-6 gap-3">
                    <Button onClick={() => { onClose(), resetAll() }} variant="outline" className="h-10 border-[#2E313926]">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="h-10"
                        disabled={
                            !stripe ||
                            !elements ||
                            isSubmitting ||
                            !isCardComplete ||
                            !isExpiryComplete ||
                            !isCvcComplete ||
                            !(name.toString().length > 2)
                        }
                        loading={isSubmitting}
                    >Make a Payment</Button>
                </div>
            </form>
        </Modal>
    );
};

export default StripeModal;

