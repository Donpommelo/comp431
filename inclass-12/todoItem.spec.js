import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'

import { ToDoItem } from './todoItem'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, it => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
};

describe('Validate ToDoItem', () => {

    it('should display a single ToDo with text', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert the innerHTML of the todo is the text you initially set

        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem  text="meep" done={true} toggle={_ => _} remove={_ => _} id="1"/>
        </div>).children[0];

        const elem = findDOMNode(node);

        expect(elem.children).to.have.length(3);

        expect(elem.children[1].innerHTML).to.equal('meep');

    });

    it('should display a single ToDo with no classname', () => {
        // use TestUtils.renderIntoDocument
        // findDOMNode and assert 3 children of the ToDoItem element
        // assert there is no child with classname 'completed'

        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem  text="meep" done={false} toggle={_ => _} remove={_ => _} id="1"/>
        </div>).children[0];

        const elem = findDOMNode(node);

        expect(elem.children).to.have.length(3);

        expect(findByClassname(elem.children, 'completed')).to.equal(null);

    });

    it('should toggle completed when clicked', () => {
        let toggled = false;
        // use TestUtils.renderIntoDocument
        // when the checkbox is clicked via TestUtils.Simulate.click()
        // we expect the variable toggled to be true

        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem  text="meep" done={true} toggle={() => toggled = !toggled} remove={_ => _} id="1"/>
        </div>).children[0];

        const elem = findDOMNode(node);

        const button = findByClassname(elem.children, 'check glyphicon glyphicon-check');

        TestUtils.Simulate.click(button);
        expect(toggled).to.equal(true);
        TestUtils.Simulate.click(button);
        expect(toggled).to.equal(false);
    });

    it('should remove an item when clicked', () => {
        let removed = false;
        // use TestUtils.renderIntoDocument
        // when the remove button is clicked via TestUtils.Simulate.click()
        // we expect the variable removed to be true

        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem  text="meep" done={true} toggle={_ => _} remove={() => removed = true} id="1"/>
        </div>).children[0];

        const elem = findDOMNode(node);

        const button = findByClassname(elem.children, 'destroy glyphicon glyphicon-remove');

        TestUtils.Simulate.click(button);
        expect(removed).to.equal(true);

    });

    it('should display a completed ToDo', () => {
        // use TestUtils.renderIntoDocument
        // the item should have done=true
        // assert that the rendered className is "completed"
        const node = TestUtils.renderIntoDocument(<div>
            <ToDoItem  text="meep" done={true} toggle={_ => _} remove={_ => _} id="1"/>
        </div>).children[0];

        const elem = findDOMNode(node);

        expect(elem.children[1].className).to.equal('completed');
    })

});
