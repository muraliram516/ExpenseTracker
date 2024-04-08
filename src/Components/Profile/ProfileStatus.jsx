import React from 'react';
import './ProfileStatus.css'; 

class ProfileStatus extends React.Component {
  state = {
    profileIncomplete: true
  };

  handleCompleteProfileClick = () => {
    // Handle the click event for the "Complete now" button
    // This should probably redirect the user to the profile completion page
    this.props.history.push('/complete-profile'); // assuming you're using react-router
  };

  render() {
    const { profileIncomplete } = this.state;

    return (
      <div className="profile-status">
        {profileIncomplete && (
          <div>
            <h1>Welcome to Expense Tracker!!!</h1>
            <button onClick={this.handleCompleteProfileClick} className="complete-profile-btn">
              Your profile is Incomplete. Complete now
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
