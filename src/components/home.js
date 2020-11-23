import React, { useState } from 'react';
import '../styling/App.css';

function Home(props) {
    const [list, setList] = useState(props.list);
    return (
        <div className="home">
            <h2>Under Development!</h2>
        </div>
    );
}

export default Home;