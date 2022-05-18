export const isMultiple = (value) => ((value === 0 || value > 1) ? 's' : '');
export const formatPrice = (price) => (price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }));