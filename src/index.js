import Component from './Component/Component';
import NonDOMComponent from './Component/NonDOMComponent';

const rerender = (currentComponent, component) =>
    currentComponent
        .getParent()
        .replaceChild(
            component.render(currentComponent.getParent()),
            currentComponent.getElement(),
        );

const zip = rows => rows[0].map((_,c)=>rows.map(row=>row[c]));

const elementsAreText = (currentComponent, nextComponent) =>
    currentComponent.args.type === 'text' && nextComponent.args.type === 'text';

const textTypeMatch = (currentComponent, nextComponent) => 
    zip([currentComponent.args.children, nextComponent.args.children])
        .map(children => children[0] === children[1])
        .every(child => child);

const elementMatch = (currentComponent, nextComponent) =>
    currentComponent.args
        && nextComponent.args
        && currentComponent.args.type === nextComponent.args.type;

const getZippedChildren = (currentComponent, nextComponent) => {
    if (!currentComponent.args) {
        return zip([[], nextComponent.args.children]);
    }
    if (!nextComponent.args) {
        return zip([currentComponent.args.children, []]);
    }
    return zip([currentComponent.args.children, nextComponent.args.children]);
};

// Returns { result: false, children: [] } if there's a difference
const diff = (currentComponent, nextComponent) => {
    // If one of the args doesn't exist then there's a difference
    if (!currentComponent || !nextComponent) {
        return { result: false, children: [] }
    }
    if (elementsAreText(currentComponent, nextComponent)) {
        return {
            result: textTypeMatch(currentComponent, nextComponent),
            children: [],
        }
    }
    return {
        result: elementMatch(currentComponent, nextComponent),
        children: getZippedChildren(currentComponent, nextComponent),
    }
};

const diffTrees = (currentTree, newTree, parent) => {
    const match = diff(currentTree, newTree);
    if (!match.result) {
        return [{ current: currentTree, new: newTree }];
    }
    // Carry over important things from previous tree
    newTree.setElement(currentTree.getElement());
    newTree.setParent(parent);

    // Update attributes
    currentTree.updateAttributes(newTree.args.props);

    // Check all the children
    return match.children.flatMap(children =>
        diffTrees(children[0], children[1], currentTree.getElement())
    );
};

const Tree = (initTree) => {
    let treeElements = {components: initTree};

    treeElements.components.render(document.getElementById('root'))
        .map(child => document.getElementById('root').appendChild(child));

    const render = (newTree) => {
        console.log("Diffing changes to tree");
        const diffs = diffTrees(treeElements.components, newTree, document.getElementById('root'))
        console.log(diffs.length > 0 ? diffs : "No changes");

        // Rerender all the DOM differences
        diffs.map(diff => {
            rerender(diff.current, diff.new);
        });
        
        treeElements = { components: newTree };
    }
    return { render };
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const par1 = Component('p', [Component('text', ['Hello, ', 'world'])]);
    const par2 = Component('p', [Component('text', ['This is a ', 'test of a react clone'])]);
    const holdDiv = Component('div', [par1, par2], { hidden: true });
    const testTree = NonDOMComponent('tree', [holdDiv]);

    const tree = Tree(testTree);
    
    await sleep(1000);

    const par12 = Component('p', [Component('text', ['Hello, ', 'world'])]);
    const par22 = Component('p', [Component('text', ['This is a ', 'test of a react clone'])]);
    const holdDiv2 = Component('div', [par12, par22]);
    const testTree2 = NonDOMComponent('tree', [holdDiv2]);

    tree.render(testTree2);

    // const par22 = Component('p', [Component('text', ['After a change of the ', 'test of a react clone'])]);
    // const holdDiv2 = Component('div', [par1, par22]);
    // const testTree2 = NonDOMComponent('tree', [holdDiv2]);

    // await sleep(1000);
    // tree.render(testTree2);

    // const par23 = Component('p', [Component('text', ['This is a ', 'test of a react clone'])]);
    // const holdDiv3 = Component('div', [par1, par23]);
    // const testTree3 = NonDOMComponent('tree', [holdDiv3]);

    // await sleep(1000);
    // tree.render(testTree);
    
    // await sleep(1000);
    // tree.render(testTree3);
    
    // const par4 = Component('p', [Component('text', ['This is a ', 'test of a react clone'])]);
    // const testTree4 = NonDOMComponent('tree', [par4]);

    // await sleep(1000);
    // tree.render(testTree4);

    // await sleep(1000);
    // tree.render(testTree);

    // const holdDiv5 = Component('div', [par1, par23]);
    // const testTree5 = NonDOMComponent('tree', [holdDiv5]);

    // await sleep(1000);
    // tree.render(testTree5);

}

main()