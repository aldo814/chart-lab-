import React from "react";

function SectionTitle({ en, title, desc, variant = "default" }) {
  return (
    <div className={`section-title section-title--${variant}`}>
      
      {en && (
        <h3 className="section-title__en">
          {en}
        </h3>
      )}

      {title && (
        <h2 
          className="section-title__title" 
          dangerouslySetInnerHTML={{ __html: title }} 
        />
      )}

      {desc && (
        <p
          className="section-title__desc"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      )}

    </div>
  );
}

export default SectionTitle;