const NonDOMComponent = (type, children) => {
    let parent = null;
    let setParent = (newParent) => children.map(child => child.setParent(newParent));
    return {
        args: { type, children },
        render: (newParent) => {
            parent = newParent;
            return children.map(child => child.render(newParent))
        },
        getParent: () => parent,
        setParent,
        getElement: () => parent,
        setElement: setParent,
    }
};

export default NonDOMComponent;