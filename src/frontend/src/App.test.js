const Apptest = () => {
  const handleClick = (event, param) => {
    console.log(event);
    console.log(param);
  };

  return (
    <div>
      <button onClick={event => handleClick(event, 'hello world')}>
        Click
      </button>
    </div>
  );
};

export default Apptest;