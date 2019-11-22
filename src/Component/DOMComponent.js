const DOMComponent = (type, children) => {
    let element = null;
    let parent = null
    return {
        getElement: () => element,
        setElement: (el) => element = el,
        getParent: () => parent,
        setParent: (newParent) => parent = newParent,
        render: (newParent) => {
            if (!element) {
                parent = newParent;
                const el = document.createElement(type);
                children.map(child => {
                    const res = child.render(el);
                    el.appendChild(res);
                });
                element = el;
            }
        
        return element;
    }
}
};

export default DOMComponent;