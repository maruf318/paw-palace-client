import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://paw-palace-server.vercel.app",
});
//https://paw-palace-server.vercel.app

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
