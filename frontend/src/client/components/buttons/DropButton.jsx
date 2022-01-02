const Buttons = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";
  const { query, successSwal, dropTable, errorSwal, confirmSwal } = props;

  const handleClickDrop = async () => {
    if (query.response == undefined || query.response.data.length == 0) {
      errorSwal("Nothing to drop, generate first!");
    } else {
      const confirm = await confirmSwal("Are you Sure?");

      if (confirm.isConfirmed) {
        successSwal(`Database dropped successfully`);
        dropTable();
      }
    }
  };

  return (
    <button
      onClick={() => {
        handleClickDrop();
      }}
      type="button"
      className={buttonClass}
    >
      Drop{" "}
    </button>
  );
};

export default Buttons;
