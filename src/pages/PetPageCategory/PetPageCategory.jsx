import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const PetPageCategory = () => {
  const loadedData = useLoaderData();
  console.log(loadedData);
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle heading={"Pet Category"}></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {loadedData?.map((item) => (
          <div
            key={item?._id}
            className="card card-compact bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-full h-[300px] object-cover"
                src={item?.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="">
                {" "}
                Location:
                <span className="font-bold capitalize">{item.location}</span>
              </p>
              <p>
                Availability :
                {item.adopted == false ? "Not Adopted" : "Adopted"}
              </p>
              <div className="card-actions justify-end">
                {item?.adopted == false ? (
                  <Link to={`/pet/${item._id}`}>
                    <button className="btn btn-primary">Details</button>
                  </Link>
                ) : (
                  <button className="btn btn-disabled">Already Adopted</button>
                )}

                {/* <button className="btn btn-primary">Details</button>
       <button className="btn btn-primary">Details</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetPageCategory;
