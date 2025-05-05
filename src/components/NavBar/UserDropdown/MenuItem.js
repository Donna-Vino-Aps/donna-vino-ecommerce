import React from "react";
import PropTypes from "prop-types";
import MenuLink from "@/components/NavBar/UserDropdown/Variants/MenuLink";
import Separator from "@/components/NavBar/UserDropdown/Variants/Separator";
import MenuButton from "@/components/NavBar/UserDropdown/Variants/Button";

export default function MenuItem({
  image,
  url,
  title,
  variant = "link",
  onClick,
  onClose,
}) {
  let item;
  if (variant === "link")
    item = <MenuLink title={title} image={image} url={url} onClose={onClose} />;

  if (variant === "separator") item = <Separator />;

  if (variant === "button")
    item = (
      <MenuButton
        title={title}
        onClick={onClick}
        onClose={onClose}
        image={image}
      />
    );

  return <li className="flex gap-2 text-bodyMedium">{item}</li>;
}

MenuItem.propTypes = {
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};
