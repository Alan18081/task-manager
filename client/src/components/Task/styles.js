export default ({
  spacing: { unit },
  palette: { primary },
  transitions: { easing, duration },
  breakpoints
}) => ({
  container: {
    marginBottom: unit * 2,
    display: "block",
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
    alignItems: "flex-start",
    [breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  info: {
    flexGrow: 1,
    paddingRight: unit
  },
  performer: {
    marginTop: unit * 2
  },
  controls: {
    display: 'flex',
    flexDirection: 'column'
  }
});
