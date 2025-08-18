import React from "react";
import PropTypes from "prop-types";
import { Range } from "react-range";

const DualRangeSlider = ({
  min,
  max,
  step = 1,
  selectedMinimum,
  selectedMaximum,
  setSelectedMinimum,
  setSelectedMaximum,
}) => {
  const handleChange = ([minVal, maxVal]) => {
    setSelectedMinimum(minVal);
    setSelectedMaximum(maxVal);
  };

  return (
    <div className="relative bottom-5 mx-10 md:bottom-0">
      <Range
        values={[selectedMinimum, selectedMaximum]}
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
        /* eslint-disable react/prop-types */
        renderTrack={({ props, children }) => (
          <div
            className="flex h-9 w-full"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
            }}
          >
            <div
              className="h-[6px] w-full self-center rounded-sm bg-others-sliderbackground"
              ref={props.ref}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            className="flex h-4 w-4 items-center justify-center rounded-[50%] bg-others-sliderburgundy focus:outline-none focus:ring-2 focus:ring-primary-light md:h-5 md:w-5"
            {...props}
            style={{
              ...props.style,
              boxShadow: "0 0 0 1px #fff",
              top: "calc(50% - 2px)",
              transform: "translateY(-50%)",
            }}
          />
        )}
      />
    </div>
  );
};

DualRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  selectedMinimum: PropTypes.number.isRequired,
  selectedMaximum: PropTypes.number.isRequired,
  setSelectedMinimum: PropTypes.func.isRequired,
  setSelectedMaximum: PropTypes.func.isRequired,
};

export default DualRangeSlider;
