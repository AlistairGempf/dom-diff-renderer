import DOMComponent from './DOMComponent';
import TextComponent from './TextComponent';

const Component = (type, children, props) => {
    const component = type == 'text'
        ? TextComponent('text', children, props)
        : DOMComponent(type, children, props);
    return {
        args: { type, children, props },
        ...component,
    }
};

export default Component;