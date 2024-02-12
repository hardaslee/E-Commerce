import React from "react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

function Exclusive() {
    const { t, i18n } = useTranslation();

    return (
        <div className="Exclusive">
            <h4>{t('filter.exclusive')}</h4>
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback = "">
            <Exclusive />
        </Suspense>
    )
}
