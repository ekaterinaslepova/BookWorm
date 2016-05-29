import React from 'react'

class Description extends React.Component {
    render() {
        return (
            <div className="app_description">
                <p><strong>{this.props.book.title}</strong></p>
                <p><i>{this.props.book.author}</i></p>
                <p><b>Publisher:</b> {this.props.book.publisher}</p>
                <p><b>Year:</b> {this.props.book.year}</p>
                <p><b>Pages:</b> {this.props.book.pages}</p>
                <p><b>Category:</b> {this.props.book.category}</p>
            </div>
        )
    }
}

export default Description;