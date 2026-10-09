export function Products(props) {
  console.log("product props", props);
  const handleAddToCart = (e) => {
    console.log("add to cart", e.target);
    // dispatch(addToCart(e.target))
  };
  return (
    <>
      <div>products</div>
      <div className="products" style={{ display: "flex", flexWrap: "wrap",justifyContent:'center' }}>
        {props.productsdata.map((item) => {
          return (
            <>
              <div
                key={item.id}
                style={{
                  border: "1px solid black",
                  borderRadius:"3px",
                  padding: "5px",
                  margin: "5px",
                  width: "300px",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // This centers items horizontally
                  justifyContent: "space-between", // This centers items vertically (optional)
                  textAlign: "center", // This centers text
                }}
              >
                <div>
                  <img
                    src={item.image}
                    alt="product-img"
                    style={{
                      width: "30%",
                      objectFit: "contain",
                      margin: "0 auto", // Additional centering for the image
                    }}
                  />
                  <p>{item.title}</p>
                  <p>Rating {item.rating.rate}</p>
                  <p>price ${item.price}</p>
                </div>
                <div
                  className="btn-div"
                  style={{
                    borderTop: "1px solid black",
                    width: "calc(100% + 10px)", // Compensate for parent's padding
                    padding: "10px",
                    boxSizing: "border-box",
                    marginLeft: "-5px", // Match parent's left padding
                    marginRight: "-5px", // Match parent's right padding
                    marginBottom: "-5px", // Match parent's bottom padding
                    marginTop: "auto", // Push to bottom (since parent uses space-between)
                  }}
                >
                  <buton
                    onClick={handleAddToCart}
                    style={{
                      backgroundColor: "blue",
                      padding: "5px",
                      borderRadius: "5px",
                      margin: "3px",
                    }}
                  >
                    Add To CART
                  </buton>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
