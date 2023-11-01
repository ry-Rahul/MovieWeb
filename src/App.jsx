import "./App.css";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getApiConfiguration } from "./store/homeSlice";
import { BrowserRouter as Router ,Routes, Route  } from "react-router-dom";

// Components import___________________________________________________________
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
// Components import End here___________________________________________________


function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    // console.log(url);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            // console.log("apiTesting -> res", res);

            const url = {
                backdrop : res.images.secure_base_url + "original",
                poster : res.images.secure_base_url + "original",
                profile : res.images.secure_base_url + "original",
            }

            dispatch(getApiConfiguration(url));
        });
    };


    const genresCall = async () => {
        let promises = [];
        let endPoints = ['movie', 'tv'];
        let allGenres = {};

        let i = 0;
        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        // console.log(data);
        data.map(({ genres }) => {
            return genres.map((item) => allGenres[item.id] = item);
        })
 
        // console.log(allGenres)
        dispatch(getGenres(allGenres))

    }



    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
