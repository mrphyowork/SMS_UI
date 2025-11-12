import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BlogTable from "../../components/tables/BasicTables/BlogTable";

export default function Blogs() {
  return (
    <>
      <PageMeta title="Blogs" description="This is Blog Listing" />
      <PageBreadcrumb pageTitle="Blog" />
      <div className="space-y-6">
        <ComponentCard title="Blog Listing">
          <BlogTable />
        </ComponentCard>
      </div>
    </>
  );
}
