import PropTypes from "prop-types";
const SectionTitle = ({ heading }) => {
  return (
    <div>
      <p className="text-center text-primary underline font-extrabold text-3xl my-6">
        {heading}
      </p>
    </div>
  );
};

export default SectionTitle;
SectionTitle.propTypes = {
  heading: PropTypes.string,
};
