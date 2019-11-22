import DOMComponent from './DOMComponent';
import TextComponent from './TextComponent';

const Component = (type, children) => {
    const component = type == 'text'
        ? TextComponent('text', children)
        : DOMComponent(type, children);
    return {
        args: { type, children },
        ...component,
    }
};

export default Component;