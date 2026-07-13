import api from "../../utils/api"

import{
    loginRequest,
    loginSuccess,
    loginFail,userRequest,
    userSuccess,
    userFail,
    logoutFail,
    logoutSuccess,
    updateFail,
    updateRequest,
    updateSuccess,
    updateReset,
    clearErrors
} from "../slices/userSlice"

//login
export const login =(email,password)=> async(dispatch) =>{
    try{
        dispatch(loginRequest())
        const { data } = await api.post("/v1/users/login", { email, password });
        dispatch(loginSuccess(data.data.user))
        }catch(error){
            dispatch(loginFail("login failed"))
        }
}

//signup
export const register =(userData) => async(dispatch) =>{
    try{
        dispatch(userRequest());
        const{data} = await api.post("/v1/users/signup", userData,{
            headers:
            {"Content-Type": "application/json"}
        })
        dispatch(userSuccess(data.user));

    }catch(error){
        dispatch(userFail(error.response?.data?.message))
    }
}

//load user
export const loadUser =() => async(dispatch)=>{
    try{
        dispatch(userRequest());
        const {data} = await api.get("/v1/users/me")
        console.log("loadUser response:", data);
        dispatch(userSuccess(data.user || data.data.user))
    }catch(error){
    console.log(error.response);
    dispatch(userFail(error.response?.data?.message))
}
}

//update profile
export const updateProfile =() => async(dispatch)=>{
    try{
        dispatch(updateRequest());
        const {data} = await api.put("/v1/users/me/update", userData, {
        headers:
        {"Content-Type" : "multipart/form-data"}
    })

        dispatch(updateSuccess(data.success))
    }catch(error){
        dispatch(updateFail(error.response?.data?.message))
    }
}

//logout
export const logout =() => async(dispatch) =>{
    try{
        await api.get("/v1/users/logout")
        dispatch(logoutSuccess())
    }catch(error){
        dispatch(logoutFail(error.response?.data?.message))
    }
}