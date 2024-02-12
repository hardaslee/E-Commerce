import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";


function Filter(props) {
    const {t, i18n } = useTranslation();

    return (
        <div className="filter">
            <span className="hideFilter">
                {t('filter.filter')}{" "}
                <svg
                    aria-hidden="true"
                    class="icon-filter-ds"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="24px"
                    height="24px"
                    fill="none"
                >
                    <path
                        stroke="currentColor"
                        stroke-width="1.5"
                        d="M21 8.25H10m-5.25 0H3"
                    ></path>
                    <path
                        stroke="currentColor"
                        stroke-width="1.5"
                        d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                        clip-rule="evenodd"
                    ></path>
                    <path
                        stroke="currentColor"
                        stroke-width="1.5"
                        d="M3 15.75h10.75m5 0H21"
                    ></path>
                    <path
                        stroke="currentColor"
                        stroke-width="1.5"
                        d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </span>

            <div className="filterMain">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {t('filter.gender')}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/male">Male</Dropdown.Item>
                        <Dropdown.Item href="#/female">Female</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {t('filter.features')}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/male">Something</Dropdown.Item>
                        <Dropdown.Item href="#/female">
                            Something2
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <div className="slideContainer">
                    <span>{t('filter.price')}</span>
                    <input type="range" min="1" max="100" className="slider" />
                </div>
            </div>
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback = "">
            <Filter />
        </Suspense>
    )
}
