import axios from "axios";
export const join = async signinfo => {
  const formData = new FormData();
  await Object.keys(signinfo).forEach(key => {
    if (key !== "password_confirm" && key !== "error") {
      formData.append(key, signinfo[key]);
    }
  });
  return await axios({
    method: "post",
    url: "/api/user",
    data: formData,
    config: {
      headers: {
        "Content-type": "multipart/form-data"
      }
    }
  });
};
export const login = ({ userid, password }) =>
  axios.post("/api/user/login", { userid, password });
export const logout = () => axios.get("/api/user/logout");
//export const info = (id)=> axios.get(`/api/user/${queryString.stringify({id})}`);
export const uinfo = id => axios.get(`/api/user/uinfo/${id}`);
export const update = ({ id, password, profile }) =>
  axios.patch(`/api/user/${id}`, { password, profile });
export const check = () => axios.get("/api/user/check");
export const checkOverlap = ({ name, value }) =>
  axios.post("/api/user/check", { name, value });
