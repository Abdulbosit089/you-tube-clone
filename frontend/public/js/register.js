const usernameInput = document.querySelector("#usernameInput")
const passwordInput = document.querySelector("#passwordInput")
const errorMessage = document.querySelector("#errorMessage")
const submitButton = document.querySelector("#submitButton")
const uploadInput = document.querySelector("#uploadInput")
const customUpload = document.querySelector(".custom-upload")
const form = document.querySelector(".site-form")

const API = "https://you-tube-by-abdulbosit.herokuapp.com"

submitButton.addEventListener("click", async (event)=>{
        event.preventDefault()
        console.log("ok")

        const username = usernameInput.value.trim();
        const file = uploadInput.files[0];
        const password = passwordInput.value.trim();

        if (!username || !file || !password) return;
        if (!file.name.includes(".jpg") && !file.name.includes(".png") && !file.name.includes(".jpeg")) return 
        let formData = new FormData(form);

        formData.append("username" ,username)
        formData.append("password",password)
        formData.append("imgName",file.name)
        formData.append("device",navigator.userAgent)
        formData.append("file",file);
        let response = await fetch(API + "/register",{
            method : "POST",
            body : formData
        })
        
        response = await response.json()

        if (response.status == 200) {

            window.location = '/admin'
            window.localStorage.setItem('response', JSON.stringify(response));
        }

        if(response.status >= 400) {
            errorMessage.textContent = (response.message);
    }
})

