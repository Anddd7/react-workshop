
import React from 'react';
import PropTypes from 'prop-types';

const Foo = props => (<p>{props.name}<button onClick={props.onButtonClick} /></p>);

Foo.propTypes = {
  name: PropTypes.string,
  onButtonClick: PropTypes.func,
};
Foo.defaultProps = {
  name: '',
  onButtonClick: () => console.log('onButtonClick on Foo'),
};

const MyComponent = props => (
  <div >
    <div className="icon-star" />
    <div>{props.children}</div>
    <Foo name="1" />
    <Foo name="2" />
    <Foo name="3" />
  </div>
);

MyComponent.propTypes = {
  children: PropTypes.element,
};
MyComponent.defaultProps = {
  children: <div />,
};

export { Foo, MyComponent };
