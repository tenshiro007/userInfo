export const api=process.env.REACT_APP_API;

export const authenticate=(req,next)=>{
    if(window !=="undefined"){
        if(sessionStorage.getItem("token"))sessionStorage.removeItem("token")
        sessionStorage.setItem("token",JSON.stringify(req.data.token))
    }
    next()
}

export const getToken=()=>{
    if(window!=="undefined"){
        var mytoken=sessionStorage.getItem("token")
        if(mytoken && mytoken!=="undefined"){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

export const logout=(next)=>{
    if(window!=="undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }
    next()
}