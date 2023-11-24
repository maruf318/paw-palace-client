import { useFormik } from "formik";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnimation from "../../assets/lottieSignIn.json";
import Lottie from "lottie-react";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
const Login = () => {
  const { signIn, googleSignIn, githubSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
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
      console.log(values.email, values.password);
      const email = values.email;
      const password = values.password;
      signIn(email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error.message);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  });
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        // swal(
        //   "Google Login",
        //   "You are one step away of your events ",
        //   "success"
        // );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
        // setTimeout(() => {
        //   // Delay for 1 second
        //   navigate(location?.state ? location.state : "/");
        // }, 2000);
        // 1000 milliseconds = 1 second

        // navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        // setErrorText(error.message);
        // swal("Error", errorText, "error");
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleGithubSignIn = () => {
    githubSignIn()
      .then((result) => {
        console.log(result.user);
        // swal(
        //   "Google Login",
        //   "You are one step away of your events ",
        //   "success"
        // );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
        // setTimeout(() => {
        //   // Delay for 1 second
        //   navigate(location?.state ? location.state : "/");
        // }, 2000);
        // 1000 milliseconds = 1 second

        // navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        // setErrorText(error.message);
        // swal("Error", errorText, "error");
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
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
                  placeholder="email"
                  className="input input-bordered"
                  onChange={formik.handleChange}
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
              onClick={handleGoogleSignIn}
              className="btn bg-secondary
         w-1/2 mx-auto capitalize"
            >
              SignIn By<FaGoogle className="text-2xl"></FaGoogle>
            </button>
            <button
              onClick={handleGithubSignIn}
              className="btn bg-secondary
         w-1/2 mx-auto capitalize"
            >
              SignIn By<FaGithub className="text-2xl"></FaGithub>
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
