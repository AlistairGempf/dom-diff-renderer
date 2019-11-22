const setAttribute = (element, attribute, value) => {
    if (value === false) {
        return;
    }
    if (value === true) {
        element.setAttribute(attribute, '');
        return;
    }
    element.setAttribute(attribute, value);
}

const DOMComponent = (type, children, attributes) => {
    let element = null;
    let parent = null;
    return {
        getElement: () => element,
        setElement: (el) => element = el,
        getParent: () => parent,
        setParent: newParent => parent = newParent,
        updateAttributes: newAttributes => {
            newAttributes && Object.keys(newAttributes).map(att => {
                if (newAttributes[att] === false) {
                    return;
                }
                const value = element.getAttribute(att);
                const newValue = newAttributes[att] !== true ? newAttributes[att] : '';
                if (value != newValue) {
                    setAttribute(element, att, newValue);
                }
            });
            console.log(attributes, newAttributes);
            attributes && Object.keys(attributes).map( att => {
                if (!newAttributes || !att in newAttributes) {
                    element.removeAttribute(att);
                }
            });
        },
        render: newParent => {
            if (!element) {
                parent = newParent;
                const el = document.createElement(type);
                children.map(child => {
                    const res = child.render(el);
                    el.appendChild(res);
                });
                element = el;
                attributes
                    && Object.keys(attributes)
                        .map(att => setAttribute(element, att, attributes[att]));
            }
        return element;
    }
}
};

export default DOMComponent;