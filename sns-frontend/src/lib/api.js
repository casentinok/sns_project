import axios from 'axios';
export const join = async (signinfo) => {
    const formData = new FormData();    
    //formData.append('userid',userid).append('password',password).append('email',email).append('phone',phone).append('file',file)
    console.log(signinfo)
   await Object.keys(signinfo).forEach(key =>{ 
       console.log(key,signinfo[key]);       
            formData.append(key,signinfo[key]);
            console.log(formData);        
    })
    formData.append("userid",signinfo.userid);
    console.log(formData);
    return axios.post('/api/user',{ formData, headers : {
            'Content-Type' : 'multipart/form-data'
        }
    });
}
export const login = ({userid, password}) => axios.post('/api/user/login',{userid, password});
export const logout = () => axios.get('/api/user/logout');
//export const info = (id)=> axios.get(`/api/user/${queryString.stringify({id})}`);
export const uinfo = (id)=> axios.get(`/api/user/uinfo/${id}`);
export const update = ({id,password,profile})=> axios.patch(`/api/user/${id}`,{password,profile});
export const check = () => axios.get('/api/user/check');
export const checkOverlap = ({name,value}) => axios.post('/api/user/check',{name,value});