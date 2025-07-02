import React from "react";
import PropTypes from "prop-types";

const DualRangeSlider = ({
  min,
  selectedMinimum,
  setSelectedMinimum,
  max,
  selectedMaximum,
  setSelectedMaximum,
  step = 1,
}) => {
  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="relative mx-auto flex h-8 w-[16.188rem] items-center md:w-[21.875rem]">
      {/* Background track */}
      <div className="absolute h-1 w-full rounded-full bg-gray-300"></div>

      {/* Selected range track */}
      <div
        className="absolute h-1 rounded-full bg-[#290000]"
        style={{
          left: `${getPercent(selectedMinimum)}%`,
          width: `${getPercent(selectedMaximum) - getPercent(selectedMinimum)}%`,
        }}
      ></div>

      {/* Min Thumb */}
      <input
        type="range"
        aria-label="Minimum value"
        min={min}
        max={max}
        step={step}
        value={selectedMinimum}
        onChange={(e) =>
          setSelectedMinimum(
            Math.min(Number(e.target.value), selectedMaximum - step),
          )
        }
        className="pointer-events-auto absolute z-20 w-full appearance-none bg-transparent"
      />

      {/* Max Thumb */}
      <input
        type="range"
        aria-label="Maximum value"
        min={min}
        max={max}
        step={step}
        value={selectedMaximum}
        onChange={(e) =>
          setSelectedMaximum(
            Math.max(Number(e.target.value), selectedMinimum + step),
          )
        }
        className="pointer-events-auto absolute z-10 w-full appearance-none bg-transparent"
      />
    </div>
  );
};

DualRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  selectedMinimum: PropTypes.number.isRequired,
  selectedMaximum: PropTypes.number.isRequired,
  setSelectedMinimum: PropTypes.func.isRequired,
  setSelectedMaximum: PropTypes.func.isRequired,
  step: PropTypes.number,
};

export default DualRangeSlider;
