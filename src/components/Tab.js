import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import cx from 'clsx';

const randGradient = () => {
    let r1 = Math.floor(Math.random() * (240 - 40 + 1) + 40);
    let g1 = Math.floor(Math.random() * (240 - 40 + 1) + 40);
    let b1 = Math.floor(Math.random() * (240 - 40 + 1) + 40);
    let r2 = Math.floor(Math.random() * (240 - 40 + 1) + 40);
    let g2 = Math.floor(Math.random() * (240 - 40 + 1) + 40);
    let b2 = Math.floor(Math.random() * (240 - 40 + 1) + 40);

    let o1 = (Math.random() * (0.8 - 0.3) + 0.3).toFixed(1);
    let o2 = (Math.random() * (0.8 - 0.3) + 0.3).toFixed(1);

    let data = ['top', 'right', 'bottom', 'left']
    let n1 = data[r1 % 4]
    let n2 = data[r2 % 4]
    let data = [n1, n2, r1, g1, b1, o1, r2, g2, b2, o2]

    return data
}


const DEFAULT_CLASS = 'react-tabs__tab';
const defaultProps = {
  className: DEFAULT_CLASS,
  disabledClassName: `${DEFAULT_CLASS}--disabled`,
  focus: false,
  id: null,
  selected: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  disabledClassName: PropTypes.string,
  focus: PropTypes.bool, // private
  id: PropTypes.string, // private
  selected: PropTypes.bool, // private
  selectedClassName: PropTypes.string,
  tabIndex: PropTypes.string,
  tabRef: PropTypes.func, // private
};

const Tab = (props) => {
  let nodeRef = useRef();
  const {
    children,
    className,
    disabled,
    disabledClassName,
    focus,
    id,
    selected,
    selectedClassName,
    tabIndex,
    tabRef,
    ...attributes
  } = props;
  let [r1, ch_r1] = useState(0);
  let [g1, ch_g1] = useState(0);
  let [b1, ch_b1] = useState(0);
  let [r2, ch_r2] = useState(0);
  let [g2, ch_g2] = useState(0);
  let [b2, ch_b2] = useState(0);

  let [n1, ch_n1] = useState(0);
  let [n2, ch_n2] = useState(0);

  let [o1, ch_o1] = useState(0);
  let [o2, ch_o2] = useState(0);

  let [s, ch_s] = useState("");

  useEffect(() => {
    if (selected && focus) {
      nodeRef.current.focus();
    }

  }, [selected, focus]);

  return (
    <li
      {...attributes}
      className={cx(className, {
        [selectedClassName]: selected,
        [disabledClassName]: disabled,
      })}
      ref={(node) => {
        nodeRef.current = node;
        if (tabRef) tabRef(node);
      }}
      role="tab"
      id={`tab${id}`}
      aria-selected={selected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-controls={`panel${id}`}
      tabIndex={tabIndex || (selected ? '0' : null)}
      data-rttab
      onClick={() => {
        let d = randGradient();
        console.log(d);
        }}
    >
      {children}
    </li>
  );
};
Tab.propTypes = propTypes;

Tab.tabsRole = 'Tab';
Tab.defaultProps = defaultProps;
export default Tab;
