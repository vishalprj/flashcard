import "./card.css";
const Card = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="card">
          <div className="front">
            <img src="https://i.postimg.cc/3rFM5sb4/nike-shoes.png" />
            <h2>$250</h2>
            <h3>Nike Awesome Red Shoes</h3>
            <h6>Special Edition</h6>
          </div>
          <div className="back">
            <button>Add To Cart</button>
          </div>
        </div>
      </div>
      <a href="https://www.youtube.com/@codingArtist" target="_blank">
        My Youtube Channel
      </a>
    </div>
  );
};

export default Card;
