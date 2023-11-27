import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";
const useDonations = () => {
  // const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    data: donations = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donations");
      return res.data;
    },
  });
  return [donations, loading, refetch];
};

export default useDonations;
