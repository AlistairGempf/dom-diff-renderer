const NonDOMComponent = (type, children) => ({
    args: { type, children },
    render: () => children.map(child => child.render())
});

export default NonDOMComponent;