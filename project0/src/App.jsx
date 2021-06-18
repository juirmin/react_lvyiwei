import React from 'react';


function formatDate(date) {
   return date.toLocaleDateString();
}

class Avatar extends React.Component {
   render() {
      return (
         <img
            className="Avatar"
            src={this.props.user.avatarUrl}
            alt={this.props.user.name}
         />
      );
   }
}
class UserInfo extends React.Component {
   render() {
      return (
         <div className="UserInfo">
            <Avatar user={this.props.user} />
            <div className="UserInfo-name">{this.props.user.name}</div>
         </div>
      );
   }
}
class App extends React.Component {
   render() {
      return (
         <div className="Comment">
            <UserInfo user={this.props.author} />
            <div className="Comment-text">{this.props.text}</div>
            <div className="Comment-date">
               {formatDate(this.props.date)}
            </div>
         </div>
      );
   }
}



export default App;