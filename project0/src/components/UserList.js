import { useContext, useState } from "react";
import { AppContext } from "../Context";

const UserList = () => {
  const {
    users,
    userLength,
    editMode,
    cancelEdit,
    updateUser,
    deleteUser,
  } = useContext(AppContext);

  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateUser(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (id, user_name, user_email) => {
    setNewData({ id, user_name, user_email });
    editMode(id);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(id);
    }
  };

  return !userLength ? (
    <p>{userLength === null ? "Loading..." : "Please insert some users."}</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>員工姓名</th>
          <th>職稱</th>
          <th>動作</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, user_name, user_email, isEditing }) => {
          return isEditing === true ? (
            <tr key={id}>
              <td>
                <input
                  type="text"
                  defaultValue={user_name}
                  onChange={(e) => updateNewData(e, "user_name")}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={user_email}
                  onChange={(e) => updateNewData(e, "user_email")}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={id}>
              <td>{user_name}</td>
              <td>{user_email}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(id, user_name, user_email)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;