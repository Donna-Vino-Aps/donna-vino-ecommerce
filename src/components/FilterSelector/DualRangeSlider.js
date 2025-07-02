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
          left: 0,
          right: `${100 - getPercent(selectedMaximum)}%`,
          width: `${getPercent(selectedMaximum) - getPercent(selectedMinimum)}%`,
        }}
      ></div>

      {/* Min Thumb */}
      <input
        type="range"
        aria-label="Minimum value"
        min={min}
        max={selectedMaximum - step}
        step={step}
        value={selectedMinimum}
        onChange={(e) =>
          setSelectedMinimum(
            Math.min(Number(e.target.value), selectedMaximum - step),
          )
        }
        className="pointer-events-auto absolute z-20 appearance-none bg-transparent"
        style={{
          position: "absolute",
          WebkitAppearance: "none",
          appearance: "none",
          background: "transparent",
          height: "1rem",
          cursor: "pointer",
          width: `${getPercent(selectedMaximum)}%`,
          left: 0,
          zIndex: 10,
        }}
      />

      {/* Max Thumb */}
      <input
        type="range"
        aria-label="Maximum value"
        min={selectedMinimum + step}
        max={max}
        step={step}
        value={selectedMaximum}
        onChange={(e) =>
          setSelectedMaximum(
            Math.max(Number(e.target.value), selectedMinimum + step),
          )
        }
        className="pointer-events-auto absolute z-10 appearance-none bg-transparent"
        style={{
          position: "absolute",
          WebkitAppearance: "none",
          appearance: "none",
          background: "transparent",
          height: "1rem",
          cursor: "pointer",
          width: `${100 - getPercent(selectedMinimum)}%`,
          right: 0,
          zIndex: 20,
        }}
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
