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
  Box,
  Chip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
} from "@mui/material";

import { fetchShipments } from "../api/shipments";
import { Shipment } from "../types/shipment";

// Define an ENUM for status colors
enum StatusColor {
  delivered = "success",
  delayed = "error",
  in_transit = "info",
  pending = "warning",
  cancelled = "default",
}

const Dashboard = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [carrierFilter, setCarrierFilter] = useState<string>("");

  useEffect(() => {
    fetchShipments().then((data) => {
      setShipments(data);
      // console.log("data", data);
    });
  }, []);
  console.log("shipments::::", shipments);

  useEffect(() => {
    let filteredItems = [...shipments];
    if (statusFilter) {
      filteredItems = filteredItems.filter((s) => s.status === statusFilter);
    }
    if (carrierFilter) {
      filteredItems = filteredItems.filter((s) => s.carrier === carrierFilter);
    }
    setFilteredShipments(filteredItems);
  }, [statusFilter, carrierFilter, shipments]);

  const uniqueStatuses = [...new Set(shipments.map((s) => s.status))];
  const uniqueCarriers = [...new Set(shipments.map((s) => s.carrier))];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shipment Dashboard
      </Typography>

      <Stack direction="row" spacing={2}>
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={statusFilter}
            label="Status Filter"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueStatuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel>Carrier Filter</InputLabel>
          <Select
            value={carrierFilter}
            label="Carrier Filter"
            onChange={(e) => setCarrierFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCarriers.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Carrier</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>Expected Delivery</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredShipments.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.customer_name}</TableCell>
                <TableCell>{s.city}</TableCell>
                <TableCell>{s.carrier}</TableCell>
                <TableCell>
                  <Chip
                    label={s.status}
                    color={
                      (StatusColor[s.status as keyof typeof StatusColor] ||
                        "default") as any
                    }
                  />
                </TableCell>
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
