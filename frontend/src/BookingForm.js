import React, { useState, useEffect } from "react";
import api from "./api";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Alert,
  Typography,
  Paper,
  Container,
  Grid,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  Person,
  DirectionsCar,
  Category,
  CarRental,
  DateRange,
  CheckCircle,
  NavigateNext,
  NavigateBefore,
  TwoWheeler,
} from "@mui/icons-material";
import "./BookingForm.css"; // ✅ import CSS file

const steps = [
  { label: "Your Name", icon: Person },
  { label: "Number of Wheels", icon: DirectionsCar },
  { label: "Type of Vehicle", icon: Category },
  { label: "Specific Model", icon: CarRental },
  { label: "Date Range", icon: DateRange },
];

function BookingForm({ vehicleTypes }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleTypeId: "",
    vehicleId: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter vehicle types by wheels
  useEffect(() => {
    const typesToFilter = vehicleTypes || [];
    
    if (form.wheels) {
      setFilteredTypes(typesToFilter.filter((t) => t.wheels === Number(form.wheels)));
      setForm((f) => ({ ...f, vehicleTypeId: "", vehicleId: "" }));
    } else {
      setFilteredTypes(typesToFilter);
    }
  }, [form.wheels, vehicleTypes]);

  // Fetch vehicles for selected type
  useEffect(() => {
    if (form.vehicleTypeId) {
      setLoading(true);
      api.get(`/vehicles?typeId=${form.vehicleTypeId}`).then(res => {
        // Corrected: Filter out duplicate vehicle models
        const uniqueVehicles = Array.from(new Set(res.data.map(v => v.id)))
          .map(id => {
            return res.data.find(v => v.id === id);
          });
        setVehicles(uniqueVehicles);
        setForm((f) => ({ ...f, vehicleId: "" }));
        setLoading(false);
      });
    }
  }, [form.vehicleTypeId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleNext = () => {
    if (step === 0 && (!form.firstName.trim() || !form.lastName.trim())) {
      setError("Please enter your first and last name.");
      return;
    }
    if (step === 1 && !form.wheels) {
      setError("Please select number of wheels.");
      return;
    }
    if (step === 2 && !form.vehicleTypeId) {
      setError("Please select a vehicle type.");
      return;
    }
    if (step === 3 && !form.vehicleId) {
      setError("Please select a vehicle model.");
      return;
    }
    if (step === 4 && (!form.startDate || !form.endDate)) {
      setError("Please select a date range.");
      return;
    }
    if (step === 4 && form.endDate < form.startDate) {
      setError("End date cannot be before start date.");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api.post("/bookings", form)
      .then(() => {
        setStep(0);
        setForm({
          firstName: "",
          lastName: "",
          wheels: "",
          vehicleTypeId: "",
          vehicleId: "",
          startDate: "",
          endDate: "",
        });
        setError("");
        setLoading(false);
        alert("🎉 Booking created successfully!");
      })
      .catch((err) => {
        setError(
          err.response?.data?.error || "Booking failed. Please try again."
        );
        setLoading(false);
      });
  };

  const progress = ((step + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Number of Wheels
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Chip
                  label="2 Wheels"
                  icon={<TwoWheeler />}
                  onClick={() => setForm({ ...form, wheels: 2 })}
                  color={form.wheels === 2 ? "primary" : "default"}
                  variant={form.wheels === 2 ? "filled" : "outlined"}
                  sx={{ p: 2, fontSize: '1rem', fontWeight: 600 }}
                />
              </Grid>
              <Grid item>
                <Chip
                  label="4 Wheels"
                  icon={<DirectionsCar />}
                  onClick={() => setForm({ ...form, wheels: 4 })}
                  color={form.wheels === 4 ? "primary" : "default"}
                  variant={form.wheels === 4 ? "filled" : "outlined"}
                  sx={{ p: 2, fontSize: '1rem', fontWeight: 600 }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Type of Vehicle
            </Typography>
            {loading ? <LinearProgress /> : (
              <Grid container spacing={2}>
                {filteredTypes.map((type) => (
                  <Grid item key={type.id}>
                    <Chip
                      label={type.name}
                      onClick={() => setForm({ ...form, vehicleTypeId: type.id })}
                      color={form.vehicleTypeId === type.id ? "primary" : "default"}
                      variant={form.vehicleTypeId === type.id ? "filled" : "outlined"}
                      sx={{ p: 2, fontSize: '1rem', fontWeight: 600 }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Specific Model
            </Typography>
            {loading ? <LinearProgress /> : (
              <Grid container spacing={2}>
                {vehicles.map((vehicle) => (
                  <Grid item key={vehicle.id}>
                    <Chip
                      label={vehicle.name}
                      onClick={() => setForm({ ...form, vehicleId: vehicle.id })}
                      color={form.vehicleId === vehicle.id ? "primary" : "default"}
                      variant={form.vehicleId === vehicle.id ? "filled" : "outlined"}
                      sx={{ p: 2, fontSize: '1rem', fontWeight: 600 }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );
      case 4:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        );
      default:
        return (
          <Box textAlign="center">
            <Typography variant="h5" color="text.secondary">
              <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <br />
              Booking Details
            </Typography>
            <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
              <Typography variant="body1">
                <strong>Name:</strong> {form.firstName} {form.lastName}
              </Typography>
              <Typography variant="body1">
                <strong>Vehicle:</strong> {vehicles.find(v => v.id === form.vehicleId)?.name || 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Dates:</strong> {form.startDate} to {form.endDate}
              </Typography>
            </Paper>
          </Box>
        );
    }
  };

  return (
    <Box className="gradient-bg" sx={{ py: 4, px: 2 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 800,
              mb: 2,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            🚗 Vehicle Booking
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 300 }}
          >
            Reserve your perfect ride in just a few steps
          </Typography>
        </Box>

        {/* Progress Bar */}
        <Box mb={4}>
          <LinearProgress
            className="animated-progress"
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)', mb: 1 }}
          />
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: 'white', fontWeight: 500 }}
          >
            Step {step + 1} of {steps.length} ({Math.round(progress)}% complete)
          </Typography>
        </Box>
        <Paper className="glass-card" sx={{ p: { xs: 3, md: 5 } }}>
          {/* Stepper */}
          <Box mb={6}>
            <Stepper activeStep={step} className="custom-stepper" sx={{ mb: 4 }}>
              {steps.map((stepItem, index) => (
                <Step key={stepItem.label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: index === step ? 700 : 500,
                        color: index <= step ? '#667eea' : '#999',
                        fontSize: { xs: '0.8rem', sm: '1rem' },
                        mt: 1,
                      },
                    }}
                  >
                    {stepItem.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontWeight: 500 }}>
                {error}
              </Alert>
            )}

            {/* Steps content */}
            {renderStepContent()}

            {/* Navigation */}
            <Box display="flex" justifyContent="space-between" alignItems="center" pt={4}
              sx={{ borderTop: '2px solid rgba(102, 126, 234, 0.1)' }}
            >
              <Box>
                {step > 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    startIcon={<NavigateBefore />}
                    disabled={loading}
                    sx={{
                      borderRadius: 25,
                      border: '2px solid #667eea',
                      color: '#667eea',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      '&:hover': {
                        background: 'rgba(102, 126, 234, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Back
                  </Button>
                )}
              </Box>
              <Box>
                {step < steps.length - 1 ? (
                  <Button
                    className="gradient-button"
                    onClick={handleNext}
                    endIcon={<NavigateNext />}
                    disabled={loading}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    className="gradient-button"
                    type="submit"
                    endIcon={loading ? null : <CheckCircle />}
                    disabled={loading}
                    sx={{ minWidth: 180 }}
                  >
                    {loading ? "Submitting..." : "Complete Booking"}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default BookingForm;