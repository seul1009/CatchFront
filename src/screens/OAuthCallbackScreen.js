import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OAuthCallbackScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        const state = queryParams.get('state');

        if (code) {
            // 서버로 인증 코드 전송하여 액세스 토큰 요청
            fetch('http://localhost:8080/naver/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, state }),
            })
                .then(response => response.json())
                .then(data => {
                    // 토큰을 통해 사용자 정보 요청
                    return fetch('https://openapi.naver.com/v1/nid/me', {
                        headers: {
                            Authorization: `Bearer ${data.access_token}`,
                        },
                    });
                })
                .then(response => response.json())
                .then(data => {
                    setUserInfo(data);
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, [location]);

    return (
        <div>
            <h1>OAuth Callback</h1>
            {userInfo ? (
                <div>
                    <h2>Welcome, {userInfo.response.name}</h2>
                    <img src={userInfo.response.profile_image} alt="Profile" />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OAuthCallbackScreen;
