import React, { useState } from 'react';
import CreateProjectForm from '../components/CreateProjectForm';
import ProjectList from '../components/ProjectList';
import Header from '../components/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUserInfo } from '../store';
import UserInfoForm from '../components/UserInfoForm';
import { useUpdateUserMutation } from '../store/apiSlice';

const HomePage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [change, setChange] = useState(0);
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = (updatedInfo: any) => {
    dispatch(setUserInfo(updatedInfo));
    updateUser({
      _id: updatedInfo._id,
      email: updatedInfo.email,
      fname: updatedInfo.fname,
      lname: updatedInfo.lname,
      linkedin: updatedInfo.linkedin,
      git: updatedInfo.git,
      mobile: updatedInfo.mobile
    });
    setEditMode(false);
  };

  return (
    <div className="background-container" style={{ backgroundImage: 'url(/leaves.jpg)' }}>
      <Header />
      <div className="main-body">
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-white">Home</li>
            <li className="breadcrumb-item active " aria-current="page">Project Management</li>
          </ol>
        </nav>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card card-profile"  >
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{userInfo?.fname} {userInfo?.lname}</h4>
                    <button onClick={handleEdit} className="btn submit-button" >
                      {editMode ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-profile mt-3">
              {editMode ? (
                <UserInfoForm userInfo={userInfo} onSave={handleSave} />
              ) : (
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Git HUb</h6>
                    <span className="text-white">{userInfo?.git}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">LinkedIn</h6>
                    <span className="text-white">{userInfo?.linkedin}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Mobile</h6>
                    <span className="text-white">{userInfo?.mobile}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0 ">Gender</h6>
                    <span className="text-secondary text-white">{userInfo?.gender}</span>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="col-md-8">
            <div className="card card-project mb-3">
              <div className="card-body">
                <h2 className="text-center " style={{color:'rgb(230,230,230)'}}>Project Management</h2>
                <div className="row">
                  <div className="col-sm-12">
                    <h2 style={{color:'rgb(230,230,230)'}}>Create a New Project</h2>
                    <CreateProjectForm setChange={setChange} />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <h2 style={{color:'rgb(230,230,230)'}}>Your Projects</h2>
                    <ProjectList change={change} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
