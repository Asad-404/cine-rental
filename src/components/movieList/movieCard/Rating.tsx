import Star from "../../../assets/star.svg";

export default function Rating({ value }: { value: number }) {
  const stars = Array(value).fill(Star);
  return (
    <>
      {stars.map((el, idx) => (
        <img src={el} alt="star" key={idx} width={14} height={14} />
      ))}
    </>
  );
}
