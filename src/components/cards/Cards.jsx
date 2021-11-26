import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ImageButton, ImageSrc, Image, ImageBackdrop, ImageMarked, plataformas } from "../../utils/cardsUtils"

const Cards = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        width: "100%",
        marginTop: "80px",
        justifyContent: "space-around",
      }}
    >
      {plataformas.map((plataforma) => (
        <ImageButton
          focusRipple
          key={plataforma.nombre}
          style={{ width: "30%" }}
        >
          <ImageSrc style={{ backgroundImage: `url(${plataforma.imagen})` }} /> 
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Link href={plataforma.url}>
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {plataforma.nombre}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </Link>
        </ImageButton>
      ))}
    </Box>
  );
};

export default Cards;
