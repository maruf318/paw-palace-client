import { Link } from "react-router-dom";
import useDonations from "../../hooks/useDonations";

const DonationCampaign = () => {
  const [donation, ,] = useDonations();
  console.log(donation);

  return (
    <div className="max-w-7xl mx-auto">
      <h2>This is Donation campaign page</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {donation.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                className="w-full h-[300px] object-cover"
                src={item.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title ">{item.donationName}</h2>
              <p className="text-xl">
                Max Amount: $<span className="font-bold">{item.maxAmount}</span>
              </p>
              <p className="text-xl">
                Donated Amount: $
                <span className="font-bold">{item.donatedAmount}</span>
              </p>
              <div className="card-actions justify-end">
                {item.active === true ? (
                  <Link to={`/donationCampaign/${item._id}`}>
                    <button className="btn btn-primary">View Details</button>
                  </Link>
                ) : (
                  <button className="btn btn-disabled">Donation Stopped</button>
                )}
                {item.donatedAmount >= item.maxAmount && (
                  <button className="btn btn-disabled">Limit Reached</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCampaign;
