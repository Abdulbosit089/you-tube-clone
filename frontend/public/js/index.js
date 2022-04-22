/*

                    <li class="channel" data-id="1">
                        <a href="#">
                            <img src="https://cdn-icons-png.flaticon.com/512/146/146031.png" alt="channel-icon" width="30px" height="30px">
                            <span>Hikmat</span>
                        </a>
                    </li>

*/
const API = "https://you-tube-by-abdulbosit.herokuapp.com"

const membersList = document.querySelector(".navbar-list")
const homeYoutube = document.querySelector(".channel active")
const avatarButton = document.querySelector(".avatar-img")
const h1 = document.querySelector("h1")

async function getMembers(){
    membersList.innerHTML = null
    let response = await fetch(API+"/users")
    response = await response.json()

    

    membersList.append(h1,homeYoutube)
}

getMembers()

avatarButton.addEventListener("click",()=>{
    window.location = "/register"
})