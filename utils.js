

export const isMultiple = (value) => ((value === 0 || value > 1) ? 's' : '');
export const formatPrice = (price) => (price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }));

export const homeQuery = `*[_type == "property"] {
    title,
       location,
       propertyType,
       mainImage,
       images,
       price,
       expensas,
       ambientes,
       bathrooms,
       slug,
       descripcion,
       modalidad,
       owner->{
           name,
           slug,
           image
    },
  }`;

export const propertyQuery = (slug) => {
  const query = `*[ _type == "property" && slug.current == '${slug}']{
    title,
    location,
    propertyType,
    mainImage,
    images,
    price,
    expensas,
    ambientes,
    bathrooms,
    descripcion,
    modalidad,
    owner->{
        name,
        slug,
        image
 },
}`;
  return query
} 


// const doc = {
//   _id: auth.currentUser.uid,
//   _type: 'person',
//   name: auth.currentUser.displayName,
//   email: auth.currentUser.email,
// };
// sanityClient.createIfNotExists(doc)