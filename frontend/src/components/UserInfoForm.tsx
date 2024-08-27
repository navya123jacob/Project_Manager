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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>GitHub</label>
        <input
          type="text"
          className="form-control"
          name="git"
          value={formData.git}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>LinkedIn</label>
        <input
          type="text"
          className="form-control"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Mobile</label>
        <input
          type="text"
          className="form-control"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <input
          type="text"
          className="form-control"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-success">Save</button>
    </form>
  );
};

export default UserInfoForm;
