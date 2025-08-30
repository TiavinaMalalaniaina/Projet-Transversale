import React from "react";
import { Box, Grid, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StatCard from "../components/StatCard";
import { AttachMoney, Build, People, Timer } from "@mui/icons-material";

// Exemple de données pour les graphiques
const serviceData = [
  { month: "Jan", services: 30 },
  { month: "Feb", services: 45 },
  { month: "Mar", services: 60 },
  { month: "Apr", services: 50 },
  { month: "May", services: 70 },
];

const latestServices = [
  { id: 1, client: "John Doe", service: "Vidange", date: "2025-08-01" },
  { id: 2, client: "Jane Smith", service: "Freins", date: "2025-08-02" },
  { id: 3, client: "Mike Brown", service: "Révision", date: "2025-08-03" },
];

export default function Dashboard() {
  return (
    <Box>
      {/* Stats Cards */}
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 3 }}>
        {/* Card 1 */}
        <Box sx={{ flex: "1 1 25%", p: 1, minWidth: 250 }}>
          <StatCard
            title="Revenus totaux"
            value="€12,450"
            icon={<AttachMoney fontSize="inherit" />}
            color="primary"
          />
        </Box>

        {/* Card 2 */}
        <Box sx={{ flex: "1 1 25%", p: 1, minWidth: 250 }}>
          <StatCard
            title="Services totaux"
            value="320"
            icon={<Build fontSize="inherit" />}
            color="secondary"
          />
        </Box>

        {/* Card 3 */}
        <Box sx={{ flex: "1 1 25%", p: 1, minWidth: 250 }}>
          <StatCard
            title="Nouveaux clients"
            value="45"
            icon={<People fontSize="inherit" />}
            color="success"
          />
        </Box>

        {/* Card 4 */}
        <Box sx={{ flex: "1 1 25%", p: 1, minWidth: 250 }}>
          <StatCard
            title="Temps moyen"
            value="1h 20min"
            icon={<Timer fontSize="inherit" />}
            color="warning"
          />
        </Box>
      </Box>

      {/* Graphique services */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>Services par mois</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="services" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tableau des derniers services */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Derniers services</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestServices.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.client}</TableCell>
                  <TableCell>{row.service}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
