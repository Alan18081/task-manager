export default ({ spacing: { unit }, breakpoints }) => ({
  toolbar: {
    display: "flex",
    [breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  brand: {
    flexGrow: 1,
    textDecoration: "none"
  },
  linkText: {
    color: "#fff",
    marginLeft: unit
  },
  icon: {
    color: "#fff"
  }
});
