import React from "react";
import PropTypes from "prop-types";
import { notFound } from "next/navigation";

import WineDetails from "@/components/WineDetails/WineDetails";
import { getWineBySlug } from "@/utils/getWineBySlug";

export default async function WineSlugPage({ params }) {
  const slug = params.slug;

  // Fetch wine details (you can replace this with a real API call)
  const wine = await getWineBySlug(slug);

  if (!wine) {
    notFound();
  }

  return (
    <div className="px-8 py-12">
      <WineDetails wine={wine} />
    </div>
  );
}

WineSlugPage.propTypes = {
  params: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
