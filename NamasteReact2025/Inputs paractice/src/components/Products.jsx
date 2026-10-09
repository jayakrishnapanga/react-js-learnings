import { useParams, useLocation } from "react-router-dom";
export function Products() {
  console.log("inproducts", useParams());
  console.log("inproducts useLocation", useLocation());
  const { category, id } = useParams();
  return (
    <div>
      <span>product category:{category}</span>
      <span>product id:{id}</span>
    </div>
  );
}
