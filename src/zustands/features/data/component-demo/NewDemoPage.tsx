/*
|-----------------------------------------
| setting up NewDemoPage for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: shreshtho-v3, April, 2025
|-----------------------------------------
*/

import AddData from './AddData'
import ViewData from './ViewData'

const NewDemoPage = () => {
  return (
    <main className="w-full p-4 flex flex-col gap-4">
      <div className="w-full flex items-center justify-end">
        <AddData />
      </div>
      <ViewData />
    </main>
  )
}
export default NewDemoPage
