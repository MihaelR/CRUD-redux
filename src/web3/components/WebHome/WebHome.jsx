import "./WebHome.css";

const Home = (props) => {
  return (
    <div className="home">
      <h1>Welcome</h1>
      <p>{props.currentAccount}</p>
      <p>{props.balance} ETH</p>
    </div>
  );
};
export default Home;
