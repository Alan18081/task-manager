export default ({ spacing: { unit } }) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  messages: {
    marginTop: unit * 3,
    listStyleType: "none",
    paddingLeft: 0
  }
});
