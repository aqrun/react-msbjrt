import React from 'react';


export const ContentHeader = (props) => {
    return (
        <section className="content-header">
            <h1>{props.title}<small>{props.description}</small>
            </h1>
            <ol className="breadcrumb">
                <li><a href="#"><i className="fa fa-dashboard"></i> Backend</a></li>
                <li className="active">{props.title}</li>
            </ol>
        </section>
    );
}

export default ContentHeader;
