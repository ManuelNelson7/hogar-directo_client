import {provincias} from './provincias.json'
import {departamentos} from './departamentos.json'

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
} ;

export const propertyTypes = [
  { title: 'Casa', value: 'house' },
  { title: 'Departamento', value: 'departamento' },
  { title: 'PH', value: 'ph' },
  { title: 'Quinta', value: 'quinta' },
  { title: 'Garage', value: 'garage' },
  { title: 'Oficina comercial', value: 'oficina' },
  { title: 'Local comercial', value: 'local' },
  { title: 'Terreno', value: 'terreno' },
];

export const provinciasOrdered = provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));

export const fetchDepartamentos = (id) => {
    return departamentos.filter(departamento => departamento.provincia.id === id).sort((a, b) => a.nombre.localeCompare(b.nombre))
}