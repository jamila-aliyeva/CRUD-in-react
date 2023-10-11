import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import request from "../data";
import Skeleton from "react-loading-skeleton";
// import ProductSchema from "../scheme/LoginScheme";
// import { toast } from "react-toastify";

const HomePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const response = await request.get("products", {
        params: {
          search: searchQuery,
        },
      });
      setData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const closeModal = () => setShow(false);

  const openModal = () => {
    setSelected(null);
    setShow(true);
    reset({ name, price, image, category, description });
  };

  const onSubmit = async (data) => {
    try {
      if (selected === null) {
        await request.post("products", data);
      } else {
        await request.put(`products/${selected}`, data);
      }
      getProduct();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const editData = async (id) => {
    try {
      setSelected(id);
      setShow(true);
      let { data } = await request.put(`products/${id}`);
      reset(data);
    } catch (err) {
      // toast.error("error");
      console.log(err);
    }
  };

  const deleteData = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure to delete the product?");
      if (confirmed) {
        await request.delete(`products/${id}`, {
          params: {
            search: searchQuery,
          },
        });
        getProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filteredData = data.filter((item) => {
    const Name = `${item.name}`.toLowerCase();
    return Name.includes(searchQuery.trim().toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(errors);
  return (
    <>
      <header>
        <div className="container">
          <h1 className="my-4"> Products of online store</h1>
          <div style={{ marginTop: "30px", marginBottom: "18px", gap: "50px" }}>
            <Button onClick={openModal} variant="primary">
              Add Products
            </Button>
          </div>
        </div>
      </header>
      <section>
        <div className="container">
          <div className="d-flex align-items-center ">
            <Form.Control
              placeholder="Searching..."
              className="my-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="input-group-text mx-2">{data.length}</span>
          </div>

          <div className="categories-row row">
            {loading ? (
              <div>
                <Skeleton count={5} />
                <h1 className="text-center">Loading...</h1>
              </div>
            ) : (
              currentItems.map((el, i) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                  <div className="card">
                    <img
                      src={el.image}
                      className="card-img-top object-fit-cover"
                      alt="..."
                      height={200}
                    />
                    <div className="card-body">
                      <h3>{el.name}</h3>
                      <p>{el.description}</p>
                      <p>{el.price}$</p>
                      <Button
                        className="me-1"
                        variant="danger"
                        onClick={() => deleteData(el.id)}>
                        Delete
                      </Button>
                      <Button
                        className="me-2 my-2"
                        variant="success"
                        onClick={() => editData(el.id)}>
                        Edit
                      </Button>
                      <Link
                        to={`/employee/${el.id}`}
                        className="btn btn-primary">
                        single
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className="pagination d-flex justify-content-center my-4"
            style={{ gap: "20px" }}>
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, index) => (
                <button
                  style={{
                    border:
                      currentPage === index + 1 ? "none" : "1px solid grey",
                    borderRadius: "5px",
                    backgroundColor:
                      currentPage === index + 1 ? "#8ECDDD" : "transparent",
                  }}
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-button ${
                    currentPage === index + 1 ? "active" : ""
                  } px-2`}>
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </section>
      <Modal show={show} onHide={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
          <Modal.Header closeButton>
            <Modal.Title>Products data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="price">Price</label>
              <input
                {...register("price")}
                id="price"
                type="number"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="category">category</label>
              <input
                {...register("category")}
                id="category"
                type="category"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">description</label>
              <input
                {...register("description")}
                id="description"
                type="text"
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button type="submit" variant="primary" className="mx-3">
              {selected ? "Save" : "Add"} product
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default HomePage;
