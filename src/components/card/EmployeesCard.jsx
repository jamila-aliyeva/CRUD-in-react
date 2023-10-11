import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmployeesCard = ({
  avatar,
  firstName,
  lastName,
  phoneNumber,
  email,
  isMarried,
  id,
}) => {
  return (
    <div className="card">
      <img
        src={avatar}
        className="card-img-top object-fit-cover"
        alt="..."
        height={200}
      />
      <div className="card-body">
        <h3>
          {firstName} {lastName}
        </h3>
        <p>{phoneNumber}</p>
        <a>{email}</a>
        <p>{isMarried}</p>
        <Button
          className="me-1"
          variant="danger"
          onClick={() => deleteData(id)}>
          Delete
        </Button>
        <Button className="me-1" variant="primary">
          Edit
        </Button>
        <Link to={`/employee/${id}`} className="btn btn-warning">
          See employee {id}
        </Link>
      </div>
    </div>
  );
};

EmployeesCard.prototype = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  salary: PropTypes.number,
  date: PropTypes.string,
};

export default EmployeesCard;
