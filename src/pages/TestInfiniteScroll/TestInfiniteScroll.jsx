// import { useState } from "react";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useInfiniteQuery } from "@tanstack/react-query";

const TestInfiniteScroll = () => {
  // const axiosPublic = useAxiosPublic();
  // const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("");

  // const {
  //   data: pets = [],
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["allPets", search, category],
  //   queryFn: async ({ pageParam = 0 }) => {
  //     const res = await axiosPublic.get(
  //       `/allPets?search=${search}&category=${category}`
  //     );
  //     return { ...res?.data, prevOffset: pageParam };
  //   },
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage?.prevOffset + 10 > lastPage?.articlesCount) {
  //       return false;
  //     }
  //     return lastPage?.prevOffset + 10;
  //   },
  // });
  // console.log(pets);
  // console.log(pets.page);

  // const articles = pets?.pages?.reduce((acc, page) => {
  //   return [...acc, ...(page.articles || [])];
  // }, []);
  // console.log(articles);
  return (
    <div>
      <h2>test infinite scroll</h2>
    </div>
  );
};

export default TestInfiniteScroll;
