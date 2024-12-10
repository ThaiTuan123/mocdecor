// googleMapsEmbedHelper.tsx

import React from 'react';

export const GoogleMapsEmbed = (): JSX.Element => {
  return (
    <iframe
      className="lg:w-480 h-48 w-full rounded md:h-220"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.3196802003445!2d108.27921287536122!3d15.839786845539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420f2973746307%3A0xc94c5d84aeaa0aa!2zNTkgxJAuIEjDuW5nIFbGsMahbmcsIFRULiBOYW0gUGjGsOG7m2MsIER1eSBYdXnDqm4sIFF14bqjbmcgTmFtLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1730261620828!5m2!1svi!2s"
      width="600"
      height="240"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};
