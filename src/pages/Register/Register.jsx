import { useFormik } from "formik";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import registerAnimation from "../../assets/lottieRegister.json";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { Cloudinary } from "@cloudinary/url-gen";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate(null);
  // const cld = new Cloudinary({ cloud: { cloudName: "dzecezsni" } });
  //validation
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      // eslint-disable-next-line no-useless-escape
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':",.<>?]/.test(values.password)) {
      errors.password = "Password must contain 1 special character";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      image: "",
    },
    validate,
    onSubmit: async () => {
      // alert(JSON.stringify(values, null, 2));
      console.log(formik.values);
      const { image } = formik.values;
      console.log(image);
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
          console.log("inside 200");
          console.log(
            formik.values.name,
            formik.values.email,
            formik.values.password,
            res.data.url
          );
          createUser(formik.values.email, formik.values.password)
            .then((result) => {
              console.log(result.user);
              updateProfile(result.user, {
                displayName: formik.values.name,
                photoURL: res.data.url,
              })
                .then(() => {
                  console.log("profile updated");
                  const userInfo = {
                    name: formik.values?.name,
                    email: formik.values?.email,
                    photoURL: res.data?.url,
                  };
                  axiosPublic.post("/users", userInfo).then((res) => {
                    if (res.data.insertedId) {
                      console.log("user added to the database");
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Account Created. Now login",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                  });
                })
                .catch();
              // Swal.fire({
              //   position: "top-end",
              //   icon: "success",
              //   title: "Account Created. Now login",
              //   showConfirmButton: false,
              //   timer: 1500,
              // });

              logOut().then().catch();
              navigate("/login");
            })
            .catch((error) => {
              console.error(error);
              // setErrorText(error.message);
              // swal("Error", errorText, "error");
              // notifyError(error.message);
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <div className="box mx-auto">
        <span></span>
        <h2 className="text-5xl font-bold text-center text-gray-500 md:my-10">
          Register now!
        </h2>
      </div>

      <p className="py-6 text-center text-gray-500 md:my-4">
        Welcome! Register and explore Paw Palace
      </p>
      <div className=" flex justify-center mx-auto mb-10">
        <div className="flex p-4 md:flex-row flex-col ">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={formik.handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
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
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />
                {formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  required
                />
                {formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                {/* <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.photo}
                  required
                /> */}
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
              {/* <div className="form-control mt-6">
                <button className="btn bg-secondary">Create Account</button>
              </div> */}
              <button className="btn bg-secondary" type="submit">
                Register
              </button>
              <p className="text-black">
                Already have an account?
                <Link
                  to={"/login"}
                  className="font-bold text-red-800 underline"
                >
                  Login Here
                </Link>
              </p>
            </form>
          </div>
          <div className="justify-center items-center flex">
            <Lottie animationData={registerAnimation}></Lottie>
            {/* <img className="w-[500px]" src={animation} alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
