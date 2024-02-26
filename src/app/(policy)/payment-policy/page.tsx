const PaymentPolicy = () => {
  return (
    <>
      <div className="text-[#656565] py-12 bg-primary-100 px-10 grid gap-4 bg-[url('/net.png')]">
        <h2 className="text-4xl font-semibold text-center mb-4">Payment</h2>
        <p>
          Payment for Goods and related delivery charges must always be made in
          advance and you will be prompted to pay during the order process.
        </p>
        <p>
          We currently accept the following tender types for Orders placed on
          our Website: VISA, MASTERCARD and PAYPAL and UPI Payments By entering
          payment details onto our Website, you warrant that you are duly
          authorised to pay using those details. We reserve the right to decline
          orders without liability to you where we believe payments are not
          authorised, the payment method is not valid or where we do not think
          you are authorised to use the relevant tender type.
        </p>
      </div>
    </>
  );
};
export default PaymentPolicy;
