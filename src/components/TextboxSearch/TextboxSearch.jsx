import React, { useState } from 'react';

function TextboxSearch({ handleSearch }) {
    const [key, setKey] = useState();
    return (
        <div className="search-container">
            <div className="search-input-container">
                <input type="text" className="search-input" placeholder="Search" onChange={(e) => setKey(e.target.value)} />
            </div>
            <div className="search-button-container">
                <button className="search-button" onClick={() => { handleSearch(key) }}>
                    <i className="fas fa-search" />
                </button>
            </div>
        </div>
    );
}

export default TextboxSearch;