import React from "react";
import UserItem from "./UserItem";

import "./UsersList.css";
const UsersList = ({ users }) => {
  return (
    <div>
      <ul className="users-list">
        {users.length &&
          users.map((user) => {
            return <UserItem user={user} />;
          })}
      </ul>
    </div>
  );
};

export default UsersList;
