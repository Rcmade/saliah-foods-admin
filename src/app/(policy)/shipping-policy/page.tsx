const ShippingPolicy = () => {
  return (
    <>
      <div className="text-[#656565] py-12 bg-primary-100 px-10 grid gap-4">
        <h2 className="text-4xl font-semibold mb-4">Shipping</h2>
        <p>
          All products are guaranteed to arrive in perfect condition at the
          specified shipping address provided. If you are not completely
          satisfied with the quality of your order upon arrival, please contact
          consumer@saliahdates.com within 48 hours of order receipt, with a
          detailed description and photograph(s), for a replacement or exchange
          claim. Due to the perishable nature of our products, all requests
          submitted without proper supporting documents will not be eligible for
          re-shipment. Order will be delivered in 2-7 working days from order
          date.
        </p>
        <h3 className="font-semibold text-2xl mt-2">
          Saliah dates is not responsible for failed deliveries when:
        </h3>
        <ul className="list-disc ml-4">
          <li>An incorrect or outdated address is provided</li>
          <li>The recipient is not available</li>
          <li>
            An amended/new delivery address is not provided within 24 hours of
            the first delivery attempt
          </li>
        </ul>
        <h3 className="font-semibold text-2xl mt-2">Replacements Refunds</h3>
        <p>
          All replacement requests must be made within 48 hours of order
          receipt, by contacting our customer care team at
          consumer@saliahdates.com Once the request has been received and
          approved, the replacement item(s) will be shipped within 2-5 working
          days. In case a replacement is not possible, a refund will be issued
          through the original payment method. Refunds can take from 10 to 30
          working days to be reflected in your account. For a replacement or
          refund to be issued, at least one of the following conditions must
          apply:
        </p>
        <ul className="ml-4 list-disc">
          <li>The product has been damaged during delivery</li>
          <li>The product is defective or out of date</li>
          <li>The incorrect product was shipped</li>
        </ul>
      </div>
    </>
  );
};
export default ShippingPolicy;
