import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import OtherProductList from './OtherProducts/OtherProductList';
import Outfit from './Outfit/Outfit';

const RelatedProducts = ({ prodInfo, styleInfo }) => {
  const { id } = useParams();
  const [url, seturl] = useState(id);
  const [relatedProds, setrelatedProds] = useState([]);
  const [relatedStyles, setrelatedStyles] = useState([]);

  if (url !== id) {
    seturl(id);
  }

  useEffect(() => {
    axios.get(`http://3.134.102.30/products/${url}/related`).then(results => {
      let noDuplicateProducts = new Set(results.data);
      // Get all the product information for each related product
      const prodPromises = [];
      noDuplicateProducts.forEach(product => {
        prodPromises.push(axios.get(`http://3.134.102.30/products/${product}`));
      });

      // Get all the style information for each related product
      const stylePromises = [];
      noDuplicateProducts.forEach(product => {
        stylePromises.push(
          axios.get(`http://3.134.102.30/products/${product}/styles`)
        );
      });

      Promise.all(prodPromises).then(products => {
        // Set state with each product's information
        const prodData = products.map(prod => prod.data);
        setrelatedProds(prodData);
        Promise.all(stylePromises).then(styles => {
          // Get default style for each product and set state
          const tempStyleData = styles.map(style => style.data);
          const styleData = tempStyleData.map(style => {
            let styleResults = style.results;
            styleResults.forEach(style => {
              if (style['default?'] === 1) {
                return style;
              }
            });
            return styleResults[0];
          });
          setrelatedStyles(styleData);
        });
      });
    });
  }, [url]);

  return (
    <>
      <div style={{ fontSize: '1.2vw' }}>RELATED PRODUCTS</div>
      <OtherProductList
        relatedProds={relatedProds}
        relatedStyles={relatedStyles}
        prodInfo={prodInfo}
      />
      <div style={{ fontSize: '1.2vw' }}>MY OUTFIT</div>
      <Outfit prodInfo={prodInfo} styleInfo={styleInfo} />
    </>
  );
};

export default RelatedProducts;
