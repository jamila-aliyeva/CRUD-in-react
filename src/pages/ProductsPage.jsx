import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import request from "../data";

const ProductsPage = () => {
  const { data } = useParams();
  const [products, setProdutcs] = useState(null);
  useEffect(() => {
    request.get(`products/${data}`).then((res) => {
      setProdutcs(res.data);
    });
  }, [data]);
  return (
    <section>
      <div className="container">
        <h2 className="text-center my-4">Single Product</h2>
        <div
          className="card my-4 "
          style={{
            width: "500px",
          }}>
          <img src={products?.image} alt="..." />
          <div className="card-body">
            <h3>{products?.name}</h3>
            <p>{products?.category}</p>
            <a>{products?.description}</a>
            <p>{products?.price}</p>
            <Link to="/" className="me-1 btn btn-warning" variant="warning">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
