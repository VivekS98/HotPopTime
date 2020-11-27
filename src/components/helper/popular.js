import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card';
import { useHistory, useParams} from 'react-router-dom';
import { fetchList } from '../../service/api';

export default function Popular({ propType }){
    const [popular, setPopular] = useState(null);
    const history = useHistory();
    const { type } = useParams();

    let popularList = null;
    useEffect(() => {
        fetchList(type, 'popular').then(data => {
            setPopular(data.results);
            console.log(data.results);
        })
                .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(popular) {
        popularList = popular.map((val, ind) => {
            return <MovieCard key={ind} movie={val} />
        });
    }

    const showContent = () => {
        if(propType === 'row') {
            return (
                <React.Fragment>
                    <h2 className="text-white ml-3">Popular</h2>
                    <div className="movie-list d-flex flex-row overflow-auto">
                    {popularList}
                    <div className="movie-card text-center text-secondary" style={{padding: '150px 100px'}} onClick={() => handleClick()}><b>More</b></div>
                    </div>
                </React.Fragment>
            );
        }
    }
    
    const handleClick = () => {
        history.push(`/${type}/popular`);
    }

    return (
        <React.Fragment>
            {showContent()}
        </React.Fragment>
    );
}