import { Card, Dropdown, DropdownItem } from "flowbite-react";

export function AvatarCard({ name, imageUrl ,setIsModalOpen}) {
  return (
    <Card className="max-w-sm">
      <div className="flex flex-col items-center pb-10">
        <img
          src={`${imageUrl}`}
          alt="avatar"
          className="rounded-full w-40 h-40"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>

        <div onClick={()=> setIsModalOpen(true)} className="mt-4 flex space-x-3 lg:mt-6">
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Change Avatar
          </a>
        </div>
      </div>
    </Card>
  );
}
