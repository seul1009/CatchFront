import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InfoScreen() {
    const [user, setUser] = useState({
        username: ""
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://localhost:8080/api/info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    setUser({
                        username: response.data.username,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    const handlePasswordChange = () => {
        alert("비밀번호가 변경되었습니다.");
    };

    return (
        <div style={styles.container}>
            <div style = {styles.sectionTop}>
                <p><strong>이름</strong><span style={{marginLeft: '30px'}}>{user.username}</span></p>
                <button onClick={handlePasswordChange} style={styles.button}>
                    비밀번호 변경
                </button>
            </div>

            <div style={styles.sectionBottom}>
                <ul style={styles.navList}>
                    <li style={styles.navItem}><a href="/terms">이용 약관</a></li>
                    <li><a href="/privacy">개인정보 처리 방침</a></li>
                </ul>
            </div>
        </div>
    );
}

const styles = {
    navList: {
        display: 'flex',
        alignItems: 'center',
        listStyleType: 'none',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
    },
    navItem: {
       padding: '20px',
    },
    container: {
        width: '80%', // 화면 너비의 80%
        height: '80vh',
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        display: 'flex',
        flexDirection: 'column',

    },
    sectionTop: {
        top:0,
        padding: "20px"
    },
    sectionBottom: {
        marginTop: 'auto',
    },
    input: {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        border: "1px solid #ccc",
        borderRadius: "4px"
    },
    button: {
        marginTop: "10px",
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    }
};

export default InfoScreen;
