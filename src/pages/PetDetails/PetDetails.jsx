import { useLoaderData } from "react-router-dom";

const PetDetails = () => {
  const pet = useLoaderData();
  console.log(pet);
  return (
    <div className="max-w-7xl mx-auto">
      <h2>Pet details page</h2>
      <div className=" lg:card-side bg-base-100 shadow-xl my-10">
        <figure className="lg:w-full">
          <img className="lg:h-[70vh]" src={pet.image} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Name: <span>{pet.name}</span>
          </h2>
          <p>
            location: <span>{pet.location}</span>
          </p>
          <p>
            Pet post created: <span>{pet.date}</span>
          </p>
          <p>
            category: <span>{pet.category}</span>
          </p>
          <p>
            Pet owner email: <span>{pet.petOwner}</span>
          </p>
          <p>
            Note from Owner: <span>{pet.note}</span>
          </p>
          <p>
            Description: <span>{pet.description}</span>
          </p>
          <div className="card-actions justify-center  m-4">
            <button className="btn btn-primary">Adopt Pet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
