const NonDOMComponent = (type, children) => ({
    args: { type, children },
    render: () => children.map(child => child.render()),
    getElement: () => null,
    setElement: (el) => null,
});

export default NonDOMComponent;