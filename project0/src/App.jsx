import React from 'react';

class App extends React.Component {

   constructor(props) {

      super(props);
      this.state = {
         data: '初始資料，來自父元件 this.state'
      }
   };
   updateState=()=> {
      this.setState({ data: '子元件使用父元件 event 改變父元件 state' })
   }
   render() {
      return (
         <div>
            <Content updateStateProp={this.updateState} myDataProp={this.state.data}></Content>
         </div>
      );
   }
}

class Content extends React.Component {
   render() {
      return (
         <div>
            <button onClick={this.props.updateStateProp}>我是Content子元件的按鈕</button>
            <h3>{this.props.myDataProp}</h3>
         </div>
      );
   }
}

export default App;