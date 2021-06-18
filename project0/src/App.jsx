import React from 'react';

class App extends React.Component {

   constructor(props) {
  
     super(props);
  
     this.fileInput = React.createRef();
  
   }
  
   handleSubmit = (event) => {
  
     event.preventDefault();
  
     alert(`選擇檔案 - ${this.fileInput.current.files[0].name}`);
  
   }
  
  
   render() {
  
     return (
  
       <form onSubmit={this.handleSubmit}>
  
         <label>
  
           上傳檔案：<input type="file" ref={this.fileInput} />
  
         </label>
  
         <br />
  
         <button type="submit">Submit</button>
  
       </form>
  
     );
  
   }
  
  }

export default App;