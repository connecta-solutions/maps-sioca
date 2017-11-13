import React from 'react';
import Scope from '../../_base/ApplicationScope';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import ApplicationMediator, {TOPICS} from "../../helper/ApplicationMediator";
import OccurrenceLegendDecorator from "../../decorators/OccurrenceLegendDecorator";

const baseClass = (className) => {
    let cssClass = "sioca-map-legend-component";

    className ? cssClass += "-" + className : "";

    return cssClass;
};

const DragHandle = SortableHandle(({title}) => {
    return (
        <div className={baseClass("sortable-handle")}>
            <div className="handle-container">
                <div className="handle" />
            </div>
            <span className="title">{title}</span>
        </div>
    );
});

const SortableItem = SortableElement((props) => {
    return (
        <LegendBox {...props} />
    );
});

const SortableList = SortableContainer(({items}) => {

    return (
        <div className={baseClass("sortable-list")}>
            {items.map((legend, index) => (
                <SortableItem key={index}
                              index={index}
                              {...legend} />
            ))}
        </div>
    );
});

class LegendBox extends React.Component {

    state = {
        collapsed : true
    };

    handleCollapseBox = () => {
        this.setState({
            collapsed : !this.state.collapsed
        });
    };

    render () {
        return (
            <div className={baseClass("sortable-item")}
                 style={{
                     height: this.state.collapsed ? "auto" : 25,
                     fontFamily: "Roboto, sans-serif"
                 }}>
                <DragHandle title={this.props.title} />
                <div>
                    <div className={baseClass("legend-body")}>
                        {!this.props.occurrenceLayer ? (
                            <img src={this.props.url} />
                        ) : (
                            <OccurrenceLayerLegend />
                        )}
                    </div>
                </div>
                <div className={baseClass("collapse-handle")}
                     onClick={this.handleCollapseBox} style={{
                    transform: this.state.collapsed ? "rotate(-90deg)" : "rotate(90deg)"
                }}>
                    <PlayArrow />
                </div>
            </div>
        )
    }
}

class OccurrenceLayerLegend extends React.Component {

    _legends = OccurrenceLegendDecorator;

    _legendsKeys;

    _legendLines = [];

    componentWillMount () {
        this._legendsKeys = Object.keys(this._legends);
        this.buildLegendTable();
    }

    buildLegendTable = () => {
        let arr = Object.assign(this._legendsKeys);

        while (arr.length) {
            let line = arr.splice(0, 3);
            this._legendLines.push(line);
        }

        this._legendLines.forEach((line) => {
            line.title = OccurrenceLegendDecorator[line[0]].title;
        });
    };

    render () {
        return (
            <div className={baseClass("occurrence-layer-legend-container")}>
                <div className={baseClass("legend-header")}>
                    <div className="head">
                        Tipo Ocorrência
                    </div>
                    <div className="occurrence-type">
                        Aberta
                    </div>

                    <div className="occurrence-type">
                        Fechada
                    </div>

                    <div className="occurrence-type">
                        Emergencial
                    </div>
                </div>
                {this._legendLines.map((line) => {
                    return (
                        <div className={baseClass("legend-body")}
                             key={line.title}>

                            <div className="line-title">
                                {line.title}
                            </div>

                            {line.map((lineKey) => {
                                return (
                                    <div key={lineKey}
                                         className="legends"
                                         ref={(el) => {
                                             if (el) {el.innerHTML = OccurrenceLegendDecorator[lineKey].html}
                                         }}/>
                                )
                            })}

                        </div>
                    );
                })}
            </div>
        );
    }
}

export default class LegendComponent extends React.Component {

    state = {
        legends : []
    };

    constructor (props) {
        super(props);

        this.state = {
            legends : Scope.$mapApi.getLegendsArray()
        };
    }

    componentDidMount () {
        ApplicationMediator.subscribe(TOPICS.REORDER_LAYERS, () => this.onReorderLayers());
        ApplicationMediator.subscribe(TOPICS.INSERT_OCCURRENCE_LAYER, () => this.onToggleOccurrenceLayer());
        ApplicationMediator.subscribe(TOPICS.REMOVE_OCCURRENCE_LAYER, () => this.onToggleOccurrenceLayer());
    }

    componentWillUnmount () {
        ApplicationMediator.unsubscribe(TOPICS.REORDER_LAYERS, () => this.onReorderLayers());
        ApplicationMediator.unsubscribe(TOPICS.INSERT_OCCURRENCE_LAYER, () => this.onToggleOccurrenceLayer());
        ApplicationMediator.unsubscribe(TOPICS.REMOVE_OCCURRENCE_LAYER, () => this.onToggleOccurrenceLayer());
    }

    onReorderLayers = () => {
        try {
            this.setState({
                legends : Scope.$mapApi.getLegendsArray()
            });
        } catch (e) {

        }
    };

    onToggleOccurrenceLayer = () => {
        this.forceUpdate();
    };

    handleSortLayersEnd = ({oldIndex, newIndex}) => {
        Scope.$mapApi.reorderLayersOnMap({oldIndex, newIndex});
    };

    render () {
        return (
            <div className={baseClass()}>
                <div className={baseClass("legend-container")}>
                    { Scope.$mapApi.hasOccurrenceLayer && Scope.$mapApi.occurrenceLayerIsChecked && (
                        <div className={baseClass("occurrence-layer-legend")}>
                            <LegendBox occurrenceLayer={true}
                                       title="Ocorrências"
                            />
                        </div>
                    )}

                    {(this.state.legends.length) ? (
                        <SortableList useDragHandle={true}
                                      lockToContainerEdges={true}
                                      lockAxis="y"
                                      onSortEnd={this.handleSortLayersEnd}
                                      items={this.state.legends} />
                    ) : (
                        (!Scope.$mapApi.hasOccurrenceLayer || (Scope.$mapApi.hasOccurrenceLayer && !Scope.$mapApi.occurrenceLayerIsChecked)) && (
                            <div className={baseClass("not-found")}>
                                <span>Não existem camadas ativas...</span>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}