import React from 'react';

class App extends React.Component {

   constructor(props) {
   
     super(props);
   
     this.state = {name: "按我"};
   
     //this.shoot = this.shoot.bind(this);
   
     // 使用 Arrow Function 不需要綁定 this
   
   }
   
   shoot = (a) => {
   
     console.log('this is:', this);
   
     console.log(a);
   
     this.setState({name: "我被按了"});
   
   }
   
   render() {
   
     return (
   
       <button onClick={() => this.shoot("我是參數")}>{this.state.name}</button>
   
     );
   
   }
   
   }

export default App;