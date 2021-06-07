// This is a reusable card componnent to render several number of cards
const SingleCard = (props) => {
  const { card } = props;
  return (
    <div className="card">
      <span>Card-{card.id}</span>
      <h2>{card.title}</h2>
      <p>{card.body}</p>
    </div>
  );
};

export default SingleCard;
