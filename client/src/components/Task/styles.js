export default ({
  spacing: { unit },
  palette: { primary },
  transitions: { easing, duration }
}) => ({
  container: {
    marginBottom: unit * 2,
    display: "block",
    textDecoration: "none"
  },
  card: {
    border: "1px solid transparent",
    transition: `all ${duration.short}ms ${easing.easeIn}`,
    "&:hover": {
      borderColor: primary.light
    }
  },
  status: {
    marginTop: unit
  },
  content: {
    display: "flex",
    alignItems: "flex-start"
  },
  info: {
    flexGrow: 1,
    paddingRight: unit
  }
});
