import { useState, useContext } from "react";
import { AppContext } from "../Context";
const Form = () => {
  const { insertUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitUser = (e) => {
    e.preventDefault();
    insertUser(newUser);
    e.target.reset();
  };

  return (
    <form className="insertForm" onSubmit={submitUser}>
      <h2>新增員工</h2>
      <label htmlFor="_name">姓名</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewUser(e, "user_name")}
        placeholder="Enter name"
        autoComplete="off"
        required
      />
      <label htmlFor="_email">職稱</label>
      <input
        type="text"
        id="_email"
        onChange={(e) => addNewUser(e, "user_email")}
        placeholder="Enter job title"
        autoComplete="off"
        required
      />
      <input type="submit" value="新增" />
    </form>
  );
};

export default Form;