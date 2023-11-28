import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Faq = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle heading={"Frequent Asked Questions"}></SectionTitle>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          How can I adopt a pet from the Pet Palace website?
        </div>
        <div className="collapse-content">
          <p>
            To adopt a pet, you need to create an account and log in. Once
            logged in, browse through the available pets, select the one you are
            interested in, and submit an adoption request to the user who posted
            the pet. Communication for adoption details will then take place
            between you and the pet owner.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          Can I post my pet for adoption on the Pet Palace website?
        </div>
        <div className="collapse-content">
          <p>
            Yes, you can! Simply log in to your account, navigate to the Post a
            Pet for Adoption section, and provide the necessary details about
            your pet. This will make your pet visible to potential adopters who
            can then reach out to you through the platform.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          How can I make a donation to support a pet owner?
        </div>
        <div className="collapse-content">
          <p>
            {" "}
            If you wish to support a pet owner by making a donation, log in to
            your account and find the Donate section. Select the user or pet you
            want to assist, and you can make a secure payment using the
            available options, including Stripe.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          What payment methods are accepted on the Pet Palace website?
        </div>
        <div className="collapse-content">
          <p>
            We accept payments through Stripe, a secure and widely-used online
            payment platform. This ensures a safe and seamless transaction
            experience for both donors and recipients. Feel free to use major
            credit cards and other payment methods supported by Stripe.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          Can I update information about a pet I have posted for adoption?
        </div>
        <div className="collapse-content">
          <p>
            Yes, you can. If there are any changes or additional details about
            your pet that you would like to share, log in to your account and go
            to the Manage Your pets section. From there, you can update the
            information for your pet, ensuring that potential adopters have the
            most accurate and current details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
