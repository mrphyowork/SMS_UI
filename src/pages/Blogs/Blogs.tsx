import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import DataTable from "../../components/tables/DataTable";
import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import Button from "../../components/ui/button/Button";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../icons";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";

interface Blog {
  id: number;
  title: string;
  content: string;
}

type Columns<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
};

interface queryParamType {
  [key: string]: any;
}

const sortCols = ["title", "content"];

const sampleData = [
  {
    id: 1,
    title: "Understanding the Administrator Role in School Management",
    content:
      "The Administrator has full access within the school management system. They manage users, courses, permissions, and system settings, ensuring smooth and secure operation across the entire platform.",
  },
  {
    id: 2,
    title: "What Does a Principal Do in a School System?",
    content:
      "The Principal oversees academic and administrative operations. Their role includes supervising teachers, reviewing school performance, and ensuring all departments align with academic standards.",
  },
  {
    id: 3,
    title: "Responsibilities of a Teacher in Modern Education",
    content:
      "Teachers manage class schedules, assignments, student grades, and attendance. They directly influence student learning and academic progress.",
  },
  {
    id: 4,
    title: "Student Role in a Digital School Management System",
    content:
      "Students can view their courses, grades, and attendance records. They focus on learning materials, progress tracking, and classroom engagement.",
  },
  {
    id: 5,
    title: "How Parents Stay Connected Using School Systems",
    content:
      "Parents can monitor their child's academic progress and attendance. This strengthens communication between families and the school.",
  },
  {
    id: 6,
    title: "Why Librarians Are Essential in School Operations",
    content:
      "The Librarian manages book inventories, borrowing and returning activities, and ensures that learning materials are available for students and faculty.",
  },
  {
    id: 7,
    title: "The Role of the Accountant in School Finance Management",
    content:
      "Accountants handle student fees, payments, and financial reports. They ensure accurate financial records and transparent accounting.",
  },
  {
    id: 8,
    title: "Receptionist: The First Point of Contact in Schools",
    content:
      "Receptionists manage student registration, inquiries, and front desk operations. Their role helps maintain smooth communication within the school environment.",
  },
  {
    id: 9,
    title: "IT Support: Keeping School Systems Running Smoothly",
    content:
      "IT Support staff handle system maintenance, technical issues, and user support to ensure digital tools run effectively for all users.",
  },
  {
    id: 10,
    title: "Exam Coordinator Responsibilities Explained",
    content:
      "The Exam Coordinator organizes exam schedules, manages exam materials, and oversees result publication to maintain exam integrity.",
  },
  {
    id: 11,
    title: "Assistant Exam Coordinator: Supporting Exam Operations",
    content:
      "This role supports the main exam coordinator in managing schedules, organizing materials, and ensuring examination processes run efficiently.",
  },
  {
    id: 12,
    title: "Extended IT Support Role in School Digital Infrastructure",
    content:
      "An additional IT Support role may handle specialized tasks such as hardware maintenance or network troubleshooting, supporting the main IT department.",
  },
];

export default function Blogs() {
  // Modal Form for CRUD
  const createModal = useModal();

  // Data State
  const [data, setData] = useState<Blog[]>([]);

  const columns: Columns<Blog>[] = [
    { key: "id", header: "ID", render: (blog: Blog) => blog.id },
    { key: "title", header: "Title", render: (blog: Blog) => blog.title },
    { key: "content", header: "Content", render: (blog: Blog) => blog.content },
    {
      key: "action",
      header: "Action",
      render: (blog: Blog) => (
        <div className="col-span-1 flex items-center justify-center gap-2">
          <button className="btn" onClick={() => handleEdit(blog.id)}>
            <PencilIcon className="size-5" />
          </button>
          <button className="btn" onClick={() => handleDelete(blog.id)}>
            <TrashBinIcon className="size-5" />
          </button>
        </div>
      ),
    },
  ];

  // Query Parameter for Data Fetch
  const [queryParams, setQueryParams] = useState<queryParamType>({
    page: 1,
    per_page: 10,
    sort_by: columns[0].key, // id
    sort_order: "acs",
  });

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    console.log("queryParams", queryParams);
    // call fetchData();
  }, [queryParams]);

  const fetchData = () => {
    setData(sampleData);
    // call API
  };

  const handleEdit = (id: number) => {
    // show edit modal
  };

  const handleDelete = (id: number) => {
    // show delete confirm modal
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input change handle
    const { name, value } = e.target;
    console.log(name, value);
  };
  const saveData = () => {
    console.log("save Data");
  };
  return (
    <>
      <PageMeta title="Blogs" description="This is Blog Listing" />
      <PageBreadcrumb
        pageTitle="Blog"
        links={[
          { name: "Blog", path: "/blog" },
          { name: "Listing", path: "/blog" },
        ]}
      />
      <div className="flex justify-end mb-5">
        <Button
          size="sm"
          startIcon={<PlusIcon />}
          onClick={createModal.openModal}
        >
          Create Blog
        </Button>
      </div>
      <div className="space-y-6">
        <ComponentCard title="Blog Listing">
          <DataTable
            columns={columns}
            data={data}
            sortCols={sortCols}
            isPagination={false}
            setQueryParams={setQueryParams}
            queryParams={queryParams}
          />
        </ComponentCard>
      </div>
      <Modal
        isOpen={createModal.isOpen}
        onClose={createModal.closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create Blog
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
            <Button
              size="sm"
              variant="outline"
              onClick={createModal.closeModal}
            >
              Close
            </Button>
            <Button size="sm" onClick={saveData}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
