export const getPerformers = ({ users }) => {
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

export const getUserTasks = ({tasks,user}) => {
  const userId = user.get("profile").get("_id");
  const list = tasks.get("list");
  if(list) {
    return list.filter(task => {
      return task.get("creator").get("_id") === userId || task.get("performer").get("_id") === userId;
    });
  }
};

export const getOtherUsersList = ({users,user}) => {
  const userId = user.get("profile").get("_id");
  if(users) {
    return users.filter(user => user.get("_id") !== userId);
  }
};
