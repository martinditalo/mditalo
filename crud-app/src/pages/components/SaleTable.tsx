import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Sales } from "../sales/types";

interface Column {
  id: "name" | "category" | "size" | "price" | "stockAmount" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "category", label: "Category", align: "center", minWidth: 100 },
  {
    id: "size",
    label: "Size",
    minWidth: 100,
    align: "center",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "right",
  },
  {
    id: "stockAmount",
    label: "Stock Amount",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

interface Data {
  name: string;
  category: string;
  price: number;
  size: string;
  stockAmount: number;
  action: React.ReactNode;
}

type SaleTableProps = {
  data: Sales[];
  deleteSale: (id: string) => void;
};

const SaleTable = (props: SaleTableProps): React.ReactElement => {
  const { data, deleteSale } = props;

  const salesData: Data[] = data.map((sales) => {
    return {
      name: sales.name,
      category: sales.category,
      price: sales.price,
      size: sales.size,
      stockAmount: sales.stockAmount,
      action: (
        <>
          <IconButton
            onClick={() => {
              deleteSale(sales.id);
            }}
          >
            <DeleteIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => {}}>
            <EditIcon color="primary" />
          </IconButton>
        </>
      ),
    };
  });

  const rows = [...salesData];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <>
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SaleTable;
