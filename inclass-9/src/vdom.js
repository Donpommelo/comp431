//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
	// create the element and return it to the caller
	// the node might have event listeners that need to be registered
	// the node might have children that need to be created as well

    var newElem = document.createElement(node.tag);

    if (typeof(node) === 'string') {
        newElem = document.createElement('div');
        newElem.innerHTML = node;
        return newElem.firstChild;
    }

    const properties = node.props;
    if (properties !== null && typeof(properties) === 'object') {
        for (var p in properties) {
            if (properties.hasOwnProperty(p)) {
                if (typeof(properties[p]) === 'function') {
                    newElem.addEventListener("click", properties[p], false);
                    newElem.addEventListener("click", update, false);
                } else if (p == "className") {
                    newElem.setAttribute("class", properties[p]);
                } else {
                    newElem.setAttribute(p, properties[p]);
                }
            }
        }
    }

    const children = node.children;
    if (children != null && Array.isArray(children)) {
        for (var child in node.children) {
            newElem.appendChild(createElement(node.children[child]));
        }
    }

    return newElem;
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else {
    	// you can use my changed(node1, node2) method above
    	// to determine if an element has changed or not

    	// be sure to also update the children!

        const oldChildren = oldNode.children;
        const newChildren = newNode.children;
        if (parent) {
            if (parent.id == "app") {
                parent =  parent.childNodes[0];
            }
        }

        if (changed(oldNode, newNode)) {
            console.log(parent, index);
            parent.childNodes[index].remove();
        } else {

            if (oldChildren != null && Array.isArray(oldChildren) && newChildren != null && Array.isArray(newChildren)) {

                for (var i = 0; i < Math.max(oldChildren.length, newChildren.length); i++) {
                    if (i >= oldChildren.length) {
                        parent.appendChild(createElement(newChildren[i]));
                    } else if (i >= newChildren.length) {
                        parent.childNodes[i].remove();
                    } else {
                        updateElement(parent.childNodes[i], newChildren[i], oldChildren[i], i);
                    }
                }
            }
        }
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);