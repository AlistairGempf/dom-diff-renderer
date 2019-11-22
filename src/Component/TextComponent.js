const TextComponent = (type, children) => {
    let element = null;
    let parent = null;
    return {
        getElement: () => element,
        setElement: (el) => element = el,
        getParent: () => parent,
        setParent: (newParent) => parent = newParent,
        render: (newParent) => {
            parent = newParent;
            if (!element) {
                const el = document.createTextNode(children.join(''));
                element = el;
            }
            return element;
        }
    }
};

export default TextComponent;