const logOut = document.querySelector("#logoutBtn")
const videoInput = document.querySelector("#videoInput")
const uploadInput = document.querySelector("uploadInput")

const API = "https://you-tube-by-abdulbosit.herokuapp.com"

async function checkUser(res){
    
    let users = await fetch(API + "/users",{
        headers : {
            token : res.token,
            device : res.data.device
        }
    })
    if(users.status == 403 ) return false
    users = await users.json()

    let boo = true
    users.map(el => {
        if(el.userId != res.data.userId) boo = false
        if(el.username != res.data.username) boo = false
    })

    return boo
}

async function checkVideo(){

}

let res = window.localStorage.getItem("response")

if(!res.token || !checkUser(res) || 
    res.data.device != navigator.userAgent
) window.location = "/register"

logOut.addEventListener("click",()=>{
    window.location ="/register"
})

submitButton.addEventListener("click", async (event)=>{
    event.preventDefault()

    

    const videoname = videoInput.value.trim();
    const file = uploadInput.files[0];

    if (!videoname || !file ) return;
    if (!file.name.includes(".mp4") || !file.name.includes(".mov")) return 
    let formData = new FormData(form);

    formData.append("videoname" ,videoname)
    formData.append("username",res.data.username)
    formData.append("file",file);
    let response = await fetch(API + "/admin",{
        method : "POST",
        body : formData
    })
    
    response = await response.json()

    if (response.status == 200) {
        window.location = '/admin'
        const videoSrc = API + "/video/" + videoname

        let li = document.createElement("li")
        li.className = "iframe"
        li.append(createHTML(videoSrc,res.data.imgName,res.data.username,videoname,file.size))
        
    }

    if(response.status >= 400) {
        errorMessage.textContent = (response.message);
}
})
