import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { ConvertirAdminBtn } from '../convertirAdminBtn/ConvertirAdminBtn'

export const  ModalToggleAdmin = ({ show, usuarioSelec, setShow, rows, setRows }) => {
  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal  onClose={()=> setShow(false)} open={show}>
        <Grid sx={style} >
          <ConvertirAdminBtn user={usuarioSelec} setRows={setRows} />
        </Grid>
      </Modal>
    </div>
  );
};