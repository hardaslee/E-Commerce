import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Footer() {
    const {t, i18n } = useTranslation();
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h5 className="titles">EE LUX</h5>
                    <Link className="info" to="/">FEEDBACK</Link>

                    <a href="API.html">{t('footer.doc')}</a>
                </div>
                <div className="footer-section">
                    <h5 className="titles">{t('footer.info')}</h5>
                    <Link className="info" to="/">{t('footer.status')}</Link>
                    <Link className="info"  to="/">{t('footer.shipping')}</Link>
                    <Link className="info"  to="/">{t('footer.returns')}</Link>
                    <Link className="info"  to="/">{t('footer.payments')}</Link>
                    <Link className="info"  to="/">{t('footer.contact')}</Link>
                </div>
                <div className="footer-section">
                    <h5 className="titles">{t('footer.about')}</h5>
                    <Link className="info" to="/">{t('footer.news')}</Link>
                    <Link className="info" to="/">{t('footer.careers')}</Link>
                </div>

                <div className="footer-section">
                <a className="info" href="https://twitter.com"><FaTwitter /></a>
                    <a className="info" href="https://facebook.com"><FaFacebookF /></a>
                    <a className="info" href="https://youtube.com"><FaYoutube /></a>
                    <a className="info" href="https://instagram.com"><FaInstagram /></a>
                </div>

            </div>
            <div >
                <div className="footer-legal">
                <Link id="copy" to="/">&copy; {new Date().getFullYear()} EE Lux. {t('footer.rights')}</Link>
                    <Link to="/">{t('footer.privacy')}</Link>
                    <Link to="/">{t('footer.cookie')}</Link>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
