import react from 'react'


// clear local storage
// take us to login page?

const handleLogoutClick = () => {
    localStorage.setItem("login_token", '');
    localStorage.setItem("userType", '');

    console.log(localStorage.getItem('login_token'))
    console.log(localStorage.getItem('userType'))
    window.location = '/'
}

export default function Logout() {
    const logoutButton = (
        <button className='logout-btn' onClick={() => handleLogoutClick()}>
            Logout
        </button>
    );
    return (
        <div>
            {logoutButton}
        </div>
    )
}