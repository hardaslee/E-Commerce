import React from "react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

function ShopToday(props) {
    const {t, i18n } = useTranslation();

    return (
        <div id="shopToday">
            <h6>{t('main.shopToday')}</h6>
                <a>{t('main.shop')}</a>
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback = "">
            <ShopToday />
        </Suspense>
    )
}