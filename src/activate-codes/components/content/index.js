import React from 'react';

export const Content = (props) => {
    return (
        <section className="content">
            <div className="row">
                <div className="col-md-12">
                    {/*Alert data*/}
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">{props.boxTitle}</h3>
                        </div>
                        <div className="box-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Content;
