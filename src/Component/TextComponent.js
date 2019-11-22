const TextComponent = (type, children) => {
    let element = null;
    return {
        getElement: () => element,
        render: () => {
            if (!element) {
                const el = document.createTextNode(children.join(''));
                element = el;
            }
            return element;
        }
    }
};

export default TextComponent;