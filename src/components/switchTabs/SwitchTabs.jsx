import React, { useState } from "react";
import "./style.scss";

function SwitchTabs({ data, onTabChange }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (item, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(item);
    };

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((item, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectedTab == index ? "active" : ""
                        }`}
                        onClick={() => activeTab(item, index)}
                    >
                        {item}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
    );
}


export default SwitchTabs;
