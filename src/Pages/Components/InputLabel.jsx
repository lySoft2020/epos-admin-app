import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faAddressCard,
  faShop,
  faPhone,
  faGlobe,
  faAddressBook,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

export default function InputLabel({
  label,
  value,
  name,
  placeholder,
  type,
  handelChange,
}) {
  const iconDict = {
    shopname: faShop,
    address: faAddressCard,
    city: faCity,
    phone: faPhone,
    website: faGlobe,
    postcode: faAddressBook,
    contact: faPerson,
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          {type === "text" ? (
            <FontAwesomeIcon icon={iconDict[label]} size="lg" color="red" />
          ) : (
            label
          )}
        </span>
      </div>
      {type === "text" ? (
        <input
          type="text"
          className="form-control"
          name={name}
          value={value}
          placeholder={placeholder}
          aria-label={value}
          aria-describedby="basic-addon1"
          onChange={handelChange}
        />
      ) : (
        <div className="form-check checkbox-xl">
          <input
            className="form-check-input ms-0 mt-2"
            type="checkbox"
            name={name}
            checked={value}
            aria-label={value}
            aria-describedby="basic-addon1"
            onChange={handelChange}
          />
        </div>
      )}
    </div>
  );
}
