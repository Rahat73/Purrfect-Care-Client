import { useGetAllPayments } from "@/src/hooks/payment.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { format } from "date-fns";

const PaymentHistory = () => {
  const { data: paymentData, isFetching } = useGetAllPayments();

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Payment History</h3>
      <Table aria-label="Payment history table" selectionMode="single">
        <TableHeader>
          <TableColumn>TRX ID</TableColumn>
          <TableColumn>USER NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>POST TITLE</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isFetching}
          loadingContent={
            <div className=" bg-black/10 z-[999] backdrop-blur-md w-full h-full flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          }
        >
          {paymentData?.map((payment: any) => (
            <TableRow key={payment._id}>
              <TableCell>{payment.trxId}</TableCell>
              <TableCell>{payment.userId.name}</TableCell>
              <TableCell>{payment.userId.email}</TableCell>
              <TableCell>{payment.postId.title}</TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell>
                {format(new Date(payment.createdAt), "PPPpp")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistory;
