import React, { useRef } from "react";
import {
    //icons for left  right arrow
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircleRating from "../circleRating/CircleRating";

//for formating date and time we use dayjs library
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";

import "./style.scss";
import Genres from "../genres/Genres";
import { Fragment } from "react";

// carousel component___________________________________________________________
function Carousel({ data, loading,endPoint }) {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        //  it contains the reference of the carouselItems div
        const container = carouselContainer.current;

        // offsetWidth is the width of the carouselItems div
        // container.scrollLeft is the amount of scroll in the carouselItems div
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        console.log(scrollAmount, container.scrollLeft, container.offsetWidth);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    // skeleton item for loading
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"> </div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />

                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")}
                />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type ||endPoint}/${
                                    item.id
                                }`)}>
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating
                                            rating={item.vote_average.toFixed(
                                                1
                                            )}
                                        />
                                        <Genres
                                            data={item.genre_ids.slice(0, 2)}
                                        />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton" ref={carouselContainer}>
                            {[...Array(4)].map((_, i) =>
                                <Fragment key={i}>
                                skItem()
                                </Fragment>
                            )
                            }
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
}

export default Carousel;
