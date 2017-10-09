import React from 'react';
import Scope from '../../_base/ApplicationScope';
import ApplicationMediator, {TOPICS} from '../../helper/ApplicationMediator';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

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
                    <div>
                        <img src={this.props.url} />
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

export default class LegendComponent extends React.Component {

    state = {
        legends : []
    };

    constructor (props) {
        super(props);

        this.state.legends = Scope.$mapApi.getLegendsAsArray().filter((legend) => legend.enabled);

        ApplicationMediator.subscribe(TOPICS.REORDER_LAYERS, this.handleReorderLayers);
        ApplicationMediator.subscribe(TOPICS.TOGGLE_LAYER, this.handleToggleLayer);
    }

    componentWillUnmount () {
        ApplicationMediator.unsubscribe(this.handleReorderLayers);
        ApplicationMediator.unsubscribe(this.handleToggleLayer);
    }

    handleToggleLayer () {
        this.setState({
            legends : Scope.$mapApi._legends.filter((legend) => legend.enabled)
        });
    }

    handleSortLayersEnd = ({oldIndex, newIndex}) => {
        let legends = arrayMove(this.state.legends, oldIndex, newIndex);

        this.setState({
            legends
        });

        ApplicationMediator.publish(TOPICS.REORDER_LAYERS, legends);
    };

    render () {
        return (
            <div className={baseClass()}>
                <div className={baseClass("legend-container")}>
                    {this.state.legends.length ? (
                        <SortableList useDragHandle={true}
                                      lockToContainerEdges={true}
                                      lockAxis="y"
                                      onSortEnd={this.handleSortLayersEnd}
                                      items={this.state.legends} />
                    ) : (
                        <div className={baseClass("not-found")}>
                            <span>Não existem camadas ativas...</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}