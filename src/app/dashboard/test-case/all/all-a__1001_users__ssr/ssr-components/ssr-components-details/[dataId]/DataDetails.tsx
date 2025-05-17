/*
|-----------------------------------------
| setting up DataDetails for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: tecmart-template, May, 2025
|-----------------------------------------
*/
import { IResData } from './page';

const DataDetails = ({ data }: { data: IResData }) => {
  return (
    <div className="w-full flex items-center justify-center md:px-0">
      <div className="container max-w-7xl flex flex-col gap-2">
        <div className="w-full flex items-center gap-2">
          <p className="font-bold">Id:</p>
          <p> {data._id as string}</p>
        </div>
        <div className="w-full flex items-center gap-2">
          <p className="font-bold">Name:</p>
          <p> {data.name as string}</p>
        </div>
        <div className="w-full flex items-center gap-2">
          <p className="font-bold">Email:</p>
          <p>{data.email as string}</p>
        </div>
      </div>
    </div>
  );
};
export default DataDetails;
