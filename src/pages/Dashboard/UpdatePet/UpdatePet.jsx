import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
// import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import moment from "moment/moment";
import Select from "react-select";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdatePet = () => {
  const pet = useLoaderData();
  console.log(pet);
  // const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [selectedOption, setSelectedOption] = useState(null);
  // const currentTimeDate = moment().format("MMMM Do YYYY, h:mm:ss");
  const options = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "fish", label: "Fish" },
    { value: "bird", label: "Bird" },
  ];
  // const fromTime = moment("20231122", "YYYYMMDD").endOf("day").fromNow();
  // const dates = ["2018-09-12", "2018-10-18", "2018-12-30"];
  // const filteredDates = dates.filter((d) => new Date(d) - new Date() > 0);
  // console.log(filteredDates);
  // const events = dates.filter((a) => new Date(a.startDate) - new Date() > 0);
  // console.log(events);
  // const lastModifiedTimestamp = 1700788713834;

  // // Create a new Date object using the timestamp
  // const date = new Date(lastModifiedTimestamp);

  // // Format the date as a string
  // const formattedDate = date.toLocaleString(); // Adjust the format as needed

  // console.log("from lastmodified", formattedDate);
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }

    if (!values.note) {
      errors.note = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    if (!values.location) {
      errors.location = "Required";
    }
    if (!values.age) {
      errors.age = "Required";
    }
    //  else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email = "Invalid email address";
    // }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: pet.name || "",
      age: pet.age || "",
      location: pet.location || "",
      note: pet.note || "",
      description: pet.description || "",
      image: "",
    },
    validate,
    onSubmit: async () => {
      // alert(JSON.stringify(values, null, 2));
      console.log(formik.values);
      const { image } = formik.values;
      // console.log(image);
      // console.log("current day time--->", currentTimeDate);
      // console.log(selectedOption.value);
      // const adopted = false;
      // console.log(adopted);

      const formData = new FormData();
      try {
        formData.append("file", image);
        formData.append("upload_preset", "qitftxrj");
        formData.append("cloud_name", "dzecezsni");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dzecezsni/image/upload",
          formData
        );
        console.log(res.status);
        if (res.status == 200) {
          const petInfo = {
            name: formik.values?.name,
            age: formik.values?.age,
            location: formik.values?.location,
            note: formik.values?.note,
            description: formik.values?.description,
            image: res.data?.url,
            petOwner: pet?.petOwner,
            adopted: pet?.adopted,
            date: pet?.date,
            category: selectedOption?.value,
          };
          // console.log(petInfo);

          console.log("pet info after image url", petInfo);
          const petRes = await axiosSecure.patch(`/pets/${pet._id}`, petInfo);
          console.log(petRes.data);
          if (petRes.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Pet has been updated",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <h2>This is Update a pet section</h2>
      <div className="justify-center mx-auto mb-10">
        <div className=" p-4">
          <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
            <form onSubmit={formik.handleSubmit} className="card-body">
              <div className="flex">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Pet Name"
                    className="input input-bordered"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                  {formik.errors.name ? (
                    <div className="text-red-500">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="form-control  flex-1">
                  <label className="label">
                    <span className="label-text">Pet age (in months)</span>
                  </label>

                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="input input-bordered"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    required
                  />
                  {formik.errors.age ? (
                    <div className="text-red-500">{formik.errors.age}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <Select
                  options={options}
                  onChange={setSelectedOption}
                  defaultValue={pet?.category}
                  // defaultValue={selectedOption}
                  value={selectedOption}
                  required
                />
                {/* {formik.errors.location ? (
                <div className="text-red-500">{formik.errors.location}</div>
              ) : null} */}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  required
                />
                {formik.errors.location ? (
                  <div className="text-red-500">{formik.errors.location}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Short Note</span>
                </label>
                <input
                  type="text"
                  name="note"
                  placeholder="Note"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.note}
                  required
                />
                {formik.errors.note ? (
                  <div className="text-red-500">{formik.errors.note}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  required
                />
                {formik.errors.description ? (
                  <div className="text-red-500">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>

                <input
                  type="file"
                  name="image"
                  // onChange={formik.handleChange}
                  onChange={(e) =>
                    formik.setFieldValue("image", e.target.files[0])
                  }
                  // value={formik.values.photo}
                  required
                  className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                />
              </div>

              <button className="btn bg-secondary" type="submit">
                Update Pet
              </button>
            </form>
          </div>
          {/* <div className="justify-center items-center flex">
          <Lottie animationData={registerAnimation}></Lottie>
          
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default UpdatePet;
