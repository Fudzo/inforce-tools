import parse from 'html-react-parser';

const HtmlParser = ({ htmlContent }) => {

  const content = htmlContent || ''

  return (
    <div >
      {parse(content)}
    </div>
  );
};

export default HtmlParser;