import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: "center",
  },
  appLogo: {
    height: "40vmin",
    pointerEvents: "none",
  },
  appHeader: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  appLink: {
    color: "#61dafb",
  },
  button: {
    paddingTop: "10px",
  },
}));

export default useStyles;
