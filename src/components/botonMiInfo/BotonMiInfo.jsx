import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";

export const BotonMiInfo = () => {
  const navigate = useNavigate();
  return (
        <Button
					id='boton-mi-info'
          onClick={() => navigate(`/miPerfil`)}
          variant="contained"
          endIcon={<ModeEditOutlineRoundedIcon />}
        >
          Mi información
        </Button>
  );
};
