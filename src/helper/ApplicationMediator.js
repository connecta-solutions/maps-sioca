import PubSub from 'pubsub-js';

export default class ApplicationMediator {

    static publish (TOPIC, payload) {
        PubSub.publish(TOPIC, payload);
    }

    static subscribe (TOPIC, cb) {
        PubSub.subscribe(TOPIC, cb);
    }

    static unsubscribe (cb) {
        PubSub.unsubscribe(cb);
    }
}

export const TOPICS = {
    REORDER_LAYERS : "REORDER_LAYERS",
    TOGGLE_LAYER : "TOGGLE_LAYER",
    CLICK_ON_MAP :  "CLICK_ON_MAP"
};