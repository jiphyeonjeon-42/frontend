const IframeLinkView = ({ link, type }) => {
  return (
    <div className={`elibrary-in-box__iframe__wrapper ${type}`}>
      <iframe
        src={link}
        className={`elibrary-in-box__iframe__iframe ${type}`}
      />
    </div>
  );
};

export default IframeLinkView;
