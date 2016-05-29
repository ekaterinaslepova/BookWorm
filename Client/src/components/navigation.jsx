import React from 'react'
import {connect} from 'react-redux'
import * as action from '../actions'

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }
    
    next() {
        const {dispatch} = this.props;
        const category = this.props.category;
        const hasCategory = !!category;
        let sendRequest = false;
        if (hasCategory) {
            const categoryIndexes = this.props.categoryIndexes;
            sendRequest = categoryIndexes.indexOf(this.props.index) >= categoryIndexes.length - 1;
        } else {
            sendRequest = this.props.index >= this.props.history.length - 1;
        }

        if (sendRequest) {
            dispatch(action.nextBookRequest(hasCategory ? category : null));
        } else {
            dispatch(action.nextBook());
        }
    }
    
    prev() {
        this.props.dispatch(action.prevBook());
    }
    
    render() {
        return (
            <div className="app_buttons">
                <a href="#" onClick={this.prev} className="app_buttons_button">Previous</a>
                <a href="#" onClick={this.next} className="app_buttons_button">Next</a> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        history: state.history,
        index: state.currentBookHistoryIndex,
        category: state.currentCategory,
        categoryIndexes: state.currentCategoryIndexes
    }
}

export default connect(mapStateToProps)(Buttons);