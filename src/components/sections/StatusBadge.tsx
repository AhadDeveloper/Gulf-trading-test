type Props = {
  status: "pending" | "approved" | "rejected";
};

export default function StatusBadge({ status }: Props) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}
