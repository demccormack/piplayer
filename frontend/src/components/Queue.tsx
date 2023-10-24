function Queue({
  queue,
  queuePosition,
  setQueuePosition,
}: {
  queue: string[];
  queuePosition: number;
  setQueuePosition: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="fixed bottom-4 right-4 max-h-72 w-1/5 overflow-x-scroll rounded-md border-2 border-gray-400 text-left">
      {queue.map((itemUrl, index) => {
        const className =
          queuePosition === index
            ? 'p-2 bg-slate-800 font-bold'
            : 'p-2 hover:bg-slate-700';

        const iconClass =
          queuePosition === index
            ? "inline-block before:content-['⏸️']"
            : "inline-block before:content-['▶️']";

        return (
          <div
            key={itemUrl}
            className={className}
            onClick={() => setQueuePosition(() => index)}
          >
            <span className={iconClass}>{itemUrl}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Queue;
