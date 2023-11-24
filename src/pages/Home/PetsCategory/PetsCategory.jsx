import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const PetsCategory = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("category.json")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <SectionTitle heading={"Pets Category"}></SectionTitle>
      <div className="grid grid-cols-1 p-6 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category.map((cat) => (
          <div
            key={cat.id}
            className="card card-compact  bg-base-100 shadow-xl"
          >
            <Link to={`/category/${cat.category}`}>
              <figure>
                <img
                  className="h-[300px] w-full rounded object-cover"
                  src={cat.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-2xl capitalize text-accent font-extrabold text-center">
                  {cat.category}
                </h2>

                {/* <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetsCategory;
