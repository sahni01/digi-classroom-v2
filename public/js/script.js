
const CreateResult = document.getElementById('CreateResult')
const createButtton = document.getElementById('create-class-button')

createButtton.addEventListener('click', () => {
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('cpassword').value;
    if (password == cpassword) {

        const data = {

            name: document.getElementById('name').value,
            roomName: document.getElementById('roomName').value,
            email: document.getElementById('email').value,
            password: password,
            cpassword: cpassword
        };

        console.log(data);
        document.getElementById('name').value = "";
        document.getElementById('roomName').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('cpassword').value = "";



        fetch('/create', {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }

        }).then(res => {
            return res.json()
        }).then(json_res => {
            let result = json_res;
            console.log(json_res);
            CreateResult.style.display = 'flex';
            CreateResult.innerHTML = `
            <div id="result-container">
            <p>Congratulations,  Your Room generated Successfully Here are your details. Roomid:${result.roomid} and password:${result.password}</p>
            <a href='https%3A%2F%2Fwa.me%2F%3Ftext%3DDear%20Students%2C%0AHere%20are%20the%20details%20to%20join%20%24%7Bresult.roomName%7D%20class%20on%20Digi-classroom.%0Aroomid%3A%24%7Bresult.roomid%7D%0Apassword%3A%24%7Bresult.password%7D%0Aalso%20you%20can%20join%20by%20clicking%20on%20the%20link%20%3A%20https%3A%2F%2Fdigi-classroom.onrender.com%2Fjoin%2F%24%7Bresult.roomid%7D%3Fpassword%3D%24%7Bresult.password%7D' id="share-button" target="_blank">SHARE</a>
            <a href='/join/${result.roomid}?password=${result.password}' id="start-class" target="_blank">Start-Class</a>
            </div>
            `

        })

    } else {
        alert('Password and Confirm password are not Same');
    }
})