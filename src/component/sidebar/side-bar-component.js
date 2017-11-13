import React, {Component} from "react";

class SideBarComponent extends Component {

    _baseClass = "sioca-map-side-bar-component";

    state = {
        toggled : false
    };

    toggleSideBar = () => {
        this.setState({
            toggled : !this.state.toggled
        });
    };

    render () {
        return (
            <div className={this._baseClass}>
                <div className={this._baseClass + "-general-container"}>
                    <div className={this._baseClass + "-toggle-button"}
                         onClick={this.toggleSideBar}
                         style={{
                             left : !this.state.toggled ? 350 : 0
                         }}>
                        {this.props.icon}
                    </div>
                    <div className={this._baseClass + "-side-bar"}
                         style={{
                             width : !this.state.toggled ? 0 : 350
                         }}>
                        <div className={this._baseClass + "-side-bar-content"}
                        style={{
                            display : !this.state.toggled ? "none" : "block"
                        }}>
                            <div className={this._baseClass + "-body"}>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBarComponent;