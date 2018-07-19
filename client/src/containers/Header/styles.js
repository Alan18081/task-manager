export default ({ spacing: { unit }, breakpoints }) => ({
  toolbar: {
    display: "flex",
    [breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center"
    }
  }
});
