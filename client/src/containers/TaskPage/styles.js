export default ({ spacing: { unit }, breakpoints }) => ({
  content: {
    display: "flex",
    alignItems: "flex-start",
    [breakpoints.down("sm")]: {
      display: "block"
    }
  },
  taskDescription: {
    marginBottom: unit * 2
  },
  info: {
    flexGrow: 1,
    [breakpoints.down("sm")]: {
      marginBottom: unit
    }
  }
});
