import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

const saveData = () => {
  console.log("save Data");
};

export default function DeleteForm({
  deleteModal,
}: {
  deleteModal: ReturnType<typeof useModal>;
}) {
  return (
    <>
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-red-800 dark:text-white/90">
              Delete Blog
            </h4>
          </div>
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gay-y-5 lg:grid-cols-2">
              <div>
                <h5>Are you sure want to delete this blog?</h5>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={deleteModal.closeModal}
            >
              No
            </Button>
            <Button size="sm" onClick={saveData}>
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
