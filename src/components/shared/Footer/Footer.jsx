import { Rating } from "@mui/material";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-secondary text-base-content">
      <p>According to user response</p>
      <Rating
        name="half-rating-read"
        defaultValue={4.5}
        precision={0.5}
        readOnly
      />
      <aside>
        <p>
          Copyright © 2023 - All right reserved by Maruf Hossain (creator of
          Paw-palace)
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
