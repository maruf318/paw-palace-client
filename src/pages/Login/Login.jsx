import { useFormik } from "formik";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginAnimation from "../../assets/lottieSignIn.json";
import Lottie from "lottie-react";
const Login = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // email: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });
  return (
    // <div className="max-w-7xl mx-auto">
    //   <h2>This is login page</h2>
    //   <form onSubmit={formik.handleSubmit}>
    //     <label htmlFor="firstName">First Name</label>
    //     <input
    //       id="firstName"
    //       name="firstName"
    //       type="text"
    //       required
    //       onChange={formik.handleChange}
    //       value={formik.values.firstName}
    //     />

    //     <label htmlFor="lastName">Last Name</label>
    //     <input
    //       id="lastName"
    //       name="lastName"
    //       type="text"
    //       required
    //       onChange={formik.handleChange}
    //       value={formik.values.lastName}
    //     />

    //     <label htmlFor="email">Email Address</label>
    //     <input
    //       id="email"
    //       name="email"
    //       type="email"
    //       required
    //       onChange={formik.handleChange}
    //       value={formik.values.email}
    //     />

    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-center text-gray-500 md:my-10">
        Login now!
      </h1>
      <p className="py-6 text-center text-gray-500 md: my-5">
        Welcome back! Log in to continue your journey and access your
        personalized experience.
      </p>
      <div className=" flex justify-center mx-auto mb-10">
        <div className="flex p-4 gap-4 md:flex-row flex-col ">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={formik.handleSubmit} className="card-body">
              {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered"
              required
            />
          </div> */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  placeholder="email"
                  className="input input-bordered"
                  value={formik.values.email}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  placeholder="password"
                  className="input input-bordered"
                  value={formik.values.password}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {/* <div className="form-control mt-6">
                <button className="btn bg-secondary">Login</button>
              </div> */}
              <button className="btn bg-secondary" type="submit">
                Login
              </button>
            </form>
            <p className="text-center border-y-2 mb-4">OR</p>
            <button
              // onClick={handleGoogleSignIn}
              className="btn bg-secondary
         w-1/2 mx-auto capitalize"
            >
              SignIn By<FaGoogle className="text-2xl"></FaGoogle>
            </button>
            <p className="text-black text-center my-4">
              Create a account here
              <Link
                to={"/register"}
                className="font-bold text-red-800 underline "
              >
                Register
              </Link>
            </p>
          </div>
          <div className="">
            <Lottie animationData={loginAnimation}></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
