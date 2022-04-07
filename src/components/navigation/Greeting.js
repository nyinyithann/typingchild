import React from 'react';

const getGreeting = (name) => {
    const date = new Date();
    const hours = date.getHours();
    const firstName = name ? name.split(' ')[0] : '';
    return (hours < 12 ? "Good Morning" : hours <= 18 && hours >= 12 ? "Good Afternoon" : "Good Evening") + (firstName ? ", " + firstName : '');
};

function Greeting({brand, name = '', className}) {
    const greeting = React.useMemo(() => {
        return brand || getGreeting(name);
    }, [brand, name]);
    return <span className={className}>{greeting}</span>;
}

export default Greeting;
