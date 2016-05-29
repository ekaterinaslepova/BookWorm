
import React from 'react';
import {connect} from 'react-redux'
import * as action from '../actions'
import Category from './category'
import Description from './description'
import Buttons from './navigation'

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Category />
                <Description book={this.props.book} />
                <div className="app_cover">
                    <img src={'data:image/jpeg;base64,' + this.props.book.image} alt="Book cover"/>
                </div>
                <Buttons />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        book: state.history[state.currentBookHistoryIndex]
    }
}

export default connect(mapStateToProps)(App);
