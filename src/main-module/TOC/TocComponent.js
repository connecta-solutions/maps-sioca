import React, {Component} from 'react';
import Scope from "../../_base/ApplicationScope";
import {Treebeard} from "react-treebeard";
import DefaultTheme from 'react-treebeard/src/themes/default';
import decorators from '../../decorators/SortabletreeDecorators';

class TocComponent extends Component {

    _baseClass = "sioca-map-toc-component";

    _layers = Scope.$layers;

    toggleLayer = (layer) => {
        Scope.$mapApi.toggleLayer(layer);
    };

    onToggleTree = (node, toggled) => {
        if (node.type === "ITEM") {
            this.toggleLayer(node);
        }

        node.toggled = !node.toggled;

        this.forceUpdate();
    };

    render() {
        DefaultTheme.tree.base.backgroundColor = "transparent";
        DefaultTheme.tree.base.color = "#000";
        DefaultTheme.tree.node.header.base.color = "#000";

        return (
            <div className={this._baseClass}>
                <Treebeard data={this._layers}
                           style={DefaultTheme}
                           decorators={decorators}
                           onToggle={this.onToggleTree}
                />
            </div>
        );
    }
}

export default TocComponent;
