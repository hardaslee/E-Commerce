import React from "react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

function Discover() {
    const { t, i18n} = useTranslation();
    return (
        <div className="Discover">
            <h4>{t('filter.discover')}</h4>
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback = "...loading">
            <Discover />
        </Suspense>
    )
}
