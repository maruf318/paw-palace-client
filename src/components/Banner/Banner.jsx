import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
const Banner = () => {
  return (
    <Carousel className="max-w-7xl mx-auto text-center">
      <div>
        <img src={banner1} />
        <p className="legend">
          Discover love in trios—adopt joy, adopt three precious kittens.
        </p>
      </div>
      <div>
        <img src={banner2} />
        <p className="legend">
          Adopt loyalty, embrace a dogs faithful companionship today.
        </p>
      </div>
      <div>
        <img src={banner3} />
        <p className="legend lg:mb-10">
          In every gaze, find trust. Adopt the adventure of a dogs love.
        </p>
      </div>
    </Carousel>
  );
};

export default Banner;
