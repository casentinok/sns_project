import React from "react";
//import styles from "./UserInfo.scss";

const UserInfo = ({ userinfo,handleChange }) => (
    <div>
      <div>
        <div>ID</div>
        <div>
          {userinfo.userid}
        </div>
      </div>
      <div>
        <div>NAME</div>
        <div>
          {userinfo.name}
        </div>
      </div>
      <div>
        <div>PHONE</div>
        <div>
          {userinfo.phone}
        </div>
      </div>
      <div>
        <div>password</div>
        <div>
          <input type="password" name="password" onChange={handleChange} value={userinfo.password} />
        </div>
      </div>
      <div>
        <div>password confirm</div>
        <div>
          <input
            type="password"
            name="password_confirm"
            value={userinfo.password_confirm}
            onChange={handleChange} 
          />
        </div>
      </div>
    </div>
 
);

export default UserInfo;
