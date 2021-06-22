import { Provider } from "./Context";
import Form from "./components/Form";
import UserList from "./components/UserList";
import { Actions } from "./Actions";
function App() {
  const data = Actions();
  console.log(data)
  return (
    <Provider value={data}>
      <div className="App">
        <h1>ReactJS + window.fetch + PHP + MySQL CRUD</h1>
        <div className="wrapper">
          <section className="left-side">
            <Form />
          </section>
          <section className="right-side">
            <UserList />
          </section>
        </div>
      </div>
    </Provider>
  );
}

export default App;