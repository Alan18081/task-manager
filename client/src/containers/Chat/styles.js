export default ({ spacing: { unit } }) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  messages: {
    marginBottom: unit * 3,
    flexGrow: 1,
    overflowY: "auto"
  },
  form: {
    position: "absolute",
    bottom: unit,
    left: 0,
    padding: `0 ${unit * 3}px`,
    width: "100%"
  }
});
