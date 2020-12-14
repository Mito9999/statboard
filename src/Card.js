import React from "react";

const Card = ({ jsonData }) => (
    <>
        <div className="card">
            <div className="card--title">10fastfingers.com</div>
            <div className="card--data">
                <div>
                    <span>{jsonData.languages_sorted[0][0].anzahl}</span>
                    TESTS
                </div>
                <div>
                    <span>{jsonData.avg_norm}</span>
                    WPM
                </div>
            </div>
        </div>
    </>
);

export default Card;
