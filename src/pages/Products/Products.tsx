import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ProductTable from "../../components/tables/BasicTables/ProductTable";
import PageBreadCrumb from "../../components/common/PageBreadCrumb";

export default function Products() {
  return (
    <>
      <PageMeta title="Products" description="This is Product Listing" />
      <PageBreadCrumb
        pageTitle="Product"
        links={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Products", path: "/products" },
        ]}
      />
      <div className="space-y-6">
        <ComponentCard title="Product Listing1">
          <ProductTable />
        </ComponentCard>
        <ComponentCard title="Product Listing2">
          <ProductTable />
        </ComponentCard>
      </div>
    </>
  );
}
