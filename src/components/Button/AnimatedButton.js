import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const AnimatedButton = ({
  textBefore,
  textAfter,
  clickedStyle,
  color,
  onClick,
  extraStyle,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const handleAnimatedPress = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsClicked(true);

    onClick();

    setTimeout(() => setIsClicked(false), 3000);
  };

  const triggerPressAnimation = () => {
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 200);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    triggerPressAnimation();
  }, [isClicked]);

  return (
    <Button
      text={isClicked ? textAfter : textBefore}
      onClick={handleAnimatedPress}
      color={isClicked ? "" : color}
      extraStyle={`
				${extraStyle}
				transition-all duration-250 ease-in-out
				${isClicked ? clickedStyle : ""}
				${isPressing ? " press-animation " : ""}
			`}
      {...props}
    />
  );
};

AnimatedButton.propTypes = {
  textBefore: PropTypes.string.isRequired,
  textAfter: PropTypes.string.isRequired,
  clickedStyle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  extraStyle: PropTypes.string,
};

export default AnimatedButton;
