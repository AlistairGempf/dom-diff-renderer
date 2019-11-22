const NonDOMComponent = (type, children, props) => {
    let parent = null;
    let setParent = (newParent) => children.map(child => child.setParent(newParent));
    return {
        args: { type, children, props },
        render: (newParent) => {
            parent = newParent;
            return children.map(child => child.render(newParent))
        },
        getParent: () => parent,
        setParent,
        getElement: () => parent,
        setElement: setParent,
        updateAttributes: () => null,
    }
};

export default NonDOMComponent;