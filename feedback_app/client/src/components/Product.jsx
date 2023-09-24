import {useState} from 'react';
import ReviewModal from "./ReviewModal";

export default function Product({product: prod, page: page}) {
    const[newValue, setNewValue] = useState(0);

    const [openModal, setOpenModal] = useState(false); // this state will be used to open the modal

    const [value, setValue] = useState("No Review"); // this state is used to store the value of the review

    // this function is used to open the modal
    function handleOpen() {
        setOpenModal(true);
    }

    // this function is used to close the modal
    function handleClose() {
        setOpenModal(false);
        if (newValue) {
            setValue(newValue);
        }
    };

    return (
        <>
          <div className="productCard">
            <h3>{prod.title}</h3>
            <img className="productImg" src={prod.image} alt={prod.title}/>
            <p>{prod.description}</p>
            <p>Price: ${prod.price}</p>
            {
              page === "dashboard" ? (
                <p>Reviews: {prod.feedback.length}</p>
              ) : (
                <button 
                  className="reviewButton"
                  onClick={handleOpen}
                >
                  Add a review
                </button>
              )
            }
          </div>
          {
            openModal && (
              <ReviewModal
                id="review-modal"
                keepMounted
                open={openModal}
                onClose={handleClose}
                value={value}
                productID = {prod.id}
              />
            )
          }
        </>
      );
}