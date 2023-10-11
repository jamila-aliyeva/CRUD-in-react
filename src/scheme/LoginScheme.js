import * as yup from "yup";

const ProductSchema = yup.object().shape({
  name: yup.string("Name must be string !").required("Please fill!"),
  price: yup.number().required().positive().integer("Price must be integer!"),
  category: yup.string().email("This field must be valid category!"),
  description: yup.string().url("This field must be valid description!"),
});
export default ProductSchema;
