import React from 'react';
import {connect} from 'react-redux'
import * as action from '../actions'

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.changeCategory = this.changeCategory.bind(this);
    }
    
    changeCategory(category) {
        const {dispatch} = this.props;

        dispatch(action.changeCategory(category));

        const hasBookInCategory = this.props.history.find((book) => {
            if (book.category === category) {
                return true;
            }
        });

        if (!hasBookInCategory) {
            dispatch(action.nextBookRequest(category));
        }
    }
    
    render() {
        return ( 
            <div className="app_category">
                <p><b>Select Category</b></p>
                <select className="app_category_select"
                        onChange={(e) => { this.changeCategory(e.target.value) }}>
    
                    <option defaultValue value="">All</option>
    
                    {this.props.categories.map((category, i) => {
                        return <option key={i} value={category}>{category}</option>
                    })}
                </select>
            </div> )
    }
}

function mapStateToProps(state) {
    return {
        history: state.history,
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Category);