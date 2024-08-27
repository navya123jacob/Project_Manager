import React, { useState } from 'react';


interface UserInfoFormProps {
  userInfo: any;
  onSave: (updatedInfo: any) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ userInfo, onSave }) => {
  const [formData, setFormData] = useState(userInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="user-info-form-container">
      <h2 className="user-info-form-title">Edit User Information</h2>
      <form onSubmit={handleSubmit} className="user-info-form">
        <div className="user-info-form-group">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="user-info-form-control"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>
        <div className="user-info-form-group">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            className="user-info-form-control"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>
        <div className="user-info-form-group">
          <label htmlFor="git">GitHub</label>
          <input
            type="text"
            id="git"
            name="git"
            className="user-info-form-control"
            value={formData.git}
            onChange={handleChange}
            placeholder="Enter your GitHub username"
          />
        </div>
        <div className="user-info-form-group">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            className="user-info-form-control"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="Enter your LinkedIn profile URL"
          />
        </div>
        <div className="user-info-form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className="user-info-form-control"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="user-info-form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            className="user-info-form-control"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Enter your gender"
          />
        </div>
        <button type="submit" className="user-info-form-btn">Save</button>
      </form>
    </div>
  );
};

export default UserInfoForm;
