import React from "react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

function Promotion() {
    const {t, i18n } = useTranslation();

    return (
        <div className="promotion">
            <h4>{t('filter.trending')}</h4>
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback = "">
            <Promotion />
        </Suspense>
    )
}
