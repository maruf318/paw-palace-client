import PropTypes from "prop-types";
import { FaPaw } from "react-icons/fa";
const SectionTitle = ({ heading }) => {
  return (
    <div className="flex justify-center items-center ">
      <FaPaw></FaPaw>
      <p className="text-center text-primary underline font-extrabold text-3xl my-6">
        {heading}
      </p>
      <FaPaw></FaPaw>
    </div>
  );
};

export default SectionTitle;
SectionTitle.propTypes = {
  heading: PropTypes.string,
};
