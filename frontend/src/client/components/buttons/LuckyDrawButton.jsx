import Swal from "sweetalert2";

const Buttons = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";
  const { queryData, query, errorSwal, luckyDraw } = props;

  const handleClickLuckyDraw = async () => {
    if (query == 0) {
      errorSwal("Generate and Query Data first");
    } else {
      const teilnehmer = await queryData();
      if (teilnehmer.data.length >= 32) {
        luckyDraw();
      } else {
        errorSwal("Need more Pariticipants (min 32)");
      }
    }
  };

  return (
    <button
      onClick={() => {
        handleClickLuckyDraw();
      }}
      type="button"
      className={buttonClass}
    >
      Lucky Draw{" "}
    </button>
  );
};

export default Buttons;
