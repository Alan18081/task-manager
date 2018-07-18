export default ({ spacing: { unit }, breakpoints }) => ({
  content: {
    display: "flex",
    alignItems: "flex-start",
    [breakpoints.down("sm")]: {
      display: "block"
    }
  },
  info: {
    flexGrow: 1
  },
  status: {
    display: "flex",
    alignItems: "center"
  },
  statusIcon: {
    marginRight: unit
  }
});
