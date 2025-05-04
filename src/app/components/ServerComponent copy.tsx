/*
|-----------------------------------------
| setting up ServerComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/
const ServerComponent = async () => {
  const json = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await json.json();
  return (
    <main className="min-w-[400px] min-h-[200px] flex items-center justify-start flex-col border-1 ">
      <p className="border-b-1 w-full text-center p-2">Server Component</p>
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        <h2>{data.title}</h2>
      </div>
    </main>
  );
};
export default ServerComponent;
