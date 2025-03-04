import useLazyLoadData from "./useLazyLoadData";
import useElementObserver from "./useElementObserver";
import React from "react";

/**
 * Higher-Order Component that adds intersection observer functionality to a component
 * @param {React.Component} WrappedComponent - The component to enhance
 * @param {Object} options - Configuration options
 * @param {boolean} [options.animate=false] - Whether to apply animation classes
 * @param {string} [options.afterWrapperIsVisibleClass="visible_wrapper"] - Class to apply when visible
 * @param {string} [options.initialWrapperClass="invisible_wrapper"] - Initial class when not visible
 * @param {string} [options.rootMargin="0px"] - Margin around the root element
 * @param {number} [options.threshold=0] - Visibility threshold
 * @param {Element} [options.root=null] - Root element for intersection observer
 * @param {boolean} [options.triggerOnce=true] - Whether to trigger only once
 * @param {boolean} [options.lazyLoad=false] - Whether to enable lazy loading
 * @param {string[]} [options.files=[]] - Files to lazy load
 * @returns {React.Component} Enhanced component
 */
export default function withViewObserver(
  WrappedComponent,
  {
    animate = false,
    afterWrapperIsVisibleClass = "visible_wrapper",
    initialWrapperClass = animate ? "invisible_wrapper" : "",
    rootMargin = "0px",
    threshold = 0,
    root = null,
    triggerOnce = true,
    lazyLoad = false,
    files = [],
  } = {}
) {
  return function withViewObserver(props) {
    const { ref, inView } = useElementObserver({
      rootMargin,
      threshold,
      root,
      triggerOnce,
    });

    const { data, error, loading } = lazyLoad
      ? useLazyLoadData(files, inView)
      : { data: null, error: null, loading: false };

    const wrapperClassName =
      animate && inView
        ? props.special_animation || afterWrapperIsVisibleClass
        : initialWrapperClass;

    const componentProps = lazyLoad
      ? { ...props, content: data, error, loading }
      : props;

    return (
      <div
        ref={ref}
        className={wrapperClassName}
        style={props.style} // Pass through any style props
      >
        <WrappedComponent {...componentProps} />
      </div>
    );
  };
}
