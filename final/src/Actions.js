import { useEffect, useState } from "react";

export const Actions = () => {
  let [users, setUsers] = useState([]);
  let [loginid, setloginUsers] = useState("00004");
  let [order, setOrder] = useState([]);
  let [sale, setSale] = useState([]);
  let [userLength, setUserLength] = useState(1);
  let [products, setProducts] = useState([]);
  let [productLength, setProductLength] = useState(1);
  let [cust, setCust] = useState([]);
  useEffect(() => {
    fetch("http://localhost/php-react/all-users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(data.users.length);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      fetch("http://localhost/php-react/search-custbydate.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sdate: "2018-10-01", edate: "2018-10-30" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setCust(data.searchcust)
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost/php-react/all-product.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProducts(data.users);
          setProductLength(data.users.length);
        } else {
          setProductLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new user into the database.
  const insertUser = (newUser) => {
    fetch("http://localhost/php-react/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              id: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function logincheck(loginuser) {
    fetch("http://localhost/php-react/login-check.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      async: false,
      body: JSON.stringify(loginuser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loginusers.idcheck == true && data.loginusers.passcheck == true) {
          setloginUsers(loginuser.id)
          console.log(loginid)
        }
        else {
          console.log(data)
          alert(data.msg)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  // Updating a user.
  const updateUser = (userData) => {
    fetch("http://localhost/php-react/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;
              user.user_name = userData.user_name;
              user.user_email = userData.user_email;
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteUser = (theID) => {
    // filter outing the user.
    let userDeleted = users.filter((user) => {
      return user.id !== theID;
    });
    fetch("http://localhost/php-react/delete-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchorder = (theID) => {
    fetch("http://localhost/php-react/search-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setOrder(data.order)
        } else {
          console.log(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchsale = (theID) => {
    fetch("http://localhost/php-react/search-sale.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSale(data.sale)
        } else {
          console.log(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    users,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    logincheck,
    searchorder,
    setloginUsers,
    setProducts,
    setProductLength,
    setSale,
    setOrder,
    searchsale,
    products,
    loginid,
    productLength,
    userLength,
    order,
    sale,
    cust
  };
};