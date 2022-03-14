import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "../Components/Card.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Card(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { title, description, genres } = props;

  return (
    <article className="card">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img
              src="https://ui-avatars.com/api/?background=random&rounded=true&"
              alt=""
            />
            <h2 id="transition-modal-title">{title}</h2>
            <p id="transition-modal-description">{description}</p>
            <p id="transition-modal-description">{genres}</p>
          </div>
        </Fade>
      </Modal>
      <img
        className="card-img-top"
        src="https://ui-avatars.com/api/?background=random&rounded=true&"
        alt=""
      />
      <div className="card-body" onClick={handleOpen}>
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{description.slice(0, 70) + "..."}</p>
        <h4 className="card-text">{genres}</h4>
      </div>
    </article>
  );
}

export default Card;
