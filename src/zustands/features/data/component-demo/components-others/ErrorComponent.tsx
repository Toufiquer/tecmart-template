/*
|-----------------------------------------
| setting up ErrorComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: shreshtho-v3, April, 2025
|-----------------------------------------
*/
const ErrorComponent = ({ error }: { error?: string }) => {
  return (
    <div className="border-2 text-rose-500 border-rose-500 flex items-center justify-center w-full h-[50vh]">
      {error || 'Ops! something wrong, please try again.'}
    </div>
  )
}
export default ErrorComponent
