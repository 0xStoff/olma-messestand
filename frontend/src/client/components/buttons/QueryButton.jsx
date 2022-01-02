const Button = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";

  const { queryData } = props;

  const handleClickGet = async () => {
    queryData();
  };

  return (
    <button
      onClick={() => {
        handleClickGet();
      }}
      type="button"
      className={buttonClass}
    >
      Query{" "}
    </button>
  );
};

export default Button;
