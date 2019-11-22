const DOMComponent = (type, children) => {
    let element = null;
    return {
        getElement: () => element,
        render: () => {
            if (!element) {
                const el = document.createElement(type);
                children.map(child => {const res = child.render(); el.appendChild(res)});
                element = el;
            }
        
        return element;
    }
}
};

export default DOMComponent;