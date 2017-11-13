import React, {Component} from 'react';
import Scope from "../../_base/ApplicationScope";
import {Treebeard} from "react-treebeard";
import DefaultTheme from 'react-treebeard/src/themes/default';
import decorators from '../../decorators/SortabletreeDecorators';
import {Checkbox} from "material-ui";
import ApplicationMediator, {TOPICS} from "../../helper/ApplicationMediator";

class TocComponent extends Component {

    _baseClass = "sioca-map-toc-component";

    _layers = Scope.$layers;

    _hasOccurrenceLayer = false;

    state = {
        occurrenceLayerIsChecked : true
    };

    constructor (props) {
        super(props);

        if (Scope.$mapApi) {
            this._hasOccurrenceLayer = Scope.$mapApi.hasOccurrenceLayer;

            this.state = {
                occurrenceLayerIsChecked : Scope.$mapApi.occurrenceLayerIsChecked
            }
        }
    }

    componentDidMount () {
        ApplicationMediator.subscribe(TOPICS.INSERT_OCCURRENCE_LAYER, (TOPIC, toggle) => this.onToggleOccurrenceLayer(toggle));
        ApplicationMediator.subscribe(TOPICS.REMOVE_OCCURRENCE_LAYER, (TOPIC, toggle) => this.onToggleOccurrenceLayer(toggle));
    }

    componentWillUnmount () {
        ApplicationMediator.unsubscribe(TOPICS.INSERT_OCCURRENCE_LAYER, (TOPIC, toggle) => this.onToggleOccurrenceLayer(toggle));
        ApplicationMediator.unsubscribe(TOPICS.REMOVE_OCCURRENCE_LAYER, (TOPIC, toggle) => this.onToggleOccurrenceLayer(toggle));
    }

    toggleLayer = (layer) => {
        Scope.$mapApi.toggleLayer(layer);
    };

    onToggleTree = (node) => {
        if (node.type === "ITEM") {
            this.toggleLayer(node);
        }

        node.toggled = !node.toggled;

        this.forceUpdate();
    };

    onToggleOccurrenceLayer = (toggle) => {
        this._hasOccurrenceLayer = toggle;
        this.forceUpdate();
    };

    handleCheckOccurrenceLayer (toggle) {
        this.setState({
            occurrenceLayerIsChecked : toggle
        });

        Scope.$mapApi.toggleOccurrenceLayer(toggle);
    }

    render() {
        DefaultTheme.tree.base.backgroundColor = "transparent";
        DefaultTheme.tree.base.color = "#000";
        DefaultTheme.tree.node.header.base.color = "#000";

        return (
            <div className={this._baseClass}>
                {this._hasOccurrenceLayer && (
                    <div className={this._baseClass + "-occurrence-layer"}>
                        <Checkbox checked={this.state.occurrenceLayerIsChecked}
                                  label={"Camada de Ocorrências"}
                                  onCheck={(event, toggle) => this.handleCheckOccurrenceLayer(toggle)}/>
                    </div>
                )}

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
