import notFoundImage from '@views/assets/imgs/notFoundImage.svg';

export function NotFoundPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <img
        className="w-full max-w-[300px] md:max-w-[400px]"
        src={notFoundImage}
        alt="404"
      />

      <span className="text-gray-800 tracking-[-0.5px]">
        Página não encontrada!
      </span>
    </div>
  );
}
