import React from 'react';


const Pagination = (props) => {
    let pageLinks = []
    
    for(let i = 1; i <= props.pages ; i++ ) {
        let active = props.currentPage === i ? 'active' : '';
        pageLinks.push(<a href="#" className={`${active}`} key={i} onClick={() => props.changePage(i)}>{i}</a>)              
    }
    return (
            <div className="container">
                <div className="row">
                    <div className="pagination">
                        { props.currentPage > 1 ? <a href="#" onClick={() => props.changePage(props.currentPage - 1)}>Prev</a> : ''}
                        {  pageLinks }
                        { props.currentPage < props.pages  ? <a href="#"  onClick={() => props.changePage(props.currentPage + 1)}>Next</a> : ''} 
                    </div>
                </div>        
            </div>
    )
}

export default Pagination