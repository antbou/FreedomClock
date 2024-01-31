import image from "@/assets/2DS.gif";

const Freedom = () => {
  return (
    <div className="shadow-md rounded-lg flex flex-col items-center gap-5 p-5">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center tracking-widest px-2">
        Congrats mate, you did it!
        <span
          role="img"
          aria-label="Congratulation emoji"
          className="animate-bounce w-6 h-6 inline-block top-1"
        >
          🎉
        </span>
      </h2>
      <img src={image} alt="Congratulation image" />
    </div>
  );
};

export default Freedom;
