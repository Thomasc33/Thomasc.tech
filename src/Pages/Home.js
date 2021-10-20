import React from 'react';
import PageTemplate from '../Components/Template'

function HomePage(props) {
    return (
        <div>
            <PageTemplate highLight='0' {...props} />
        </div>
    )
}

export default HomePage
