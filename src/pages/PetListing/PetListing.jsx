import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data: pets = [] } = useQuery({
    queryKey: ["allPets", search, category],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/allPets?search=${search}&category=${category}`
      );
      return res.data;
    },
  });
  console.log(pets);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    const categoryField = e.target.category.value;
    if (categoryField == "Pick one") {
      console.log(categoryField, "inside");
      setCategory("");
    } else {
      setCategory(categoryField);
    }
    console.log(searchText, categoryField);
    setSearch(searchText);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-2xl">
        We have {pets.length} pets waiting for a new home
      </h2>
      <form
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row justify-center items-center"
      >
        <div className="">
          <label
            // for="image"
            className=" mb-2 text-sm font-medium text-secondary dark:text-white flex justify-center"
          >
            Search
          </label>
          <input
            type="text"
            name="search"
            id=""
            placeholder="Search Pet"
            className="p-2 border-4 border-secondary rounded-lg mr-2 w-full px-12"
          />
        </div>
        <div className="form-control max-w-xs w-full">
          <label className="label flex justify-center">
            <span className="label-text">Choose a category</span>
          </label>
          <select className="select select-bordered" name="category">
            <option disabled selected>
              Pick one
            </option>
            <option className="capitalize">dog</option>
            <option className="capitalize">cat</option>
            <option className="capitalize">fish</option>
            <option className="capitalize">bird</option>
          </select>
        </div>
        <input
          className="btn btn-primary text-black flex items-center lg:mt-8 justify-center w-2/3 lg:w-1/3 mt-3"
          type="submit"
          value="Search"
        />
      </form>
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
                <Link to={`/pet/${p._id}`}>
                  <button className="btn btn-primary">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetListing;
