import { useFormik } from "formik";
import moment from "moment/moment";
import { useContext } from "react";

import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const CreateDonation = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const currentTimeDate = moment().format("MMMM Do YYYY, h:mm:ss");
  const disableDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const validate = (values) => {
    const errors = {};

    if (!values.shortDescription) {
      errors.shortDescription = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    if (!values.amount) {
      errors.amount = "Required";
    }
    if (!values.expireDate) {
      errors.expireDate = "Required";
    }
    if (!values.name) {
      errors.name = "Required";
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
      shortDescription: "",
      description: "",
      image: "",
      amount: "",
      expireDate: "",
      name: "",
    },
    validate,
    onSubmit: async () => {
      // alert(JSON.stringify(values, null, 2));
      console.log(formik.values);
      const { image } = formik.values;
      // console.log(image);
      // console.log("current day time--->", currentTimeDate);
      // console.log(selectedOption.value);
      const active = true;
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
          const donationInfo = {
            shortDescription: formik.values?.shortDescription,
            description: formik.values?.description,
            maxAmount: formik.values?.amount,
            expireDate: formik.values?.expireDate,
            image: res.data?.url,
            donationOwner: user?.email,
            active: active,
            date: currentTimeDate,
            donationName: formik.values?.name,
            donatedAmount: 0,
          };

          console.log("pet info after image url", donationInfo);
          const donationRes = await axiosSecure.post(
            "/donations",
            donationInfo
          );
          console.log(donationRes.data);
          if (donationRes.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Donation Post has been Successful",
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
      <h2>This is create donation page</h2>
      <div className="justify-center mx-auto mb-10">
        <div className=" p-4">
          <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
            <form onSubmit={formik.handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Maximum Donation Amount</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Donation Amount"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  required
                />
                {formik.errors.amount ? (
                  <div className="text-red-500">{formik.errors.amount}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last day of Donation</span>
                </label>
                <input
                  type="date"
                  min={disableDates()}
                  name="expireDate"
                  placeholder="Donation"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.expireDate}
                  required
                />
                {formik.errors.expireDate ? (
                  <div className="text-red-500">{formik.errors.expireDate}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donation Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Donation Name"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  required
                />
                {formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Short Description</span>
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  placeholder="short Description"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.shortDescription}
                  required
                />
                {formik.errors.shortDescription ? (
                  <div className="text-red-500">
                    {formik.errors.shortDescription}
                  </div>
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
                Create Donation
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

export default CreateDonation;
