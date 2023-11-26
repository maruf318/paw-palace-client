import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();

  const { data: pets = [] } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allPets");
      return res.data;
    },
  });
  console.log(pets);

  return (
    <div className="max-w-7xl mx-auto">
      <h2>Pet listing: {pets.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 p-4">
        {pets.map((p) => (
          <div key={p._id} className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                className="w-full h-[300px] object-cover"
                src={p.image}
                alt="pet"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl">
                Pet Name: <span className="font-bold capitalize">{p.name}</span>
              </h2>
              <p className="text-xl">
                My age:{" "}
                <span className="font-bold capitalize"> {p.age} months</span>
              </p>
              <p className="text-xl">
                My Location:
                <span className="font-bold capitalize"> {p.location}</span>
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetListing;
