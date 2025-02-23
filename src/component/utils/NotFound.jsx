import { useSpring, animated } from "@react-spring/web";
import "../../asset/css/NotFound.css";
const NotFound = () => {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, transform: "translate3d(0px, 0px, 0px)" },
    config: { duration: 500 }, // 애니메이션 지속 시간 설정
  }));

  const froms = [
    { x: 0, y: 0 },
    { x: window.innerWidth, y: 0 },
    { x: 0, y: window.innerHeight },
    { x: window.innerWidth, y: window.innerHeight },
  ];

  const getRandomFromIndex = (from, to) => {
    const min = Math.ceil(from);
    const max = Math.floor(to);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleClick = event => {
    api.start({
      to: {
        opacity: 1, // 불투명도를 1로 설정
        transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0px)`, // 위치 업데이트
      },
      // 애니메이션 시작시 불투명도를 0으로 설정 및 위치 설정 froms 배열에서 랜덤으로 from 선택되도록 수정
      from: {
        opacity: 0,
        transform: `translate3d(${
          froms[getRandomFromIndex(0, froms.length)].x
        }px, ${froms[getRandomFromIndex(0, froms.length)].y}px, 0px)`,
      },
      reset: true, // 매 클릭마다 애니메이션 리셋
    });
  };

  return (
    <>
      <div onClick={handleClick} id="error_cat">
        <animated.div
          id="error_cat__paw"
          style={{
            ...springs,
          }}
        />
      </div>
      <div className="not-found__text color-ff">
        <div className="font-48-bold">404</div>
        <div className="font-40-bold">Not Found</div>
      </div>
    </>
  );
};

export default NotFound;
