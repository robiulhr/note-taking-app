import ErrorComp from "./error";

export default function NoDataFound({ className }: { className?: string }) {
  return <ErrorComp title="No Data Found" className={className} />;
}
