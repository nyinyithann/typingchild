import React from 'react';

function Letter({value, style}) {
    return (
        <div className={style.bg}>
            <span className={style.text}>{value}</span>
        </div>
    );
}

export default React.memo(Letter);

