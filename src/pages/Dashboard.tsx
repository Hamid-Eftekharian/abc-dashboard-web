import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import { fetchShipments } from "../api/shipments";
import { Shipment } from "../types/shipment";

const Dashboard = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShipments().then((data) => {
      setShipments(data);
      // console.log("data", data);
    });
  }, []);
  console.log("shipments:::", shipments);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shipment Dashboard
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Carrier</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>Expected Delivery</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.customer_name}</TableCell>
                <TableCell>{s.address}</TableCell>
                <TableCell>{s.city}</TableCell>
                <TableCell>{s.carrier}</TableCell>
                <TableCell>{s.status}</TableCell>
                <TableCell>{new Date(s.start).toLocaleDateString()}</TableCell>
                <TableCell>
                  {new Date(s.expected_delivery).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(s.last_updated_date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Dashboard;
