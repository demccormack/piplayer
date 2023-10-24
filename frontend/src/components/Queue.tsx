function Queue({
  queue,
  queuePosition,
}: {
  queue: string[];
  queuePosition: number;
}) {
  return (
    <div className="fixed bottom-4 right-4 max-h-72 w-1/5 overflow-x-scroll rounded-md border-2 border-gray-400 text-left">
      {queue.map((itemUrl, index) => {
        const className =
          queuePosition === index ? 'p-2 bg-slate-800 font-bold' : 'p-2';

        const iconClass =
          queuePosition === index
            ? "inline-block before:content-['⏸️']"
            : "inline-block before:content-['▶️']";

        return (
          <div
            key={itemUrl}
            className={className}
          >
            <span className={iconClass}>{itemUrl}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Queue;
