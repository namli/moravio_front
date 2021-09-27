import React, { useState } from 'react';
import Search from './Search';
import Gif from './Gif';
import { fetchListOfGifs } from '../api/fetch.gif'

const App = () => {
    const [searchText, setSearchState] = useState('');
    const [gifs, setGifs] = useState([]);
    const [loader, setLoader] = useState(true);
    const [isError, setIsError] = useState(false);

    const search = async (searchText) => {
        setIsError(false);
        setLoader(true);

        try {
            const { data } = await fetchListOfGifs(searchText);
            setGifs(data);
            setSearchState(searchText);
        } catch (error) {
            setIsError(true);
            console.log(error);
        }
        setLoader(false);
    };

    return (
        <div className="container">
            <h1 className="inscApp">The GIF Search </h1>
            <Search
                onSearch={search}
            />
            {isError && <div>Something went wrong ...</div>}
            <div className="row">
                {
                    gifs.map((gif) => (
                        <Gif
                            key={gif.id}
                            loader={loader}
                            data={gif}
                        />
                    ))
                }
            </div>

        </div>
    );
};

export default App;

