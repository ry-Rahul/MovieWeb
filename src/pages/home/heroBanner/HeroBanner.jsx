import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

function HeroBanner() {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");

    // navigate to search page on enter key press
    const navigate = useNavigate();

    //useSelector hook use for get data from store
    const { url } = useSelector((state) => state.home);

    //For Banner we use upcoming movie images
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        // make a proper url for background images
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    // search query handler function for search input
    const searchQueryHandler = (e) => {
        if (query.length > 0 && e.key === "Enter") {
            //on enter key press navigate to search page
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div> 
            )}

            <div className="opacity-layer">

            </div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show..."
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default HeroBanner;
