export const getPerformers = ({ board }) => {
  const users = board.get("users");
  if (users) {
    return users.filter(user => !user.get("isAdmin"));
  }
};

export const getOtherUser = ({ chat, user }) => {
  const userId = user.get("profile").get("_id");
  if (chat.get("room")) {
    return chat
      .get("room")
      .get("users")
      .find(u => u.get("_id") !== userId);
  }
};
