import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
    state = {
        searchData: "",
    };

    onSearchChange = (e) => {
        const searchData = e.target.value;
        this.setState({ searchData });
        this.props.onSearchChange(searchData);
    };
    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="type to search"
                value={this.state.searchData}
                onChange={this.onSearchChange}
            />
        );
    }
}
