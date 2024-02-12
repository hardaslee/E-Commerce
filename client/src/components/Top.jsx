import React, { useRef, useEffect } from "react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

function Top(props) {
    const {t, i18n } = useTranslation();
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => console.log("Error playing video:", error));
        }
    }, []);

    return (
        <div className="top">
            <h1 id="hook">{t('main.header')}</h1>
            <div className="buttons-container">
                <button className="top-button">{t('main.shopBtn')}</button>
                <button className="top-button">{t('main.dealsBtn')}</button>
            </div>
            <div className="video-container">
                <video ref={videoRef} autoPlay loop muted playsinline className="background-video">
                    <source src="./video/video3.mp4" type="video/mp4"/>
                    {t('main.videoMsg')}
                </video>
            </div>
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback = "...loading">
            <Top />
        </Suspense>
    )
}
