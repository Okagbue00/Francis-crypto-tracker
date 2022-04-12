import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./star.jpeg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Ubuntu",
            }}
          >
            Francis Crypto World 🔑
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "gold",
              textTransform: "capitalize",
              fontFamily: "Ubuntu",
              fontSize: "17px",
            }}
          >
            Get all the latest happening on your crypto wallet using this platform
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
