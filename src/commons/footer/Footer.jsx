import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import theme from "../../views/themeConfig";
import { ThemeProvider } from "@mui/material/styles";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <img
          src="https://actividades.techo.org/img/logo_negro_154x41.png"
          alt="Techo Argentina"
          align="left"
          style={{ paddingTop: "5px", marginRight: "30px" }}
        />
      </div>
      <div className="logofoot">
        <a
          className="red"
          href="http://lt.dplrtrack.info/a1ccecf1d4a82082506189b30dbb3789-1c48a2db5ffee7dd9b1dd7531c928471"
          target="_blank"
          data-saferedirecturl="https://www.google.com/url?hl=en&q=http://lt.dplrtrack.info/a1ccecf1d4a82082506189b30dbb3789-1c48a2db5ffee7dd9b1dd7531c928471&source=gmail&ust=1524658654821000&usg=AFQjCNFBy0FCWzlSTZDEAzLTyaMYyZolAA"
        >
          <img
            width="40"
            src="https://ci6.googleusercontent.com/proxy/4z4sMZMCDRxTvJQ80EWv2pIS6X1DVzR6-HpHoy4s1smjOrrxCm0QuP-DXfTkN6eeng0qTQCPoRE1weKrrgurD6o8vTVnWL_X0LsbzjQx7pqyXmvjajfFkohrDJ4xgA=s0-d-e1-ft#http://app2.dopplerfiles.net/MSEditor/images/hollow_rounded_facebook.png"
            alt="Facebook"
          />
        </a>
        <a
          className="red"
          href="http://lt.dplrtrack.info/47414522b64f1ac0be8d6c95febc6ce9-1c48a2db5ffee7dd9b1dd7531c928471"
          target="_blank"
          data-saferedirecturl="https://www.google.com/url?hl=en&q=http://lt.dplrtrack.info/47414522b64f1ac0be8d6c95febc6ce9-1c48a2db5ffee7dd9b1dd7531c928471&source=gmail&ust=1524658654821000&usg=AFQjCNFFaREy-RpR-hkJTBR7pK0AUsYVGw"
        >
          <img
            width="40"
            src="https://ci6.googleusercontent.com/proxy/E55JS6uJV_Vo20UYP29bmyyiflaXvrPclD7Gm9JUH66mzwwZ50sX6YTF0HiIdJr7BpY7BxR-hSsW91-DTD8x_qMzY8v4krvQGquI6DvBpdRXUOFA4mKX4_b_Ns4PrwA=s0-d-e1-ft#http://app2.dopplerfiles.net/MSEditor/images/hollow_rounded_instagram.png"
            alt="Instagram"
          />
        </a>
        <a
          className="red"
          href="http://lt.dplrtrack.info/b9ae56197721ed27d3ec89b5f615b4d0-1c48a2db5ffee7dd9b1dd7531c928471"
          target="_blank"
          data-saferedirecturl="https://www.google.com/url?hl=en&q=http://lt.dplrtrack.info/b9ae56197721ed27d3ec89b5f615b4d0-1c48a2db5ffee7dd9b1dd7531c928471&source=gmail&ust=1524658654821000&usg=AFQjCNG-Sehf0nB3nTxcvr3Ig0FgjukAZQ"
        >
          <img
            width="40"
            src="https://ci5.googleusercontent.com/proxy/-ZjxGxqAK1rsZG3Hhaw_HAMD72HY36M-G5sANgV0BlZ7Xw8F-VH5M2g1NZjDTm-Qf76iWtfkI_PyzKMItn1NZrUnREoUqZOu6wr5pnbGr2a-Rto4Inh3Kx9XN0GVIA=s0-d-e1-ft#http://app2.dopplerfiles.net/MSEditor/images/hollow_rounded_linkedin.png"
            alt="Linkedin"
          />
        </a>
        <a
          className="red"
          href="http://lt.dplrtrack.info/b6390e349653bb94601a7b7ae8742719-1c48a2db5ffee7dd9b1dd7531c928471"
          target="_blank"
          data-saferedirecturl="https://www.google.com/url?hl=en&q=http://lt.dplrtrack.info/b6390e349653bb94601a7b7ae8742719-1c48a2db5ffee7dd9b1dd7531c928471&source=gmail&ust=1524658654821000&usg=AFQjCNFViqL5Gg4nAfzjPLmrGyKSNN8wrA"
        >
          <img
            width="40"
            src="https://ci5.googleusercontent.com/proxy/Uf5bIAODa7MzN2AokMwVesevh9AGELXbebXj1MD1D1HMZavmM8hP5JI9PjI8KUftnPqgi3Qy-zeI7zDMPeWwgzVyNZ_X4TFAGh-sk6SgsE3us9R8V2VQMiv5xxo4=s0-d-e1-ft#http://app2.dopplerfiles.net/MSEditor/images/hollow_rounded_twitter.png"
            alt="Twitter"
          />
        </a>
      </div>
      <div>
        <p className="techo©">© 2021 TECHO</p>
      </div>
    </footer>
  );
};

export default Footer;
