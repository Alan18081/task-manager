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
  warning: {
    marginTop: unit * 3
  },
  warningContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  warningText: {
    marginBottom: unit * 2
  },
  info: {
    flexGrow: 1,
    [breakpoints.down("sm")]: {
      marginBottom: unit
    }
  },
  status: {
    display: "flex",
    alignItems: "center"
  },
  statusIcon: {
    marginRight: unit
  }
});
