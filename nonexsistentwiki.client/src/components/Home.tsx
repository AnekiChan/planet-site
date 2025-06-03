import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ImagePage = () => {
  return (
    <div className="background">
      <img src="/images/Moonlight.png" alt="Image" style={{ marginTop: '20px', maxWidth: '50%', height: 'auto' }} />
      <p style={{ marginTop: '20px' }}>Это сайт объявлений о будущей продаже планет в далёком космосе!</p>
      <p style={{ marginTop: '20px' }}>Эти далёкие земли ещё не покорены человеком, но вы можете уже сейчас узнать, сколько будет стоить на них участок.</p>
      <p style={{ marginTop: '20px' }}>Ищи идеальную планету для колонизации, торговли или просто уединённой жизни среди звёзд. Мы надеемся, что этот портал поможет тебе найти своё место во Вселенной.</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Link to="/wiki">
          <Button className="button" size="lg" variant="primary" style={{ marginRight: '10px', marginTop: '20px' }}>Перейти к объявлениям</Button>
        </Link>
        {/*<img src="/images/planet.gif" alt="Animation" style={{ width: '320px', height: '240px' }} />*/}
      </div>
      <div style={{ marginTop: '20px' }}>
        <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#b3b8ff' }}>
          "Возможно, твоя идеальная планета уже ждёт тебя среди звёзд..."
        </p>
      </div>
    </div>
  );
};

export default ImagePage;
