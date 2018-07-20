export const getPerformers = ({ board }) => {
  const users = board.get("users");
  if (users) {
    return users.filter(user => !user.get("isAdmin"));
  }
};
