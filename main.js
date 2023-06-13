// register page
function register(event) {
    event.preventDefault();
    // alert("function called")
    var name = document.getElementById("username").value
    // console.log(name, "name here")
    var email = document.getElementById("useremail").value
    // console.log(email);
    var password = document.getElementById("userpassword").value
    // console.log(password)
    var confirmpassword = document.getElementById("userconfirmpassword").value
    // console.log(confirmpassword);

    if (name && email && password && confirmpassword) {
        if (password.length >= 8 && confirmpassword.length >= 8) {

            if (password == confirmpassword) {

                var Ls = JSON.parse(localStorage.getItem("InstaUsers")) || []
                var flag = false;
                for (var i = 0; i < Ls.length; i++) {
                    if (Ls[i].userEmail == email) {
                        flag = true;
                    }
                }
                if (!flag) {
                    var userdata = {
                        userName: name,
                        userEmail: email,
                        userPassword: password,
                        userConfirmPassword: confirmpassword
                    }
                    Ls.push(userdata);
                    localStorage.setItem("InstaUsers", JSON.stringify(Ls))
                    alert("Registration Successful")
                    window.location.href = "./login.html";
                    document.getElementById("username").value = ""
                    document.getElementById("useremail").value = ""
                    document.getElementById("userpassword").value = ""
                    document.getElementById("userconfirmpassword").value = ""
                }
                else {
                    alert("Email aleready exist")
                }
            }
            else {
                alert("password not match");
            }

        } else {
            alert("password should  include 8 or more characters");
        }
    } else {
        alert("please fill all fields");
    }

}


// login page

function login(event) {
    event.preventDefault();

    var userEmail = document.getElementById("useremail").value;
    var userPassword = document.getElementById("userpassword").value;

    var Ls = JSON.parse(localStorage.getItem("InstaUsers"));
    var currentUser;
    var flag = false;
    for (var i = 0; i < Ls.length; i++) {
        if (Ls[i].userEmail == userEmail && Ls[i].userPassword == userPassword) {
            flag = true;
            currentUser = Ls[i];
        }
    }
    if (flag == true) {
        localStorage.setItem("InstaCurrentUser", JSON.stringify(currentUser));
        alert("login successfull")
        window.location.href = "./index.html";
    }
    else {
        alert("Credintails not matched")
    }

}


//side search-bar
function openNav() {
    document.getElementById("mySidenav").style.width = "40rem";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


// search user
function search_user() {

    var LS = JSON.parse(localStorage.getItem("InstaUsers"))
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    var divForList = document.getElementsByClassName("searchResult");
    var showRes = document.getElementById("show")

    var listOfUsers = []

    for (var i = 0; i < LS.length; i++) {

        if (LS[i].userName.toLowerCase().includes(input)) {
            listOfUsers += `
                 <div class="searchResWrapper">
                    <div class="divImg">
                         <img src="${LS[i].userbio.pimage}"/>
                         <span class="searchResult"  onclick='redirectToProfile(${JSON.stringify(LS[i])})'>${LS[i].userName}</span>
                    </div>
                   
                    <span class="searchResultFollowTxt"  onclick='follow(${JSON.stringify(LS[i])})'>Follow</span>
                 </div>
                            `

        }

    }
    divForList = listOfUsers;
    showRes.innerHTML = divForList;
    console.log(divForList);
}



// redirecting to user profile from serach result

function redirectToProfile(product) {
    var single_Profile = JSON.stringify(product);
    // console.log(s, " s here")
    // alert("Working")
    localStorage.setItem("SearchProfile", single_Profile);
    window.location.href = './SearchProfile.html'
}



//following 

function follow() {
    var userData = JSON.parse(localStorage.getItem("InstaUsers"))
    var userDataforfollwing = JSON.parse(localStorage.getItem("InstaUsers"))
    var othersProfile = JSON.parse(localStorage.getItem("SearchProfile"))
    var currentUser = JSON.parse(localStorage.getItem("InstaCurrentUser"))
    var folloerCount = 0;
    var followingCount = 0;
    for (var i = 0; i < userData.length; i++) {
        if (othersProfile.userEmail == userData[i].userEmail) {
            if (userData[i].followers === undefined) {
                userData[i].followers = 0;
            }
            else {
                folloerCount++

                userData[i].followers = folloerCount;
                console.log(folloerCount,"folloerCount");
            }
        }
    }
    localStorage.setItem("InstaUsers", JSON.stringify(userData));

    for (var i = 0; i < userDataforfollwing.length; i++) {
        if (currentUser.userEmail == userDataforfollwing[i].userEmail) {
            if (userDataforfollwing[i].following === undefined) {
                userDataforfollwing[i].following = 0;
            }
            else {
                followingCount++

                userDataforfollwing[i].following = followingCount;
            }
        }
    }
    localStorage.setItem("InstaUsers", JSON.stringify(userDataforfollwing));

    alert("following!")
    window.location.reload();

}