import { notFound } from 'next/navigation';
import DataDetails from './DataDetails';
import GoBackButton from './GoBackButton';

export type IResData = {
  _id: string;
  name: string;
  email: string;
  passCode: string; // Consider if this should be included in all responses
  alias: string;
  role: string;
  createdAt: string; // Could also be `Date` if parsed
  updatedAt: string; // Could also be `Date` if parsed
};

interface ApiResponse {
  data: IResData;
  message: string;
  status: number;
}

const getDataById = async (id: string): Promise<ApiResponse> => {
  const backendUrl = `http://localhost:3000/a__1001_users__/api/v1?id=${id}`;
  console.log('id : ', backendUrl);
  try {
    const res = await fetch(backendUrl, { next: { revalidate: 3600 } }); // 60 minutes (3600 seconds)
    const responseData: ApiResponse = await res.json();
    console.log('responseData', responseData);
    const data = responseData;
    if (!data) notFound();
    return data;
  } catch (error) {
    console.error('Failed to fetch Data:', error);
    return {
      data: {
        _id: '',
        name: '',
        email: '',
        passCode: '',
        alias: '',
        role: '',
        createdAt: '',
        updatedAt: '',
      },
      message: 'User_103__ fetched successfully',
      status: 200,
    };
  }
};

async function getData(id: string) {
  const data = getDataById(id);
  if (!data) notFound();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ dataId: string }> }) {
  const { dataId } = await params;
  const data = await getData(dataId);

  return {
    name: data.data.name,
  };
}

export default async function Page({ params }: { params: Promise<{ dataId: string }> }) {
  const { dataId } = await params;
  const data = await getData(dataId);
  return (
    <div className="py-12 flex flex-col w-full">
      <GoBackButton />
      <DataDetails data={data.data} />
    </div>
  );
}
