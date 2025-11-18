import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // input change handle
  const { name, value } = e.target;
  console.log(name, value);
};

const saveData = () => {
  console.log("save Data");
};

export default function EditForm({
  editModal,
}: {
  editModal: ReturnType<typeof useModal>;
}) {
  return (
    <>
      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Blog
            </h4>
          </div>
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gay-y-5 lg:grid-cols-2">
              <div>
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Content</Label>
                <Input
                  type="text"
                  placeholder="Enter Content"
                  name="content"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={editModal.closeModal}>
              Close
            </Button>
            <Button size="sm" onClick={saveData}>
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
